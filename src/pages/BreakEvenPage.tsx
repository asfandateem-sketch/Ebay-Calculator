import React from 'react';
import { BreakEvenTool } from '../components/PricingTools/BreakEvenTool';
import { Calculator } from '../components/Calculator/Calculator';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { FAQSection } from '../components/FAQ/FAQSection';
import { CalculatorExplainer } from '../components/SEO/CalculatorExplainer';
import { Target, ArrowLeft } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../hooks/useRouting';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const BreakEvenPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { inputs, results, updateInput, setInputs } = useCalculator();

  useSEO({
    title: `eBay Break-Even Calculator (2026) — Find Your Minimum Floor Price | ${SITE_CONFIG.name}`,
    description: `Calculate the exact minimum selling price needed on eBay to avoid losses and break even ($0.00 net profit) with ${SITE_CONFIG.name}. Complete with category fee math and shipping label costs.`,
    keywords: 'seller margin calculator, ebay break even calculator, calculate ebay break even price, minimum selling price ebay, ebay floor price calculator, zero loss price solver',
    canonical: '/ebay-break-even-calculator',
    schemaJson: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: `eBay Break-Even Calculator — ${SITE_CONFIG.name}`,
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
            { '@type': 'ListItem', position: 3, name: 'eBay Break-Even Calculator', item: getCanonicalUrl('/ebay-break-even-calculator') },
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
            <Target size={13} />
            <span>Floor Price Analysis</span>
          </div>
          <h1 className="section-title">eBay Break-Even Price Calculator</h1>
          <p className="section-subtitle">
            Never accept a losing offer. Find your exact zero-profit break-even price across categories, store subscriptions, and shipping configurations.
          </p>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <BreakEvenTool inputs={inputs} onUpdateInput={updateInput} />
        </div>

        <div style={{ marginBottom: '48px' }}>
          <Calculator
            inputs={inputs}
            results={results}
            onUpdateInput={updateInput}
            onSetInputs={setInputs}
            onNavigate={onNavigate}
          />
        </div>

        <CalculatorExplainer type="breakeven" onNavigate={onNavigate} />
        <FAQSection />
      </div>
    </div>
  );
};
