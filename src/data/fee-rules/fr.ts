import { CountryConfig } from '../../types';

export const frFeeConfig: CountryConfig = {
  code: 'FR',
  name: 'France',
  domain: 'ebay.fr',
  currency: {
    code: 'EUR',
    symbol: '€',
    position: 'before',
  },
  flag: '🇫🇷',
  defaultFixedFee: 0.35,
  defaultStandardRate: 0.115, // 11.5%
  regulatoryOperatingFeeRate: 0.0042, // 0.42% French Regulatory Operating Fee
  internationalFeeRate: 0.016,
  currencyConversionRate: 0.03,
  defaultVatOrTaxRate: 0.20, // 20% French TVA
  hasBuyerVat: true,
  vatName: 'French TVA (20%)',
  officialSource: 'eBay.fr Centre pour les Vendeurs — Frais de vente professionnels',
  officialSourceUrl: 'https://www.ebay.fr/help/selling/fees-credits-invoices/frais-pour-les-vendeurs-professionnels?id=4364',
  lastVerified: 'August 2026',
  effectiveDate: '2024-01-01',
  disclaimer: 'Calculated using eBay France professional seller fee schedules including the 0.42% Regulatory Operating Fee.',
  topRatedDiscountRate: 0.10,
  belowStandardPenaltyRate: 0.05,
  storeDiscounts: {
    none: { discountMultiplier: 1.0, insertionFreeLimit: 150, name: 'Vendeur Standard' },
    starter: { discountMultiplier: 0.95, insertionFreeLimit: 400, name: 'Boutique Basique (€25/mois)' },
    basic: { discountMultiplier: 0.90, insertionFreeLimit: 2500, name: 'Boutique À la Une (€75/mois)' },
    premium: { discountMultiplier: 0.85, insertionFreeLimit: 10000, name: 'Boutique Premium (€300/mois)' },
    anchor: { discountMultiplier: 0.80, insertionFreeLimit: 50000, name: 'Boutique Enterprise' },
    enterprise: { discountMultiplier: 0.75, insertionFreeLimit: 100000, name: 'Boutique Custom' },
  },
  categories: [
    {
      id: 'general_fr',
      name: 'Toutes catégories principales (General)',
      standardRate: 0.115,
      tiers: [
        { threshold: 2000, rate: 0.115 },
        { rate: 0.02 },
      ],
      storeRate: 0.10,
      fixedFee: 0.35,
      insertionFee: 0.35,
      notes: '11.5% jusqu\'à 2 000 €, puis 2% au-delà.',
    },
    {
      id: 'electronics_fr',
      name: 'Informatique, Réseaux & Téléphonie',
      standardRate: 0.075,
      tiers: [
        { threshold: 2000, rate: 0.075 },
        { rate: 0.02 },
      ],
      storeRate: 0.065,
      fixedFee: 0.35,
      insertionFee: 0.35,
      notes: '7.5% jusqu\'à 2 000 €, puis 2%.',
    },
    {
      id: 'auto_moto_fr',
      name: 'Auto, Moto: Pièces & Accessoires',
      standardRate: 0.10,
      tiers: [
        { threshold: 2000, rate: 0.10 },
        { rate: 0.02 },
      ],
      storeRate: 0.085,
      fixedFee: 0.35,
      insertionFee: 0.35,
      notes: '10.0% jusqu\'à 2 000 €, puis 2%.',
    },
  ],
  notes: [
    'Fixed fee of €0.35 applies per completed transaction.',
    'Regulatory Operating Fee of 0.42% applies to total order amount.',
    'French 20% TVA applies to fee invoices.',
  ],
};
