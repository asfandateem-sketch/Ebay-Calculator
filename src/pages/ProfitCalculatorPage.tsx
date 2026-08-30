import React from 'react';
import { Calculator } from '../components/Calculator/Calculator';
import { TargetPricingTool } from '../components/PricingTools/TargetPricingTool';
import { BreakEvenTool } from '../components/PricingTools/BreakEvenTool';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { FAQSection } from '../components/FAQ/FAQSection';
import { CalculatorExplainer } from '../components/SEO/CalculatorExplainer';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../hooks/useRouting';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const ProfitCalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { inputs, results, updateInput, setInputs } = useCalculator();

  useSEO({
    title: `eBay Profit Calculator (2026 Free) — Net Profit Margin & ROI Solver | ${SITE_CONFIG.name}`,
    description: 'Calculate true eBay net profit, take-home earnings, margin percentages, and return on investment (ROI) after subtracting item COGS, shipping labels, and selling fees.',
    keywords: 'ebay profit calculator, calculate ebay profit, ebay profit margin calculator, ebay roi calculator, calculate net earnings on ebay',
    canonical: '/ebay-profit-calculator',
    schemaJson: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'eBay Profit & Margin Calculator',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'All',
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
            { '@type': 'ListItem', position: 2, name: 'eBay Profit Calculator', item: getCanonicalUrl('/ebay-profit-calculator') },
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
            <TrendingUp size={13} />
            <span>Profit Intelligence</span>
          </div>
          <h1 className="section-title">eBay Profit & Margin Calculator</h1>
          <p className="section-subtitle">
            Understand your true take-home earnings. Compute exact net profit margins, return on investment (ROI), and cash flow after all platform deductions.
          </p>
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

        <div style={{ marginBottom: '48px' }}>
          <TargetPricingTool inputs={inputs} onUpdateInput={updateInput} />
        </div>

        <div style={{ marginBottom: '48px' }}>
          <BreakEvenTool inputs={inputs} onUpdateInput={updateInput} />
        </div>

        <CalculatorExplainer type="profit" onNavigate={onNavigate} />
        <FAQSection />
      </div>
    </div>
  );
};
