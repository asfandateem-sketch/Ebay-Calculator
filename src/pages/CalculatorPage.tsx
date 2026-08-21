import React from 'react';
import { Calculator } from '../components/Calculator/Calculator';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { CountryGrid } from '../components/CountrySelector/CountryGrid';
import { FAQSection } from '../components/FAQ/FAQSection';
import { Calculator as CalcIcon, ArrowLeft } from 'lucide-react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const CalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { inputs, results, updateInput, setInputs } = useCalculator();

  useSEO({
    title: 'eBay Fee Calculator (2026) — Calculate Exact Seller Final Value Fees',
    description: 'Free eBay Fee Calculator for online sellers. Calculate accurate final value fees, fixed charges, promoted ad spend, and sales tax across all product categories.',
    canonical: 'https://profitiq.app/ebay-fee-calculator',
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

        <CountryGrid onSelectCountry={onNavigate} />
        <FAQSection />
      </div>
    </div>
  );
};
