import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  Calculator,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Layers,
  ArrowRight,
  Globe,
} from 'lucide-react';
import { RouterLink } from '../RouterLink';
import { CountryFlag } from '../CountrySelector/CountryFlag';

interface HeroContentProps {
  onCalculateClick: () => void;
  onExploreHubClick?: () => void;
}

const HERO_COUNTRIES = [
  { code: 'US', displayCode: 'US', name: 'USA', fullName: 'United States', path: '/us', currency: 'USD ($)' },
  { code: 'GB', displayCode: 'GB', name: 'UK', fullName: 'United Kingdom', path: '/uk', currency: 'GBP (£)' },
  { code: 'CA', displayCode: 'CA', name: 'Canada', fullName: 'Canada', path: '/ca', currency: 'CAD (CA$)' },
  { code: 'AU', displayCode: 'AU', name: 'Australia', fullName: 'Australia', path: '/au', currency: 'AUD (A$)' },
  { code: 'DE', displayCode: 'DE', name: 'Germany', fullName: 'Germany', path: '/de', currency: 'EUR (€)' },
  { code: 'FR', displayCode: 'FR', name: 'France', fullName: 'France', path: '/fr', currency: 'EUR (€)' },
  { code: 'IT', displayCode: 'IT', name: 'Italy', fullName: 'Italy', path: '/it', currency: 'EUR (€)' },
  { code: 'ES', displayCode: 'ES', name: 'Spain', fullName: 'Spain', path: '/es', currency: 'EUR (€)' },
];

export const HeroContent: React.FC<HeroContentProps> = ({
  onCalculateClick,
  onExploreHubClick,
}) => {
  return (
    <div className="hero-luxury-text-col">
      {/* Eyebrow badge with live pulse */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="hero-luxury-eyebrow"
      >
        <span className="hero-eyebrow-dot" />
        <span>Enterprise E-Commerce Financial Modeling</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        id="hero-h1-heading"
        className="hero-luxury-h1"
      >
        The Ultimate E-commerce Calculator Suite
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        id="hero-description"
        className="hero-luxury-subhead"
      >
        Calculate marketplace fees, landed costs, profit, ROI, pricing and break-even — accurately and instantly.
      </motion.p>

      {/* Prominent Country Flags Strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25 }}
        className="hero-flags-strip"
      >
        <div className="hero-flags-label">
          <Globe size={13} />
          <span>SUPPORTED MARKETPLACES:</span>
        </div>
        <div className="hero-flags-list">
          {HERO_COUNTRIES.map((c) => (
            <RouterLink
              key={c.code}
              to={c.path}
              className="hero-flag-pill"
              title={`Calculate fees & profit for ${c.fullName} (${c.displayCode} - ${c.name})`}
              aria-label={`${c.fullName} marketplace (${c.displayCode} - ${c.name})`}
            >
              <CountryFlag
                code={c.code}
                width={17}
                height={12}
                ariaLabel={`${c.fullName} flag`}
                className="hero-flag-svg"
              />
              <span className="hero-flag-code">{c.displayCode}</span>
              <span className="hero-flag-name">{c.name}</span>
            </RouterLink>
          ))}
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        id="hero-cta-group"
        className="hero-luxury-cta-group"
      >
        <button
          type="button"
          id="hero-btn-explore-calculators"
          className="hero-btn-primary-luxury"
          onClick={onExploreHubClick || onCalculateClick}
        >
          <Layers size={18} />
          <span>Explore Calculators</span>
          <ArrowDown size={16} className="hero-cta-icon-bounce" />
        </button>

        <button
          type="button"
          id="hero-btn-calculate-fees"
          className="hero-btn-secondary-luxury"
          onClick={onCalculateClick}
        >
          <Calculator size={18} />
          <span>Calculate Your Profit</span>
          <ArrowRight size={15} />
        </button>
      </motion.div>

      {/* Trust & Guarantee points */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="hero-luxury-features-row"
      >
        <div className="hero-feat-item">
          <ShieldCheck size={16} className="text-emerald-600" />
          <span>2026 Verified Rates</span>
        </div>
        <div className="hero-feat-item">
          <Sparkles size={16} className="text-blue-600" />
          <span>8 Global Marketplaces</span>
        </div>
        <div className="hero-feat-item">
          <TrendingUp size={16} className="text-indigo-600" />
          <span>Zero-Deviation Accuracy</span>
        </div>
      </motion.div>
    </div>
  );
};
