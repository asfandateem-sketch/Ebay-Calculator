import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Calculator, Globe, BookOpen, Layers, History, FileSpreadsheet, Shield } from 'lucide-react';

interface NavMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const NavMenuModal: React.FC<NavMenuModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const handleLinkClick = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="nav-menu-overlay" className="nav-menu-overlay" onClick={onClose}>
          <motion.div
            id="nav-menu-drawer"
            className="nav-menu-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="nav-drawer-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '16px' }}>ProfitIQ Navigation</span>
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

              {/* Calculators & Solvers */}
              <div className="nav-drawer-section">
                <div className="nav-drawer-section-title">
                  <Calculator size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  Calculators & Tools
                </div>
                <div className="nav-drawer-links">
                  <a
                    id="nav-link-fee-calc"
                    href="/ebay-fee-calculator"
                    className="nav-drawer-link"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/ebay-fee-calculator'); }}
                  >
                    <span>eBay Fee Calculator</span>
                    <ArrowRight size={14} opacity={0.4} />
                  </a>
                  <a
                    id="nav-link-profit-calc"
                    href="/ebay-profit-calculator"
                    className="nav-drawer-link"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/ebay-profit-calculator'); }}
                  >
                    <span>eBay Profit & Margin Solver</span>
                    <ArrowRight size={14} opacity={0.4} />
                  </a>
                  <a
                    id="nav-link-breakeven-calc"
                    href="/ebay-break-even-calculator"
                    className="nav-drawer-link"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/ebay-break-even-calculator'); }}
                  >
                    <span>Break-Even Price Calculator</span>
                    <ArrowRight size={14} opacity={0.4} />
                  </a>
                  <a
                    id="nav-link-pricing-calc"
                    href="/ebay-pricing-calculator"
                    className="nav-drawer-link"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/ebay-pricing-calculator'); }}
                  >
                    <span>Target Margin Pricing Tool</span>
                    <ArrowRight size={14} opacity={0.4} />
                  </a>
                  <a
                    id="nav-link-promoted-calc"
                    href="/ebay-promoted-listings-calculator"
                    className="nav-drawer-link"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/ebay-promoted-listings-calculator'); }}
                  >
                    <span>Promoted Listings Ad Optimizer</span>
                    <ArrowRight size={14} opacity={0.4} />
                  </a>
                </div>
              </div>

              {/* International Country Hubs */}
              <div className="nav-drawer-section">
                <div className="nav-drawer-section-title">
                  <Globe size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  International Marketplaces
                </div>
                <div className="nav-drawer-links">
                  <a
                    id="nav-link-us"
                    href="/usa-ebay-calculator"
                    className="nav-drawer-link"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/usa-ebay-calculator'); }}
                  >
                    <span>🇺🇸 United States Calculator</span>
                    <ArrowRight size={14} opacity={0.4} />
                  </a>
                  <a
                    id="nav-link-uk"
                    href="/uk-ebay-calculator"
                    className="nav-drawer-link"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/uk-ebay-calculator'); }}
                  >
                    <span>🇬🇧 United Kingdom Calculator</span>
                    <ArrowRight size={14} opacity={0.4} />
                  </a>
                  <a
                    id="nav-link-au"
                    href="/australia-ebay-calculator"
                    className="nav-drawer-link"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/australia-ebay-calculator'); }}
                  >
                    <span>🇦🇺 Australia Calculator</span>
                    <ArrowRight size={14} opacity={0.4} />
                  </a>
                  <a
                    id="nav-link-ca"
                    href="/canada-ebay-calculator"
                    className="nav-drawer-link"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/canada-ebay-calculator'); }}
                  >
                    <span>🇨🇦 Canada Calculator</span>
                    <ArrowRight size={14} opacity={0.4} />
                  </a>
                  <a
                    id="nav-link-de"
                    href="/germany-ebay-calculator"
                    className="nav-drawer-link"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/germany-ebay-calculator'); }}
                  >
                    <span>🇩🇪 Germany (eBay.de)</span>
                    <ArrowRight size={14} opacity={0.4} />
                  </a>
                </div>
              </div>

              {/* Research & Guides */}
              <div className="nav-drawer-section">
                <div className="nav-drawer-section-title">
                  <BookOpen size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  Research & Intelligence
                </div>
                <div className="nav-drawer-links">
                  <a
                    id="nav-link-comparison"
                    href="/ebay-fee-comparison"
                    className="nav-drawer-link"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/ebay-fee-comparison'); }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Layers size={14} /> International Fee Matrix
                    </span>
                    <ArrowRight size={14} opacity={0.4} />
                  </a>
                  <a
                    id="nav-link-history"
                    href="/ebay-fee-history"
                    className="nav-drawer-link"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/ebay-fee-history'); }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <History size={14} /> eBay Fee Rate History Archive
                    </span>
                    <ArrowRight size={14} opacity={0.4} />
                  </a>
                  <a
                    id="nav-link-guides"
                    href="/ebay-seller-guides"
                    className="nav-drawer-link"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/ebay-seller-guides'); }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BookOpen size={14} /> Seller Fee & Profit Guides
                    </span>
                    <ArrowRight size={14} opacity={0.4} />
                  </a>
                  <a
                    id="nav-link-resources"
                    href="/tools/downloadable-resources"
                    className="nav-drawer-link"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/tools/downloadable-resources'); }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileSpreadsheet size={14} /> Free Spreadsheets & Templates
                    </span>
                    <ArrowRight size={14} opacity={0.4} />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Drawer Disclaimer */}
            <div style={{ paddingTop: '20px', borderTop: '1px solid var(--color-border)', fontSize: '11px', color: 'var(--color-text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Shield size={12} />
                <span>Independent Financial Utility</span>
              </div>
              <p>ProfitIQ is an independent calculator and is not affiliated with or endorsed by eBay.</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
