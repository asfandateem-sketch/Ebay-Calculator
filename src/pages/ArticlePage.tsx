import React from 'react';
import { getArticleBySlug } from '../data/articles';
import { ArticleDetail } from '../components/SellerGuides/ArticleDetail';
import { useSEO } from '../hooks/useSEO';
import { NotFoundPage } from './NotFoundPage';

interface ArticlePageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ slug, onNavigate }) => {
  const article = getArticleBySlug(slug);

  if (!article) {
    return <NotFoundPage onNavigate={onNavigate} />;
  }

  useSEO({
    title: `${article.title} — ProfitIQ`,
    description: article.directAnswer.slice(0, 160),
    canonical: `https://profitiq.app/articles/${article.slug}`,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.directAnswer,
      datePublished: '2026-01-15',
      dateModified: article.lastUpdated,
      author: {
        '@type': 'Organization',
        name: 'ProfitIQ Intelligence Team',
        url: 'https://profitiq.app',
      },
      publisher: {
        '@type': 'Organization',
        name: 'ProfitIQ',
        url: 'https://profitiq.app',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://profitiq.app/articles/${article.slug}`,
      },
    },
  });

  return (
    <div style={{ paddingTop: '96px', paddingBottom: '96px', background: 'var(--color-white)' }}>
      <div className="container">
        <ArticleDetail
          article={article}
          onBack={() => onNavigate('/ebay-seller-guides')}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};
