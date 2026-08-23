import React from 'react';
import { getArticleBySlug } from '../data/articles';
import { ArticleDetail } from '../components/SellerGuides/ArticleDetail';
import { useSEO } from '../hooks/useSEO';
import { NotFoundPage } from './NotFoundPage';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../hooks/useRouting';

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
    title: `${article.title} — ${SITE_CONFIG.name}`,
    description: article.directAnswer.slice(0, 160),
    canonical: `/articles/${article.slug}`,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.directAnswer,
      datePublished: '2026-01-15',
      dateModified: article.lastUpdated,
      author: {
        '@type': 'Organization',
        name: `${SITE_CONFIG.name} Research Team`,
        url: getCanonicalUrl('/'),
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        url: getCanonicalUrl('/'),
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': getCanonicalUrl(`/articles/${article.slug}`),
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
