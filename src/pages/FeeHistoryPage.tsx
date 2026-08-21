import React from 'react';
import { FeeHistoryTimeline } from '../components/FeeHistory/FeeHistoryTimeline';
import { useSEO } from '../hooks/useSEO';
import { History, ArrowLeft } from 'lucide-react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const FeeHistoryPage: React.FC<PageProps> = ({ onNavigate }) => {
  useSEO({
    title: 'eBay Fee Policy History & Rate Archives (2020 – 2026)',
    description: 'Documented historical timeline of eBay final value fee increases, Managed Payments rollouts, insertion fee changes, and UK private seller zero-fee initiatives.',
    canonical: 'https://profitiq.app/ebay-fee-history',
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
            <History size={13} />
            <span>Policy Archives</span>
          </div>
          <h1 className="section-title">eBay Fee Policy History</h1>
          <p className="section-subtitle">
            Historical archive of fee structure revisions, Managed Payments migrations, and policy shifts across international marketplaces.
          </p>
        </div>

        <FeeHistoryTimeline />
      </div>
    </div>
  );
};
