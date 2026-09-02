import React from 'react';
import { TargetPricingTool } from '../components/PricingTools/TargetPricingTool';
import { Calculator } from '../components/Calculator/Calculator';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { FAQSection } from '../components/FAQ/FAQSection';
import { CalculatorExplainer } from '../components/SEO/CalculatorExplainer';
import { DollarSign, ArrowLeft } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../hooks/useRouting';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const PricingCalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { inputs, results, updateInput, setInputs } = useCalculator();

  useSEO({
    title: `eBay Pricing Calculator (2026) — Target Profit & Margin Price Solver | ${SITE_CONFIG.name}`,
    description: `Reverse-engineer the exact eBay listing price required to achieve your target profit margins or specific dollar return objectives after all fees with ${SITE_CONFIG.name}.`,
    keywords: 'seller margin calculator, ebay pricing calculator, how to price items on ebay, ebay target profit calculator, ebay selling price formula, target margin solver, markup calculator',
    canonical: '/ebay-pricing-calculator',
    schemaJson: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: `eBay Target Pricing Calculator — ${SITE_CONFIG.name}`,
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
            { '@type': 'ListItem', position: 3, name: 'eBay Pricing Calculator', item: getCanonicalUrl('/ebay-pricing-calculator') },
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
            <DollarSign size={13} />
            <span>Target Price Solver</span>
          </div>
          <h1 className="section-title">eBay Target Pricing Calculator</h1>
          <p className="section-subtitle">
            Set your desired dollar profit or target margin percentage. {SITE_CONFIG.name} solves the exact listing price required to clear all platform fees.
          </p>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <TargetPricingTool inputs={inputs} onUpdateInput={updateInput} />
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

        <CalculatorExplainer type="pricing" onNavigate={onNavigate} />
        <FAQSection />
      </div>
    </div>
  );
};
