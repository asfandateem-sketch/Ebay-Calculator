import React from 'react';
import { ArrowDown, HelpCircle, Sparkles, TrendingUp, Calculator } from 'lucide-react';

interface HeroContentProps {
  onCalculateClick: () => void;
  onHowItWorksClick: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ onCalculateClick, onHowItWorksClick }) => {
  return (
    <footer className="hero-footer-content">
      <div className="container">
        <div className="hero-content-inner">
          {/* Main Left Column */}
          <div className="hero-main-col">
            {/* Subtitle */}
            <div id="hero-subtitle" className="hero-subtitle">
              <span className="hero-subtitle-dot" />
              <span>Published 2026 eBay fee & profit calculation engine</span>
            </div>

            {/* H1 Heading - Instant Paint without JS delay for optimal LCP */}
            <h1 id="hero-h1-heading" className="hero-heading">
              Know Your Profit.
              <br />
              Before You List.
            </h1>

            {/* Description */}
            <p id="hero-description" className="hero-description">
              Calculate eBay fees, costs, margins and break-even price in seconds.
            </p>

            {/* CTA Buttons */}
            <div id="hero-cta-group" className="hero-cta-group">
              <button
                id="hero-btn-calculate"
                className="btn-primary"
                onClick={onCalculateClick}
              >
                <span>Calculate Fees</span>
                <ArrowDown size={15} />
              </button>

              <button
                id="hero-btn-how-it-works"
                className="btn-secondary"
                onClick={onHowItWorksClick}
              >
                <HelpCircle size={15} />
                <span>How It Works</span>
              </button>
            </div>
          </div>

          {/* Right Tags Column */}
          <div
            id="hero-tags-col"
            className="hero-tags-col"
          >
            <span className="hero-tag-badge">
              <Calculator size={13} className="text-zinc-600" />
              <span>Fee Intelligence</span>
            </span>
            <span className="hero-tag-badge">
              <TrendingUp size={13} className="text-emerald-600" />
              <span>Profit Analysis</span>
            </span>
            <span className="hero-tag-badge">
              <Sparkles size={13} className="text-amber-500" />
              <span>Seller Tools</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
