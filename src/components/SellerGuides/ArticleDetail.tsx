import React from 'react';
import { GuideArticle } from '../../types';
import { Clock, User, Calendar, ExternalLink, Calculator, ArrowLeft, ShieldCheck } from 'lucide-react';

interface ArticleDetailProps {
  article: GuideArticle;
  onBack: () => void;
  onNavigate: (path: string) => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack, onNavigate }) => {
  return (
    <div className="article-page-layout">
      {/* Back button */}
      <button
        type="button"
        className="nav-tag-pill"
        onClick={onBack}
        style={{ marginBottom: '28px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
      >
        <ArrowLeft size={13} />
        <span>Back to Guides</span>
      </button>

      {/* Meta Bar */}
      <div className="article-meta" style={{ marginBottom: '16px' }}>
        <span style={{ textTransform: 'capitalize', fontWeight: 600, color: 'var(--color-primary)' }}>
          {article.category} Guide
        </span>
        <span>•</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={13} /> {article.readingTime}
        </span>
        <span>•</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Calendar size={13} /> Updated {article.lastUpdated}
        </span>
      </div>

      <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '24px' }}>
        {article.h1}
      </h1>

      {/* AEO: Direct Answer Featured Box */}
      <div className="article-direct-answer-box">
        <div className="direct-answer-title">Direct Executive Summary</div>
        <div className="direct-answer-text">{article.directAnswer}</div>
      </div>

      {/* Formula Box if present */}
      {article.formula && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>Mathematical Formula:</h3>
          <div className="article-formula-card">{article.formula}</div>
        </div>
      )}

      {/* Example Calculation Scenario */}
      {article.exampleScenario && (
        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            backgroundColor: 'var(--color-white)',
            marginBottom: '36px',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
            {article.exampleScenario.title}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
            <div>
              <h4 style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                Inputs
              </h4>
              <ul style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '16px' }}>
                {article.exampleScenario.inputs.map((inp, idx) => (
                  <li key={idx}>{inp}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                Calculation Steps
              </h4>
              <ul style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '16px' }}>
                {article.exampleScenario.calculation.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--color-soft-gray)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--color-primary)',
            }}
          >
            {article.exampleScenario.result}
          </div>
        </div>
      )}

      {/* Main Body Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '16px', lineHeight: 1.75 }}>
        {article.contentSections.map((sec, idx) => (
          <section key={idx}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '12px' }}>
              {sec.heading}
            </h2>
            <p style={{ color: 'var(--color-text-body)', marginBottom: sec.bulletPoints ? '12px' : 0 }}>
              {sec.body}
            </p>
            {sec.bulletPoints && (
              <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-muted)' }}>
                {sec.bulletPoints.map((bp, bidx) => (
                  <li key={bidx}>{bp}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* Interactive Tool Cross-Link CTA */}
      <div
        style={{
          marginTop: '48px',
          padding: '28px',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-white)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
            Ready to test this calculation on your own listings?
          </div>
          <div style={{ fontSize: '13px', opacity: 0.75 }}>
            Open the real-time ProfitEbay eBay fee & profit intelligence calculator.
          </div>
        </div>

        <button
          type="button"
          className="btn-primary"
          style={{ background: 'var(--color-white)', color: 'var(--color-primary)' }}
          onClick={() => onNavigate('/ebay-fee-calculator')}
        >
          <Calculator size={15} />
          <span>Launch Fee Calculator</span>
        </button>
      </div>

      {/* Authoritative Source Reference */}
      <div
        style={{
          marginTop: '36px',
          paddingTop: '20px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} />
          <span>Verified against {article.officialSource}</span>
        </div>
        <a
          href={article.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)', fontWeight: 600 }}
        >
          <span>Official eBay Policy Reference</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
};
