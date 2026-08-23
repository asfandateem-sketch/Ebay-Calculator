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

  const countrySlugMap: Record<CountryCode, string> = {
    US: 'usa-ebay-calculator',
    UK: 'uk-ebay-calculator',
    AU: 'australia-ebay-calculator',
    CA: 'canada-ebay-calculator',
    DE: 'germany-ebay-calculator',
    FR: 'france-ebay-calculator',
    IT: 'italy-ebay-calculator',
    ES: 'spain-ebay-calculator',
  };

  const pageSlug = countrySlugMap[countryCode] || 'usa-ebay-calculator';

  useSEO({
    title: `${config.name} eBay Fee Calculator (2026) — ${config.domain} Profit Solver`,
    description: `Accurate 2026 eBay ${config.name} fee & profit calculator. Calculate ${config.currency.code} final value fees, ${config.vatName}, store plans, and net margins.`,
    canonical: `/${pageSlug}`,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${config.name} eBay Fee Calculator`,
      description: `Verified 2026 fee calculation tool for eBay ${config.name} sellers.`,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: getCanonicalUrl('/') },
          { '@type': 'ListItem', position: 2, name: `${config.name} Calculator`, item: getCanonicalUrl(`/${pageSlug}`) },
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
            eBay {config.name} Fee Calculator & Profit Analysis
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
                <h3 className="calc-title">eBay {config.name} Category Fee Schedule</h3>
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
