import React, { useState } from 'react';
import { ArticleList } from '../components/SellerGuides/ArticleList';
import { useSEO } from '../hooks/useSEO';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../hooks/useRouting';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const SellerGuidesPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useSEO({
    title: `eBay Seller Fee & Profit Intelligence Guides (2026) | ${SITE_CONFIG.name}`,
    description: `Expert mathematical breakdowns and actionable strategy guides on eBay final value fees, shipping margins, promoted ads ROI, and store subscriptions by ${SITE_CONFIG.name}.`,
    keywords: 'seller margin calculator guides, ebay seller guides, how to calculate ebay fees, ebay seller profit strategy, ebay fee reduction guide, ecommerce seller guides, ebay selling tactics 2026',
    canonical: '/ebay-seller-guides',
    schemaJson: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: `eBay Seller Fee & Profit Intelligence Guides — ${SITE_CONFIG.name}`,
          description: 'Definitive guides, mathematical proofs, and frameworks for managing eBay fees and maximizing net profit.',
          url: getCanonicalUrl('/ebay-seller-guides'),
          provider: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
            url: getCanonicalUrl('/'),
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: getCanonicalUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Seller Guides', item: getCanonicalUrl('/ebay-seller-guides') },
          ],
        },
      ],
    },
  });

  const categories = [
    { id: 'all', label: 'All Guides' },
    { id: 'fees', label: 'Fee Structures' },
    { id: 'profit', label: 'Profit & Margins' },
    { id: 'strategy', label: 'Pricing Strategy' },
  ];

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
            <BookOpen size={13} />
            <span>Knowledge Base</span>
          </div>
          <h1 className="section-title">eBay Seller Fee & Profit Guides</h1>
          <p className="section-subtitle">
            Definitive guides, mathematical proofs, and step-by-step frameworks for managing eBay fees and maximizing net profit.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={activeCategory === c.id ? 'btn-primary' : 'nav-tag-pill'}
              style={{ fontSize: '12px', padding: '6px 14px', minHeight: '32px' }}
              onClick={() => setActiveCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <ArticleList
          onSelectArticle={(slug) => onNavigate(`/articles/${slug}`)}
          categoryFilter={activeCategory === 'all' ? undefined : activeCategory}
        />
      </div>
    </div>
  );
};
