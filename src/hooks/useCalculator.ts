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
      let safeValue = value;
      if (typeof value === 'number') {
        safeValue = (isNaN(value) || !isFinite(value) ? 0 : Math.min(100_000_000, Math.max(0, value))) as CalculatorInputs[K];
      }
      const next = { ...prev, [key]: safeValue };
      
      // Auto adjust category if country changed
      if (key === 'country' && value !== prev.country) {
        trackEvent('marketplace_selected', { country: value, previous_country: prev.country });
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
      
      if (key === 'sellerLevel' && value !== prev.sellerLevel) {
        trackEvent('seller_type_selected', {
          seller_level: value,
          store_subscription: prev.storeSubscription,
          country: prev.country,
        });
      }

      if (key === 'storeSubscription' && value !== prev.storeSubscription) {
        trackEvent('seller_type_selected', {
          seller_level: prev.sellerLevel,
          store_subscription: value,
          country: prev.country,
        });
      }

      if (key === 'promotedListingRate' && value !== prev.promotedListingRate) {
        trackEvent('promoted_listing_estimated', {
          country: prev.country,
          ad_rate: value,
        });
      }

      if (key === 'categoryId') {
        trackEvent('category_selected', { category: value });
      }

      // Track calculator used for substantive parameter interactions
      if (['soldPrice', 'shippingCharged', 'itemCost', 'shippingCost', 'otherCosts', 'quantitySold'].includes(key as string)) {
        trackEvent('calculator_used', {
          country: prev.country,
          category_id: prev.categoryId,
          is_store: prev.storeSubscription !== 'none',
        });
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

  // Debounced anonymous analytics tracking when calculated results stabilize
  useEffect(() => {
    const timer = setTimeout(() => {
      trackEvent('profit_calculated', {
        country: inputs.country,
        category: inputs.categoryId,
        has_store: inputs.storeSubscription !== 'none',
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [results.netProfit, results.profitMargin, inputs.country, inputs.categoryId, inputs.storeSubscription]);

  return {
    inputs,
    results,
    updateInput,
    setInputs,
    syncUrlWithInputs,
  };
}
