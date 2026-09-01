import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CountryCode } from '../types';
import {
  BASELINE_USD_EXCHANGE_RATES,
  SUPPORTED_CURRENCIES,
  getCurrencyInfo,
  getMarketplaceCurrencyCode,
} from '../data/currencies';
import {
  calculateExchangeRate,
  convertCurrencyAmount,
  formatCurrencyWithCode,
} from '../utils/currency';
import { trackEvent } from '../utils/analytics';

const STORAGE_KEYS = {
  ENABLED: 'sellermargincalc_currency_conversion_enabled',
  TARGET: 'sellermargincalc_target_currency',
  RATES: 'sellermargincalc_cached_fx_rates',
  TIMESTAMP: 'sellermargincalc_cached_fx_timestamp',
  CUSTOM_MULTIPLIER: 'sellermargincalc_custom_fx_multiplier',
};

const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours cache

export interface CurrencyContextType {
  isConversionEnabled: boolean;
  setIsConversionEnabled: (enabled: boolean) => void;
  toggleConversion: () => void;
  targetCurrency: string;
  setTargetCurrency: (code: string) => void;
  rates: Record<string, number>;
  lastUpdated: string | null;
  isLoadingRates: boolean;
  isLive: boolean;
  customRateMultiplier: number | null;
  setCustomRateMultiplier: (multiplier: number | null) => void;
  refreshRates: () => Promise<void>;
  convert: (amount: number, fromCountryOrCode: CountryCode | string, toCode?: string) => number;
  formatConverted: (
    amount: number,
    fromCountryOrCode: CountryCode | string,
    toCode?: string,
    showDecimals?: boolean
  ) => string;
  getExchangeRateInfo: (
    fromCountryOrCode: CountryCode | string,
    toCode?: string
  ) => {
    rate: number;
    formattedRate: string;
    fromCode: string;
    toCode: string;
    isIdentity: boolean;
  };
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConversionEnabled, setIsConversionEnabledState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ENABLED);
      return stored === 'true';
    } catch {
      return false;
    }
  });

  const [targetCurrency, setTargetCurrencyState] = useState<string>(() => {
    if (typeof window === 'undefined') return 'USD';
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TARGET);
      if (stored && SUPPORTED_CURRENCIES.some((c) => c.code === stored)) {
        return stored;
      }
      return 'USD';
    } catch {
      return 'USD';
    }
  });

  const [customRateMultiplier, setCustomRateMultiplierState] = useState<number | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_MULTIPLIER);
      return stored ? parseFloat(stored) : null;
    } catch {
      return null;
    }
  });

  const [rates, setRates] = useState<Record<string, number>>(() => {
    if (typeof window === 'undefined') return BASELINE_USD_EXCHANGE_RATES;
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.RATES);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === 'object' && parsed.USD === 1) {
          return { ...BASELINE_USD_EXCHANGE_RATES, ...parsed };
        }
      }
    } catch {
      // ignore
    }
    return BASELINE_USD_EXCHANGE_RATES;
  });

  const [lastUpdated, setLastUpdated] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(STORAGE_KEYS.TIMESTAMP) || null;
    } catch {
      return null;
    }
  });

  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(false);
  const [isLive, setIsLive] = useState<boolean>(() => !!lastUpdated);

  const fetchLiveRates = useCallback(async (force = false) => {
    if (typeof window === 'undefined') return;

    // Check if cache is fresh unless forced
    try {
      const cachedTs = localStorage.getItem(STORAGE_KEYS.TIMESTAMP);
      if (cachedTs && !force) {
        const age = Date.now() - new Date(cachedTs).getTime();
        if (age < CACHE_TTL_MS) {
          return;
        }
      }
    } catch {
      // ignore
    }

    setIsLoadingRates(true);
    try {
      // Primary high-reliability open exchange rate endpoint
      const res = await fetch('https://open.er-api.com/v6/latest/USD', {
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();

      if (data && data.rates && typeof data.rates === 'object') {
        const mergedRates: Record<string, number> = {
          ...BASELINE_USD_EXCHANGE_RATES,
          ...data.rates,
          USD: 1.0,
        };
        const nowIso = new Date().toISOString();
        setRates(mergedRates);
        setLastUpdated(nowIso);
        setIsLive(true);

        try {
          localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(mergedRates));
          localStorage.setItem(STORAGE_KEYS.TIMESTAMP, nowIso);
        } catch {
          // ignore storage quota errors
        }
      }
    } catch {
      // Try secondary backup API if available, or gracefully retain current/baseline rates
      try {
        const backupRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (backupRes.ok) {
          const backupData = await backupRes.json();
          if (backupData && backupData.rates) {
            const merged = { ...BASELINE_USD_EXCHANGE_RATES, ...backupData.rates, USD: 1.0 };
            const nowIso = new Date().toISOString();
            setRates(merged);
            setLastUpdated(nowIso);
            setIsLive(true);
            try {
              localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(merged));
              localStorage.setItem(STORAGE_KEYS.TIMESTAMP, nowIso);
            } catch {
              // ignore
            }
          }
        }
      } catch {
        // Silently preserve baseline rates without interruption
      }
    } finally {
      setIsLoadingRates(false);
    }
  }, []);

  // Fetch rates on mount once
  useEffect(() => {
    fetchLiveRates(false);
  }, [fetchLiveRates]);

  const setIsConversionEnabled = useCallback((enabled: boolean) => {
    setIsConversionEnabledState(enabled);
    try {
      localStorage.setItem(STORAGE_KEYS.ENABLED, String(enabled));
    } catch {
      // ignore
    }
    trackEvent('currency_conversion_toggled', { enabled });
    if (enabled) {
      fetchLiveRates(false);
    }
  }, [fetchLiveRates]);

  const toggleConversion = useCallback(() => {
    setIsConversionEnabled(!isConversionEnabled);
  }, [isConversionEnabled, setIsConversionEnabled]);

  const setTargetCurrency = useCallback((code: string) => {
    const normalized = (code || 'USD').toUpperCase();
    setTargetCurrencyState(normalized);
    try {
      localStorage.setItem(STORAGE_KEYS.TARGET, normalized);
    } catch {
      // ignore
    }
    trackEvent('target_currency_selected', { currency: normalized });
  }, []);

  const setCustomRateMultiplier = useCallback((multiplier: number | null) => {
    setCustomRateMultiplierState(multiplier);
    try {
      if (multiplier !== null) {
        localStorage.setItem(STORAGE_KEYS.CUSTOM_MULTIPLIER, String(multiplier));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CUSTOM_MULTIPLIER);
      }
    } catch {
      // ignore
    }
  }, []);

  const refreshRates = useCallback(async () => {
    await fetchLiveRates(true);
    trackEvent('fx_rates_refreshed', { target_currency: targetCurrency });
  }, [fetchLiveRates, targetCurrency]);

  const convert = useCallback(
    (amount: number, fromCountryOrCode: CountryCode | string, toCode?: string): number => {
      const target = toCode || targetCurrency;
      return convertCurrencyAmount(amount, fromCountryOrCode, target, rates, customRateMultiplier);
    },
    [targetCurrency, rates, customRateMultiplier]
  );

  const formatConverted = useCallback(
    (
      amount: number,
      fromCountryOrCode: CountryCode | string,
      toCode?: string,
      showDecimals = true
    ): string => {
      const target = toCode || targetCurrency;
      const convertedVal = convert(amount, fromCountryOrCode, target);
      return formatCurrencyWithCode(convertedVal, target, showDecimals);
    },
    [convert, targetCurrency]
  );

  const getExchangeRateInfo = useCallback(
    (fromCountryOrCode: CountryCode | string, toCode?: string) => {
      const from =
        fromCountryOrCode.length === 2
          ? getMarketplaceCurrencyCode(fromCountryOrCode as CountryCode)
          : fromCountryOrCode.toUpperCase();
      const to = (toCode || targetCurrency).toUpperCase();
      const isIdentity = from === to;
      const rate = calculateExchangeRate(from, to, rates, customRateMultiplier);

      const targetInfo = getCurrencyInfo(to);
      const formattedRate = `1 ${from} = ${rate.toLocaleString('en-US', {
        minimumFractionDigits: targetInfo.decimalPlaces === 0 ? 0 : 3,
        maximumFractionDigits: targetInfo.decimalPlaces === 0 ? 2 : 4,
      })} ${to}`;

      return {
        rate,
        formattedRate,
        fromCode: from,
        toCode: to,
        isIdentity,
      };
    },
    [targetCurrency, rates, customRateMultiplier]
  );

  return (
    <CurrencyContext.Provider
      value={{
        isConversionEnabled,
        setIsConversionEnabled,
        toggleConversion,
        targetCurrency,
        setTargetCurrency,
        rates,
        lastUpdated,
        isLoadingRates,
        isLive,
        customRateMultiplier,
        setCustomRateMultiplier,
        refreshRates,
        convert,
        formatConverted,
        getExchangeRateInfo,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export function useCurrencyContext(): CurrencyContextType {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrencyContext must be used within a CurrencyProvider');
  }
  return context;
}
