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
  internationalFeeRate: 0.016,
  currencyConversionRate: 0.03,
  defaultVatOrTaxRate: 0.20, // 20% French TVA
  hasBuyerVat: true,
  vatName: 'French TVA (20%)',
  officialSource: 'eBay.fr Centre pour les Vendeurs — Frais de vente',
  officialSourceUrl: 'https://www.ebay.fr/help/selling/fees-credits-invoices/frais-pour-les-vendeurs-professionnels?id=4364',
  lastVerified: 'August 2026',
  effectiveDate: '2024-01-01',
  disclaimer: 'Calculated using eBay France standard professional seller fee schedules.',
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
  ],
  notes: [
    'Fixed fee of €0.35 applies per completed transaction.',
    'French 20% TVA applies to fee invoices.',
  ],
};

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
  internationalFeeRate: 0.016,
  currencyConversionRate: 0.03,
  defaultVatOrTaxRate: 0.22, // 22% Italian IVA
  hasBuyerVat: true,
  vatName: 'Italian IVA (22%)',
  officialSource: 'eBay.it Spazio Venditori — Tariffe di vendita',
  officialSourceUrl: 'https://www.ebay.it/help/selling/fees-credits-invoices/tariffe-venditori-professionali?id=4364',
  lastVerified: 'August 2026',
  effectiveDate: '2024-01-01',
  disclaimer: 'Calculated using eBay Italy standard professional seller fee rules in EUR.',
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
  ],
  notes: [
    'Commissione fissa per ordine di €0,35.',
    'IVA italiana al 22% applicata alle commissioni di servizio.',
  ],
};

export const esFeeConfig: CountryConfig = {
  code: 'ES',
  name: 'Spain',
  domain: 'ebay.es',
  currency: {
    code: 'EUR',
    symbol: '€',
    position: 'before',
  },
  flag: '🇪🇸',
  defaultFixedFee: 0.35,
  defaultStandardRate: 0.115, // 11.5%
  internationalFeeRate: 0.016,
  currencyConversionRate: 0.03,
  defaultVatOrTaxRate: 0.21, // 21% Spanish IVA
  hasBuyerVat: true,
  vatName: 'Spanish IVA (21%)',
  officialSource: 'eBay.es Portal para Vendedores — Tarifas de venta',
  officialSourceUrl: 'https://www.ebay.es/help/selling/fees-credits-invoices/tarifas-vendedores-profesionales?id=4364',
  lastVerified: 'August 2026',
  effectiveDate: '2024-01-01',
  disclaimer: 'Calculated using eBay Spain standard seller commission schedules.',
  topRatedDiscountRate: 0.10,
  belowStandardPenaltyRate: 0.05,
  storeDiscounts: {
    none: { discountMultiplier: 1.0, insertionFreeLimit: 150, name: 'Vendedor Estándar' },
    starter: { discountMultiplier: 0.95, insertionFreeLimit: 400, name: 'Tienda Básica (€25/mes)' },
    basic: { discountMultiplier: 0.90, insertionFreeLimit: 2500, name: 'Tienda Avanzada (€75/mes)' },
    premium: { discountMultiplier: 0.85, insertionFreeLimit: 10000, name: 'Tienda Premium (€300/mes)' },
    anchor: { discountMultiplier: 0.80, insertionFreeLimit: 50000, name: 'Tienda Enterprise' },
    enterprise: { discountMultiplier: 0.75, insertionFreeLimit: 100000, name: 'Tienda Personalizada' },
  },
  categories: [
    {
      id: 'general_es',
      name: 'Categorías Generales (Most Categories)',
      standardRate: 0.115,
      tiers: [
        { threshold: 2000, rate: 0.115 },
        { rate: 0.02 },
      ],
      storeRate: 0.10,
      fixedFee: 0.35,
      insertionFee: 0.35,
      notes: '11.5% hasta 2.000 €, 2% para el importe superior.',
    },
    {
      id: 'electronics_es',
      name: 'Informática y Electrónica',
      standardRate: 0.075,
      tiers: [
        { threshold: 2000, rate: 0.075 },
        { rate: 0.02 },
      ],
      storeRate: 0.065,
      fixedFee: 0.35,
      insertionFee: 0.35,
      notes: '7.5% hasta 2.000 €, 2% a partir de ahí.',
    },
  ],
  notes: [
    'Tarifa fija por transacción de 0,35 €.',
    'IVA español del 21% aplicable sobre facturas de tarifas.',
  ],
};
