import { CountryConfig } from '../../types';

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
  regulatoryOperatingFeeRate: 0.0042, // 0.42% Spanish Regulatory Operating Fee
  internationalFeeRate: 0.016,
  currencyConversionRate: 0.03,
  defaultVatOrTaxRate: 0.21, // 21% Spanish IVA
  hasBuyerVat: true,
  vatName: 'Spanish IVA (21%)',
  officialSource: 'eBay.es Portal para Vendedores — Tarifas para vendedores profesionales',
  officialSourceUrl: 'https://www.ebay.es/help/selling/fees-credits-invoices/tarifas-vendedores-profesionales?id=4364',
  lastVerified: 'August 2026',
  effectiveDate: '2024-01-01',
  disclaimer: 'Calculated using eBay Spain professional seller commission schedules including the 0.42% Regulatory Operating Fee.',
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
    {
      id: 'auto_moto_es',
      name: 'Motor: piezas y accesorios',
      standardRate: 0.10,
      tiers: [
        { threshold: 2000, rate: 0.10 },
        { rate: 0.02 },
      ],
      storeRate: 0.085,
      fixedFee: 0.35,
      insertionFee: 0.35,
      notes: '10.0% hasta 2.000 €, 2% a partir de ahí.',
    },
  ],
  notes: [
    'Tarifa fija por transacción de 0,35 €.',
    'Tarifa operativa reglamentaria del 0,42% sobre el importe total de la venta.',
    'IVA español del 21% aplicable sobre facturas de tarifas.',
  ],
};
