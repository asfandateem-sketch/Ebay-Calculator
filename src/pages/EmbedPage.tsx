import React, { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { EmbedWidget } from '../components/Embed/EmbedWidget';
import { Code, Copy, Check, ArrowLeft } from 'lucide-react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const EmbedPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  useSEO({
    title: 'Free Embeddable eBay Fee Calculator Widget for Websites & Blogs',
    description: 'Embed the ProfitIQ eBay Fee Calculator widget onto your blog, reseller forum, or e-commerce website with a single line of responsive HTML.',
    canonical: 'https://profitiq.app/embed/ebay-fee-calculator',
  });

  const embedCode = `<iframe \n  src="https://profitiq.app/embed-widget" \n  width="100%" \n  height="360" \n  style="border:none; border-radius:12px; max-width:480px; box-shadow:0 4px 20px rgba(0,0,0,0.08);" \n  title="eBay Fee Calculator by ProfitIQ"\n></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div style={{ paddingTop: '96px', paddingBottom: '96px', background: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
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
            <Code size={13} />
            <span>Developer & Webmaster Tools</span>
          </div>
          <h1 className="section-title">Embeddable eBay Fee Calculator</h1>
          <p className="section-subtitle">
            Embed our lightweight, responsive fee calculator widget onto your website, blog, or seller community in seconds.
          </p>
        </div>

        {/* Live Preview */}
        <div style={{ marginBottom: '36px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>Live Widget Preview:</h3>
          <EmbedWidget />
        </div>

        {/* Embed Snippet */}
        <div className="calc-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600 }}>HTML Embed Snippet</h3>
            <button
              type="button"
              className="btn-primary"
              style={{ minHeight: '34px', fontSize: '12px', padding: '6px 14px' }}
              onClick={handleCopy}
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Embed Code'}</span>
            </button>
          </div>

          <pre
            style={{
              background: 'var(--color-primary)',
              color: '#f4f4f6',
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              overflowX: 'auto',
              lineHeight: 1.5,
            }}
          >
            <code>{embedCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
