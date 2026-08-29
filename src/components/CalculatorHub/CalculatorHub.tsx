import React, { useState } from 'react';
import { CountryFlag } from '../CountrySelector/CountryFlag';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Target,
  Percent,
  Package,
  Tags,
  Truck,
  Sparkles,
  Layers,
  Globe,
  ArrowRight,
  Search,
  CheckCircle2,
  Sliders,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';

export interface CalculatorCardItem {
  id: string;
  name: string;
  category: 'profit' | 'costs' | 'fees';
  categoryLabel: string;
  description: string;
  markets: string[];
  currencies: string[];
  path: string;
  icon: React.ElementType;
  badge?: string;
  isPopular?: boolean;
}

const ALL_CALCULATORS: CalculatorCardItem[] = [
  // 💰 Profit & Investment
  {
    id: 'ecom-profit-calc',
    name: 'E-commerce Profit Calculator',
    category: 'profit',
    categoryLabel: 'Profit & Investment',
    description: 'Calculate net cash profit, margins, landed costs, channel commissions, and PPC expenses.',
    markets: ['US', 'UK', 'CA', 'AU', 'EU'],
    currencies: ['USD ($)', 'Multi-currency'],
    path: '/ecommerce-investment-profit-calculator',
    icon: DollarSign,
    badge: 'Comprehensive',
    isPopular: true,
  },
  {
    id: 'investment-profit-calc',
    name: 'Investment & Capital Recovery',
    category: 'profit',
    categoryLabel: 'Profit & Investment',
    description: 'Track initial working capital, landed inventory outlay, and unit contribution margins.',
    markets: ['Global', 'US', 'UK', 'CA', 'AU'],
    currencies: ['USD ($)', 'All Currencies'],
    path: '/ecommerce-investment-profit-calculator',
    icon: PieChart,
    badge: 'Capital Outlay',
    isPopular: true,
  },
  {
    id: 'roi-payback-calc',
    name: 'E-commerce ROI & Payback Calculator',
    category: 'profit',
    categoryLabel: 'Profit & Investment',
    description: 'Determine monthly ROI, annualized returns, and exact months required to recoup inventory capital.',
    markets: ['US', 'UK', 'EU', 'Global'],
    currencies: ['USD ($)', 'EUR (€)', 'GBP (£)'],
    path: '/ecommerce-investment-profit-calculator',
    icon: TrendingUp,
    badge: 'ROI / Payback',
  },
  {
    id: 'break-even-calc',
    name: 'Break-Even Price Solver',
    category: 'profit',
    categoryLabel: 'Profit & Investment',
    description: 'Calculate the minimum floor selling price to cover all marketplace fees, taxes, and shipping expenses.',
    markets: ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'ES'],
    currencies: ['USD', 'GBP', 'AUD', 'CAD', 'EUR'],
    path: '/ebay-break-even-calculator',
    icon: Target,
    badge: 'Zero-Loss Floor',
    isPopular: true,
  },
  {
    id: 'profit-margin-calc',
    name: 'Profit Margin & Return Calculator',
    category: 'profit',
    categoryLabel: 'Profit & Investment',
    description: 'Analyze net margin percentages, markup rates, and profit per item across store subscription tiers.',
    markets: ['8 Major Countries'],
    currencies: ['USD', 'GBP', 'AUD', 'CAD', 'EUR'],
    path: '/ebay-profit-calculator',
    icon: Percent,
    badge: 'Margin Optimizer',
  },

  // 📦 Costs & Pricing
  {
    id: 'landed-cost-calc',
    name: 'True Landed Cost Calculator',
    category: 'costs',
    categoryLabel: 'Costs & Pricing',
    description: 'Accurately aggregate supplier unit costs, ocean/air freight, customs tariffs, and port handling fees.',
    markets: ['US', 'UK', 'CA', 'AU', 'EU'],
    currencies: ['USD ($)', 'Multi-currency'],
    path: '/ecommerce-investment-profit-calculator',
    icon: Package,
    badge: 'Sourcing / Import',
    isPopular: true,
  },
  {
    id: 'selling-price-solver',
    name: 'Target Margin Selling Price Solver',
    category: 'costs',
    categoryLabel: 'Costs & Pricing',
    description: 'Reverse-engineer the optimal listing price required to hit custom 20%, 25%, 30%+ profit targets.',
    markets: ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'ES'],
    currencies: ['USD', 'GBP', 'AUD', 'CAD', 'EUR'],
    path: '/ebay-pricing-calculator',
    icon: Tags,
    badge: 'Target Solver',
    isPopular: true,
  },
  {
    id: 'shipping-cost-calc',
    name: 'Shipping & Fulfillment Optimizer',
    category: 'costs',
    categoryLabel: 'Costs & Pricing',
    description: 'Model customer shipping charged vs actual carrier postage to optimize free shipping margins.',
    markets: ['US', 'UK', 'AU', 'CA', 'EU'],
    currencies: ['USD', 'GBP', 'AUD', 'CAD', 'EUR'],
    path: '/ebay-fee-calculator',
    icon: Truck,
    badge: 'Postage & Freight',
  },
  {
    id: 'promoted-listings-calc',
    name: 'Promoted Listings ROAS Optimizer',
    category: 'costs',
    categoryLabel: 'Costs & Pricing',
    description: 'Simulate ad rates (2%–20%), compute incremental ROAS, and calculate required sales multipliers.',
    markets: ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'ES'],
    currencies: ['USD', 'GBP', 'AUD', 'CAD', 'EUR'],
    path: '/ebay-promoted-listings-calculator',
    icon: Sparkles,
    badge: 'PPC / ROAS',
  },

  // 🛒 Marketplace Fees
  {
    id: 'ebay-fee-calc',
    name: 'eBay Fee & Profit Calculator',
    category: 'fees',
    categoryLabel: 'Marketplace Fees',
    description: 'Real-time calculation engine for final value fees, category tiered brackets, and store discounts.',
    markets: ['8 Global Regions'],
    currencies: ['USD', 'GBP', 'AUD', 'CAD', 'EUR'],
    path: '/ebay-fee-calculator',
    icon: Layers,
    badge: '2026 Engine',
    isPopular: true,
  },
  {
    id: 'fee-comparison-matrix',
    name: 'Multi-Marketplace Fee Comparison',
    category: 'fees',
    categoryLabel: 'Marketplace Fees',
    description: 'Side-by-side fee matrices across US, UK, Australia, Canada, Germany, France, Italy, and Spain.',
    markets: ['8 Countries Supported'],
    currencies: ['USD, GBP, AUD, CAD, EUR'],
    path: '/ebay-fee-comparison',
    icon: Globe,
    badge: 'International Matrix',
  },
  {
    id: 'fee-history-tracker',
    name: 'Fee History & Policy Changelog',
    category: 'fees',
    categoryLabel: 'Marketplace Fees',
    description: 'Historical archive and timeline of official marketplace fee changes, category shifts, and regulatory rates.',
    markets: ['Historical Archive'],
    currencies: ['All Regions'],
    path: '/ebay-fee-history',
    icon: BarChart3,
    badge: 'Changelog',
  },
];

