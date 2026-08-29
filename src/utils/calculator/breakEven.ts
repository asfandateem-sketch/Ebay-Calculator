import { CalculatorInputs, CalculatorResults } from '../../types';
import { calculateEbayFees } from './engine';

export interface BreakEvenScenario {
  price: number;
  revenue: number;
  totalFees: number;
  totalCosts: number;
  netProfit: number;
  margin: number;
}

export function generateBreakEvenCurve(inputs: CalculatorInputs): BreakEvenScenario[] {
  const baseResults = calculateEbayFees(inputs);
  const breakEven = baseResults.breakEvenPrice || 10;
  
  const step = Math.max(1, Math.round(breakEven * 0.15));
  const prices = [
    Math.max(1, breakEven - step * 2),
    Math.max(1, breakEven - step),
    breakEven,
    breakEven + step,
    breakEven + step * 2,
    breakEven + step * 3,
  ];

  return prices.map((price) => {
    const res = calculateEbayFees({ ...inputs, soldPrice: price });
    return {
      price,
      revenue: res.grossRevenue,
      totalFees: res.totalEbayFees,
      totalCosts: res.totalCosts,
      netProfit: res.netProfit,
      margin: res.profitMargin,
    };
  });
}

export function solveTargetPriceForProfit(
  inputs: CalculatorInputs,
  targetProfitDollar: number
): { requiredPrice: number; results: CalculatorResults } {
  // Profit = Price + ShipCharged - Costs - Fees(Price)
  // Quick iterative solver
  const safeTargetProfit = Math.min(10_000_000, Math.max(0, isNaN(Number(targetProfitDollar)) ? 0 : Number(targetProfitDollar)));
  const safeItemCost = Math.max(0, isNaN(Number(inputs.itemCost)) ? 0 : Number(inputs.itemCost));
  
  let low = 0;
  let high = Math.min(50_000_000, Math.max(1000, safeTargetProfit * 5 + safeItemCost * 5));
  let bestPrice = low;
  
  for (let i = 0; i < 40; i++) {
    const mid = (low + high) / 2;
    const res = calculateEbayFees({ ...inputs, soldPrice: mid });
    if (res.netProfit < safeTargetProfit) {
      low = mid;
    } else {
      high = mid;
      bestPrice = mid;
    }
  }
  
  const roundedPrice = Math.round(bestPrice * 100) / 100;
  return {
    requiredPrice: roundedPrice,
    results: calculateEbayFees({ ...inputs, soldPrice: roundedPrice }),
  };
}

export function solveTargetPriceForMargin(
  inputs: CalculatorInputs,
  targetMarginPercent: number
): { requiredPrice: number; results: CalculatorResults } {
  const safeMargin = Math.min(95, Math.max(0, isNaN(Number(targetMarginPercent)) ? 0 : Number(targetMarginPercent)));
  const targetFraction = safeMargin / 100;
  const safeItemCost = Math.max(0, isNaN(Number(inputs.itemCost)) ? 0 : Number(inputs.itemCost));
  
  let low = safeItemCost;
  let high = Math.min(50_000_000, Math.max(1000, safeItemCost * 20));
  let bestPrice = low;
  
  for (let i = 0; i < 40; i++) {
    const mid = (low + high) / 2;
    const res = calculateEbayFees({ ...inputs, soldPrice: mid });
    const currentMarginFraction = res.profitMargin / 100;
    if (currentMarginFraction < targetFraction) {
      low = mid;
    } else {
      high = mid;
      bestPrice = mid;
    }
  }
  
  const roundedPrice = Math.round(bestPrice * 100) / 100;
  return {
    requiredPrice: roundedPrice,
    results: calculateEbayFees({ ...inputs, soldPrice: roundedPrice }),
  };
}
