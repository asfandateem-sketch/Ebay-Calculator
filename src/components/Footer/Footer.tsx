import React from 'react';
import { Logo } from '../Navbar/Logo';
import { ShieldCheck, ExternalLink, Globe, Scale } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { RouterLink } from '../RouterLink';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer id="site-footer" className="site-footer">
      <div className="container">
        {/* Required Disclaimer Banner */}
        <div className="footer-disclaimer-banner">
          <strong>Independent Disclaimer:</strong> {SITE_CONFIG.officialDisclaimer}
        </div>

        {/* Top Grid */}
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div style={{ color: 'var(--color-white)' }}>
              <Logo />
            </div>
            <p className="footer-brand-text">
              Know your profit before you list. The advanced financial intelligence and fee calculation engine for e-commerce resellers and multi-channel businesses.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', opacity: 0.75 }}>
              <ShieldCheck size={14} />
              <span>Verified 2026 Fee Schedules</span>
            </div>
          </div>

          {/* Calculators Col */}
          <div>
            <div className="footer-col-title">Calculators</div>
            <ul className="footer-links-list">
              <li>
                <RouterLink to="/ebay-fee-calculator" className="footer-link">
                  Fee Calculator
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/ebay-profit-calculator" className="footer-link">
                  Profit & ROI Solver
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/ebay-break-even-calculator" className="footer-link">
                  Break-Even Calculator
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/ebay-pricing-calculator" className="footer-link">
                  Target Pricing Tool
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/ebay-promoted-listings-calculator" className="footer-link">
                  Promoted Ad Optimizer
                </RouterLink>
              </li>
            </ul>
          </div>

          {/* 8 International Marketplaces Col */}
          <div>
            <div className="footer-col-title">8 Marketplaces</div>
            <ul className="footer-links-list">
              <li>
                <RouterLink to="/us" className="footer-link">
                  🇺🇸 United States
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/uk" className="footer-link">
                  🇬🇧 United Kingdom
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/au" className="footer-link">
                  🇦🇺 Australia
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/ca" className="footer-link">
                  🇨🇦 Canada
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/de" className="footer-link">
                  🇩🇪 Germany
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/fr" className="footer-link">
                  🇫🇷 France
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/it" className="footer-link">
                  🇮🇹 Italy
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/es" className="footer-link">
                  🇪🇸 Spain
                </RouterLink>
              </li>
            </ul>
          </div>

          {/* Research & Data Col */}
          <div>
            <div className="footer-col-title">Research & Data</div>
            <ul className="footer-links-list">
              <li>
                <RouterLink to="/ebay-fee-comparison" className="footer-link">
                  Fee Comparison Matrix
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/ebay-fee-history" className="footer-link">
                  Policy & Rate History
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/ebay-seller-guides" className="footer-link">
                  Seller Fee Guides
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/tools/downloadable-resources" className="footer-link">
                  Spreadsheets & Templates
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/methodology" className="footer-link">
                  Calculation Methodology
                </RouterLink>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <div className="footer-col-title">Contact & Trust</div>
            <ul className="footer-links-list">
              <li>
                <RouterLink to="/contact" className="footer-link">
                  Contact Us
                </RouterLink>
              </li>
              <li>
                <a href="mailto:asfandateem@gmail.com" className="footer-link" style={{ fontSize: '13px' }}>
                  asfandateem@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+923189967087" className="footer-link" style={{ fontSize: '13px' }}>
                  +92 318 996 7087
                </a>
              </li>
              <li>
                <RouterLink to="/methodology" className="footer-link">
                  Methodology
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/privacy" className="footer-link">
                  Privacy Policy
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/terms" className="footer-link">
                  Terms & Conditions
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/disclaimer" className="footer-link">
                  Independent Disclaimer
                </RouterLink>
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
            Engineered for precision, speed, and financial clarity.
          </div>
        </div>
      </div>
    </footer>
  );
};
