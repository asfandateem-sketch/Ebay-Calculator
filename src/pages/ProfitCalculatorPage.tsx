import React from 'react';
import { Calculator } from '../components/Calculator/Calculator';
import { TargetPricingTool } from '../components/PricingTools/TargetPricingTool';
import { BreakEvenTool } from '../components/PricingTools/BreakEvenTool';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { FAQSection } from '../components/FAQ/FAQSection';
import { TrendingUp, ArrowLeft, DollarSign } from 'lucide-react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const ProfitCalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { inputs, results, updateInput, setInputs } = useCalculator();

  useSEO({
    title: 'eBay Profit Calculator (2026) — Net Profit Margin & ROI Solver',
    description: 'Calculate your true net profit, ROI, and margins from eBay sales after subtracting inventory COGS, shipping label costs, packaging, and platform fees.',
    canonical: 'https://profitiq.app/ebay-profit-calculator',
  });

  return (
    <div style={{ paddingTop: '96px', paddingBottom: '96px', background: 'var(--color-white)' }}>
      <div className="container">
        <button
          type="button"
          className="nav-tag-pill"
          onClick={() => onNavigate('/')}
          style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={13} />
          <span>Home</span>
        </button>

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
