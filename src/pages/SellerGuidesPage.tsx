import React, { useState } from 'react';
import { ArticleList } from '../components/SellerGuides/ArticleList';
import { useSEO } from '../hooks/useSEO';
import { BookOpen, ArrowLeft, Filter } from 'lucide-react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const SellerGuidesPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useSEO({
    title: 'eBay Seller Fee & Profit Intelligence Guides (2026)',
    description: 'Expert mathematical breakdowns and actionable strategy guides on eBay final value fees, shipping margins, promoted ads ROI, and store subscriptions.',
    canonical: 'https://profitiq.app/ebay-seller-guides',
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
