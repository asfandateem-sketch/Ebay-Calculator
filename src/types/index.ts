export type CountryCode = 'US' | 'UK' | 'AU' | 'CA' | 'DE' | 'FR' | 'IT' | 'ES';

export type SellerLevel = 'standard' | 'top_rated' | 'below_standard';

export type StoreSubscription = 'none' | 'starter' | 'basic' | 'premium' | 'anchor' | 'enterprise';

export interface FeeTier {
  threshold?: number;
  rate: number; // e.g. 0.1325 for 13.25%
}

export interface CategoryFeeRule {
  id: string;
  name: string;
  standardRate: number; // default percentage
  tiers?: FeeTier[]; // tiered percentage (e.g., up to $7,500 at 13.25%, over at 2.35%)
  storeRate?: number;
  storeTiers?: FeeTier[];
  fixedFee: number; // fixed fee per order (e.g. $0.30 or $0.40)
  maxFee?: number; // fee cap if applicable
  insertionFee: number;
  notes?: string;
}

export interface CountryConfig {
  code: CountryCode;
  name: string;
  domain: string;
  currency: {
    code: string;
    symbol: string;
    position: 'before' | 'after';
  };
  flag: string;
  defaultFixedFee: number;
  defaultStandardRate: number;
  internationalFeeRate: number;
  currencyConversionRate: number;
  defaultVatOrTaxRate: number;
  hasBuyerVat: boolean;
  vatName: string; // e.g. "Sales Tax", "VAT", "GST"
  regulatoryOperatingFeeRate?: number; // e.g. 0.0035 for UK / EU regulatory operating fee
  officialSource: string;
  officialSourceUrl: string;
  lastVerified: string;
  effectiveDate: string;
  disclaimer: string;
  categories: CategoryFeeRule[];
  storeDiscounts: Record<StoreSubscription, { discountMultiplier: number; insertionFreeLimit: number; name: string }>;
  topRatedDiscountRate: number; // 0.10 for 10% discount on final value fee
  belowStandardPenaltyRate: number; // 0.05 for +5% FVF penalty
  notes: string[];
}

export interface CalculatorInputs {
  country: CountryCode;
  categoryId: string;
  soldPrice: number;
  shippingCharged: number;
  itemCost: number;
  shippingCost: number;
  otherCosts: number;
  sellerLevel: SellerLevel;
  storeSubscription: StoreSubscription;
  promotedListingRate: number; // percentage (0 - 100)
  isInternational: boolean;
  salesTaxOrVatRate: number; // buyer tax/VAT percentage
  freeMonthlyListingsUsed: boolean;
  quantitySold: number;
}

export interface CalculatorResults {
  // Revenue
  grossRevenue: number; // item price * qty + shipping charged * qty
  buyerTotalWithTax: number; // grossRevenue * (1 + tax)
  
  // Fees
  finalValueFeePercent: number;
  finalValueFeeRateAmount: number;
  finalValueFixedFee: number;
  totalFinalValueFee: number;
  
  topRatedDiscountAmount: number;
  belowStandardPenaltyAmount: number;
  
  promotedListingFee: number;
  internationalFee: number;
  regulatoryOperatingFee: number;
  insertionFee: number;
  
  totalEbayFees: number;
  effectiveFeeRate: number; // total fees / gross revenue
  
  // Costs
  totalItemCost: number;
  totalShippingCost: number;
  totalOtherCost: number;
  buyerTaxAmount: number;
  totalCosts: number; // item + shipping + other + total ebay fees
  
  // Bottom line
  netProfit: number;
  profitMargin: number; // netProfit / grossRevenue
  roi: number; // netProfit / (totalItemCost + totalShippingCost + otherCost)
  
  // Intelligence metrics
  breakEvenPrice: number;
  recommendedPrice20PercentMargin: number;
  recommendedPrice30PercentMargin: number;
  promotedRoas: number;
}

export interface FeeHistoryEntry {
  id: string;
  date: string;
  country: CountryCode;
  category: string;
  title: string;
  previousFee: string;
  newFee: string;
  changeType: 'increase' | 'decrease' | 'policy_change' | 'reduction';
  description: string;
  officialSource: string;
  officialUrl: string;
}

export interface GuideArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  category: 'fees' | 'profit' | 'strategy' | 'international' | 'comparisons';
  readingTime: string;
  lastUpdated: string;
  author: string;
  directAnswer: string;
  formula?: string;
  exampleScenario?: {
    title: string;
    inputs: string[];
    calculation: string[];
    result: string;
  };
  contentSections: {
    heading: string;
    body: string;
    bulletPoints?: string[];
  }[];
  officialSource: string;
  officialUrl: string;
  relatedCalculators: string[];
}
