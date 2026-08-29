import { EcommerceProfitInputs, EcommerceProfitResults, EcommerceScenario, ProfitabilityStatus } from '../../types/ecommerce';

/**
 * Clean floating point to 2 decimal places or custom precision safely
 */
export function roundCurrency(val: number): number {
  if (isNaN(val) || !isFinite(val)) return 0;
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

export function roundPercent(val: number): number {
  if (isNaN(val) || !isFinite(val)) return 0;
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

/**
 * Primary calculation engine for E-commerce Investment & Profit
 */
export function calculateEcommerceProfit(rawInputs: EcommerceProfitInputs): EcommerceProfitResults {
  // Sanitize inputs (ensure non-negative)
  const unitsPurchased = Math.max(0, rawInputs.unitsPurchased || 0);
  const productCostPerUnit = Math.max(0, rawInputs.productCostPerUnit || 0);
  const shippingFreight = Math.max(0, rawInputs.shippingFreight || 0);
  const customsDuties = Math.max(0, rawInputs.customsDuties || 0);
  const otherImportCosts = Math.max(0, rawInputs.otherImportCosts || 0);

  const sellingPricePerUnit = Math.max(0, rawInputs.sellingPricePerUnit || 0);
  const monthlyUnitsSold = Math.max(0, rawInputs.monthlyUnitsSold || 0);

  const marketplaceFeeValue = Math.max(0, rawInputs.marketplaceFeeValue || 0);
  const paymentProcessingFeeValue = Math.max(0, rawInputs.paymentProcessingFeeValue || 0);
  const advertisingFeeValue = Math.max(0, rawInputs.advertisingFeeValue || 0);
  const packagingCostPerUnit = Math.max(0, rawInputs.packagingCostPerUnit || 0);
  const otherMonthlyExpenses = Math.max(0, rawInputs.otherMonthlyExpenses || 0);

  // 1. Landed Cost Calculations
  const totalProductCost = roundCurrency(productCostPerUnit * unitsPurchased);
  const totalLandedInventoryCost = roundCurrency(
    totalProductCost + shippingFreight + customsDuties + otherImportCosts
  );
  const landedCostPerUnit = unitsPurchased > 0 
    ? roundCurrency(totalLandedInventoryCost / unitsPurchased)
    : 0;

  const effectiveInitialInvestment = rawInputs.initialStockInvestment && rawInputs.initialStockInvestment > 0
    ? roundCurrency(rawInputs.initialStockInvestment)
    : totalLandedInventoryCost;

  // 2. Monthly Revenue
  const monthlyRevenue = roundCurrency(sellingPricePerUnit * monthlyUnitsSold);

  // 3. Monthly Expenses
  const monthlyProductCost = roundCurrency(landedCostPerUnit * monthlyUnitsSold);

  let marketplaceFees = 0;
  if (rawInputs.marketplaceFeeType === 'percentage') {
    marketplaceFees = roundCurrency(monthlyRevenue * (marketplaceFeeValue / 100));
  } else {
    marketplaceFees = roundCurrency(marketplaceFeeValue * monthlyUnitsSold);
  }

  let paymentProcessingFees = 0;
  if (rawInputs.paymentProcessingFeeType === 'percentage') {
    paymentProcessingFees = roundCurrency(monthlyRevenue * (paymentProcessingFeeValue / 100));
  } else {
    paymentProcessingFees = roundCurrency(paymentProcessingFeeValue);
  }

  let advertisingCost = 0;
  if (rawInputs.advertisingFeeType === 'percentage') {
    advertisingCost = roundCurrency(monthlyRevenue * (advertisingFeeValue / 100));
  } else {
    advertisingCost = roundCurrency(advertisingFeeValue);
  }

  const packagingCost = roundCurrency(packagingCostPerUnit * monthlyUnitsSold);
  const sanitizedOtherMonthly = roundCurrency(otherMonthlyExpenses);

  const totalMonthlyExpenses = roundCurrency(
    monthlyProductCost +
    marketplaceFees +
    paymentProcessingFees +
    advertisingCost +
    packagingCost +
    sanitizedOtherMonthly
  );

  // 4. Net Profit & Margin
  const netProfit = roundCurrency(monthlyRevenue - totalMonthlyExpenses);

  let profitMargin: number | null = null;
  if (monthlyRevenue > 0) {
    profitMargin = roundPercent((netProfit / monthlyRevenue) * 100);
  }

  // 5. Monthly & Annualized ROI
  let roi: number | null = null;
  let annualizedRoi: number | null = null;
  if (effectiveInitialInvestment > 0) {
    roi = roundPercent((netProfit / effectiveInitialInvestment) * 100);
    annualizedRoi = roundPercent(((netProfit * 12) / effectiveInitialInvestment) * 100);
  }

  // 6. Profitability Status
  let profitabilityStatus: ProfitabilityStatus = 'BREAK-EVEN';
  if (netProfit > 0.005) {
    profitabilityStatus = 'PROFITABLE';
  } else if (netProfit < -0.005) {
    profitabilityStatus = 'LOSS';
  }

  // 7. Unit Variable Costs & Contribution Margin
  const unitMarketplaceFee = rawInputs.marketplaceFeeType === 'percentage'
    ? (sellingPricePerUnit * (marketplaceFeeValue / 100))
    : marketplaceFeeValue;

  const unitPaymentFee = rawInputs.paymentProcessingFeeType === 'percentage'
    ? (sellingPricePerUnit * (paymentProcessingFeeValue / 100))
    : (monthlyUnitsSold > 0 ? paymentProcessingFeeValue / monthlyUnitsSold : 0);

  const unitAdCost = rawInputs.advertisingFeeType === 'percentage'
    ? (sellingPricePerUnit * (advertisingFeeValue / 100))
    : (monthlyUnitsSold > 0 ? advertisingFeeValue / monthlyUnitsSold : 0);

  const variableCostPerUnit = landedCostPerUnit + packagingCostPerUnit + unitMarketplaceFee + unitPaymentFee + unitAdCost;
  const contributionMarginPerUnit = roundCurrency(sellingPricePerUnit - variableCostPerUnit);

  // 8. Operating Break-Even (Monthly sales required to cover monthly recurring fixed overhead)
  let operatingBreakEvenUnits: number | null = null;
  let operatingBreakEvenRevenue: number | null = null;
  let breakEvenMessage: string | undefined = undefined;

  if (contributionMarginPerUnit > 0) {
    if (sanitizedOtherMonthly > 0) {
      operatingBreakEvenUnits = Math.ceil(sanitizedOtherMonthly / contributionMarginPerUnit);
      operatingBreakEvenRevenue = roundCurrency(operatingBreakEvenUnits * sellingPricePerUnit);
    } else {
      // If there are zero fixed monthly expenses, operating break-even is 0 units/mo
      operatingBreakEvenUnits = 0;
      operatingBreakEvenRevenue = 0;
    }
  } else {
    breakEvenMessage = 'Break-even cannot be reached: Variable costs per unit exceed selling price.';
  }

  // 9. Capital Recovery Units (Cumulative units required to recover initial inventory capital)
  let capitalRecoveryUnits: number | null = null;
  if (contributionMarginPerUnit > 0 && effectiveInitialInvestment > 0) {
    capitalRecoveryUnits = Math.ceil(effectiveInitialInvestment / contributionMarginPerUnit);
  }

  // 10. Payback Period (Months to recover initial inventory investment from monthly net cash profit)
  let monthsToRecoverInvestment: number | null = null;
  if (netProfit > 0 && effectiveInitialInvestment > 0) {
    monthsToRecoverInvestment = roundPercent(effectiveInitialInvestment / netProfit);
  }

  return {
    totalProductCost,
    totalLandedInventoryCost,
    landedCostPerUnit,
    effectiveInitialInvestment,
    monthlyRevenue,
    monthlyProductCost,
    marketplaceFees,
    paymentProcessingFees,
    advertisingCost,
    packagingCost,
    otherMonthlyExpenses: sanitizedOtherMonthly,
    totalMonthlyExpenses,
    netProfit,
    profitMargin,
    roi,
    annualizedRoi,
    profitabilityStatus,
    contributionMarginPerUnit,
    operatingBreakEvenUnits,
    operatingBreakEvenRevenue,
    breakEvenUnits: operatingBreakEvenUnits,
    breakEvenRevenue: operatingBreakEvenRevenue,
    capitalRecoveryUnits,
    monthsToRecoverInvestment,
    breakEvenMessage,
  };
}

/**
 * Calculates Conservative, Expected, and Optimistic sales scenarios
 */
export function calculateEcommerceScenarios(inputs: EcommerceProfitInputs): EcommerceScenario[] {
  const baseUnits = Math.max(0, inputs.monthlyUnitsSold || 0);

  const conservativeUnits = Math.max(1, Math.round(baseUnits * 0.7));
  const expectedUnits = baseUnits;
  const optimisticUnits = Math.round(baseUnits * 1.3);

  const scenarios: { name: 'Conservative' | 'Expected' | 'Optimistic'; units: number }[] = [
    { name: 'Conservative', units: conservativeUnits },
    { name: 'Expected', units: expectedUnits },
    { name: 'Optimistic', units: optimisticUnits },
  ];

  return scenarios.map((sc) => {
    const res = calculateEcommerceProfit({
      ...inputs,
      monthlyUnitsSold: sc.units,
    });
    return {
      name: sc.name,
      unitsSold: sc.units,
      revenue: res.monthlyRevenue,
      expenses: res.totalMonthlyExpenses,
      netProfit: res.netProfit,
      profitMargin: res.profitMargin,
      roi: res.roi,
    };
  });
}
