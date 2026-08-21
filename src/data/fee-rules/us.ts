import { CountryConfig } from '../../types';

export const usFeeConfig: CountryConfig = {
  code: 'US',
  name: 'United States',
  domain: 'ebay.com',
  currency: {
    code: 'USD',
    symbol: '$',
    position: 'before',
  },
  flag: '🇺🇸',
  defaultFixedFee: 0.30,
  defaultStandardRate: 0.1325, // 13.25%
  internationalFeeRate: 0.0165, // 1.65%
  currencyConversionRate: 0.03, // 3%
  defaultVatOrTaxRate: 0.07, // 7% average US sales tax collected by eBay
  hasBuyerVat: true,
  vatName: 'Estimated Sales Tax',
  officialSource: 'eBay US Official Seller Center — Selling Fees',
  officialSourceUrl: 'https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees?id=4822',
  lastVerified: 'August 2026',
  effectiveDate: '2024-02-15',
  disclaimer: 'Calculations are based on current eBay US Managed Payments fee schedules and standard final value fee rules.',
  topRatedDiscountRate: 0.10, // 10% discount on Final Value Fee for Top Rated Plus listings
  belowStandardPenaltyRate: 0.05, // +5% penalty if below standard
  storeDiscounts: {
    none: { discountMultiplier: 1.0, insertionFreeLimit: 250, name: 'No Store Subscription' },
    starter: { discountMultiplier: 0.95, insertionFreeLimit: 250, name: 'Starter Store ($4.95/mo)' },
    basic: { discountMultiplier: 0.90, insertionFreeLimit: 1000, name: 'Basic Store ($21.95/mo)' },
    premium: { discountMultiplier: 0.85, insertionFreeLimit: 10000, name: 'Premium Store ($59.95/mo)' },
    anchor: { discountMultiplier: 0.80, insertionFreeLimit: 25000, name: 'Anchor Store ($299.95/mo)' },
    enterprise: { discountMultiplier: 0.75, insertionFreeLimit: 100000, name: 'Enterprise Store ($2,999.95/mo)' },
  },
  categories: [
    {
      id: 'most_categories',
      name: 'Most Categories & General Goods',
      standardRate: 0.1325,
      tiers: [
        { threshold: 7500, rate: 0.1325 },
        { rate: 0.0235 }, // portion over $7,500
      ],
      storeRate: 0.1235,
      storeTiers: [
        { threshold: 2500, rate: 0.1235 },
        { rate: 0.0235 },
      ],
      fixedFee: 0.30,
      insertionFee: 0.35,
      notes: '13.25% on total amount up to $7,500 per item; 2.35% on portion over $7,500.',
    },
    {
      id: 'clothing_shoes_accessories',
      name: 'Clothing, Shoes & Accessories (General)',
      standardRate: 0.1325,
      tiers: [
        { threshold: 7500, rate: 0.1325 },
        { rate: 0.0235 },
      ],
      storeRate: 0.1235,
      fixedFee: 0.30,
      insertionFee: 0.35,
      notes: '13.25% on portion up to $7,500, 2.35% on portion above.',
    },
    {
      id: 'sneakers_athletic_shoes',
      name: 'Athletic Shoes / Sneakers ($150+)',
      standardRate: 0.08, // 8% for sneakers sold at $150 or more
      tiers: [
        { threshold: 150, rate: 0.1325 },
        { threshold: 7500, rate: 0.08 },
        { rate: 0.0235 },
      ],
      storeRate: 0.07,
      fixedFee: 0.30,
      insertionFee: 0.00,
      notes: 'Reduced 8% final value fee for sneakers sold at or over $150. Standard 13.25% if under $150.',
    },
    {
      id: 'watches_parts_accessories',
      name: 'Watches, Parts & Accessories',
      standardRate: 0.15,
      tiers: [
        { threshold: 1000, rate: 0.15 },
        { threshold: 7500, rate: 0.065 },
        { rate: 0.03 },
      ],
      storeRate: 0.125,
      storeTiers: [
        { threshold: 1000, rate: 0.125 },
        { threshold: 5000, rate: 0.04 },
        { rate: 0.03 },
      ],
      fixedFee: 0.30,
      insertionFee: 0.35,
      notes: '15% for portion up to $1,000, 6.5% for $1,000–$7,500, 3% over $7,500.',
    },
    {
      id: 'jewelry',
      name: 'Fine Jewelry & Fashion Jewelry',
      standardRate: 0.15,
      tiers: [
        { threshold: 5000, rate: 0.15 },
        { rate: 0.03 },
      ],
      storeRate: 0.13,
      storeTiers: [
        { threshold: 5000, rate: 0.13 },
        { rate: 0.03 },
      ],
      fixedFee: 0.30,
      insertionFee: 0.35,
      notes: '15% on portion up to $5,000; 3% on portion over $5,000.',
    },
    {
      id: 'electronics_cameras_computers',
      name: 'Computers, Tablets & Networking / Cell Phones',
      standardRate: 0.1325,
      tiers: [
        { threshold: 7500, rate: 0.1325 },
        { rate: 0.0235 },
      ],
      storeRate: 0.09, // 9% for store subscribers in consumer electronics
      storeTiers: [
        { threshold: 2500, rate: 0.09 },
        { rate: 0.0235 },
      ],
      fixedFee: 0.30,
      insertionFee: 0.35,
      notes: 'Basic/Premium Store subscribers enjoy a reduced 9.0% rate on computers & consumer electronics up to $2,500.',
    },
    {
      id: 'guitars_basses',
      name: 'Musical Instruments — Guitars & Basses',
      standardRate: 0.0635, // 6.35%
      tiers: [
        { threshold: 7500, rate: 0.0635 },
        { rate: 0.0235 },
      ],
      storeRate: 0.0635,
      fixedFee: 0.30,
      insertionFee: 0.35,
      notes: 'Special 6.35% low category fee for Guitars and Basses up to $7,500.',
    },
    {
      id: 'books_dvds_movies_music',
      name: 'Books, DVDs, Movies & Music',
      standardRate: 0.1495, // 14.95%
      tiers: [
        { threshold: 7500, rate: 0.1495 },
        { rate: 0.0235 },
      ],
      storeRate: 0.1495,
      fixedFee: 0.30,
      insertionFee: 0.35,
      notes: '14.95% on portion up to $7,500, 2.35% on portion above.',
    },
    {
      id: 'coins_paper_money_bullion',
      name: 'Coins, Paper Money & Bullion',
      standardRate: 0.1325,
      tiers: [
        { threshold: 7500, rate: 0.1325 },
        { threshold: 15000, rate: 0.07 },
        { rate: 0.0235 },
      ],
      storeRate: 0.09,
      storeTiers: [
        { threshold: 4000, rate: 0.09 },
        { rate: 0.0235 },
      ],
      fixedFee: 0.30,
      insertionFee: 0.35,
      notes: '13.25% up to $7,500, 7.0% from $7,500–$15,000, and 2.35% over $15,000.',
    },
    {
      id: 'motors_parts_accessories',
      name: 'eBay Motors — Parts & Accessories',
      standardRate: 0.1325,
      tiers: [
        { threshold: 1000, rate: 0.1325 },
        { rate: 0.0235 },
      ],
      storeRate: 0.1135,
      fixedFee: 0.30,
      insertionFee: 0.35,
      notes: '13.25% on total amount up to $1,000, 2.35% for the portion over $1,000.',
    },
    {
      id: 'heavy_equipment',
      name: 'Business & Industrial — Heavy Equipment',
      standardRate: 0.03, // 3%
      tiers: [
        { threshold: 15000, rate: 0.03 },
        { rate: 0.005 },
      ],
      storeRate: 0.03,
      fixedFee: 0.30,
      maxFee: 250,
      insertionFee: 20.00,
      notes: '3.0% on portion up to $15,000, capped maximum fee applies in select industrial subcategories.',
    },
  ],
  notes: [
    'Final Value Fees are calculated on total amount of the sale, including item price, shipping charged to buyer, and applicable sales taxes.',
    'A $0.30 fixed charge applies per order ($0.40 if order total is $10.00 or less).',
    'Top Rated Plus sellers receive a 10% discount on the Final Value Fee portion.',
    'Below Standard seller level incurs a 5% additional penalty on Final Value Fees.',
  ],
};
