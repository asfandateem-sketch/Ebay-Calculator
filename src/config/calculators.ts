import {
  DollarSign,
  TrendingUp,
  Target,
  Percent,
  Package,
  Tags,
  Truck,
  Sparkles,
  Layers,
  Globe,
  BarChart3,
  PieChart,
  LucideIcon,
} from 'lucide-react';

export interface CalculatorDefinition {
  id: string;
  name: string;
  shortName: string;
  category: 'core' | 'profit' | 'pricing' | 'marketplace';
  categoryLabel: string;
  path: string;
  aliases: string[];
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  iconName: string;
  badge?: string;
  isPopular?: boolean;
  markets: string[];
  currencies: string[];
}

export const ALL_CALCULATORS: CalculatorDefinition[] = [
  // 💰 Core & Profit Engines
  {
    id: 'ecommerce-profit-calculator',
    name: 'Ecommerce Profit Calculator',
    shortName: 'Ecommerce Profit',
    category: 'core',
    categoryLabel: 'Core Profit & Margins',
    path: '/ecommerce-profit-calculator',
    aliases: ['/ecommerce-investment-profit-calculator', '/ecommerce-calculator', '/investment-calculator'],
    description: 'Calculate net cash profit, margins, landed costs, channel commissions, and advertising expenses.',
    metaTitle: 'Ecommerce Profit Calculator (2026 Free) | SellerMarginCalc',
    metaDescription: 'Calculate true ecommerce net profit, margins, and cash flow after deducting supplier costs, marketplace commissions, and ad spend.',
    keywords: 'ecommerce profit calculator, product profit calculator, seller profit calculator, calculate ecommerce profit, net profit margin',
    iconName: 'DollarSign',
    badge: 'Comprehensive',
    isPopular: true,
    markets: ['US', 'UK', 'CA', 'AU', 'EU'],
    currencies: ['USD ($)', 'Multi-currency'],
  },
  {
    id: 'seller-margin-calculator',
    name: 'Seller Margin Calculator',
    shortName: 'Seller Margin',
    category: 'core',
    categoryLabel: 'Core Profit & Margins',
    path: '/seller-margin-calculator',
    aliases: ['/ebay-profit-calculator', '/profit'],
    description: 'Analyze net margin percentages, markup rates, and profit per item across store subscription tiers.',
    metaTitle: 'Seller Margin Calculator — Calculate Ecommerce Profit Margins | SellerMarginCalc',
    metaDescription: 'Calculate net seller margins, gross margin percentages, markup ratios, and return on investment across international marketplaces.',
    keywords: 'seller margin calculator, ecommerce profit margin calculator, ecommerce margin calculator, calculate profit margin, markup calculator',
    iconName: 'Percent',
    badge: 'Margin Optimizer',
    isPopular: true,
    markets: ['8 Global Regions'],
    currencies: ['USD', 'GBP', 'AUD', 'CAD', 'EUR'],
  },
  {
    id: 'marketplace-fee-calculator',
    name: 'Marketplace Fee Calculator',
    shortName: 'Marketplace Fees',
    category: 'marketplace',
    categoryLabel: 'Marketplace Fees',
    path: '/marketplace-fee-calculator',
    aliases: ['/ebay-fee-calculator', '/seller-fee-calculator', '/calculator'],
    description: 'Real-time calculation engine for final value fees, category tiered brackets, and store discounts across 8 countries.',
    metaTitle: 'Marketplace Fee Calculator (2026 Free) | SellerMarginCalc',
    metaDescription: 'Calculate accurate marketplace final value fees, managed payment fees ($0.30-$0.40), category tiers, and store discounts across 8 countries.',
    keywords: 'marketplace fee calculator, seller fee calculator, ebay fee calculator 2026, selling fees calculator, calculate marketplace fees',
    iconName: 'Layers',
    badge: '2026 Schedule',
    isPopular: true,
    markets: ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'ES'],
    currencies: ['USD', 'GBP', 'AUD', 'CAD', 'EUR'],
  },
  {
    id: 'product-pricing-calculator',
    name: 'Product Pricing Calculator',
    shortName: 'Product Pricing',
    category: 'pricing',
    categoryLabel: 'Pricing & Solvers',
    path: '/product-pricing-calculator',
    aliases: ['/ebay-pricing-calculator', '/pricing'],
    description: 'Reverse-engineer the optimal listing price required to hit custom 20%, 25%, 30%+ profit targets.',
    metaTitle: 'Product Pricing Calculator — Target Margin Selling Price Solver | SellerMarginCalc',
    metaDescription: 'Find the exact listing price required to hit your target profit dollar amount or net margin percentage after all marketplace deductions.',
    keywords: 'product pricing calculator, target profit price calculator, ecommerce pricing calculator, selling price solver, optimal listing price',
    iconName: 'Tags',
    badge: 'Target Solver',
    isPopular: true,
    markets: ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'ES'],
    currencies: ['USD', 'GBP', 'AUD', 'CAD', 'EUR'],
  },
  {
    id: 'ecommerce-roi-calculator',
    name: 'Ecommerce ROI & Payback Calculator',
    shortName: 'ROI & Payback',
    category: 'profit',
    categoryLabel: 'Profit & Investment',
    path: '/ecommerce-roi-calculator',
    aliases: [],
    description: 'Determine monthly ROI, annualized returns, and exact months required to recoup inventory capital.',
    metaTitle: 'Ecommerce ROI Calculator — Return on Capital & Payback Period | SellerMarginCalc',
    metaDescription: 'Calculate return on investment (ROI), inventory payback velocity, and annualized returns for ecommerce product batches.',
    keywords: 'ecommerce roi calculator, inventory roi calculator, seller return on investment, ecommerce payback period, capital recovery',
    iconName: 'TrendingUp',
    badge: 'Capital Recovery',
    markets: ['US', 'UK', 'CA', 'AU', 'EU'],
    currencies: ['USD ($)', 'All Currencies'],
  },
  {
    id: 'ecommerce-break-even-calculator',
    name: 'Break-Even Price Solver',
    shortName: 'Break-Even',
    category: 'pricing',
    categoryLabel: 'Pricing & Solvers',
    path: '/ecommerce-break-even-calculator',
    aliases: ['/ebay-break-even-calculator', '/breakeven', '/break-even'],
    description: 'Calculate the minimum floor selling price to cover all marketplace fees, taxes, and shipping expenses.',
    metaTitle: 'Break-Even Calculator — Zero-Loss Selling Floor Solver | SellerMarginCalc',
    metaDescription: 'Find your exact break-even selling price where net profit equals $0.00. Protect margins by covering product costs, fees, and shipping.',
    keywords: 'ecommerce break even calculator, break even selling price, zero profit price solver, break even calculator ebay',
    iconName: 'Target',
    badge: 'Zero-Loss Floor',
    isPopular: true,
    markets: ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'ES'],
    currencies: ['USD', 'GBP', 'AUD', 'CAD', 'EUR'],
  },
  {
    id: 'landed-cost-calculator',
    name: 'True Landed Cost Calculator',
    shortName: 'Landed Cost',
    category: 'core',
    categoryLabel: 'Costs & Sourcing',
    path: '/landed-cost-calculator',
    aliases: [],
    description: 'Accurately aggregate supplier unit costs, ocean/air freight, customs tariffs, and port handling fees.',
    metaTitle: 'True Landed Cost Calculator — Sourcing & Import Cost Engine | SellerMarginCalc',
    metaDescription: 'Calculate true landed cost per unit including supplier pricing, freight shipping, customs duties, tariffs, and handling fees.',
    keywords: 'landed cost calculator, import cost calculator, unit landed cost, product sourcing calculator, cogs calculator',
    iconName: 'Package',
    badge: 'Sourcing / Import',
    isPopular: true,
    markets: ['US', 'UK', 'CA', 'AU', 'EU'],
    currencies: ['USD ($)', 'Multi-currency'],
  },
  {
    id: 'promoted-listings-calculator',
    name: 'Promoted Listings Ad Calculator',
    shortName: 'Promoted Ads',
    category: 'pricing',
    categoryLabel: 'Advertising & ROAS',
    path: '/promoted-listings-calculator',
    aliases: ['/ebay-promoted-listings-calculator', '/promoted-listings', '/promoted'],
    description: 'Simulate ad rates (2%–20%), compute incremental ROAS, and calculate required sales multipliers.',
    metaTitle: 'Promoted Listings Ad Calculator — ROAS & Ad Rate Optimizer | SellerMarginCalc',
    metaDescription: 'Optimize sponsored product and promoted listing ad rates, calculate net margin impact, break-even ROAS, and sales velocity.',
    keywords: 'promoted listings calculator, ebay ad rate calculator, sponsored ads roas calculator, advertising fee calculator',
    iconName: 'Sparkles',
    badge: 'PPC / ROAS',
    markets: ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'ES'],
    currencies: ['USD', 'GBP', 'AUD', 'CAD', 'EUR'],
  },
  {
    id: 'fee-comparison-matrix',
    name: 'Multi-Marketplace Fee Comparison',
    shortName: 'Fee Matrix',
    category: 'marketplace',
    categoryLabel: 'Marketplace Fees',
    path: '/ebay-fee-comparison',
    aliases: ['/comparison'],
    description: 'Side-by-side fee matrices across US, UK, Australia, Canada, Germany, France, Italy, and Spain.',
    metaTitle: 'Multi-Marketplace Fee Comparison Matrix (8 Countries) | SellerMarginCalc',
    metaDescription: 'Compare seller fees side-by-side across 8 major international marketplaces including US, UK, Canada, Australia, and Europe.',
    keywords: 'marketplace fee comparison, international selling fees, ebay fee comparison matrix, seller fee rates by country',
    iconName: 'Globe',
    badge: '8 Markets',
    markets: ['8 Countries Supported'],
    currencies: ['USD, GBP, AUD, CAD, EUR'],
  },
  {
    id: 'fee-history-tracker',
    name: 'Fee History & Policy Changelog',
    shortName: 'Fee History',
    category: 'marketplace',
    categoryLabel: 'Marketplace Fees',
    path: '/ebay-fee-history',
    aliases: ['/history'],
    description: 'Historical archive and timeline of official marketplace fee changes, category shifts, and regulatory rates.',
    metaTitle: 'Marketplace Fee History & Policy Changelog Archive | SellerMarginCalc',
    metaDescription: 'Explore historical marketplace fee schedules, category rate changes, and policy updates from 2021 to 2026.',
    keywords: 'ebay fee history, marketplace fee changes, fee policy archive, fee rate increases history',
    iconName: 'BarChart3',
    badge: 'Archive',
    markets: ['Historical Archive'],
    currencies: ['All Regions'],
  },
];

