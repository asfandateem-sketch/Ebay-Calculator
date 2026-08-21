import React from 'react';
import { FeeComparisonMatrix } from '../components/FeeComparison/FeeComparisonMatrix';
import { CountryGrid } from '../components/CountrySelector/CountryGrid';
import { useSEO } from '../hooks/useSEO';
import { Layers, ArrowLeft } from 'lucide-react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const FeeComparisonPage: React.FC<PageProps> = ({ onNavigate }) => {
  useSEO({
    title: 'International eBay Fee Comparison Matrix (2026)',
    description: 'Compare eBay seller fee schedules across US, UK, Australia, Canada, Germany, France, Italy & Spain. Detailed breakdown of rates, fixed fees, and VAT.',
    canonical: 'https://profitiq.app/ebay-fee-comparison',
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
            <Layers size={13} />
            <span>Global Matrix</span>
          </div>
          <h1 className="section-title">International eBay Fee Comparison</h1>
          <p className="section-subtitle">
            Side-by-side fee schedule comparison across major international eBay marketplaces.
          </p>
        </div>

        <div style={{ marginBottom: '64px' }}>
          <FeeComparisonMatrix onSelectCountry={onNavigate} />
        </div>

        <CountryGrid onSelectCountry={onNavigate} />
      </div>
    </div>
  );
};
