import { useState, useMemo, useCallback } from 'react';
import { EcommerceProfitInputs, EcommerceProfitResults, EcommerceScenario } from '../types/ecommerce';
import { calculateEcommerceProfit, calculateEcommerceScenarios } from '../utils/calculator/ecommerceProfit';
import { trackEvent } from '../utils/analytics';

export const defaultEcommerceInputs: EcommerceProfitInputs = {
  unitsPurchased: 500,
  productCostPerUnit: 10,
  shippingFreight: 500,
  customsDuties: 250,
  otherImportCosts: 100,
  sellingPricePerUnit: 35,
  monthlyUnitsSold: 100,
  marketplaceFeeType: 'percentage',
  marketplaceFeeValue: 13.25,
  paymentProcessingFeeType: 'percentage',
  paymentProcessingFeeValue: 2.9,
  advertisingFeeType: 'percentage',
  advertisingFeeValue: 5.0,
  packagingCostPerUnit: 1.50,
  otherMonthlyExpenses: 100,
};

export interface EcommercePreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  inputs: EcommerceProfitInputs;
}

export const ECOMMERCE_PRESETS: EcommercePreset[] = [
  {
    id: 'private_label',
    name: 'Private Label Starter',
    badge: 'Amazon / Multi-Channel',
    description: 'Custom manufactured batch with ocean freight, customs clearance, and aggressive PPC launch.',
    inputs: {
      unitsPurchased: 500,
      productCostPerUnit: 9.50,
      shippingFreight: 650,
      customsDuties: 220,
      otherImportCosts: 120,
      sellingPricePerUnit: 34.99,
      monthlyUnitsSold: 120,
      marketplaceFeeType: 'percentage',
      marketplaceFeeValue: 15.0,
      paymentProcessingFeeType: 'percentage',
      paymentProcessingFeeValue: 2.9,
      advertisingFeeType: 'percentage',
      advertisingFeeValue: 6.5,
      packagingCostPerUnit: 1.60,
      otherMonthlyExpenses: 150,
    },
  },
  {
    id: 'wholesale_volume',
    name: 'Wholesale Fast-Turn',
    badge: 'High Velocity',
    description: 'High-volume domestic distributor purchase with razor-sharp margins and fast replenishment.',
    inputs: {
      unitsPurchased: 1000,
      productCostPerUnit: 6.20,
      shippingFreight: 250,
      customsDuties: 0,
      otherImportCosts: 50,
      sellingPricePerUnit: 18.50,
      monthlyUnitsSold: 280,
      marketplaceFeeType: 'percentage',
      marketplaceFeeValue: 12.5,
      paymentProcessingFeeType: 'percentage',
      paymentProcessingFeeValue: 2.7,
      advertisingFeeType: 'percentage',
      advertisingFeeValue: 3.0,
      packagingCostPerUnit: 0.85,
      otherMonthlyExpenses: 80,
    },
  },
  {
    id: 'retail_arbitrage',
    name: 'Arbitrage & Flips',
    badge: 'eBay & Poshmark',
    description: 'Medium batch clearance and liquidations with domestic shipping and low fixed overhead.',
    inputs: {
      unitsPurchased: 150,
      productCostPerUnit: 14.00,
      shippingFreight: 75,
      customsDuties: 0,
      otherImportCosts: 0,
      sellingPricePerUnit: 42.00,
      monthlyUnitsSold: 50,
      marketplaceFeeType: 'percentage',
      marketplaceFeeValue: 13.25,
      paymentProcessingFeeType: 'percentage',
      paymentProcessingFeeValue: 2.9,
      advertisingFeeType: 'percentage',
      advertisingFeeValue: 2.0,
      packagingCostPerUnit: 1.40,
      otherMonthlyExpenses: 35,
    },
  },
  {
    id: 'high_ticket',
    name: 'High-Ticket Electronics / Niche',
    badge: 'Premium Margin',
    description: 'Higher capital commitment per unit with substantial net dollar profit and lower monthly volume.',
    inputs: {
      unitsPurchased: 80,
      productCostPerUnit: 90.00,
      shippingFreight: 700,
      customsDuties: 380,
      otherImportCosts: 150,
      sellingPricePerUnit: 249.00,
      monthlyUnitsSold: 25,
      marketplaceFeeType: 'percentage',
      marketplaceFeeValue: 9.5,
      paymentProcessingFeeType: 'percentage',
      paymentProcessingFeeValue: 2.5,
      advertisingFeeType: 'percentage',
      advertisingFeeValue: 7.0,
      packagingCostPerUnit: 5.00,
      otherMonthlyExpenses: 220,
    },
  },
];

export function useEcommerceCalculator() {
  const [inputs, setInputs] = useState<EcommerceProfitInputs>(defaultEcommerceInputs);

  const results: EcommerceProfitResults = useMemo(() => {
    return calculateEcommerceProfit(inputs);
  }, [inputs]);

  const scenarios: EcommerceScenario[] = useMemo(() => {
    return calculateEcommerceScenarios(inputs);
  }, [inputs]);

  const updateInput = useCallback(<K extends keyof EcommerceProfitInputs>(key: K, value: EcommerceProfitInputs[K]) => {
    setInputs((prev) => {
      let safeValue = value;
      if (typeof value === 'number') {
        safeValue = (isNaN(value) || !isFinite(value) ? 0 : Math.min(100_000_000, Math.max(0, value))) as EcommerceProfitInputs[K];
      }
      return {
        ...prev,
        [key]: safeValue,
      };
    });
    trackEvent('ecommerce_input_changed', { field: String(key) });
  }, []);

  const loadPreset = useCallback((preset: EcommercePreset) => {
    setInputs(preset.inputs);
    trackEvent('ecommerce_preset_loaded', { presetId: preset.id, presetName: preset.name });
  }, []);

  const resetDefaults = useCallback(() => {
    setInputs(defaultEcommerceInputs);
    trackEvent('ecommerce_calculator_reset');
  }, []);

  return {
    inputs,
    results,
    scenarios,
    updateInput,
    setInputs,
    loadPreset,
    resetDefaults,
  };
}
