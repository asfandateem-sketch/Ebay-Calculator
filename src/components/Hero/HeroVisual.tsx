import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Percent,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="hero-luxury-visual-wrap">
      {/* Subtle light ambient glow */}
      <div className="hero-glow-blob" />

      {/* Main Crisp Ledger Card */}
      <div className="hero-luxury-card">
        {/* Top bar */}
        <div className="hero-card-header">
          <div className="hero-card-title-group">
            <div className="hero-card-icon-box">
              <TrendingUp size={18} />
            </div>
            <div>
              <div className="hero-card-title">E-commerce P&amp;L Analysis</div>
              <p className="hero-card-subtitle">Real-Time Financial Modeling</p>
            </div>
          </div>
          <div className="hero-card-badge">
            <span className="live-pulse-dot" />
            <span>2026 Engine</span>
          </div>
        </div>

        {/* Highlight metrics */}
        <div className="hero-card-highlight-grid">
          <div className="hero-metric-box primary">
            <div className="hero-metric-label">Net Monthly Profit</div>
            <div className="hero-metric-val text-emerald-700">+$14,840.00</div>
            <div className="hero-metric-sub">
              <span className="text-emerald-800 font-semibold">+32.4%</span> Net Margin
            </div>
          </div>

          <div className="hero-metric-box">
            <div className="hero-metric-label">Unit Contribution</div>
            <div className="hero-metric-val text-indigo-700">$37.10</div>
            <div className="hero-metric-sub">
              Per unit sold ($75.00 MSRP)
            </div>
          </div>
        </div>

        {/* Mini Ledger breakdown */}
        <div className="hero-card-ledger">
          <div className="hero-ledger-row">
            <span className="text-slate-700 font-medium">Gross Monthly Revenue</span>
            <span className="font-semibold text-slate-900">$45,800.00</span>
          </div>
          <div className="hero-ledger-row">
            <span className="text-slate-700 font-medium">Landed Cost of Goods (COGS)</span>
            <span className="text-rose-700 font-medium">-$14,650.00</span>
          </div>
          <div className="hero-ledger-row">
            <span className="text-slate-700 font-medium">Marketplace Fees &amp; Commission</span>
            <span className="text-rose-700 font-medium">-$6,412.00</span>
          </div>
          <div className="hero-ledger-row">
            <span className="text-slate-700 font-medium">Ad Spend &amp; Shipping</span>
            <span className="text-rose-700 font-medium">-$9,898.00</span>
          </div>
          <div className="hero-ledger-row hero-ledger-total">
            <span className="text-slate-900 font-bold">Estimated ROI / Payback</span>
            <span className="text-emerald-800 font-bold">186% (2.1 Months)</span>
          </div>
        </div>

        {/* Verification badges */}
        <div className="hero-card-tags">
          <span className="hero-pill-tag">
            <ShieldCheck size={13} className="text-emerald-700" />
            <span>Zero-Deviation Tier Brackets</span>
          </span>
          <span className="hero-pill-tag">
            <Zap size={13} className="text-amber-700" />
            <span>Multi-Marketplace Ready</span>
          </span>
        </div>
      </div>

      {/* Floating Pill: Break-Even Price */}
      <div className="hero-floating-pill pill-left">
        <div className="pill-icon-circle bg-emerald-100 text-emerald-700">
          <DollarSign size={15} />
        </div>
        <div>
          <div className="pill-text-title">Break-Even Price: $41.80</div>
          <div className="pill-text-sub">Zero-profit safety floor calculated</div>
        </div>
      </div>

      {/* Floating Pill: Target Margin */}
      <div className="hero-floating-pill pill-right">
        <div className="pill-icon-circle bg-indigo-100 text-indigo-700">
          <Percent size={15} />
        </div>
        <div>
          <div className="pill-text-title">Target Margin Solver: 35%</div>
          <div className="pill-text-sub">Optimal Selling Price: $79.40</div>
        </div>
      </div>
    </div>
  );
};
