import { CalculatorInputs, CalculatorResults, CategoryFeeRule, CountryConfig } from '../../types';
import { getCountryConfig } from '../../data/fee-rules';

export function calculateEbayFees(inputs: CalculatorInputs): CalculatorResults {
  const country: CountryConfig = getCountryConfig(inputs.country);
  
  // Safe sanitized inputs
  const qty = Math.max(1, Math.floor(inputs.quantitySold || 1));
  const soldPrice = Math.max(0, Number(inputs.soldPrice) || 0);
  const shippingCharged = Math.max(0, Number(inputs.shippingCharged) || 0);
  const itemCost = Math.max(0, Number(inputs.itemCost) || 0);
  const shippingCost = Math.max(0, Number(inputs.shippingCost) || 0);
  const otherCosts = Math.max(0, Number(inputs.otherCosts) || 0);
  const promotedRate = Math.min(100, Math.max(0, Number(inputs.promotedListingRate) || 0)) / 100;
  const taxRate = Math.max(0, Number(inputs.salesTaxOrVatRate) || 0) / 100;
  
  // Revenue
  const grossRevenue = (soldPrice + shippingCharged) * qty;
  
  // eBay calculates Final Value Fees on Total Checkout Amount (including buyer sales tax / VAT where managed)
  const buyerTaxAmount = grossRevenue * taxRate;
  const totalChargeBasis = grossRevenue + buyerTaxAmount;
  
  // Find category rule
  const categoryRule: CategoryFeeRule =
    country.categories.find((cat) => cat.id === inputs.categoryId) ||
    country.categories[0] || {
      id: 'default',
      name: 'Default Category',
      standardRate: country.defaultStandardRate,
      fixedFee: country.defaultFixedFee,
      insertionFee: 0.35,
    };
  
  // Determine if Store rates apply
  const hasStore = inputs.storeSubscription !== 'none';
  let fvfRateAmount = 0;
  let baseRateUsed = categoryRule.standardRate;
  
  if (hasStore && categoryRule.storeRate !== undefined) {
    baseRateUsed = categoryRule.storeRate;
  }
  
  // Tiered calculation or flat
  const activeTiers = hasStore && categoryRule.storeTiers ? categoryRule.storeTiers : categoryRule.tiers;
  
  if (activeTiers && activeTiers.length > 0) {
    let remainingAmount = totalChargeBasis;
    let accumulatedFee = 0;
    let previousThreshold = 0;
    
    for (let i = 0; i < activeTiers.length; i++) {
      const tier = activeTiers[i];
      if (tier.threshold !== undefined) {
        const tierCap = tier.threshold - previousThreshold;
        const amountInThisTier = Math.min(remainingAmount, tierCap);
        if (amountInThisTier > 0) {
          accumulatedFee += amountInThisTier * tier.rate;
          remainingAmount -= amountInThisTier;
          previousThreshold = tier.threshold;
        }
      } else {
        // Over threshold final tier
        if (remainingAmount > 0) {
          accumulatedFee += remainingAmount * tier.rate;
          remainingAmount = 0;
        }
      }
      if (remainingAmount <= 0) break;
    }
    fvfRateAmount = accumulatedFee;
  } else {
    fvfRateAmount = totalChargeBasis * baseRateUsed;
  }
  
  // Apply max fee cap if applicable
  if (categoryRule.maxFee && fvfRateAmount > categoryRule.maxFee * qty) {
    fvfRateAmount = categoryRule.maxFee * qty;
  }
  
  // Fixed order fee ($0.30 standard, $0.40 under $10 in US; £0.30 under £10, £0.40 over £10 in UK business; or country default)
  let fixedFeePerOrder = categoryRule.fixedFee;
  if (inputs.country === 'US' && categoryRule.fixedFee > 0) {
    fixedFeePerOrder = totalChargeBasis <= 10.0 ? 0.40 : 0.30;
  } else if (inputs.country === 'UK' && categoryRule.fixedFee > 0) {
    fixedFeePerOrder = totalChargeBasis <= 10.0 ? 0.30 : 0.40;
  }
  const finalValueFixedFee = grossRevenue > 0 ? fixedFeePerOrder * qty : 0;
  
  // Top Rated Plus discount (10% off FVF percentage portion)
  let topRatedDiscountAmount = 0;
  if (inputs.sellerLevel === 'top_rated') {
    topRatedDiscountAmount = fvfRateAmount * country.topRatedDiscountRate;
  }
  
  // Below standard penalty (+5% penalty on total sale amount)
  let belowStandardPenaltyAmount = 0;
  if (inputs.sellerLevel === 'below_standard') {
    belowStandardPenaltyAmount = totalChargeBasis * country.belowStandardPenaltyRate;
  }
  
  // Net final value fee
  const totalFinalValueFee = Math.max(0, fvfRateAmount - topRatedDiscountAmount + belowStandardPenaltyAmount + finalValueFixedFee);
  
  // Promoted Listings fee (applied to total sale price + shipping)
  const promotedListingFee = grossRevenue * promotedRate;
  
  // International transaction fee
  const internationalFee = inputs.isInternational ? totalChargeBasis * country.internationalFeeRate : 0;

  // Regulatory Operating Fee (UK & EU specific - applies to commercial/paying transactions)
  const isZeroFeeCategory = categoryRule.standardRate === 0 && categoryRule.fixedFee === 0;
  const regulatoryOperatingFee = (country.regulatoryOperatingFeeRate && !isZeroFeeCategory) ? totalChargeBasis * country.regulatoryOperatingFeeRate : 0;
  
  // Insertion fee (0 if free listings available)
  const insertionFee = inputs.freeMonthlyListingsUsed ? categoryRule.insertionFee * qty : 0;
  
  // Total eBay fees
  const totalEbayFees = totalFinalValueFee + promotedListingFee + internationalFee + regulatoryOperatingFee + insertionFee;
  
  // Direct Costs
  const totalItemCost = itemCost * qty;
  const totalShippingCost = shippingCost * qty;
  const totalOtherCost = otherCosts * qty;
  const totalCosts = totalItemCost + totalShippingCost + totalOtherCost + totalEbayFees;
  
  // Net Profit & Margins
  const netProfit = grossRevenue - totalCosts;
  const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;
  const totalDirectInvestment = totalItemCost + totalShippingCost + totalOtherCost;
  const roi = totalDirectInvestment > 0 ? (netProfit / totalDirectInvestment) * 100 : 0;
  const effectiveFeeRate = grossRevenue > 0 ? (totalEbayFees / grossRevenue) * 100 : 0;
  
  // Break-even price calculation:
  // We want: SellingPrice + ShippingCharged - TotalCosts = 0
  // SellingPrice * (1 - rateFactor) - fixedFees - DirectCosts = 0
  // Rate Factor = (baseRate * (1 - topRated + belowStandard)) + promotedRate + (isInternational ? intlRate : 0) + (rate * taxRate)
  const effectiveRateDecimal = (baseRateUsed * (1 - (inputs.sellerLevel === 'top_rated' ? country.topRatedDiscountRate : 0) + (inputs.sellerLevel === 'below_standard' ? country.belowStandardPenaltyRate : 0))) +
    promotedRate +
    (inputs.isInternational ? country.internationalFeeRate : 0) +
    (country.regulatoryOperatingFeeRate || 0);
  
  // Accounts for sales tax on fee basis
  const feeMultiplierWithTax = effectiveRateDecimal * (1 + taxRate);
  const denominator = Math.max(0.01, 1 - feeMultiplierWithTax);
  
  // Total direct cash out per unit
  const fixedOverheadPerUnit = itemCost + shippingCost + otherCosts + fixedFeePerOrder + (inputs.freeMonthlyListingsUsed ? categoryRule.insertionFee : 0) - shippingCharged;
  const rawBreakEven = fixedOverheadPerUnit / denominator;
  const breakEvenPrice = Math.max(0, Math.round(rawBreakEven * 100) / 100);
  
  // Recommended selling prices for target margins (20% and 30%)
  const denom20 = Math.max(0.01, 1 - feeMultiplierWithTax - 0.20);
  const recommendedPrice20 = Math.max(0, Math.round((fixedOverheadPerUnit / denom20) * 100) / 100);
  
  const denom30 = Math.max(0.01, 1 - feeMultiplierWithTax - 0.30);
  const recommendedPrice30 = Math.max(0, Math.round((fixedOverheadPerUnit / denom30) * 100) / 100);
  
  // Promoted ROAS (Return On Ad Spend)
  const promotedRoas = promotedListingFee > 0 ? grossRevenue / promotedListingFee : 0;
  
  return {
    grossRevenue: round2(grossRevenue),
    buyerTotalWithTax: round2(totalChargeBasis),
    finalValueFeePercent: round2(baseRateUsed * 100),
    finalValueFeeRateAmount: round2(fvfRateAmount),
    finalValueFixedFee: round2(finalValueFixedFee),
    totalFinalValueFee: round2(totalFinalValueFee),
    topRatedDiscountAmount: round2(topRatedDiscountAmount),
    belowStandardPenaltyAmount: round2(belowStandardPenaltyAmount),
    promotedListingFee: round2(promotedListingFee),
    internationalFee: round2(internationalFee),
    regulatoryOperatingFee: round2(regulatoryOperatingFee),
    insertionFee: round2(insertionFee),
    totalEbayFees: round2(totalEbayFees),
    effectiveFeeRate: round2(effectiveFeeRate),
    totalItemCost: round2(totalItemCost),
    totalShippingCost: round2(totalShippingCost),
    totalOtherCost: round2(totalOtherCost),
    buyerTaxAmount: round2(buyerTaxAmount),
    totalCosts: round2(totalCosts),
    netProfit: round2(netProfit),
    profitMargin: round2(profitMargin),
    roi: round2(roi),
    breakEvenPrice: isNaN(breakEvenPrice) ? 0 : breakEvenPrice,
    recommendedPrice20PercentMargin: isNaN(recommendedPrice20) ? 0 : recommendedPrice20,
    recommendedPrice30PercentMargin: isNaN(recommendedPrice30) ? 0 : recommendedPrice30,
    promotedRoas: round2(promotedRoas),
  };
}

