import React from 'react';
import { Calculator } from '../components/Calculator/Calculator';
import { TargetPricingTool } from '../components/PricingTools/TargetPricingTool';
import { BreakEvenTool } from '../components/PricingTools/BreakEvenTool';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { FAQSection } from '../components/FAQ/FAQSection';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { SITE_CONFIG } from '../config/site';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const ProfitCalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { inputs, results, updateInput, setInputs } = useCalculator();

  useSEO({
    title: `eBay Profit Calculator (2026) — Net Profit Margin & ROI Solver | ${SITE_CONFIG.name}`,
    description: 'Calculate your true net profit, ROI, and margins from eBay sales after subtracting inventory COGS, shipping label costs, packaging, and platform fees.',
    canonical: '/ebay-profit-calculator',
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

        <FAQSection />
      </div>
    </div>
  );
};
