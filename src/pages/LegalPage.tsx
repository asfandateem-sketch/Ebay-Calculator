import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { Shield, ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { SITE_CONFIG } from '../config/site';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'disclaimer' | 'about' | 'contact';
  onNavigate?: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    disclaimer: 'Independent Legal Disclaimer',
    about: `About ${SITE_CONFIG.name}`,
    contact: 'Contact & Support',
  };

  useSEO({
    title: `${titles[type]} — ${SITE_CONFIG.name}`,
    description: `Official ${titles[type]} for ${SITE_CONFIG.name} eBay Fee and Profit Intelligence platform.`,
    canonical: `/${type}`,
  });

  return (
    <div style={{ paddingTop: '96px', paddingBottom: '96px', background: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <RouterLink
          to="/"
          className="nav-tag-pill"
          style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={13} />
          <span>Home</span>
        </RouterLink>

        <h1 className="section-title" style={{ marginBottom: '24px' }}>
          {titles[type]}
        </h1>

        <div className="calc-card" style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--color-text-body)' }}>
          {type === 'disclaimer' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--color-primary)', fontWeight: 600 }}>
                <ShieldCheck size={20} />
                <span>Independent Third-Party Utility</span>
              </div>
              <p style={{ marginBottom: '16px' }}>
                <strong>{SITE_CONFIG.officialDisclaimer}</strong>
              </p>
              <p style={{ marginBottom: '16px' }}>
                eBay, the eBay logo, and related marks are registered trademarks of eBay Inc. All calculations, estimates, and fee assessments provided by {SITE_CONFIG.name} are generated strictly for planning, financial projection, and educational purposes based on publicly documented marketplace fee schedules.
              </p>
              <p>
                While we continuously verify our mathematical models against published eBay Managed Payments policies, actual seller fees may vary due to custom account agreements, seasonal seller promotions, foreign currency exchange spreads, or localized tax collection rules. Always verify final amounts on your official eBay seller invoice.
              </p>
            </div>
          )}

          {type === 'about' && (
            <div>
              <p style={{ marginBottom: '16px' }}>
                <strong>{SITE_CONFIG.name}</strong> is a suite of tools designed to help online sellers understand marketplace fees, calculate true profit margins, determine break-even prices, and make better pricing decisions.
              </p>
              <p style={{ marginBottom: '16px' }}>
                As marketplaces implement multi-tiered fee structures, payment processing deductions, variable sales tax calculation bases, and promoted ad auctions, computing exact take-home earnings has become increasingly complex. {SITE_CONFIG.name} delivers precision financial modeling, break-even solving, and multi-country fee intelligence to merchants worldwide.
              </p>
            </div>
          )}

          {type === 'privacy' && (
            <div>
              <p style={{ marginBottom: '16px' }}>
                <strong>Your privacy and financial confidentiality are fundamental.</strong> {SITE_CONFIG.name} operates on a client-first, privacy-respecting architecture.
              </p>
              <p style={{ marginBottom: '16px' }}>
                All calculator inputs, inventory wholesale costs, and selling prices are calculated locally in your browser session. We do not store your private inventory lists or sell personal merchant data.
              </p>
            </div>
          )}

          {type === 'terms' && (
            <div>
              <p style={{ marginBottom: '16px' }}>
                By accessing and using {SITE_CONFIG.name}, you agree that all tools, formulas, and estimates are provided &quot;as is&quot; for informational and planning purposes. You remain solely responsible for reviewing and validating your official eBay billing statements and accounting records.
              </p>
            </div>
          )}

          {type === 'contact' && (
            <div>
              <p style={{ marginBottom: '16px' }}>
                Have questions, feature requests, or fee schedule updates to share?
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', background: 'var(--color-soft-gray)', borderRadius: 'var(--radius-sm)' }}>
                <Mail size={18} />
                <span>Contact the {SITE_CONFIG.name} team at: <strong>contact@sellermargincalc.pro</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
