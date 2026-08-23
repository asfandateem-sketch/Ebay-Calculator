import React from 'react';
import { Calculator } from '../components/Calculator/Calculator';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { CountryGrid } from '../components/CountrySelector/CountryGrid';
import { FAQSection } from '../components/FAQ/FAQSection';
import { Calculator as CalcIcon, ArrowLeft } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { SITE_CONFIG } from '../config/site';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const CalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { inputs, results, updateInput, setInputs } = useCalculator();

  useSEO({
    title: `eBay Fee Calculator (2026) — Calculate Seller Final Value Fees | ${SITE_CONFIG.name}`,
    description: 'Free eBay Fee Calculator for online sellers. Calculate estimated final value fees, fixed charges, promoted ad spend, and sales tax across product categories based on published schedules.',
    canonical: '/ebay-fee-calculator',
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

        <CountryGrid onSelectCountry={onNavigate} />
        <FAQSection />
      </div>
    </div>
  );
};
