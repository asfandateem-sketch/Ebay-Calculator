import { CountryCode } from '../types';
import { getCountryConfig } from '../data/fee-rules';
import {
  BASELINE_USD_EXCHANGE_RATES,
  getCurrencyInfo,
  getMarketplaceCurrencyCode,
} from '../data/currencies';

export function formatCurrency(
  amount: number,
  countryCode: CountryCode = 'US',
  showDecimals = true
): string {
  const config = getCountryConfig(countryCode);
  const safeAmount = isNaN(amount) || !isFinite(amount) ? 0 : amount;

  const formattedNumber = safeAmount.toLocaleString('en-US', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });

  if (config.currency.position === 'after') {
    return `${formattedNumber} ${config.currency.symbol}`;
  }
  return `${config.currency.symbol}${formattedNumber}`;
}

/**
 * Format any currency value directly by its 3-letter currency code (e.g. USD, EUR, GBP, JPY).
 */
export function formatCurrencyWithCode(
  amount: number,
  currencyCode = 'USD',
  showDecimals = true
): string {
  const info = getCurrencyInfo(currencyCode);
  const safeAmount = isNaN(amount) || !isFinite(amount) ? 0 : amount;
  const decimals = info.decimalPlaces === 0 ? 0 : showDecimals ? info.decimalPlaces : 0;

  const formattedNumber = safeAmount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  if (info.position === 'after') {
    return `${formattedNumber} ${info.symbol}`;
  }
  return `${info.symbol}${formattedNumber}`;
}

export function formatPercent(rate: number, decimals = 2): string {
  const safeRate = isNaN(rate) || !isFinite(rate) ? 0 : rate;
  return `${safeRate.toFixed(decimals)}%`;
}

export function getCurrencySymbol(countryCode: CountryCode = 'US'): string {
  const config = getCountryConfig(countryCode);
  return config?.currency?.symbol || '$';
}

export function getCurrencyCode(countryCode: CountryCode = 'US'): string {
  const config = getCountryConfig(countryCode);
  return config?.currency?.code || 'USD';
}

/**
 * Calculate the exchange rate between two currencies given a USD-based rate table.
 * 1 fromCurrency = X toCurrency
 */
export function calculateExchangeRate(
  fromCurrencyCode: string,
  toCurrencyCode: string,
  rates: Record<string, number> = BASELINE_USD_EXCHANGE_RATES,
  customMultiplier: number | null = null
): number {
  const from = (fromCurrencyCode || 'USD').toUpperCase();
  const to = (toCurrencyCode || 'USD').toUpperCase();

  if (from === to) return 1.0;

  const fromRate = rates[from] || BASELINE_USD_EXCHANGE_RATES[from] || 1.0;
  const toRate = rates[to] || BASELINE_USD_EXCHANGE_RATES[to] || 1.0;

  // Since rates are in terms of 1 USD = X Currency:
  // 1 fromCurrency = (1 / fromRate) USD = (toRate / fromRate) toCurrency
  const baseRate = toRate / fromRate;

  if (customMultiplier && customMultiplier > 0) {
    return baseRate * customMultiplier;
  }

  return baseRate;
}

/**
 * Converts an amount from one currency or country marketplace to another currency.
 */
export function convertCurrencyAmount(
  amount: number,
  fromCountryOrCurrency: CountryCode | string,
  toCurrencyCode: string,
  rates: Record<string, number> = BASELINE_USD_EXCHANGE_RATES,
  customMultiplier: number | null = null
): number {
  if (isNaN(amount) || !isFinite(amount)) return 0;

  // Resolve source currency code
  const fromCode =
    fromCountryOrCurrency.length === 2
      ? getMarketplaceCurrencyCode(fromCountryOrCurrency as CountryCode)
      : fromCountryOrCurrency.toUpperCase();

  const toCode = (toCurrencyCode || 'USD').toUpperCase();

  if (fromCode === toCode) return amount;

  const rate = calculateExchangeRate(fromCode, toCode, rates, customMultiplier);
  return amount * rate;
}
