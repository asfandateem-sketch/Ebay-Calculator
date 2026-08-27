import React from 'react';
import { CountryCode } from '../types';
import { getCountryConfig } from '../data/fee-rules';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { Calculator } from '../components/Calculator/Calculator';
import { BreakEvenTool } from '../components/PricingTools/BreakEvenTool';
import { FeeComparisonMatrix } from '../components/FeeComparison/FeeComparisonMatrix';
import { FAQSection } from '../components/FAQ/FAQSection';
import { ShieldCheck, ExternalLink, Globe, ArrowLeft } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { getCanonicalUrl } from '../hooks/useRouting';

interface CountryCalculatorPageProps {
  countryCode: CountryCode;
  onNavigate: (path: string) => void;
}

export const CountryCalculatorPage: React.FC<CountryCalculatorPageProps> = ({ countryCode, onNavigate }) => {
  const config = getCountryConfig(countryCode);
  const { inputs, results, updateInput, setInputs } = useCalculator(countryCode);

  const countryMetaMap: Record<CountryCode, { title: string; description: string; canonical: string; h1: string }> = {
    US: {
      title: 'United States eBay Fee Calculator (2026) — ebay.com Profit Solver',
      description: 'Calculate accurate 2026 eBay US seller fees, managed payments (13.25% + $0.30), category tiers, store subscription discounts, sales tax, and net profit.',
      canonical: '/us',
      h1: 'United States eBay Fee Calculator (2026)',
    },
    UK: {
      title: 'UK eBay Fee Calculator (2026) — eBay.co.uk Seller Profit Calculator',
      description: 'Calculate exact 2026 eBay UK seller fees, private seller 0% final value fees, business rates (11.9%–14.9%), 20% VAT on fees, regulatory fees, and net profit in GBP (£).',
      canonical: '/uk',
      h1: 'UK eBay Fee Calculator (2026)',
    },
    AU: {
      title: 'Australia eBay Fee Calculator (2026) — eBay.com.au Seller Calculator',
      description: 'Calculate 2026 eBay Australia seller fees, casual seller 0% fees, commercial store plans, 10% GST on fees, and take-home net profit in AUD (A$).',
      canonical: '/au',
      h1: 'Australia eBay Fee Calculator (2026)',
    },
    CA: {
      title: 'Canada eBay Fee Calculator (2026) — eBay.ca Seller Profit Calculator',
      description: 'Calculate 2026 eBay Canada seller final value fees, store discounts, GST/HST on fees, promoted listings, and net seller margin in CAD (C$).',
      canonical: '/ca',
      h1: 'Canada eBay Fee Calculator (2026)',
    },
    DE: {
      title: 'Germany eBay Fee Calculator (2026) — eBay.de Seller Fee Calculator',
      description: 'Calculate 2026 eBay Germany (eBay.de) seller fees, private seller 0% zero-fee rules, commercial tiered rates, 19% VAT on fees, and net profit in EUR (€).',
      canonical: '/de',
      h1: 'Germany eBay Fee Calculator (2026)',
    },
    FR: {
      title: 'France eBay Fee Calculator (2026) — eBay.fr Seller Fee Calculator',
      description: 'Calculate 2026 eBay France (eBay.fr) seller fees, 0.42% digital services regulatory fee, 20% VAT on fees, category commissions, and net profit in EUR (€).',
      canonical: '/fr',
      h1: 'France eBay Fee Calculator (2026)',
    },
    IT: {
      title: 'Italy eBay Fee Calculator (2026) — eBay.it Seller Fee Calculator',
      description: 'Calculate 2026 eBay Italy (eBay.it) seller fees, 0.42% regulatory fee, 22% Italian VAT on fees, store subscription rates, and take-home profit in EUR (€).',
      canonical: '/it',
      h1: 'Italy eBay Fee Calculator (2026)',
    },
    ES: {
      title: 'Spain eBay Fee Calculator (2026) — eBay.es Seller Fee Calculator',
      description: 'Calculate 2026 eBay Spain (eBay.es) seller fees, 0.42% regulatory operating fee, 21% Spanish IVA on fees, category tiers, and net profit in EUR (€).',
      canonical: '/es',
      h1: 'Spain eBay Fee Calculator (2026)',
    },
  };

  const meta = countryMetaMap[countryCode] || countryMetaMap.US;

  useSEO({
    title: meta.title,
    description: meta.description,
    canonical: meta.canonical,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: meta.title,
      description: meta.description,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: getCanonicalUrl('/') },
          { '@type': 'ListItem', position: 2, name: `${config.name} Calculator`, item: getCanonicalUrl(meta.canonical) },
        ],
      },
    },
  });

  return (
    <div style={{ paddingTop: '96px', paddingBottom: '96px', background: 'var(--color-white)' }}>
      <div className="container">
        {/* Back Link */}
        <RouterLink
          to="/"
          className="nav-tag-pill"
          style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={13} />
          <span>Back to Global Overview</span>
        </RouterLink>

        {/* Page Header */}
        <div style={{ marginBottom: '40px' }}>
          <div className="section-eyebrow">
            <span style={{ fontSize: '14px' }}>{config.flag}</span>
            <span>{config.domain} Hub</span>
          </div>
          <h1 className="section-title">
            {meta.h1}
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '800px' }}>
            Calculate accurate eBay {config.name} seller fees, final value rates, {config.vatName}, store subscription discounts, and net profits in {config.currency.code} ({config.currency.symbol}).
          </p>
        </div>

        {/* Calculator Component */}
        <div style={{ marginBottom: '64px' }}>
          <Calculator
            inputs={inputs}
            results={results}
            onUpdateInput={updateInput}
            onSetInputs={setInputs}
            onNavigate={onNavigate}
          />
        </div>

        {/* Category Fee Table for this country */}
        <div className="calc-card" style={{ marginBottom: '48px' }}>
          <div className="calc-card-header">
            <div className="calc-title-badge">
              <Globe size={18} color="var(--color-primary)" />
              <div>
                <h2 className="calc-title" style={{ fontSize: '18px', fontWeight: 600 }}>eBay {config.name} Category Fee Schedule</h2>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  Standard vs Store Subscription Final Value Rates
                </p>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Verified: <strong>{config.lastVerified}</strong>
            </div>
          </div>

          <div className="table-responsive-wrapper">
            <table className="table-comparison">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Standard Rate</th>
                  <th>Store Rate</th>
                  <th>Fixed Fee</th>
                  <th>Policy Notes</th>
                </tr>
              </thead>
              <tbody>
                {config.categories.map((cat) => (
                  <tr key={cat.id}>
                    <td><strong>{cat.name}</strong></td>
                    <td>{(cat.standardRate * 100).toFixed(2)}%</td>
                    <td>{cat.storeRate !== undefined ? `${(cat.storeRate * 100).toFixed(2)}%` : 'Standard'}</td>
                    <td>{config.currency.symbol}{cat.fixedFee.toFixed(2)}</td>
                    <td style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{cat.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Official Source Banner */}
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: 'var(--color-soft-gray)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '13px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} />
              <span>Official Reference: <strong>{config.officialSource}</strong></span>
            </div>
            <a
              href={config.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: 'var(--color-primary)' }}
            >
              <span>View Official eBay Docs</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Break-Even Sensitivity for this country */}
        <div style={{ marginBottom: '48px' }}>
          <BreakEvenTool inputs={inputs} onUpdateInput={updateInput} />
        </div>

        {/* Global Comparison */}
        <div style={{ marginBottom: '48px' }}>
          <FeeComparisonMatrix onSelectCountry={onNavigate} />
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
};
