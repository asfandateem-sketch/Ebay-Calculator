import React from 'react';
import { BreakEvenTool } from '../components/PricingTools/BreakEvenTool';
import { Calculator } from '../components/Calculator/Calculator';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { FAQSection } from '../components/FAQ/FAQSection';
import { Target, ArrowLeft } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { SITE_CONFIG } from '../config/site';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const BreakEvenPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { inputs, results, updateInput, setInputs } = useCalculator();

  useSEO({
    title: `eBay Break-Even Calculator — Find Your Minimum Selling Floor Price | ${SITE_CONFIG.name}`,
    description: 'Calculate the exact minimum listing price needed on eBay to avoid losses. Features complete price sensitivity curves and fee tier math.',
    canonical: '/ebay-break-even-calculator',
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

        <FAQSection />
      </div>
    </div>
  );
};