export const COUNTRY_MARKETPLACES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', path: '/us', currency: 'USD ($)', domain: 'ebay.com' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', path: '/uk', currency: 'GBP (£)', domain: 'ebay.co.uk' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', path: '/ca', currency: 'CAD (CA$)', domain: 'ebay.ca' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', path: '/au', currency: 'AUD (A$)', domain: 'ebay.com.au' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', path: '/de', currency: 'EUR (€)', domain: 'ebay.de' },
  { code: 'FR', name: 'France', flag: '🇫🇷', path: '/fr', currency: 'EUR (€)', domain: 'ebay.fr' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', path: '/it', currency: 'EUR (€)', domain: 'ebay.it' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', path: '/es', currency: 'EUR (€)', domain: 'ebay.es' },
];

/**
 * Finds a calculator definition by its canonical path or any recognized route alias
 */
export function getCalculatorByPath(path: string): CalculatorDefinition | undefined {
  const normalized = path.startsWith('/') ? path.toLowerCase() : `/${path.toLowerCase()}`;
  return ALL_CALCULATORS.find(
    (calc) => calc.path.toLowerCase() === normalized || calc.aliases.some((alias) => alias.toLowerCase() === normalized)
  );
}

/**
 * Finds a calculator definition by ID
 */
export function getCalculatorById(id: string): CalculatorDefinition | undefined {
  return ALL_CALCULATORS.find((calc) => calc.id === id);
}
