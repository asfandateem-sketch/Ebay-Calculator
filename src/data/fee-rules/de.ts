import { CountryConfig } from '../../types';

export const deFeeConfig: CountryConfig = {
  code: 'DE',
  name: 'Germany',
  domain: 'ebay.de',
  currency: {
    code: 'EUR',
    symbol: '€',
    position: 'before',
  },
  flag: '🇩🇪',
  defaultFixedFee: 0.35, // €0.35 fixed fee (or €0.05 for orders <= €10)
  defaultStandardRate: 0.115, // 11.5% for commercial sellers; private sellers pay 0% FVF under German eBay private seller policy
  internationalFeeRate: 0.016,
  currencyConversionRate: 0.03,
  defaultVatOrTaxRate: 0.19, // 19% German MwSt
  hasBuyerVat: true,
  vatName: 'German MwSt (19%)',
  officialSource: 'eBay.de Hilfeseiten — Gebühren für gewerbliche & private Verkäufer',
  officialSourceUrl: 'https://www.ebay.de/help/selling/fees-credits-invoices/selling-fees?id=4822',
  lastVerified: 'August 2026',
  effectiveDate: '2024-01-01',
  disclaimer: 'Calculated according to eBay Germany fee regulations. Includes private seller 0% exemption and gewerblicher Verkäufer commercial tiers.',
  topRatedDiscountRate: 0.10,
  belowStandardPenaltyRate: 0.05,
  storeDiscounts: {
    none: { discountMultiplier: 1.0, insertionFreeLimit: 300, name: 'Standard / Privater Verkäufer' },
    starter: { discountMultiplier: 0.95, insertionFreeLimit: 400, name: 'Basis Shop (€25/mo)' },
    basic: { discountMultiplier: 0.90, insertionFreeLimit: 2500, name: 'Top-Shop (€75/mo)' },
    premium: { discountMultiplier: 0.85, insertionFreeLimit: 10000, name: 'Premium-Shop (€300/mo)' },
    anchor: { discountMultiplier: 0.80, insertionFreeLimit: 50000, name: 'Platin-Shop (€1,000/mo)' },
    enterprise: { discountMultiplier: 0.75, insertionFreeLimit: 100000, name: 'Enterprise Shop' },
  },
  categories: [
    {
      id: 'private_seller_de',
      name: 'Private Seller / Privater Verkäufer (0% FVF)',
      standardRate: 0.00,
      fixedFee: 0.00,
      insertionFee: 0.00,
      notes: 'Since 2023/2024, private sales on eBay.de are free of final value fees and insertion fees.',
    },
    {
      id: 'business_general_de',
      name: 'Commercial Seller — General Merchandise',
      standardRate: 0.115,
      tiers: [
        { threshold: 990, rate: 0.115 },
        { rate: 0.02 },
      ],
      storeRate: 0.10,
      fixedFee: 0.35,
      insertionFee: 0.35,
      notes: '11.5% up to €990; 2% for portion above €990.',
    },
    {
      id: 'business_electronics_de',
      name: 'Commercial — Computers & Electronics',
      standardRate: 0.075,
      tiers: [
        { threshold: 990, rate: 0.075 },
        { rate: 0.02 },
      ],
      storeRate: 0.065,
      fixedFee: 0.35,
      insertionFee: 0.35,
      notes: '7.5% up to €990; 2% thereafter.',
    },
    {
      id: 'business_motors_de',
      name: 'Commercial — Auto & Motorrad: Teile',
      standardRate: 0.10,
      tiers: [
        { threshold: 990, rate: 0.10 },
        { rate: 0.02 },
      ],
      storeRate: 0.085,
      fixedFee: 0.35,
      insertionFee: 0.35,
      notes: '10.0% up to €990; 2% above.',
    },
  ],
  notes: [
    'Private individual sellers on eBay.de have 0% selling fees on standard consumer listings.',
    'German 19% MwSt applies to seller service fee invoices.',
  ],
};

