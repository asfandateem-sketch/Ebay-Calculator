import { CountryCode } from '../types';

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  position: 'before' | 'after';
  decimalPlaces: number;
  countryName: string;
}

export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', position: 'before', decimalPlaces: 2, countryName: 'United States' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', position: 'before', decimalPlaces: 2, countryName: 'European Union' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', position: 'before', decimalPlaces: 2, countryName: 'United Kingdom' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', flag: '🇨🇦', position: 'before', decimalPlaces: 2, countryName: 'Canada' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', position: 'before', decimalPlaces: 2, countryName: 'Australia' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', position: 'before', decimalPlaces: 0, countryName: 'Japan' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', position: 'before', decimalPlaces: 2, countryName: 'China' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', position: 'before', decimalPlaces: 2, countryName: 'India' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', flag: '🇲🇽', position: 'before', decimalPlaces: 2, countryName: 'Mexico' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', position: 'before', decimalPlaces: 2, countryName: 'Brazil' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭', position: 'before', decimalPlaces: 2, countryName: 'Switzerland' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', position: 'before', decimalPlaces: 2, countryName: 'New Zealand' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', position: 'before', decimalPlaces: 2, countryName: 'Singapore' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', position: 'before', decimalPlaces: 2, countryName: 'Hong Kong' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', position: 'after', decimalPlaces: 2, countryName: 'Sweden' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', position: 'after', decimalPlaces: 2, countryName: 'Norway' },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł', flag: '🇵🇱', position: 'after', decimalPlaces: 2, countryName: 'Poland' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭', position: 'before', decimalPlaces: 2, countryName: 'Philippines' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', position: 'before', decimalPlaces: 2, countryName: 'South Africa' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', flag: '🇦🇪', position: 'before', decimalPlaces: 2, countryName: 'United Arab Emirates' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱', position: 'before', decimalPlaces: 2, countryName: 'Israel' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', position: 'before', decimalPlaces: 0, countryName: 'South Korea' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷', position: 'before', decimalPlaces: 2, countryName: 'Turkey' },
  { code: 'TWD', name: 'New Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼', position: 'before', decimalPlaces: 2, countryName: 'Taiwan' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', position: 'before', decimalPlaces: 2, countryName: 'Thailand' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳', position: 'after', decimalPlaces: 0, countryName: 'Vietnam' },
];

export const POPULAR_CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR'];

/**
 * Baseline fallback exchange rates against USD (1 USD = X Currency).
 * Updated with current interbank mid-market baseline reference rates.
 */
export const BASELINE_USD_EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.921,
  GBP: 0.768,
  CAD: 1.365,
  AUD: 1.518,
  JPY: 155.40,
  CNY: 7.245,
  INR: 83.65,
  MXN: 18.25,
  BRL: 5.48,
  CHF: 0.892,
  NZD: 1.642,
  SGD: 1.348,
  HKD: 7.812,
  SEK: 10.45,
  NOK: 10.62,
  PLN: 3.96,
  PHP: 58.40,
  ZAR: 18.15,
  AED: 3.6725,
  ILS: 3.72,
  KRW: 1375.0,
  TRY: 33.20,
  TWD: 32.40,
  THB: 36.50,
  VND: 25400.0,
};

/**
 * Maps a Marketplace CountryCode to its native currency code.
 */
export function getMarketplaceCurrencyCode(countryCode: CountryCode = 'US'): string {
  switch (countryCode) {
    case 'US':
      return 'USD';
    case 'UK':
      return 'GBP';
    case 'AU':
      return 'AUD';
    case 'CA':
      return 'CAD';
    case 'DE':
    case 'FR':
    case 'IT':
    case 'ES':
      return 'EUR';
    default:
      return 'USD';
  }
}

/**
 * Gets currency information for a given currency code.
 */
export function getCurrencyInfo(code: string): CurrencyInfo {
  const normalized = (code || 'USD').toUpperCase();
  const found = SUPPORTED_CURRENCIES.find((c) => c.code === normalized);
  if (found) return found;

  return {
    code: normalized,
    name: normalized,
    symbol: normalized,
    flag: '🌐',
    position: 'before',
    decimalPlaces: 2,
    countryName: normalized,
  };
}
