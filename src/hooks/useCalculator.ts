import { useState, useMemo, useEffect } from 'react';
import { CalculatorInputs, CalculatorResults, CountryCode } from '../types';
import { calculateEbayFees } from '../utils/calculator/engine';
import { trackEvent } from '../utils/analytics';
import { decodeInputsFromUrl, encodeInputsToUrl } from '../utils/export';

const defaultInputs: CalculatorInputs = {
  country: 'US',
  categoryId: 'most_categories',
  soldPrice: 75.00,
  shippingCharged: 8.00,
  itemCost: 24.00,
  shippingCost: 7.20,
  otherCosts: 1.50,
  sellerLevel: 'standard',
  storeSubscription: 'none',
  promotedListingRate: 0,
  isInternational: false,
  salesTaxOrVatRate: 7, // 7% US estimated average
  freeMonthlyListingsUsed: false,
  quantitySold: 1,
};

export function useCalculator(initialCountry?: CountryCode) {
  const [inputs, setInputs] = useState<CalculatorInputs>(() => {
    let base = { ...defaultInputs };
    if (initialCountry) {
      base.country = initialCountry;
      if (initialCountry === 'UK') {
        base.categoryId = 'private_seller_all';
        base.salesTaxOrVatRate = 20;
      }
    }
    if (typeof window !== 'undefined') {
      base = decodeInputsFromUrl(window.location.search, base);
    }
    return base;
  });

  const results: CalculatorResults = useMemo(() => {
    return calculateEbayFees(inputs);
  }, [inputs]);

  const updateInput = <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
    setInputs((prev) => {
      const next = { ...prev, [key]: value };
      
      // Auto adjust category if country changed
      if (key === 'country' && value !== prev.country) {
        trackEvent('country_selected', { country: value });
        if (value === 'UK') {
          next.categoryId = 'private_seller_all';
          next.salesTaxOrVatRate = 20;
        } else if (value === 'US') {
          next.categoryId = 'most_categories';
          next.salesTaxOrVatRate = 7;
        } else if (value === 'AU') {
          next.categoryId = 'most_categories_au';
          next.salesTaxOrVatRate = 10;
        } else if (value === 'CA') {
          next.categoryId = 'most_categories_ca';
          next.salesTaxOrVatRate = 13;
        } else if (value === 'DE') {
          next.categoryId = 'private_seller_de';
          next.salesTaxOrVatRate = 19;
        } else if (value === 'FR') {
          next.categoryId = 'general_fr';
          next.salesTaxOrVatRate = 20;
        } else if (value === 'IT') {
          next.categoryId = 'general_it';
          next.salesTaxOrVatRate = 22;
        } else if (value === 'ES') {
          next.categoryId = 'general_es';
          next.salesTaxOrVatRate = 21;
        }
      }
      
      if (key === 'categoryId') {
        trackEvent('category_selected', { category: value });
      }
      
      return next;
    });
  };

  const syncUrlWithInputs = () => {
    if (typeof window !== 'undefined') {
      const qs = encodeInputsToUrl(inputs);
      const newUrl = `${window.location.pathname}?${qs}`;
      window.history.replaceState({}, '', newUrl);
    }
  };

  // Sync url when key numeric inputs change
  useEffect(() => {
    trackEvent('profit_calculated', {
      country: inputs.country,
      netProfit: results.netProfit,
      margin: results.profitMargin,
    });
  }, [results.netProfit, results.profitMargin, inputs.country]);

  return {
    inputs,
    results,
    updateInput,
    setInputs,
    syncUrlWithInputs,
  };
}
