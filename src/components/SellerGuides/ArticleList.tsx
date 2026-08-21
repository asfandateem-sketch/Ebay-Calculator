import React from 'react';
import { guideArticles } from '../../data/articles';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';

interface ArticleListProps {
  onSelectArticle: (slug: string) => void;
  categoryFilter?: string;
  limit?: number;
}

export const ArticleList: React.FC<ArticleListProps> = ({ onSelectArticle, categoryFilter, limit }) => {
  let list = categoryFilter
    ? guideArticles.filter((a) => a.category === categoryFilter)
    : guideArticles;

  if (limit) {
    list = list.slice(0, limit);
  }

  return (
    <div className="articles-grid">
      {list.map((article) => (
        <article
          key={article.slug}
          id={`article-card-${article.slug}`}
          className="article-card"
        >
          <div className="article-meta">
            <span style={{ textTransform: 'capitalize', fontWeight: 600, color: 'var(--color-primary)' }}>
              {article.category}
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} /> {article.readingTime}
            </span>
          </div>

          <h3 className="article-card-title">{article.title}</h3>

          <p className="article-card-excerpt">
            {article.directAnswer.slice(0, 140)}...
          </p>

          <button
            type="button"
            className="article-read-more"
            onClick={() => onSelectArticle(article.slug)}
            aria-label={`Read full guide: ${article.title}`}
          >
            <span>Read Full Guide</span>
            <ArrowRight size={14} />
          </button>
        </article>
      ))}
    </div>
  );
};
