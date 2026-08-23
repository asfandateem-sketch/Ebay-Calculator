import React from 'react';
import { allCountryCodes, getCountryConfig } from '../../data/fee-rules';
import { ArrowRight, Globe } from 'lucide-react';
import { RouterLink } from '../RouterLink';

interface CountryGridProps {
  onSelectCountry?: (path: string) => void;
}

export const CountryGrid: React.FC<CountryGridProps> = () => {
  const countryUrls: Record<string, string> = {
    US: '/usa-ebay-calculator',
    UK: '/uk-ebay-calculator',
    AU: '/australia-ebay-calculator',
    CA: '/canada-ebay-calculator',
    DE: '/germany-ebay-calculator',
    FR: '/france-ebay-calculator',
    IT: '/italy-ebay-calculator',
    ES: '/spain-ebay-calculator',
  };

  return (
    <section id="international-marketplaces-section" style={{ padding: '80px 0', background: 'var(--color-white)' }}>
      <div className="container">
        <div className="section-header-centered">
          <div className="section-eyebrow">
            <Globe size={13} />
            <span>Global Coverage</span>
          </div>
          <h2 className="section-title">International eBay Fee Calculators</h2>
          <p className="section-subtitle">
            Every marketplace operates under localized fee schedules, VAT/GST rules, and category structures. Select your regional selling hub:
          </p>
        </div>

        <div className="country-grid">
          {allCountryCodes.map((code) => {
            const config = getCountryConfig(code);
            const path = countryUrls[code] || '/';
            return (
              <RouterLink
                key={code}
                id={`country-card-${code.toLowerCase()}`}
                to={path}
                className="country-card"
              >
                <div className="country-card-flag">{config.flag}</div>
                <div className="country-card-name">{config.name}</div>
                <div className="country-card-rate">
                  Base rate: ~{(config.defaultStandardRate * 100).toFixed(1)}% ({config.currency.symbol})
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
                  {config.vatName} supported
                </div>
                <div className="country-card-link">
                  <span>Open {config.name} Hub</span>
                  <ArrowRight size={13} />
                </div>
              </RouterLink>
            );
          })}
        </div>
      </div>
    </section>
  );
};
