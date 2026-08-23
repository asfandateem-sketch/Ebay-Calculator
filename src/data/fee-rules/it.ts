import { CountryConfig } from '../../types';

export const itFeeConfig: CountryConfig = {
  code: 'IT',
  name: 'Italy',
  domain: 'ebay.it',
  currency: {
    code: 'EUR',
    symbol: '€',
    position: 'before',
  },
  flag: '🇮🇹',
  defaultFixedFee: 0.35,
  defaultStandardRate: 0.115, // 11.5%
  regulatoryOperatingFeeRate: 0.0042, // 0.42% Italian Regulatory Operating Fee
  internationalFeeRate: 0.016,
  currencyConversionRate: 0.03,
  defaultVatOrTaxRate: 0.22, // 22% Italian IVA
  hasBuyerVat: true,
  vatName: 'Italian IVA (22%)',
  officialSource: 'eBay.it Spazio Venditori — Tariffe di vendita per venditori professionali',
  officialSourceUrl: 'https://www.ebay.it/help/selling/fees-credits-invoices/tariffe-venditori-professionali?id=4364',
  lastVerified: 'August 2026',
  effectiveDate: '2024-01-01',
  disclaimer: 'Calculated using eBay Italy professional seller fee rules including the 0.42% Regulatory Operating Fee.',
  topRatedDiscountRate: 0.10,
  belowStandardPenaltyRate: 0.05,
  storeDiscounts: {
    none: { discountMultiplier: 1.0, insertionFreeLimit: 150, name: 'Venditore Standard' },
    starter: { discountMultiplier: 0.95, insertionFreeLimit: 400, name: 'Negozio Base (€25/mese)' },
    basic: { discountMultiplier: 0.90, insertionFreeLimit: 2500, name: 'Negozio Premium (€75/mese)' },
    premium: { discountMultiplier: 0.85, insertionFreeLimit: 10000, name: 'Negozio Anchor (€300/mese)' },
    anchor: { discountMultiplier: 0.80, insertionFreeLimit: 50000, name: 'Negozio Enterprise' },
    enterprise: { discountMultiplier: 0.75, insertionFreeLimit: 100000, name: 'Negozio Custom' },
  },
  categories: [
    {
      id: 'general_it',
      name: 'Tutte le categorie principali (General)',
      standardRate: 0.115,
      tiers: [
        { threshold: 2000, rate: 0.115 },
        { rate: 0.02 },
      ],
      storeRate: 0.10,
      fixedFee: 0.35,
      insertionFee: 0.35,
      notes: '11.5% fino a €2.000, 2% per la quota eccedente.',
    },
    {
      id: 'electronics_it',
      name: 'Informatica, TV ed Elettronica',
      standardRate: 0.075,
      tiers: [
        { threshold: 2000, rate: 0.075 },
        { rate: 0.02 },
      ],
      storeRate: 0.065,
      fixedFee: 0.35,
      insertionFee: 0.35,
      notes: '7.5% fino a €2.000, 2% oltre.',
    },
    {
      id: 'auto_moto_it',
      name: 'Auto e moto: ricambi e accessori',
      standardRate: 0.10,
      tiers: [
        { threshold: 2000, rate: 0.10 },
        { rate: 0.02 },
      ],
      storeRate: 0.085,
      fixedFee: 0.35,
      insertionFee: 0.35,
      notes: '10.0% fino a €2.000, 2% oltre.',
    },
  ],
  notes: [
    'Commissione fissa per ordine di €0,35.',
    'Tariffa operativa regolamentare dello 0,42% calcolata sul totale dell\'ordine.',
    'IVA italiana al 22% applicata alle commissioni di servizio.',
  ],
};
