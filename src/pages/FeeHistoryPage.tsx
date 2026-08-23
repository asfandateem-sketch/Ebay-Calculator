import React from 'react';
import { FeeHistoryTimeline } from '../components/FeeHistory/FeeHistoryTimeline';
import { useSEO } from '../hooks/useSEO';
import { History, ArrowLeft } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { SITE_CONFIG } from '../config/site';

interface PageProps {
  onNavigate?: (path: string) => void;
}

export const FeeHistoryPage: React.FC<PageProps> = () => {
  useSEO({
    title: `eBay Fee Policy History & Rate Archives (2020 – 2026) | ${SITE_CONFIG.name}`,
    description: 'Documented historical timeline of eBay final value fee increases, Managed Payments rollouts, insertion fee changes, and UK private seller zero-fee initiatives.',
    canonical: '/ebay-fee-history',
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
