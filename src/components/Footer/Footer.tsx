import React from 'react';
import { Logo } from '../Navbar/Logo';
import { Shield, ExternalLink, Code } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer id="site-footer" className="site-footer">
      <div className="container">
        {/* Required Disclaimer Banner */}
        <div className="footer-disclaimer-banner">
          <strong>Independent Disclaimer:</strong> {SITE_CONFIG.name} is an independent calculator and is not affiliated with or endorsed by eBay Inc. eBay, the eBay logo, and related trademarks are registered trademarks of eBay Inc. All calculations are provided for informational, estimation, and planning purposes based on published fee schedules.
        </div>

        {/* Top Grid */}
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div style={{ color: 'var(--color-white)' }}>
              <Logo onClick={() => onNavigate('/')} />
            </div>
            <p className="footer-brand-text">
              Know your profit before you list. The advanced financial intelligence and fee calculation engine for e-commerce resellers and multi-channel businesses.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', opacity: 0.65 }}>
              <Shield size={14} />
              <span>Verified 2026 Fee Formulas</span>
            </div>
          </div>

          {/* Calculators Col */}
          <div>
            <div className="footer-col-title">Calculators</div>
            <ul className="footer-links-list">
              <li>
                <a href="/ebay-fee-calculator" className="footer-link" onClick={(e) => handleLink('/ebay-fee-calculator', e)}>
                  Fee Calculator
                </a>
              </li>
              <li>
                <a href="/ebay-profit-calculator" className="footer-link" onClick={(e) => handleLink('/ebay-profit-calculator', e)}>
                  Profit & ROI Solver
                </a>
              </li>
              <li>
                <a href="/ebay-break-even-calculator" className="footer-link" onClick={(e) => handleLink('/ebay-break-even-calculator', e)}>
                  Break-Even Calculator
                </a>
              </li>
              <li>
                <a href="/ebay-pricing-calculator" className="footer-link" onClick={(e) => handleLink('/ebay-pricing-calculator', e)}>
                  Target Pricing Tool
                </a>
              </li>
              <li>
                <a href="/ebay-promoted-listings-calculator" className="footer-link" onClick={(e) => handleLink('/ebay-promoted-listings-calculator', e)}>
                  Promoted Ad Optimizer
                </a>
              </li>
            </ul>
          </div>

          {/* International Col */}
          <div>
            <div className="footer-col-title">Marketplaces</div>
            <ul className="footer-links-list">
              <li>
                <a href="/usa-ebay-calculator" className="footer-link" onClick={(e) => handleLink('/usa-ebay-calculator', e)}>
                  🇺🇸 United States
                </a>
              </li>
              <li>
                <a href="/uk-ebay-calculator" className="footer-link" onClick={(e) => handleLink('/uk-ebay-calculator', e)}>
                  🇬🇧 United Kingdom
                </a>
              </li>
              <li>
                <a href="/australia-ebay-calculator" className="footer-link" onClick={(e) => handleLink('/australia-ebay-calculator', e)}>
                  🇦🇺 Australia
                </a>
              </li>
              <li>
                <a href="/canada-ebay-calculator" className="footer-link" onClick={(e) => handleLink('/canada-ebay-calculator', e)}>
                  🇨🇦 Canada
                </a>
              </li>
              <li>
                <a href="/germany-ebay-calculator" className="footer-link" onClick={(e) => handleLink('/germany-ebay-calculator', e)}>
                  🇩🇪 Germany
                </a>
              </li>
            </ul>
          </div>

          {/* Research & Data Col */}
          <div>
            <div className="footer-col-title">Research & Data</div>
            <ul className="footer-links-list">
              <li>
                <a href="/ebay-fee-comparison" className="footer-link" onClick={(e) => handleLink('/ebay-fee-comparison', e)}>
                  Fee Comparison Matrix
                </a>
              </li>
              <li>
                <a href="/ebay-fee-history" className="footer-link" onClick={(e) => handleLink('/ebay-fee-history', e)}>
                  Policy & Rate History
                </a>
              </li>
              <li>
                <a href="/ebay-seller-guides" className="footer-link" onClick={(e) => handleLink('/ebay-seller-guides', e)}>
                  Seller Fee Guides
                </a>
              </li>
              <li>
                <a href="/tools/downloadable-resources" className="footer-link" onClick={(e) => handleLink('/tools/downloadable-resources', e)}>
                  Spreadsheets & Templates
                </a>
              </li>
              <li>
                <a href="/embed/ebay-fee-calculator" className="footer-link" onClick={(e) => handleLink('/embed/ebay-fee-calculator', e)}>
                  Embeddable Widget
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <div className="footer-col-title">Trust & Legal</div>
            <ul className="footer-links-list">
              <li>
                <a href="/methodology" className="footer-link" onClick={(e) => handleLink('/methodology', e)}>
                  Data Methodology
                </a>
              </li>
              <li>
                <a href="/about" className="footer-link" onClick={(e) => handleLink('/about', e)}>
                  About {SITE_CONFIG.name}
                </a>
              </li>
              <li>
                <a href="/privacy" className="footer-link" onClick={(e) => handleLink('/privacy', e)}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="footer-link" onClick={(e) => handleLink('/terms', e)}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="footer-link" onClick={(e) => handleLink('/disclaimer', e)}>
                  Legal Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </div>
          <div>
            Engineered for high accuracy and financial clarity.
          </div>
        </div>
      </div>
    </footer>
  );
};
