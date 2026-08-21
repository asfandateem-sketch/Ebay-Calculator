import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { Shield, ArrowLeft, Mail } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'disclaimer' | 'about' | 'contact';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    disclaimer: 'Independent Legal Disclaimer',
    about: 'About ProfitIQ',
    contact: 'Contact & Support',
  };

  useSEO({
    title: `${titles[type]} — ProfitIQ`,
    description: `Official ${titles[type]} for ProfitIQ eBay Fee and Profit Intelligence platform.`,
    canonical: `https://profitiq.app/${type}`,
  });

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

        <h1 className="section-title" style={{ marginBottom: '24px' }}>
          {titles[type]}
        </h1>

        <div className="calc-card" style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--color-text-body)' }}>
          {type === 'disclaimer' && (
            <div>
              <p style={{ marginBottom: '16px' }}>
                <strong>ProfitIQ is an independent financial calculation utility and is not affiliated with, sponsored by, or endorsed by eBay Inc.</strong>
              </p>
              <p style={{ marginBottom: '16px' }}>
                eBay, the eBay logo, and related marks are registered trademarks of eBay Inc. All calculations, estimates, and tax assessments provided by ProfitIQ are generated strictly for planning, educational, and informational convenience based on publicly documented fee schedules.
              </p>
              <p>
                While we continuously verify our mathematical engines against current eBay Managed Payments policies, actual seller fees may vary due to custom account agreements, seasonal seller promotions, foreign currency exchange spreads, or localized tax collection laws.
              </p>
            </div>
          )}

          {type === 'about' && (
            <div>
              <p style={{ marginBottom: '16px' }}>
                <strong>ProfitIQ</strong> was created to solve a universal problem for online sellers and e-commerce entrepreneurs: the lack of transparent, accurate, and multi-market financial modeling.
              </p>
              <p style={{ marginBottom: '16px' }}>
                As marketplaces introduced Managed Payments, variable sales tax inclusion, sub-$10 tiered order fees, and promoted ad auctions, calculating actual take-home profit became exceedingly complex. ProfitIQ brings institutional financial rigor to independent merchants worldwide.
              </p>
            </div>
          )}

          {type === 'privacy' && (
            <div>
              <p style={{ marginBottom: '16px' }}>
                <strong>Your privacy is fundamental.</strong> ProfitIQ operates on a client-first, privacy-respecting architecture.
              </p>
              <p style={{ marginBottom: '16px' }}>
                All calculator inputs, item wholesale costs, and selling prices are calculated locally in your browser session. We do not sell your personal financial data, store your proprietary inventory lists, or track individual merchant sales.
              </p>
            </div>
          )}

          {type === 'terms' && (
            <div>
              <p style={{ marginBottom: '16px' }}>
                By using ProfitIQ, you agree that calculations are provided &quot;as is&quot; without warranty of any kind. You are solely responsible for reviewing your official eBay billing invoices and seller account balances.
              </p>
            </div>
          )}

          {type === 'contact' && (
            <div>
              <p style={{ marginBottom: '16px' }}>
                Have questions, feature suggestions, or fee schedule updates to report?
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', background: 'var(--color-soft-gray)', borderRadius: 'var(--radius-sm)' }}>
                <Mail size={18} />
                <span>Reach our financial intelligence desk at: <strong>support@profitiq.app</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
