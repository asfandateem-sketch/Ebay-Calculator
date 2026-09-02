import React from 'react';
import { Calculator } from '../components/Calculator/Calculator';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { CountryGrid } from '../components/CountrySelector/CountryGrid';
import { FAQSection } from '../components/FAQ/FAQSection';
import { CalculatorExplainer } from '../components/SEO/CalculatorExplainer';
import { Calculator as CalcIcon, ArrowLeft } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../hooks/useRouting';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const CalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { inputs, results, updateInput, setInputs } = useCalculator();

  useSEO({
    title: `eBay Fee Calculator (2026 Free) — Calculate Seller Final Value Fees | ${SITE_CONFIG.name}`,
    description: `Free 2026 eBay Fee Calculator for online sellers by ${SITE_CONFIG.name}. Calculate accurate final value fees, managed payment rates ($0.30-$0.40), category tiers, store discounts, promoted ads, and sales tax across 8 marketplaces.`,
    keywords: 'seller margin calculator, ebay fee calculator 2026, calculate ebay selling fees, ebay final value fee calculator, ebay store fee discount, ebay managed payments calculator, ebay seller profit calculator',
    canonical: '/ebay-fee-calculator',
    schemaJson: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: `eBay Fee Calculator 2026 — ${SITE_CONFIG.name}`,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'All',
          provider: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
            url: getCanonicalUrl('/'),
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: getCanonicalUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Calculators', item: getCanonicalUrl('/calculators') },
            { '@type': 'ListItem', position: 3, name: 'eBay Fee Calculator', item: getCanonicalUrl('/ebay-fee-calculator') },
          ],
        },
      ],
    },
  });

  return (
    <div style={{ paddingTop: '96px', paddingBottom: '96px', background: 'var(--color-white)' }}>
      <div className="container">
        <RouterLink
          to="/"
          className="nav-tag-pill"
          style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={13} />
          <span>Home</span>
        </RouterLink>

        <div style={{ marginBottom: '36px' }}>
          <div className="section-eyebrow">
            <CalcIcon size={13} />
            <span>Dedicated Fee Engine</span>
          </div>
          <h1 className="section-title">eBay Fee Calculator</h1>
          <p className="section-subtitle">
            Calculate accurate eBay final value fees, payment processing, promoted listing rates, and shipping margins.
          </p>
        </div>

        <div style={{ marginBottom: '64px' }}>
          <Calculator
            inputs={inputs}
            results={results}
            onUpdateInput={updateInput}
            onSetInputs={setInputs}
            onNavigate={onNavigate}
          />
        </div>

        <CalculatorExplainer type="fee" onNavigate={onNavigate} />
        <CountryGrid onSelectCountry={onNavigate} />
        <FAQSection />
      </div>
    </div>
  );
};
