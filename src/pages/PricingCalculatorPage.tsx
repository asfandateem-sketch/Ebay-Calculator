import React from 'react';
import { TargetPricingTool } from '../components/PricingTools/TargetPricingTool';
import { Calculator } from '../components/Calculator/Calculator';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { FAQSection } from '../components/FAQ/FAQSection';
import { DollarSign, ArrowLeft } from 'lucide-react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const PricingCalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { inputs, results, updateInput, setInputs } = useCalculator();

  useSEO({
    title: 'eBay Pricing Calculator — Solve Target Profit & Margin Selling Prices',
    description: 'Reverse-engineer the optimal eBay listing price to hit your target profit margins (e.g. 25%, 35%) or specific dollar return objectives.',
    canonical: 'https://profitiq.app/ebay-pricing-calculator',
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
            <DollarSign size={13} />
            <span>Target Price Solver</span>
          </div>
          <h1 className="section-title">eBay Target Pricing Calculator</h1>
          <p className="section-subtitle">
            Set your desired dollar profit or target margin percentage. ProfitIQ solves the exact listing price required to clear all platform fees.
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

        <FAQSection />
      </div>
    </div>
  );
};
