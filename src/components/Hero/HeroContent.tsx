import React from 'react';
import { motion } from 'motion/react';
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
            <motion.div
              id="hero-subtitle"
              className="hero-subtitle"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero-subtitle-dot" />
              <span>Published 2026 eBay fee & profit calculation engine</span>
            </motion.div>

            {/* H1 Heading */}
            <motion.h1
              id="hero-h1-heading"
              className="hero-heading"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Know Your Profit.
              <br />
              Before You List.
            </motion.h1>

            {/* Description */}
            <motion.p
              id="hero-description"
              className="hero-description"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Calculate eBay fees, costs, margins and break-even price in seconds.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              id="hero-cta-group"
              className="hero-cta-group"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
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
            </motion.div>
          </div>

          {/* Right Tags Column */}
          <motion.div
            id="hero-tags-col"
            className="hero-tags-col"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
