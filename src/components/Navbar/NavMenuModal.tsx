import React, { useEffect } from 'react';
import { X, ArrowRight, Calculator, Globe, BookOpen, Layers, History, FileSpreadsheet, ShieldCheck, Scale, Percent, DollarSign, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { RouterLink } from '../RouterLink';

interface NavMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const NavMenuModal: React.FC<NavMenuModalProps> = ({ isOpen, onClose, onNavigate }) => {
  // Lock body scroll when drawer is open and support ESC key to close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div id="nav-menu-overlay" className="nav-menu-overlay" onClick={onClose}>
      <div
        id="nav-menu-drawer"
        className="nav-menu-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation Menu"
      >
        <div className="nav-drawer-scrollable">
          {/* Header */}
          <div className="nav-drawer-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '-0.02em' }}>
                {SITE_CONFIG.name} Navigation
              </span>
            </div>
            <button
              id="nav-drawer-close-btn"
              className="nav-drawer-close"
              onClick={onClose}
              aria-label="Close navigation menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Core Calculators */}
          <div className="nav-drawer-section">
            <div className="nav-drawer-section-title">
              <Calculator size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Fee & Profit Calculators
            </div>
            <div className="nav-drawer-links">
              <RouterLink
                id="drawer-fee-calc"
                to="/ebay-fee-calculator"
                className="nav-drawer-link"
                onClick={() => onClose()}
              >
                <span>eBay Fee Calculator (All Categories)</span>
                <ArrowRight size={14} opacity={0.4} />
              </RouterLink>
              <RouterLink
                id="drawer-profit-calc"
                to="/ebay-profit-calculator"
                className="nav-drawer-link"
                onClick={() => onClose()}
              >
                <span>Net Profit & Margin Solver</span>
                <ArrowRight size={14} opacity={0.4} />
              </RouterLink>
              <RouterLink
                id="drawer-breakeven-calc"
                to="/ebay-break-even-calculator"
                className="nav-drawer-link"
                onClick={() => onClose()}
              >
                <span>Break-Even Selling Price Calculator</span>
                <ArrowRight size={14} opacity={0.4} />
              </RouterLink>
              <RouterLink
                id="drawer-pricing-calc"
                to="/ebay-pricing-calculator"
                className="nav-drawer-link"
                onClick={() => onClose()}
              >
                <span>Target Margin Pricing Tool</span>
                <ArrowRight size={14} opacity={0.4} />
              </RouterLink>
              <RouterLink
                id="drawer-promoted-calc"
                to="/ebay-promoted-listings-calculator"
                className="nav-drawer-link"
                onClick={() => onClose()}
              >
                <span>Promoted Listings ROAS Optimizer</span>
                <ArrowRight size={14} opacity={0.4} />
              </RouterLink>
            </div>
          </div>

          {/* 8 International Marketplaces */}
          <div className="nav-drawer-section">
            <div className="nav-drawer-section-title">
              <Globe size={14} style={{ display: 'inline', marginRight: '6px' }} />
              8 International Marketplaces (2026 Rules)
            </div>
            <div className="nav-drawer-grid-links">
              <RouterLink
                id="drawer-country-us"
                to="/us"
                className="nav-drawer-link-pill"
                onClick={() => onClose()}
              >
                <span>🇺🇸 United States</span>
              </RouterLink>
              <RouterLink
                id="drawer-country-uk"
                to="/uk"
                className="nav-drawer-link-pill"
                onClick={() => onClose()}
              >
                <span>🇬🇧 United Kingdom</span>
              </RouterLink>
              <RouterLink
                id="drawer-country-au"
                to="/au"
                className="nav-drawer-link-pill"
                onClick={() => onClose()}
              >
                <span>🇦🇺 Australia</span>
              </RouterLink>
              <RouterLink
                id="drawer-country-ca"
                to="/ca"
                className="nav-drawer-link-pill"
                onClick={() => onClose()}
              >
                <span>🇨🇦 Canada</span>
              </RouterLink>
              <RouterLink
                id="drawer-country-de"
                to="/de"
                className="nav-drawer-link-pill"
                onClick={() => onClose()}
              >
                <span>🇩🇪 Germany</span>
              </RouterLink>
              <RouterLink
                id="drawer-country-fr"
                to="/fr"
                className="nav-drawer-link-pill"
                onClick={() => onClose()}
              >
                <span>🇫🇷 France</span>
              </RouterLink>
              <RouterLink
                id="drawer-country-it"
                to="/it"
                className="nav-drawer-link-pill"
                onClick={() => onClose()}
              >
                <span>🇮🇹 Italy</span>
              </RouterLink>
              <RouterLink
                id="drawer-country-es"
                to="/es"
                className="nav-drawer-link-pill"
                onClick={() => onClose()}
              >
                <span>🇪🇸 Spain</span>
              </RouterLink>
            </div>
          </div>

          {/* Research, Matrix & Guides */}
          <div className="nav-drawer-section">
            <div className="nav-drawer-section-title">
              <BookOpen size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Research, Matrix & Templates
            </div>
            <div className="nav-drawer-links">
              <RouterLink
                id="drawer-comparison"
                to="/ebay-fee-comparison"
                className="nav-drawer-link"
                onClick={() => onClose()}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={14} /> International Fee Comparison Matrix
                </span>
                <ArrowRight size={14} opacity={0.4} />
              </RouterLink>
              <RouterLink
                id="drawer-history"
                to="/ebay-fee-history"
                className="nav-drawer-link"
                onClick={() => onClose()}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <History size={14} /> eBay Fee Rate History Archive
                </span>
                <ArrowRight size={14} opacity={0.4} />
              </RouterLink>
              <RouterLink
                id="drawer-guides"
                to="/ebay-seller-guides"
                className="nav-drawer-link"
                onClick={() => onClose()}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={14} /> Seller Fee & Profit Guides
                </span>
                <ArrowRight size={14} opacity={0.4} />
              </RouterLink>
              <RouterLink
                id="drawer-resources"
                to="/tools/downloadable-resources"
                className="nav-drawer-link"
                onClick={() => onClose()}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileSpreadsheet size={14} /> Free Spreadsheets & Templates
                </span>
                <ArrowRight size={14} opacity={0.4} />
              </RouterLink>
              <RouterLink
                id="drawer-methodology"
                to="/methodology"
                className="nav-drawer-link"
                onClick={() => onClose()}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Scale size={14} /> Calculation Engine Methodology
                </span>
                <ArrowRight size={14} opacity={0.4} />
              </RouterLink>
              <RouterLink
                id="drawer-contact"
                to="/contact"
                className="nav-drawer-link"
                onClick={() => onClose()}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DollarSign size={14} /> Contact ProfitEbay & Support
                </span>
                <ArrowRight size={14} opacity={0.4} />
              </RouterLink>
            </div>
          </div>
        </div>

        {/* Bottom Drawer Disclaimer */}
        <div className="nav-drawer-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontWeight: 600 }}>
            <ShieldCheck size={14} />
            <span>Independent Financial Utility</span>
          </div>
          <p style={{ margin: 0, lineHeight: 1.4 }}>
            {SITE_CONFIG.officialDisclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};
