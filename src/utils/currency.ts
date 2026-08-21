import { CountryCode } from '../types';
import { getCountryConfig } from '../data/fee-rules';

export function formatCurrency(amount: number, countryCode: CountryCode = 'US', showDecimals = true): string {
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
