import React from 'react';
import { FeeComparisonMatrix } from '../components/FeeComparison/FeeComparisonMatrix';
import { CountryGrid } from '../components/CountrySelector/CountryGrid';
import { useSEO } from '../hooks/useSEO';
import { Layers, ArrowLeft } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../hooks/useRouting';

interface PageProps {
  onNavigate?: (path: string) => void;
}

export const FeeComparisonPage: React.FC<PageProps> = () => {
  useSEO({
    title: `International eBay Fee Comparison Matrix (2026) | ${SITE_CONFIG.name}`,
    description: 'Compare eBay seller fee schedules across US, UK, Australia, Canada, Germany, France, Italy & Spain. Detailed breakdown of rates, fixed fees, and VAT.',
    keywords: 'ebay fee comparison, compare ebay fees international, ebay selling fees by country, ebay global marketplace fees',
    canonical: '/ebay-fee-comparison',
    schemaJson: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: 'International eBay Fee Comparison Matrix',
          description: 'Side-by-side fee schedule comparison across major international eBay marketplaces.',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: getCanonicalUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Fee Comparison', item: getCanonicalUrl('/ebay-fee-comparison') },
          ],
        },
      ],
    },
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
            <Layers size={13} />
            <span>Global Matrix</span>
          </div>
          <h1 className="section-title">International eBay Fee Comparison</h1>
          <p className="section-subtitle">
            Side-by-side fee schedule comparison across major international eBay marketplaces.
          </p>
        </div>

        <div style={{ marginBottom: '64px' }}>
          <FeeComparisonMatrix />
        </div>

        <CountryGrid />
      </div>
    </div>
  );
};