export function calculateBreakEvenPrice(inputs: CalculatorInputs): number {
  const country = getCountryConfig(inputs.country);
  const itemCost = Math.max(0, Number(inputs.itemCost) || 0);
  const shippingCost = Math.max(0, Number(inputs.shippingCost) || 0);
  const otherCosts = Math.max(0, Number(inputs.otherCosts) || 0);
  const shippingCharged = Math.max(0, Number(inputs.shippingCharged) || 0);
  const promotedRate = Math.min(100, Math.max(0, Number(inputs.promotedListingRate) || 0)) / 100;
  const taxRate = Math.max(0, Number(inputs.salesTaxOrVatRate) || 0) / 100;

  const categoryRule =
    country.categories.find((cat) => cat.id === inputs.categoryId) ||
    country.categories[0];

  const hasStore = inputs.storeSubscription !== 'none';
  const baseRate = hasStore && categoryRule.storeRate !== undefined ? categoryRule.storeRate : categoryRule.standardRate;

  let rateMultiplier = 1.0;
  if (inputs.sellerLevel === 'top_rated') {
    rateMultiplier -= (country.topRatedDiscountRate || 0.10);
  }
  let penaltyRate = 0;
  if (inputs.sellerLevel === 'below_standard') {
    penaltyRate = (country.belowStandardPenaltyRate || 0.05);
  }

  const intlRate = inputs.isInternational ? country.internationalFeeRate + (country.currencyConversionRate || 0) : 0;
  const regulatoryRate = country.regulatoryOperatingFeeRate || 0;

  const effectiveRate = (baseRate * rateMultiplier) + penaltyRate + promotedRate + intlRate + regulatoryRate;
  const feeFactor = effectiveRate * (1 + taxRate);
  const denom = Math.max(0.001, 1 - feeFactor);

  const fixedFee = categoryRule.fixedFee;
  const insertion = inputs.freeMonthlyListingsUsed ? categoryRule.insertionFee : 0;
  const fixedCosts = itemCost + shippingCost + otherCosts + fixedFee + insertion - shippingCharged;

  const raw = fixedCosts / denom;
  return Math.max(0, Math.round(raw * 100) / 100);
}

