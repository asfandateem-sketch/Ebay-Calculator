import { CountryCode, CountryConfig } from '../../types';
import { usFeeConfig } from './us';
import { ukFeeConfig } from './uk';
import { auFeeConfig } from './au';
import { caFeeConfig } from './ca';
import { deFeeConfig, frFeeConfig, itFeeConfig, esFeeConfig } from './de';

export const countryFeeConfigs: Record<CountryCode, CountryConfig> = {
  US: usFeeConfig,
  UK: ukFeeConfig,
  AU: auFeeConfig,
  CA: caFeeConfig,
  DE: deFeeConfig,
  FR: frFeeConfig,
  IT: itFeeConfig,
  ES: esFeeConfig,
};

export const allCountryCodes: CountryCode[] = ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'ES'];

export function getCountryConfig(code: CountryCode): CountryConfig {
  return countryFeeConfigs[code] || usFeeConfig;
}

export function getCountryByDomainOrSlug(slugOrCode: string): CountryConfig {
  const normalized = slugOrCode.toLowerCase().replace('-ebay-calculator', '').replace('-calculator', '');
  const match = Object.values(countryFeeConfigs).find(
    (c) => c.code.toLowerCase() === normalized || c.name.toLowerCase() === normalized || c.code.toLowerCase() === slugOrCode.toLowerCase()
  );
  return match || usFeeConfig;
}
