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
  defaultStandardRate: 0.134, // 13.4% standard non-Pro (> AU$25k 12m sales)
  internationalFeeRate: 0.0165,
  currencyConversionRate: 0.03,
  defaultVatOrTaxRate: 0.10, // 10% Australian GST
  hasBuyerVat: true,
  vatName: 'Australian GST',
  officialSource: 'eBay Australia Help — Fees for Selling on eBay',
  officialSourceUrl: 'https://www.ebay.com.au/help/selling-fees/selling/selling-fees?id=4822',
  lastVerified: 'August 2026',
  effectiveDate: '2024-03-01',
  disclaimer: 'Calculations for eBay Australia account for seller eligibility: free selling for eligible casual sellers (AU registered, non-Pro, <=AU$25k sales in 12 months) vs standard 13.4% casual and Pro Store tiered rates. All fees include 10% GST.',
  topRatedDiscountRate: 0.10,
  belowStandardPenaltyRate: 0.05,
  storeDiscounts: {
    none: { discountMultiplier: 1.0, insertionFreeLimit: 40, name: 'Casual Seller (No Pro Plan)' },
    starter: { discountMultiplier: 0.95, insertionFreeLimit: 100, name: 'Pro Starter (AU$24.95/mo)' },
    basic: { discountMultiplier: 0.90, insertionFreeLimit: 600, name: 'Pro Basic / Featured (AU$54.95/mo)' },
    premium: { discountMultiplier: 0.85, insertionFreeLimit: 2500, name: 'Pro Anchor (AU$549.95/mo)' },
    anchor: { discountMultiplier: 0.80, insertionFreeLimit: 10000, name: 'Pro Enterprise' },
    enterprise: { discountMultiplier: 0.75, insertionFreeLimit: 50000, name: 'Custom Pro Enterprise' },
  },
  categories: [
    {
      id: 'au_free_selling_eligible',
      name: 'Eligible Free Selling (Casual, Non-Pro, <=AU$25k/yr)',
      standardRate: 0.00,
      fixedFee: 0.00,
      insertionFee: 0.00,
      notes: 'Eligible Australian registered sellers without a Pro plan with AU$25,000 or less in sales over the preceding 12 months pay 0% selling fees on eligible consumer sales.',
    },
    {
      id: 'most_categories_au',
      name: 'Standard Seller without Pro Plan — Most Categories',
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
      notes: '13.4% on total amount up to AU$4,000; 2.5% on portion over AU$4,000 (10.9% for eBay Pro Store subscribers).',
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
      storeTiers: [
        { threshold: 2500, rate: 0.089 },
        { rate: 0.025 },
      ],
      fixedFee: 0.33,
      insertionFee: 0.50,
      notes: '11.4% standard non-Pro (8.9% with Pro Store) up to AU$2,500.',
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
      storeTiers: [
        { threshold: 2500, rate: 0.099 },
        { rate: 0.025 },
      ],
      fixedFee: 0.33,
      insertionFee: 0.50,
      notes: '12.4% standard, 9.9% for eBay Pro Store subscribers.',
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
      storeTiers: [
        { threshold: 4000, rate: 0.114 },
        { rate: 0.025 },
      ],
      fixedFee: 0.33,
      insertionFee: 0.50,
      notes: '13.4% standard, 11.4% with Pro Store.',
    },
  ],
  notes: [
    'All eBay Australia fees include 10% Australian Goods and Services Tax (GST).',
    'Casual non-Pro sellers with <=AU$25,000 in past 12-month sales qualify for free selling eligibility.',
    'Fixed fee of AU$0.33 applies to standard orders.',
  ],
};
