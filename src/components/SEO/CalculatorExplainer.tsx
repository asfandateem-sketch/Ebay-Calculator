import React from 'react';
import { RouterLink } from '../RouterLink';
import { HelpCircle, BookOpen, Layers, Target, CheckCircle2, ArrowRight } from 'lucide-react';

export type ExplainerType = 'fee' | 'profit' | 'breakeven' | 'pricing' | 'promoted' | 'ecommerce' | 'country';

interface RelatedLink {
  to: string;
  title: string;
  description: string;
}

interface ExplainerContent {
  eyebrow: string;
  heading: string;
  whatIsIt: string;
  whatItCalculates: string[];
  whoIsItFor: string[];
  requiredInputs: string[];
  howToInterpret: string[];
  relatedCalculators: RelatedLink[];
  relatedGuides: RelatedLink[];
}

const EXPLAINER_DATA: Record<ExplainerType, ExplainerContent> = {
  fee: {
    eyebrow: 'Calculation Methodology & Guide',
    heading: 'How the 2026 eBay Fee Calculator Works',
    whatIsIt:
      'The Seller Margin Calculator Fee Calculator is a dedicated mathematical engine designed to compute exact eBay selling costs under current 2026 Managed Payments rules. It models category-specific tier rates, fixed transaction fees, store subscription discounts, and sales tax multipliers across 8 global marketplaces.',
    whatItCalculates: [
      'Category-specific Final Value Fees (e.g., 13.25% standard, 9.0%–12.35% with Basic+ Store)',
      'Fixed per-order transaction fees ($0.30 for orders ≤ $10.00; $0.40 for orders > $10.00 in US)',
      'eBay Managed Payments deductions and sales tax base adjustments',
      'Promoted Listings Standard advertising fees based on seller ad rate',
      'International cross-border fees and regulatory operating surcharges',
      'Effective fee rate percentage against gross buyer payment',
    ],
    whoIsItFor: [
      'Casual resellers and flipping hobbyists checking fee deductions before listing items',
      'Full-time eBay Store subscribers evaluating subscription tier ROI',
      'Multi-channel e-commerce merchants comparing eBay selling costs against other platforms',
      'Cross-border exporters shipping to international buyers with localized fee schedules',
    ],
    requiredInputs: [
      'Sale Price: The final listing or accepted offer price of the item',
      'Shipping Charged: Shipping fee collected from the buyer (if not offering free shipping)',
      'Item Category: Determines the exact final value fee percentage tier',
      'Store Level: Individual seller (no store), Starter, Basic, Premium, Anchor, or Enterprise',
      'Item Cost (COGS) & Shipping Cost: Sourcing and shipping label expenses (optional for fee-only analysis)',
    ],
    howToInterpret: [
      'Total eBay Fees: The exact dollar sum deducted by eBay from the transaction before payout',
      'Effective Fee Rate: Total fees divided by gross revenue — compare this against your gross margin',
      'Net Payout: Gross customer payment minus total eBay fees before your inventory/shipping costs',
    ],
    relatedCalculators: [
      {
        to: '/ebay-profit-calculator',
        title: 'eBay Profit Calculator',
        description: 'Factor in product sourcing costs (COGS) and shipping labels to calculate net take-home margin and ROI.',
      },
      {
        to: '/ebay-break-even-calculator',
        title: 'Break-Even Calculator',
        description: 'Find the absolute minimum selling price required to avoid losing money on an item.',
      },
      {
        to: '/ebay-pricing-calculator',
        title: 'Target Pricing Calculator',
        description: 'Reverse-calculate the required list price to hit your specific profit margin targets (e.g., 25% or 35%).',
      },
      {
        to: '/ebay-promoted-listings-calculator',
        title: 'Promoted Listings Calculator',
        description: 'Analyze ad fee deductions and required sales velocity lift across various ad rates.',
      },
    ],
    relatedGuides: [
      {
        to: '/articles/how-much-does-ebay-charge-sellers',
        title: 'How Much Does eBay Charge Sellers in 2026?',
        description: 'Comprehensive breakdown of insertion fees, final value fees, and optional feature upgrades.',
      },
      {
        to: '/articles/how-ebay-final-value-fees-work',
        title: 'How eBay Final Value Fees Work: Complete 2026 Guide',
        description: 'Understand how eBay applies fee percentages to total amount paid including sales tax and shipping.',
      },
    ],
  },
  profit: {
    eyebrow: 'Profit Intelligence & Margin Analysis',
    heading: 'How to Calculate Your True eBay Net Profit and ROI',
    whatIsIt:
      'The eBay Profit & Margin Calculator provides complete bottom-line financial intelligence by subtracting Cost of Goods Sold (COGS), actual shipping label costs, packaging materials, and total marketplace fees from gross revenue to reveal real net income.',
    whatItCalculates: [
      'Gross Transaction Revenue (Item price + shipping collected from buyer)',
      'Total Marketplace Deductions (Final value fees, fixed per-order fees, ad fees)',
      'Total Direct Expenses (Inventory acquisition cost, shipping label, poly mailers, bubble wrap)',
      'Net Dollar Profit: The exact cash remaining in your business bank account',
      'Net Profit Margin Percentage: (Net Profit / Gross Revenue) × 100',
      'Return on Investment (ROI): (Net Profit / Total Direct Costs) × 100',
    ],
    whoIsItFor: [
      'Inventory managers and e-commerce entrepreneurs aiming for sustainable cash flow',
      'Resellers sourcing from garage sales, thrift stores, and wholesale liquidation auctions',
      'Online businesses deciding whether a product meets minimum margin thresholds before purchasing stock',
    ],
    requiredInputs: [
      'Sold Price & Shipping Charged: Total customer payment',
      'Item Acquisition Cost (COGS): What you paid for the product',
      'Shipping Label Cost: What you pay the carrier (USPS, UPS, FedEx, Royal Mail, etc.)',
      'Packaging & Other Costs: Boxes, tape, label printing, storage, and handling',
      'Promoted Listing Ad Rate (if active): Additional percentage allocated for advertising',
    ],
    howToInterpret: [
      'Healthy Reseller Benchmark: Aim for at least 20%–35% net profit margin on used/vintage goods and 15%–25% on new retail goods',
      'ROI Benchmark: An ROI of 100%+ means your capital doubled; an ROI under 20% may indicate high capital risk for low dollar returns',
      'Negative Margin: If net profit is in red, increase listing price or negotiate lower sourcing/shipping costs immediately',
    ],
    relatedCalculators: [
      {
        to: '/ebay-fee-calculator',
        title: 'eBay Fee Calculator',
        description: 'Focus purely on fee category tiers, store subscription discounts, and sales tax multiplier effects.',
      },
      {
        to: '/ebay-break-even-calculator',
        title: 'Break-Even Calculator',
        description: 'Discover the zero-profit floor price below which you lose money on inventory.',
      },
      {
        to: '/ecommerce-investment-profit-calculator',
        title: 'E-commerce Investment Calculator',
        description: 'Calculate landed costs, bulk inventory capital, and multi-unit monthly profit projections.',
      },
    ],
    relatedGuides: [
      {
        to: '/articles/how-to-calculate-ebay-profit',
        title: 'How to Calculate eBay Profit: Net Margins & ROI Guide',
        description: 'Step-by-step formula and worked examples for calculating true seller earnings accurately.',
      },
      {
        to: '/articles/how-to-price-products-on-ebay',
        title: 'How to Price Products on eBay for Maximum Profit',
        description: 'Pricing psychology, competitive analysis, and balancing margins against sales velocity.',
      },
    ],
  },
  breakeven: {
    eyebrow: 'Risk Mitigation & Liquidation Floor',
    heading: 'Understanding Your eBay Break-Even Selling Price',
    whatIsIt:
      'The eBay Break-Even Calculator solves for the exact minimum price you must charge so that Net Profit equals exactly $0.00. Selling below this threshold results in an out-of-pocket loss.',
    whatItCalculates: [
      'Exact Zero-Profit Listing Price Floor',
      'Total fees incurred at the break-even price point (accounting for circular fee dependencies)',
      'Total cost recovery (Product COGS + Shipping Label + Packaging Materials)',
      'Minimum viable counter-offer price when negotiating with prospective buyers',
    ],
    whoIsItFor: [
      'Sellers running clearance promotions or clearing stale, slow-moving inventory',
      'Liquidators and auction bidders determining the maximum safe purchase cost for an item',
      'Sellers negotiating "Best Offer" submissions to ensure counteroffers stay profitable',
    ],
    requiredInputs: [
      'Item Purchase Cost: Sourcing cost paid per unit',
      'Actual Shipping Label Cost: Out-of-pocket carrier postage expense',
      'Packaging / Handling Expense: Bubble wrap, boxes, mailers, and label supplies',
      'Category & Store Subscription: Applicable fee percentage rates and fixed fees',
    ],
    howToInterpret: [
      'Break-Even Price: Any sale at this exact price recoups all direct expenses without making or losing money',
      'Pricing Safety Buffer: Add a 15%–30% margin above the break-even price for standard catalog listings',
      'Best Offer Floor: Never accept a customer offer lower than your calculated break-even floor',
    ],
    relatedCalculators: [
      {
        to: '/ebay-pricing-calculator',
        title: 'Target Pricing Calculator',
        description: 'Solve for the listing price that yields a specific profit margin (e.g., 20%, 30%, 40%).',
      },
      {
        to: '/ebay-profit-calculator',
        title: 'eBay Profit Calculator',
        description: 'Calculate net earnings, margins, and ROI at your current listing price.',
      },
      {
        to: '/ebay-fee-comparison',
        title: 'Fee Comparison Matrix',
        description: 'Compare eBay break-even thresholds against other international marketplaces.',
      },
    ],
    relatedGuides: [
      {
        to: '/articles/how-to-calculate-ebay-break-even-price',
        title: 'How to Calculate eBay Break-Even Price: Formula & Examples',
        description: 'Mathematical derivation of the zero-profit formula with practical real-world seller scenarios.',
      },
      {
        to: '/articles/how-much-does-ebay-charge-sellers',
        title: 'How Much Does eBay Charge Sellers in 2026?',
        description: 'Detailed analysis of all variable and fixed fees that factor into break-even calculations.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Revenue Optimization & Pricing Strategy',
    heading: 'How to Use Target Pricing to Hit Your Margin Goals',
    whatIsIt:
      'The eBay Pricing Calculator reverse-engineers the required listing price needed to achieve your specific financial goals — whether you want a fixed dollar profit (e.g., $25 per sale) or a specific profit margin percentage (e.g., 30% margin).',
    whatItCalculates: [
      'Exact required listing price for any target net margin (10%, 20%, 30%, 40%, 50%+)',
      'Exact required listing price for a specific dollar profit target',
      'Fee escalation impact: How marketplace fees increase as listing price rises',
      'Estimated net payout at the recommended target price',
    ],
    whoIsItFor: [
      'Brand owners and wholesale distributors establishing catalog retail pricing (MSRP)',
      'High-volume sellers standardizing pricing tiers across thousands of SKUs',
      'Merchants testing promotional price elasticity without eroding profit margins',
    ],
    requiredInputs: [
      'Item Sourcing Cost (COGS): Unit purchase price',
      'Shipping Label Cost: Outbound carrier postage',
      'Packaging Expenses: Packaging material costs',
      'Target Margin (%): The desired net profit percentage (e.g., 25%) OR target dollar amount',
      'Product Category: Determines percentage fee schedule',
    ],
    howToInterpret: [
      'Recommended List Price: Set this as your Buy It Now price to achieve the desired margin',
      'Market Comparison: Check if the recommended price is competitive against current completed/sold listings on eBay',
      'Cost Reduction Strategy: If the target price is too high for the market, focus on reducing shipping or sourcing costs',
    ],
    relatedCalculators: [
      {
        to: '/ebay-profit-calculator',
        title: 'eBay Profit Calculator',
        description: 'Verify your profit margin and ROI at different test prices.',
      },
      {
        to: '/ebay-break-even-calculator',
        title: 'Break-Even Calculator',
        description: 'Find your absolute floor price before applying target markup.',
      },
      {
        to: '/ebay-promoted-listings-calculator',
        title: 'Promoted Listings Calculator',
        description: 'Factor in ad spend percentages when determining final listing prices.',
      },
    ],
    relatedGuides: [
      {
        to: '/articles/how-to-price-products-on-ebay',
        title: 'How to Price Products on eBay for Maximum Profit',
        description: 'Comprehensive pricing guide covering Buy It Now vs Auction strategies and psychological price points.',
      },
      {
        to: '/articles/how-to-calculate-ebay-profit',
        title: 'How to Calculate eBay Profit: Net Margins & ROI Guide',
        description: 'Understand the mathematical relationship between gross margin, markup, and net profit.',
      },
    ],
  },
  promoted: {
    eyebrow: 'Advertising ROI & Ad Fee Optimization',
    heading: 'How to Optimize eBay Promoted Listings Standard Fees',
    whatIsIt:
      'The eBay Promoted Listings Calculator evaluates the financial impact of eBay Promoted Listings Standard ad campaigns. It models ad fee deductions against profit margins and calculates the sales velocity lift required to maintain total dollar profitability.',
    whatItCalculates: [
      'Ad Fee Deduction: The exact dollar fee eBay charges when an ad click converts to a sale within 30 days',
      'Profit Margin Compression: How each additional ad percentage point impacts your net margin',
      'Net Profit After Advertising: Take-home profit per unit with active ad spend',
      'Required Velocity Lift: The increase in sales volume needed to offset compressed unit margins',
    ],
    whoIsItFor: [
      'Sellers in competitive categories (Electronics, Fashion, Collectibles, Home Goods) seeking search visibility',
      'Merchants launching new product listings with zero initial sales history or reviews',
      'Store owners balancing advertising spend against organic sales rank velocity',
    ],
    requiredInputs: [
      'Item Sold Price: Final retail price',
      'Promoted Listing Ad Rate (%): Selected ad rate percentage (eBay minimum is 2%)',
      'Cost of Goods Sold (COGS) & Shipping: Direct unit fulfillment expenses',
      'Standard Fee Category: Baseline final value fee schedule',
    ],
    howToInterpret: [
      'Ad Fee vs Profit: Ensure the ad rate percentage does not consume more than 20%–30% of your gross margin',
      'Suggested Ad Rate: eBay recommends ad rates based on category averages; start lower (2%–5%) and adjust based on conversion data',
      'Margin Buffer: Maintain at least a 15% net margin after all advertising deductions for sustainable operations',
    ],
    relatedCalculators: [
      {
        to: '/ebay-fee-calculator',
        title: 'eBay Fee Calculator',
        description: 'Model baseline marketplace fee deductions before adding advertising campaigns.',
      },
      {
        to: '/ebay-profit-calculator',
        title: 'eBay Profit Calculator',
        description: 'Analyze complete net profit margins and return on investment.',
      },
      {
        to: '/ebay-pricing-calculator',
        title: 'Target Pricing Calculator',
        description: 'Adjust your listing price to absorb advertising costs while protecting target margins.',
      },
    ],
    relatedGuides: [
      {
        to: '/articles/ebay-promoted-listings-fees',
        title: 'eBay Promoted Listings Fees: Complete 2026 Ad Guide',
        description: 'Deep dive into Promoted Listings Standard vs Advanced, attribution windows, and optimization strategies.',
      },
      {
        to: '/articles/how-to-calculate-ebay-profit',
        title: 'How to Calculate eBay Profit: Net Margins & ROI Guide',
        description: 'Learn how to incorporate advertising and marketing costs into standard profit formulas.',
      },
    ],
  },
  ecommerce: {
    eyebrow: 'Landed Cost & Capital Modeling',
    heading: 'How to Calculate Landed Cost and E-commerce Startup Capital',
    whatIsIt:
      'The E-commerce Investment & Profit Calculator helps online sellers, brand founders, and importers compute true landed unit costs (FOB sourcing + freight + customs tariffs + prep), total initial capital requirements, monthly profit projections, and inventory break-even velocity.',
    whatItCalculates: [
      'True Landed Cost Per Unit: Sourcing cost + freight allocation + import duty + packaging/prep',
      'Total Inventory Capital Required: Total cash needed to finance a production run',
      'Projected Monthly Gross Revenue and Net Profit based on estimated unit sales velocity',
      'Unit Profit Margin and Return on Invested Capital (ROIC)',
      'Break-Even Units: Number of units that must be sold to recoup 100% of upfront inventory investment',
    ],
    whoIsItFor: [
      'Private label entrepreneurs sourcing inventory from overseas manufacturers (e.g., Alibaba)',
      'Wholesale distributors purchasing master cases and pallet-sized inventory batches',
      'E-commerce business owners projecting annual cash flow and working capital cycles',
    ],
    requiredInputs: [
      'FOB Unit Cost: Manufacturer price per piece',
      'Batch Quantity: Total units ordered in production run',
      'International Freight & Logistics: Ocean/air shipping cost',
      'Customs Duty & Import Tariffs (%): Applicable tariff rate based on Harmonized Tariff Schedule (HTS)',
      'Domestic 3PL / Warehousing Prep: Inspection, barcode labeling, and pallet handling fees',
      'Target Selling Price: Planned retail selling price on eBay, Amazon, or Shopify',
    ],
    howToInterpret: [
      'Landed Cost vs Retail: Aim for a retail price of at least 3x–4x your landed unit cost to cover platform fees, ads, and profit',
      'Capital Recoup Period: Track how many days of sales velocity are needed to break even on batch capital',
      'Safety Stock: Keep at least 20% of your capital in reserve for reorders and unexpected logistics surcharges',
    ],
    relatedCalculators: [
      {
        to: '/ebay-fee-calculator',
        title: 'eBay Fee Calculator',
        description: 'Calculate marketplace fees for selling your inventory on eBay.',
      },
      {
        to: '/ebay-fee-comparison',
        title: 'Multi-Marketplace Fee Comparison',
        description: 'Compare fee schedules across eBay, Amazon, Etsy, and Walmart.',
      },
      {
        to: '/tools/downloadable-resources',
        title: 'Downloadable Spreadsheets',
        description: 'Free Excel and Google Sheets templates for inventory tracking and batch cost modeling.',
      },
    ],
    relatedGuides: [
      {
        to: '/articles/ebay-fees-vs-other-marketplaces',
        title: 'eBay Fees vs Other Marketplaces: 2026 Platform Comparison',
        description: 'Comprehensive cost and fee analysis comparing eBay, Amazon, Etsy, and Walmart.',
      },
      {
        to: '/articles/how-to-price-products-on-ebay',
        title: 'How to Price Products on eBay for Maximum Profit',
        description: 'Strategic pricing frameworks for private label and wholesale merchandise.',
      },
    ],
  },
  country: {
    eyebrow: 'International Marketplace Details',
    heading: 'International eBay Marketplace Fee Structure',
    whatIsIt:
      'eBay operates localized fee schedules across each of its international marketplaces. Rates, fixed transaction fees, value-added taxes (VAT/GST), and category structures differ significantly between regions.',
    whatItCalculates: [
      'Localized Final Value Fee percentages and tiered category caps',
      'Local currency fixed per-order fees (e.g. £0.30 in UK, AU$0.33 in Australia, €0.35 in Eurozone)',
      'VAT / GST inclusion requirements in item pricing and sales tax handling',
      'Private vs Business seller fee differences where applicable',
    ],
    whoIsItFor: [
      'Sellers operating stores in specific countries (US, UK, Australia, Canada, Germany, France, Italy, Spain)',
      'Cross-border exporters shipping globally through eBay International Shipping (EIS) or Global Shipping Program',
      'International merchants expanding catalog distribution into multiple regional marketplaces',
    ],
    requiredInputs: [
      'Item Sale Price: Local currency selling price',
      'Shipping Charge: Outbound delivery fee charged to customer',
      'Category: Local marketplace category taxonomy',
      'Store Subscription Level: Local store subscription package',
    ],
    howToInterpret: [
      'Effective Fee: Fee deduction evaluated in local currency',
      'Tax Treatment: Note whether selling price must include VAT/GST by law (e.g., UK, EU, Australia)',
      'Cross-Border Rates: Additional international fee percentages apply when selling to foreign buyers',
    ],
    relatedCalculators: [
      {
        to: '/ebay-fee-comparison',
        title: 'International Fee Comparison',
        description: 'Direct side-by-side comparison of fees across all 8 supported countries.',
      },
      {
        to: '/ebay-profit-calculator',
        title: 'eBay Profit Calculator',
        description: 'Calculate net margins and take-home income in your local currency.',
      },
      {
        to: '/ebay-break-even-calculator',
        title: 'Break-Even Calculator',
        description: 'Determine your local zero-profit liquidation floor price.',
      },
    ],
    relatedGuides: [
      {
        to: '/articles/ebay-international-selling-fees',
        title: 'eBay International Selling Fees & Cross-Border Guide',
        description: 'Everything you need to know about foreign transaction fees, currency conversion, and global shipping.',
      },
      {
        to: '/articles/how-much-does-ebay-charge-sellers',
        title: 'How Much Does eBay Charge Sellers in 2026?',
        description: 'Standard domestic and international fee policies across major marketplaces.',
      },
    ],
  },
};

interface CalculatorExplainerProps {
  type: ExplainerType;
  onNavigate?: (path: string) => void;
  customHeading?: string;
  customWhatIsIt?: string;
}

export const CalculatorExplainer: React.FC<CalculatorExplainerProps> = ({
  type,
  onNavigate,
  customHeading,
  customWhatIsIt,
}) => {
  const data = EXPLAINER_DATA[type] || EXPLAINER_DATA.fee;

  return (
    <div className="calculator-explainer-section" style={{ marginTop: '48px', marginBottom: '48px' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '28px' }}>
        <div className="section-eyebrow">
          <HelpCircle size={13} />
          <span>{data.eyebrow}</span>
        </div>
        <h2 className="section-title" style={{ fontSize: '24px', marginBottom: '12px' }}>
          {customHeading || data.heading}
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--color-text-body)' }}>
          {customWhatIsIt || data.whatIsIt}
        </p>
      </div>

      {/* 4-Card Structured Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '36px',
        }}
      >
        {/* 1. What It Calculates */}
        <div className="calc-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--color-primary)', fontWeight: 600 }}>
            <Layers size={18} />
            <h3 style={{ fontSize: '16px', margin: 0 }}>What It Calculates</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.whatItCalculates.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', lineHeight: 1.5, color: 'var(--color-text-body)' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Who It Is For */}
        <div className="calc-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--color-primary)', fontWeight: 600 }}>
            <Target size={18} />
            <h3 style={{ fontSize: '16px', margin: 0 }}>Who It Is For</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.whoIsItFor.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', lineHeight: 1.5, color: 'var(--color-text-body)' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Required Inputs */}
        <div className="calc-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--color-primary)', fontWeight: 600 }}>
            <HelpCircle size={18} />
            <h3 style={{ fontSize: '16px', margin: 0 }}>Required Inputs</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.requiredInputs.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', lineHeight: 1.5, color: 'var(--color-text-body)' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. How to Interpret Results */}
        <div className="calc-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--color-primary)', fontWeight: 600 }}>
            <BookOpen size={18} />
            <h3 style={{ fontSize: '16px', margin: 0 }}>Interpreting Results</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.howToInterpret.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', lineHeight: 1.5, color: 'var(--color-text-body)' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contextual Internal Links Section */}
      <div style={{ marginTop: '36px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: 'var(--color-primary)' }}>
          Related Calculators & Strategy Guides
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {data.relatedCalculators.map((link, idx) => (
            <RouterLink
              key={idx}
              to={link.to}
              className="calc-card"
              style={{
                padding: '18px 20px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-primary)' }}>
                    {link.title}
                  </span>
                  <ArrowRight size={14} style={{ color: 'var(--color-primary)' }} />
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                  {link.description}
                </p>
              </div>
            </RouterLink>
          ))}

          {data.relatedGuides.map((guide, idx) => (
            <RouterLink
              key={`guide-${idx}`}
              to={guide.to}
              className="calc-card"
              style={{
                padding: '18px 20px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-primary)' }}>
                    {guide.title}
                  </span>
                  <ArrowRight size={14} style={{ color: 'var(--color-primary)' }} />
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                  {guide.description}
                </p>
              </div>
            </RouterLink>
          ))}
        </div>
      </div>
    </div>
  );
};
