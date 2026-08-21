import React from 'react';
import { PromotedListingsTool } from '../components/PricingTools/PromotedListingsTool';
import { Calculator } from '../components/Calculator/Calculator';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { FAQSection } from '../components/FAQ/FAQSection';
import { TrendingUp, ArrowLeft } from 'lucide-react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const PromotedListingsPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { inputs, results, updateInput, setInputs } = useCalculator();

  useSEO({
    title: 'eBay Promoted Listings Calculator — Ad Rate & ROAS Optimizer',
    description: 'Calculate eBay Promoted Listings Standard ad fees, evaluate margin impact across ad rates (2% - 15%), and compute required sales velocity multipliers.',
    canonical: 'https://profitiq.app/ebay-promoted-listings-calculator',
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
            <span>Ad Optimization</span>
          </div>
          <h1 className="section-title">eBay Promoted Listings Calculator</h1>
          <p className="section-subtitle">
            Optimize your advertising spend. Model ad rate scenarios to identify the sweet spot between visibility gains and margin erosion.
          </p>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <PromotedListingsTool inputs={inputs} onUpdateInput={updateInput} />
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
