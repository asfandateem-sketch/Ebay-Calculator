export interface EcommerceProfitInputs {
  // Inventory
  initialStockInvestment?: number; // Optional manual override or calculated
  unitsPurchased: number;
  productCostPerUnit: number;

  // Landed Cost Components
  shippingFreight: number;
  customsDuties: number;
  otherImportCosts: number;

  // Selling
  sellingPricePerUnit: number;
  monthlyUnitsSold: number;

  // Selling Expenses
  marketplaceFeeType: 'percentage' | 'fixed';
  marketplaceFeeValue: number; // e.g. 13.25 (%) or fixed amount ($)

  paymentProcessingFeeType: 'percentage' | 'fixed';
  paymentProcessingFeeValue: number; // e.g. 2.9 (%) or fixed amount ($)

  advertisingFeeType: 'percentage' | 'fixed';
  advertisingFeeValue: number; // e.g. 5.0 (%) or fixed amount ($)

  packagingCostPerUnit: number;

  // Other Fixed/Operating Expenses
  otherMonthlyExpenses: number;
}

export type ProfitabilityStatus = 'PROFITABLE' | 'BREAK-EVEN' | 'LOSS';

export interface EcommerceProfitResults {
  // Landed Inventory Summary
  totalProductCost: number;
  totalLandedInventoryCost: number;
  landedCostPerUnit: number;
  effectiveInitialInvestment: number;

  // Monthly Revenue & Costs
  monthlyRevenue: number;
  monthlyProductCost: number;
  marketplaceFees: number;
  paymentProcessingFees: number;
  advertisingCost: number;
  packagingCost: number;
  otherMonthlyExpenses: number;
  totalMonthlyExpenses: number;

  // Net Profit & Profitability
  netProfit: number;
  profitMargin: number | null; // null if revenue is 0
  roi: number | null; // null if investment is 0
  annualizedRoi: number | null;
  profitabilityStatus: ProfitabilityStatus;

  // Contribution Margin & Break-Even
  contributionMarginPerUnit: number;
  operatingBreakEvenUnits: number | null; // Monthly units required to cover monthly fixed overhead
  operatingBreakEvenRevenue: number | null; // Monthly revenue required to cover monthly fixed overhead
  breakEvenUnits: number | null; // Alias for operatingBreakEvenUnits
  breakEvenRevenue: number | null; // Alias for operatingBreakEvenRevenue
  capitalRecoveryUnits: number | null; // Cumulative units required to recover initial inventory capital
  monthsToRecoverInvestment: number | null; // Payback period in months: initialInvestment / monthlyNetProfit
  breakEvenMessage?: string;
}

export interface EcommerceScenario {
  name: 'Conservative' | 'Expected' | 'Optimistic';
  unitsSold: number;
  revenue: number;
  expenses: number;
  netProfit: number;
  profitMargin: number | null;
  roi: number | null;
}
