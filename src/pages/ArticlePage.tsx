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
    title: `${article.metaTitle || article.title} | ${SITE_CONFIG.name}`,
    description: article.metaDescription || article.directAnswer.slice(0, 160),
    keywords: `seller margin calculator, ${article.title.toLowerCase()}, ebay seller guide, ${article.category} ebay, calculate ebay fees, ebay seller strategies 2026`,
    canonical: `/articles/${article.slug}`,
    ogType: 'article',
    schemaJson: {
      '@context': 'https://schema.org',
      '@graph': [
        {
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
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: getCanonicalUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Seller Guides', item: getCanonicalUrl('/ebay-seller-guides') },
            { '@type': 'ListItem', position: 3, name: article.title, item: getCanonicalUrl(`/articles/${article.slug}`) },
          ],
        },
      ],
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