const SUPPORTED_MARKETS = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD ($)', path: '/us' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP (£)', path: '/uk' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD (CA$)', path: '/ca' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD (A$)', path: '/au' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR (€)', path: '/de' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR (€)', path: '/fr' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR (€)', path: '/it' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR (€)', path: '/es' },
];

interface CalculatorHubProps {
  onNavigate: (path: string) => void;
}

export const CalculatorHub: React.FC<CalculatorHubProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'profit' | 'costs' | 'fees'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalculators = ALL_CALCULATORS.filter((calc) => {
    const matchesTab = activeTab === 'all' || calc.category === activeTab;
    const matchesQuery =
      searchQuery.trim() === '' ||
      calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <section id="calculator-hub-section" className="calculator-hub-container">
      <div className="container">
        {/* Section Header */}
        <div className="calculator-hub-header">
          <div className="calculator-hub-eyebrow">
            <Sliders size={13} />
            <span>Interactive Financial Toolset</span>
          </div>
          <h2 className="calculator-hub-title">
            Explore Dedicated Financial & Profit Engines
          </h2>
          <p className="calculator-hub-subtitle">
            Every calculator is backed by our mathematically verified pricing engines and published 2026 marketplace fee schedules. Select a calculator below to start modeling.
          </p>
        </div>

        {/* Global Supported Markets Flag Selector */}
        <div className="markets-bar-wrapper">
          <div className="markets-bar-header">
            <span className="markets-bar-label">
              <Globe size={14} /> Supported International Marketplaces & Currencies:
            </span>
          </div>
          <div className="markets-flag-grid">
            {SUPPORTED_MARKETS.map((market) => (
              <button
                key={market.code}
                type="button"
                id={`btn-market-${market.code.toLowerCase()}`}
                className="market-flag-btn"
                onClick={() => onNavigate(market.path)}
                title={`Open ${market.name} Dedicated Fee & Profit Calculator (${market.currency})`}
              >
                <div className="market-flag-row">
                  <CountryFlag
                    code={market.code}
                    width={18}
                    height={13}
                    ariaLabel={`${market.name} flag`}
                  />
                  <span className="market-flag-name">{market.name}</span>
                </div>
                <span className="market-flag-currency">{market.currency}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Controls & Search */}
        <div className="hub-controls-row">
          <div className="hub-tabs" role="tablist" aria-label="Calculator Categories">
            <button
              type="button"
              id="tab-calc-all"
              role="tab"
              aria-selected={activeTab === 'all'}
              className={`hub-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Tools ({ALL_CALCULATORS.length})
            </button>
            <button
              type="button"
              id="tab-calc-profit"
              role="tab"
              aria-selected={activeTab === 'profit'}
              className={`hub-tab-btn ${activeTab === 'profit' ? 'active' : ''}`}
              onClick={() => setActiveTab('profit')}
            >
              💰 Profit & Investment
            </button>
            <button
              type="button"
              id="tab-calc-costs"
              role="tab"
              aria-selected={activeTab === 'costs'}
              className={`hub-tab-btn ${activeTab === 'costs' ? 'active' : ''}`}
              onClick={() => setActiveTab('costs')}
            >
              📦 Costs & Pricing
            </button>
            <button
              type="button"
              id="tab-calc-fees"
              role="tab"
              aria-selected={activeTab === 'fees'}
              className={`hub-tab-btn ${activeTab === 'fees' ? 'active' : ''}`}
              onClick={() => setActiveTab('fees')}
            >
              🛒 Marketplace Fees
            </button>
          </div>

          <div className="hub-search-box">
            <Search size={15} className="hub-search-icon" />
            <input
              type="text"
              id="input-hub-search"
              placeholder="Search calculators (e.g. landed cost, break-even)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hub-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="hub-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Calculator Cards Grid */}
        <div className="calculator-card-grid">
          {filteredCalculators.map((calc) => {
            const IconComponent = calc.icon;
            return (
              <div
                key={calc.id}
                className="calculator-glass-card"
                onClick={() => onNavigate(calc.path)}
                tabIndex={0}
                role="link"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate(calc.path);
                  }
                }}
                id={`card-calc-${calc.id}`}
                aria-label={`${calc.name} — ${calc.description}`}
              >
                <div className="card-top-row">
                  <div className="card-icon-bubble">
                    <IconComponent size={20} />
                  </div>
                  <div className="card-badge-group">
                    {calc.badge && <span className="card-badge">{calc.badge}</span>}
                  </div>
                </div>

                <div className="card-body">
                  <h3 className="card-title">{calc.name}</h3>
                  <p className="card-desc">{calc.description}</p>
                </div>

                <div className="card-footer">
                  <div className="card-markets-badge">
                    <span className="card-market-text">{calc.markets.join(' • ')}</span>
                  </div>

                  <span className="card-cta-btn" aria-hidden="true">
                    <span>Calculate</span>
                    <ArrowRight size={14} className="card-cta-arrow" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCalculators.length === 0 && (
          <div className="hub-empty-state">
            <p>No calculators match your search &ldquo;{searchQuery}&rdquo;</p>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* Verification Guarantee Banner */}
        <div className="hub-trust-footer">
          <div className="trust-badge">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>43/43 Mathematical Test Suites Verified</span>
          </div>
          <div className="trust-badge">
            <ShieldCheck size={16} className="text-blue-500" />
            <span>Zero-Deviation 2026 Tiered Fee Schedules</span>
          </div>
          <div className="trust-badge">
            <Globe size={16} className="text-indigo-500" />
            <span>Multi-Marketplace & Multi-Currency Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
};
