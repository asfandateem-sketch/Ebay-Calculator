import React from 'react';
import { ArrowRight, Globe, ShieldCheck } from 'lucide-react';
import { RouterLink } from '../RouterLink';
import { trackEvent } from '../../utils/analytics';
import { CountryFlag } from './CountryFlag';

interface CountryGridProps {
  onSelectCountry?: (path: string) => void;
}

export const ALL_8_MARKETPLACES = [
  {
    code: 'US',
    name: 'United States',
    fullName: 'United States',
    flag: '🇺🇸',
    currency: 'USD ($)',
    currencySymbol: '$',
    path: '/us',
    domain: 'ebay.com',
    standardRate: '13.25% + $0.30',
    taxNote: 'Sales Tax Auto-Collected',
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    fullName: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP (£)',
    currencySymbol: '£',
    path: '/uk',
    domain: 'ebay.co.uk',
    standardRate: '0% Private / 11.9%–14.9% Business',
    taxNote: '20% VAT on Fees',
  },
  {
    code: 'CA',
    name: 'Canada',
    fullName: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD (CA$)',
    currencySymbol: 'CA$',
    path: '/ca',
    domain: 'ebay.ca',
    standardRate: '13.25% + $0.40 CAD',
    taxNote: 'GST/HST/PST Supported',
  },
  {
    code: 'AU',
    name: 'Australia',
    fullName: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD (A$)',
    currencySymbol: 'A$',
    path: '/au',
    domain: 'ebay.com.au',
    standardRate: '0% Casual / 11.5%–13.5% Store',
    taxNote: '10% GST on Fees',
  },
  {
    code: 'DE',
    name: 'Germany',
    fullName: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR (€)',
    currencySymbol: '€',
    path: '/de',
    domain: 'ebay.de',
    standardRate: '0% Private / 6.5%–12% Commercial',
    taxNote: '19% German MwSt (VAT)',
  },
  {
    code: 'FR',
    name: 'France',
    fullName: 'France',
    flag: '🇫🇷',
    currency: 'EUR (€)',
    currencySymbol: '€',
    path: '/fr',
    domain: 'ebay.fr',
    standardRate: '6.5%–12% + 0.42% Reg Fee',
    taxNote: '20% French TVA (VAT)',
  },
  {
    code: 'IT',
    name: 'Italy',
    fullName: 'Italy',
    flag: '🇮🇹',
    currency: 'EUR (€)',
    currencySymbol: '€',
    path: '/it',
    domain: 'ebay.it',
    standardRate: '6.5%–12% + 0.42% Reg Fee',
    taxNote: '22% Italian IVA (VAT)',
  },
  {
    code: 'ES',
    name: 'Spain',
    fullName: 'Spain',
    flag: '🇪🇸',
    currency: 'EUR (€)',
    currencySymbol: '€',
    path: '/es',
    domain: 'ebay.es',
    standardRate: '6.5%–12% + 0.42% Reg Fee',
    taxNote: '21% Spanish IVA (VAT)',
  },
];

export const CountryGrid: React.FC<CountryGridProps> = () => {
  return (
    <section id="international-marketplaces-section" style={{ padding: '80px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        <div className="section-header-centered">
          <div className="section-eyebrow">
            <Globe size={13} />
            <span>8 Global Marketplaces</span>
          </div>
          <h2 className="section-title">International Marketplace Calculators (2026 Rules)</h2>
          <p className="section-subtitle">
            Every marketplace operates under localized fee schedules, VAT/GST rules, currency brackets, and category structures. Select your regional selling hub:
          </p>
        </div>

        <div className="country-grid">
          {ALL_8_MARKETPLACES.map((item) => {
            return (
              <RouterLink
                key={item.code}
                id={`country-card-${item.code.toLowerCase()}`}
                to={item.path}
                className="country-card"
                onClick={() => trackEvent('marketplace_selected', { country: item.code, selection_source: 'country_grid' })}
              >
                <div className="country-card-header-row">
                  <CountryFlag
                    code={item.code}
                    width={22}
                    height={16}
                    ariaLabel={`${item.name} flag`}
                  />
                  <span className="country-card-name">{item.name}</span>
                </div>
                <div className="country-card-rate">
                  <strong>{item.currency}</strong> • {item.standardRate}
                </div>
                <div className="country-card-tax-note">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>{item.taxNote}</span>
                </div>
                <div className="country-card-link">
                  <span>Open {item.name} Calculator</span>
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