export function calculateTargetMarginPrice(inputs: CalculatorInputs, targetMarginPercent: number): number {
  const country = getCountryConfig(inputs.country);
  const itemCost = Math.max(0, Number(inputs.itemCost) || 0);
  const shippingCost = Math.max(0, Number(inputs.shippingCost) || 0);
  const otherCosts = Math.max(0, Number(inputs.otherCosts) || 0);
  const shippingCharged = Math.max(0, Number(inputs.shippingCharged) || 0);
  const promotedRate = Math.min(100, Math.max(0, Number(inputs.promotedListingRate) || 0)) / 100;
  const taxRate = Math.max(0, Number(inputs.salesTaxOrVatRate) || 0) / 100;

  const categoryRule =
    country.categories.find((cat) => cat.id === inputs.categoryId) ||
    country.categories[0];

  const hasStore = inputs.storeSubscription !== 'none';
  const baseRate = hasStore && categoryRule.storeRate !== undefined ? categoryRule.storeRate : categoryRule.standardRate;

  let rateMultiplier = 1.0;
  if (inputs.sellerLevel === 'top_rated') {
    rateMultiplier -= (country.topRatedDiscountRate || 0.10);
  }
  let penaltyRate = 0;
  if (inputs.sellerLevel === 'below_standard') {
    penaltyRate = (country.belowStandardPenaltyRate || 0.05);
  }

  const intlRate = inputs.isInternational ? country.internationalFeeRate + (country.currencyConversionRate || 0) : 0;
  const regulatoryRate = country.regulatoryOperatingFeeRate || 0;

  const effectiveRate = (baseRate * rateMultiplier) + penaltyRate + promotedRate + intlRate + regulatoryRate;
  const feeFactor = effectiveRate * (1 + taxRate);
  const marginDecimal = targetMarginPercent / 100;
  const denom = Math.max(0.001, 1 - feeFactor - marginDecimal);

  const fixedFee = categoryRule.fixedFee;
  const insertion = inputs.freeMonthlyListingsUsed ? categoryRule.insertionFee : 0;
  const fixedCosts = itemCost + shippingCost + otherCosts + fixedFee + insertion - shippingCharged;

  const raw = fixedCosts / denom;
  return Math.max(0, Math.round(raw * 100) / 100);
}

function round2(num: number): number {
  if (isNaN(num) || !isFinite(num)) return 0;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
