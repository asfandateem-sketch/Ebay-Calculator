import React, { useState } from 'react';
import { CountryCode } from '../../types';
import { useCurrencyContext } from '../../context/CurrencyContext';
import {
  SUPPORTED_CURRENCIES,
  POPULAR_CURRENCIES,
  getCurrencyInfo,
} from '../../data/currencies';
import {
  RefreshCw,
  SlidersHorizontal,
  Info,
  Check,
  ChevronDown,
  ChevronUp,
  Coins,
} from 'lucide-react';

interface CurrencyConversionBarProps {
  countryCode: CountryCode;
  className?: string;
  compact?: boolean;
}

export const CurrencyConversionBar: React.FC<CurrencyConversionBarProps> = ({
  countryCode,
  className = '',
  compact = false,
}) => {
  const {
    isConversionEnabled,
    setIsConversionEnabled,
    targetCurrency,
    setTargetCurrency,
    isLoadingRates,
    lastUpdated,
    refreshRates,
    getExchangeRateInfo,
    customRateMultiplier,
    setCustomRateMultiplier,
  } = useCurrencyContext();

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedSpread, setSelectedSpread] = useState<string>(() => {
    if (!customRateMultiplier) return '0';
    if (Math.abs(customRateMultiplier - 0.985) < 0.001) return '-1.5';
    if (Math.abs(customRateMultiplier - 0.980) < 0.001) return '-2.0';
    if (Math.abs(customRateMultiplier - 0.965) < 0.001) return '-3.5';
    return 'custom';
  });

  const rateInfo = getExchangeRateInfo(countryCode);
  const currentTargetInfo = getCurrencyInfo(targetCurrency);

  const handleSpreadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedSpread(val);
    if (val === '0') {
      setCustomRateMultiplier(null);
    } else if (val === '-1.5') {
      setCustomRateMultiplier(0.985); // 1.5% deduction for card spread
    } else if (val === '-2.0') {
      setCustomRateMultiplier(0.980); // 2.0% spread
    } else if (val === '-3.5') {
      setCustomRateMultiplier(0.965); // 3.5% marketplace/payment FX spread
    }
  };

  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Live Mid-Market';

  return (
    <div
      id="currency-conversion-bar"
      className={`currency-conversion-container ${className} ${
        isConversionEnabled ? 'active' : ''
      }`}
      style={{
        background: isConversionEnabled ? 'var(--color-surface-hover)' : 'var(--color-soft-gray)',
        border: `1px solid ${
          isConversionEnabled ? 'var(--color-primary)' : 'var(--color-border)'
        }`,
        borderRadius: 'var(--radius-md)',
        padding: compact ? '12px 14px' : '14px 18px',
        marginBottom: '16px',
        transition: 'all var(--transition-fast)',
      }}
    >
      {/* Top Bar: Switch + Title + Live Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-sm)',
              background: isConversionEnabled
                ? 'var(--color-primary)'
                : 'var(--color-light-gray)',
              color: isConversionEnabled ? 'var(--color-white)' : 'var(--color-text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Coins size={16} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-title)' }}>
                Real-Time Currency Conversion
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-pill)',
                  background: isConversionEnabled ? 'var(--color-success-bg)' : 'rgba(0,0,0,0.05)',
                  color: isConversionEnabled ? 'var(--color-success)' : 'var(--color-text-muted)',
                  border: `1px solid ${
                    isConversionEnabled ? 'rgba(4, 120, 87, 0.25)' : 'transparent'
                  }`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: isConversionEnabled ? 'var(--color-success)' : '#94a3b8',
                  }}
                />
                Live FX
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0 }}>
              Convert marketplace fees &amp; net profits to your local home currency
            </p>
          </div>
        </div>

        {/* Master Toggle Switch */}
        <label
          htmlFor="currency-conversion-toggle"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 600, color: isConversionEnabled ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
            {isConversionEnabled ? 'Enabled' : 'Disabled'}
          </span>
          <div
            style={{
              position: 'relative',
              width: '42px',
              height: '22px',
              background: isConversionEnabled ? 'var(--color-primary)' : '#cbd5e1',
              borderRadius: '9999px',
              transition: 'background var(--transition-fast)',
            }}
          >
            <input
              id="currency-conversion-toggle"
              type="checkbox"
              checked={isConversionEnabled}
              onChange={(e) => setIsConversionEnabled(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
              aria-label="Toggle real-time currency conversion"
            />
            <div
              style={{
                position: 'absolute',
                top: '2px',
                left: isConversionEnabled ? '22px' : '2px',
                width: '18px',
                height: '18px',
                background: '#ffffff',
                borderRadius: '50%',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                transition: 'left var(--transition-fast)',
              }}
            />
          </div>
        </label>
      </div>

      {/* Expanded Controls when conversion is ON */}
      {isConversionEnabled && (
        <div
          style={{
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* Target Currency Selector and Quick Chips */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 200px' }}>
              <label
                htmlFor="target-currency-select"
                style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-body)', whiteSpace: 'nowrap' }}
              >
                Convert to:
              </label>
              <select
                id="target-currency-select"
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="form-select"
                style={{
                  height: '32px',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '2px 28px 2px 10px',
                  borderRadius: 'var(--radius-sm)',
                  borderColor: 'var(--color-border)',
                  background: 'var(--color-white)',
                  minWidth: '180px',
                  maxWidth: '240px',
                }}
                aria-label="Select target local currency"
              >
                {SUPPORTED_CURRENCIES.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.flag} {curr.code} — {curr.name} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Currency Selection Chips */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginRight: '2px' }}>
                Quick:
              </span>
              {POPULAR_CURRENCIES.map((currCode) => {
                const info = getCurrencyInfo(currCode);
                const isSelected = targetCurrency === currCode;
                return (
                  <button
                    key={currCode}
                    type="button"
                    onClick={() => setTargetCurrency(currCode)}
                    style={{
                      fontSize: '11px',
                      fontWeight: isSelected ? 700 : 500,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-sm)',
                      background: isSelected ? 'var(--color-primary)' : 'var(--color-white)',
                      color: isSelected ? 'var(--color-white)' : 'var(--color-text-body)',
                      border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      transition: 'all var(--transition-fast)',
                    }}
                    title={`Convert to ${info.name}`}
                  >
                    <span>{info.flag}</span>
                    <span>{currCode}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Rate Status & Refresh Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--color-white)',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              fontSize: '12px',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Exchange Rate:</span>
              <strong style={{ color: 'var(--color-text-title)', fontSize: '13px' }}>
                {rateInfo.formattedRate}
              </strong>
              {rateInfo.isIdentity && (
                <span style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>
                  (Target matches marketplace native currency)
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                Updated: {formattedDate}
              </span>
              <button
                type="button"
                onClick={refreshRates}
                disabled={isLoadingRates}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--color-soft-gray)',
                  border: '1px solid var(--color-border)',
                  cursor: isLoadingRates ? 'not-allowed' : 'pointer',
                }}
                title="Refresh live exchange rates"
                aria-label="Refresh exchange rates"
              >
                <RefreshCw size={11} className={isLoadingRates ? 'animate-spin' : ''} />
                <span>{isLoadingRates ? 'Updating...' : 'Refresh'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  padding: '2px 6px',
                  cursor: 'pointer',
                }}
                title="Bank FX spread and fine-tuning options"
              >
                <SlidersHorizontal size={11} />
                <span>FX Spread</span>
                {showAdvanced ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            </div>
          </div>

          {/* Advanced / Bank FX Spread Options */}
          {showAdvanced && (
            <div
              style={{
                padding: '10px 12px',
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-sm)',
                border: '1px dashed var(--color-border)',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Info size={14} color="var(--color-text-muted)" />
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  Bank / Payment Processor FX Spread:
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <select
                  value={selectedSpread}
                  onChange={handleSpreadChange}
                  style={{
                    height: '28px',
                    fontSize: '12px',
                    borderRadius: 'var(--radius-xs)',
                    padding: '2px 8px',
                    borderColor: 'var(--color-border)',
                  }}
                  aria-label="Select FX Spread markup"
                >
                  <option value="0">Interbank Mid-Market (0% markup)</option>
                  <option value="-1.5">Credit Card / Wise (~1.5% spread)</option>
                  <option value="-2.0">Payoneer / Business Bank (~2.0% spread)</option>
                  <option value="-3.5">PayPal / High-Street Bank (~3.5% spread)</option>
                </select>
                {selectedSpread !== '0' && (
                  <span style={{ fontSize: '11px', color: 'var(--color-text-warning)', fontWeight: 600 }}>
                    Adjusted
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
