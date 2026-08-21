import { CalculatorInputs } from '../../types';
import { calculateEbayFees } from './engine';

export interface PromotedComparisonTier {
  adRate: number;
  adFee: number;
  totalFees: number;
  netProfit: number;
  margin: number;
  roas: number;
  breakevenSalesMultiplier: number;
}

export function comparePromotedRates(inputs: CalculatorInputs, rates: number[] = [0, 2, 5, 8, 10, 15, 20]): PromotedComparisonTier[] {
  const base0 = calculateEbayFees({ ...inputs, promotedListingRate: 0 });
  const baseProfit = Math.max(0.01, base0.netProfit);
  
  return rates.map((rate) => {
    const res = calculateEbayFees({ ...inputs, promotedListingRate: rate });
    // How many more units do you need to sell to make the same absolute profit?
    const breakevenSalesMultiplier = res.netProfit > 0 ? baseProfit / res.netProfit : 999;
    
    return {
      adRate: rate,
      adFee: res.promotedListingFee,
      totalFees: res.totalEbayFees,
      netProfit: res.netProfit,
      margin: res.profitMargin,
      roas: res.promotedRoas,
      breakevenSalesMultiplier: Math.round(breakevenSalesMultiplier * 100) / 100,
    };
  });
}
