import { CountryConfig } from '../../types';

export const caFeeConfig: CountryConfig = {
  code: 'CA',
  name: 'Canada',
  domain: 'ebay.ca',
  currency: {
    code: 'CAD',
    symbol: 'CA$',
    position: 'before',
  },
  flag: '🇨🇦',
  defaultFixedFee: 0.30,
  defaultStandardRate: 0.13, // 13.0%
  internationalFeeRate: 0.0165,
  currencyConversionRate: 0.03,
  defaultVatOrTaxRate: 0.13, // average Canadian HST/GST
  hasBuyerVat: true,
  vatName: 'Canadian HST/GST',
  officialSource: 'eBay Canada Seller Centre — Selling Fees',
  officialSourceUrl: 'https://www.ebay.ca/help/selling/fees-credits-invoices/selling-fees?id=4822',
  lastVerified: 'August 2026',
  effectiveDate: '2024-02-01',
  disclaimer: 'Calculated using eBay Canada Managed Payments schedule in CAD.',
  topRatedDiscountRate: 0.10,
  belowStandardPenaltyRate: 0.05,
  storeDiscounts: {
    none: { discountMultiplier: 1.0, insertionFreeLimit: 250, name: 'No Store Subscription' },
    starter: { discountMultiplier: 0.95, insertionFreeLimit: 250, name: 'Starter Store (CA$4.95/mo)' },
    basic: { discountMultiplier: 0.90, insertionFreeLimit: 1000, name: 'Basic Store (CA$24.95/mo)' },
    premium: { discountMultiplier: 0.85, insertionFreeLimit: 10000, name: 'Premium Store (CA$74.95/mo)' },
    anchor: { discountMultiplier: 0.80, insertionFreeLimit: 25000, name: 'Anchor Store' },
    enterprise: { discountMultiplier: 0.75, insertionFreeLimit: 100000, name: 'Enterprise Store' },
  },
  categories: [
    {
      id: 'most_categories_ca',
      name: 'Most Categories',
      standardRate: 0.13,
      tiers: [
        { threshold: 7500, rate: 0.13 },
        { rate: 0.0235 },
      ],
      storeRate: 0.12,
      fixedFee: 0.30,
      insertionFee: 0.35,
      notes: '13.0% on total order amount up to CA$7,500; 2.35% for portion over CA$7,500.',
    },
    {
      id: 'electronics_ca',
      name: 'Computers, Electronics & Cameras',
      standardRate: 0.1225,
      tiers: [
        { threshold: 2500, rate: 0.1225 },
        { rate: 0.0235 },
      ],
      storeRate: 0.09,
      fixedFee: 0.30,
      insertionFee: 0.35,
      notes: '12.25% (9.0% with Store) on first CA$2,500.',
    },
    {
      id: 'fashion_ca',
      name: 'Clothing, Shoes & Accessories',
      standardRate: 0.13,
      tiers: [
        { threshold: 7500, rate: 0.13 },
        { rate: 0.0235 },
      ],
      storeRate: 0.12,
      fixedFee: 0.30,
      insertionFee: 0.35,
      notes: '13% up to CA$7,500, 2.35% thereafter.',
    },
  ],
  notes: [
    'Fixed fee of CA$0.30 applies to each transaction.',
    'Applicable GST/HST will be added to eBay seller service fees based on your provincial location.',
  ],
};
