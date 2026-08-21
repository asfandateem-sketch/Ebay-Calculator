import { CountryConfig } from '../../types';

export const auFeeConfig: CountryConfig = {
  code: 'AU',
  name: 'Australia',
  domain: 'ebay.com.au',
  currency: {
    code: 'AUD',
    symbol: 'AU$',
    position: 'before',
  },
  flag: '🇦🇺',
  defaultFixedFee: 0.33, // 33c fixed fee including GST
  defaultStandardRate: 0.134, // 13.4% standard non-store
  internationalFeeRate: 0.0165,
  currencyConversionRate: 0.03,
  defaultVatOrTaxRate: 0.10, // 10% Australian GST
  hasBuyerVat: true,
  vatName: 'Australian GST',
  officialSource: 'eBay Australia Help — Fees for Selling on eBay',
  officialSourceUrl: 'https://www.ebay.com/help/selling/fees-credits-invoices/fees-selling-ebay?id=4364',
  lastVerified: 'August 2026',
  effectiveDate: '2024-03-01',
  disclaimer: 'Calculations for eBay Australia include 10% GST on seller fees and standard Managed Payments schedules.',
  topRatedDiscountRate: 0.10,
  belowStandardPenaltyRate: 0.05,
  storeDiscounts: {
    none: { discountMultiplier: 1.0, insertionFreeLimit: 40, name: 'Casual Seller (No Store)' },
    starter: { discountMultiplier: 0.95, insertionFreeLimit: 100, name: 'Basic Store (AU$24.95/mo)' },
    basic: { discountMultiplier: 0.90, insertionFreeLimit: 600, name: 'Featured Store (AU$54.95/mo)' },
    premium: { discountMultiplier: 0.85, insertionFreeLimit: 2500, name: 'Anchor Store (AU$549.95/mo)' },
    anchor: { discountMultiplier: 0.80, insertionFreeLimit: 10000, name: 'Enterprise Store' },
    enterprise: { discountMultiplier: 0.75, insertionFreeLimit: 50000, name: 'Custom Enterprise' },
  },
  categories: [
    {
      id: 'most_categories_au',
      name: 'Most Categories',
      standardRate: 0.134,
      tiers: [
        { threshold: 4000, rate: 0.134 },
        { rate: 0.025 },
      ],
      storeRate: 0.109,
      storeTiers: [
        { threshold: 4000, rate: 0.109 },
        { rate: 0.025 },
      ],
      fixedFee: 0.33,
      insertionFee: 0.50,
      notes: '13.4% on total amount up to AU$4,000; 2.5% on portion over AU$4,000 (10.9% for Store subscribers).',
    },
    {
      id: 'electronics_computers_au',
      name: 'Computers, Electronics & Cameras',
      standardRate: 0.114,
      tiers: [
        { threshold: 2500, rate: 0.114 },
        { rate: 0.025 },
      ],
      storeRate: 0.089,
      fixedFee: 0.33,
      insertionFee: 0.50,
      notes: '11.4% (8.9% with Store) up to AU$2,500.',
    },
    {
      id: 'motors_parts_au',
      name: 'Vehicle Parts & Accessories',
      standardRate: 0.124,
      tiers: [
        { threshold: 2500, rate: 0.124 },
        { rate: 0.025 },
      ],
      storeRate: 0.099,
      fixedFee: 0.33,
      insertionFee: 0.50,
      notes: '12.4% standard, 9.9% for Store subscribers.',
    },
    {
      id: 'fashion_clothing_au',
      name: 'Clothing, Shoes & Accessories',
      standardRate: 0.134,
      tiers: [
        { threshold: 4000, rate: 0.134 },
        { rate: 0.025 },
      ],
      storeRate: 0.114,
      fixedFee: 0.33,
      insertionFee: 0.50,
      notes: '13.4% standard, 11.4% with Store.',
    },
  ],
  notes: [
    'All eBay Australia fees include 10% Australian Goods and Services Tax (GST).',
    'Fixed fee of AU$0.33 applies to each order.',
  ],
};
