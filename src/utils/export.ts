import { CalculatorInputs, CalculatorResults } from '../types';
import { formatCurrency } from './currency';

export interface ConversionExportOptions {
  enabled: boolean;
  targetCurrency: string;
  exchangeRateText?: string;
  formatConverted?: (val: number) => string;
}

export function generateCsvExport(
  inputs: CalculatorInputs,
  results: CalculatorResults,
  conversionOpts?: ConversionExportOptions
): string {
  const isConv = conversionOpts?.enabled && conversionOpts.formatConverted;
  const targetCurr = conversionOpts?.targetCurrency || 'USD';

  const rows: string[][] = [
    isConv
      ? ['Metric / Parameter', `Value (${inputs.country} Native)`, `Converted Value (${targetCurr})`]
      : ['Metric / Parameter', 'Value'],
    ['Marketplace', inputs.country, ...(isConv ? ['-'] : [])],
    ['Category ID', inputs.categoryId, ...(isConv ? ['-'] : [])],
    ['Quantity', inputs.quantitySold.toString(), ...(isConv ? ['-'] : [])],
    ['Selling Price (per unit)', inputs.soldPrice.toFixed(2), ...(isConv ? [conversionOpts.formatConverted!(inputs.soldPrice)] : [])],
    ['Shipping Charged (per unit)', inputs.shippingCharged.toFixed(2), ...(isConv ? [conversionOpts.formatConverted!(inputs.shippingCharged)] : [])],
    ['Item Cost (per unit)', inputs.itemCost.toFixed(2), ...(isConv ? [conversionOpts.formatConverted!(inputs.itemCost)] : [])],
    ['Shipping Cost (per unit)', inputs.shippingCost.toFixed(2), ...(isConv ? [conversionOpts.formatConverted!(inputs.shippingCost)] : [])],
    ['Other Direct Costs (per unit)', inputs.otherCosts.toFixed(2), ...(isConv ? [conversionOpts.formatConverted!(inputs.otherCosts)] : [])],
    ['Seller Level', inputs.sellerLevel, ...(isConv ? ['-'] : [])],
    ['Store Subscription', inputs.storeSubscription, ...(isConv ? ['-'] : [])],
    ['Promoted Listings Ad Rate', `${inputs.promotedListingRate}%`, ...(isConv ? ['-'] : [])],
    ['International Sale', inputs.isInternational ? 'Yes' : 'No', ...(isConv ? ['-'] : [])],
    ['Buyer Sales Tax / VAT Rate', `${inputs.salesTaxOrVatRate}%`, ...(isConv ? ['-'] : [])],
  ];

  if (isConv && conversionOpts.exchangeRateText) {
    rows.push(['Exchange Rate Used', conversionOpts.exchangeRateText, '-']);
  }

  rows.push(
    ['', '', ...(isConv ? [''] : [])],
    ['--- CALCULATION RESULTS ---', '---', ...(isConv ? ['---'] : [])],
    ['Gross Revenue', formatCurrency(results.grossRevenue, inputs.country), ...(isConv ? [conversionOpts.formatConverted!(results.grossRevenue)] : [])],
    ['Total Final Value Fee', formatCurrency(results.totalFinalValueFee, inputs.country), ...(isConv ? [conversionOpts.formatConverted!(results.totalFinalValueFee)] : [])],
    ['Promoted Listing Ad Fee', formatCurrency(results.promotedListingFee, inputs.country), ...(isConv ? [conversionOpts.formatConverted!(results.promotedListingFee)] : [])],
    ['International Fee', formatCurrency(results.internationalFee, inputs.country), ...(isConv ? [conversionOpts.formatConverted!(results.internationalFee)] : [])],
    ['Insertion Fee', formatCurrency(results.insertionFee, inputs.country), ...(isConv ? [conversionOpts.formatConverted!(results.insertionFee)] : [])],
    ['Total eBay Fees', formatCurrency(results.totalEbayFees, inputs.country), ...(isConv ? [conversionOpts.formatConverted!(results.totalEbayFees)] : [])],
    ['Effective Fee %', `${results.effectiveFeeRate}%`, ...(isConv ? [`${results.effectiveFeeRate}%`] : [])],
    ['Total Item & Shipping Costs', formatCurrency(results.totalItemCost + results.totalShippingCost + results.totalOtherCost, inputs.country), ...(isConv ? [conversionOpts.formatConverted!(results.totalItemCost + results.totalShippingCost + results.totalOtherCost)] : [])],
    ['Net Profit', formatCurrency(results.netProfit, inputs.country), ...(isConv ? [conversionOpts.formatConverted!(results.netProfit)] : [])],
    ['Profit Margin', `${results.profitMargin}%`, ...(isConv ? [`${results.profitMargin}%`] : [])],
    ['Return on Investment (ROI)', `${results.roi}%`, ...(isConv ? [`${results.roi}%`] : [])],
    ['Break-Even Selling Price', formatCurrency(results.breakEvenPrice, inputs.country), ...(isConv ? [conversionOpts.formatConverted!(results.breakEvenPrice)] : [])],
    ['Target 20% Margin Price', formatCurrency(results.recommendedPrice20PercentMargin, inputs.country), ...(isConv ? [conversionOpts.formatConverted!(results.recommendedPrice20PercentMargin)] : [])],
    ['Target 30% Margin Price', formatCurrency(results.recommendedPrice30PercentMargin, inputs.country), ...(isConv ? [conversionOpts.formatConverted!(results.recommendedPrice30PercentMargin)] : [])],
    ['Exported Via', 'Seller Margin Calculator (https://asfandateem-sketch.github.io/Ebay-Calculator/)', ...(isConv ? ['-'] : [])],
    ['Generated At', new Date().toISOString(), ...(isConv ? ['-'] : [])]
  );

  return rows.map((r) => r.map((cell) => `"${(cell || '').replace(/"/g, '""')}"`).join(',')).join('\n');
}

export function downloadCsv(content: string, filename = 'sellermargincalc-calculation.csv'): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function encodeInputsToUrl(inputs: CalculatorInputs): string {
  const params = new URLSearchParams();
  params.set('country', inputs.country);
  params.set('category', inputs.categoryId);
  params.set('price', inputs.soldPrice.toString());
  params.set('ship_charged', inputs.shippingCharged.toString());
  params.set('cost', inputs.itemCost.toString());
  params.set('ship_cost', inputs.shippingCost.toString());
  params.set('other_cost', inputs.otherCosts.toString());
  params.set('level', inputs.sellerLevel);
  params.set('store', inputs.storeSubscription);
  params.set('ad_rate', inputs.promotedListingRate.toString());
  params.set('intl', inputs.isInternational ? '1' : '0');
  params.set('tax', inputs.salesTaxOrVatRate.toString());
  params.set('qty', inputs.quantitySold.toString());
  return params.toString();
}

export function decodeInputsFromUrl(queryString: string, defaults: CalculatorInputs): CalculatorInputs {
  if (!queryString) return defaults;
  const params = new URLSearchParams(queryString);
  
  return {
    country: (params.get('country') as any) || defaults.country,
    categoryId: params.get('category') || defaults.categoryId,
    soldPrice: params.has('price') ? parseFloat(params.get('price')!) || 0 : defaults.soldPrice,
    shippingCharged: params.has('ship_charged') ? parseFloat(params.get('ship_charged')!) || 0 : defaults.shippingCharged,
    itemCost: params.has('cost') ? parseFloat(params.get('cost')!) || 0 : defaults.itemCost,
    shippingCost: params.has('ship_cost') ? parseFloat(params.get('ship_cost')!) || 0 : defaults.shippingCost,
    otherCosts: params.has('other_cost') ? parseFloat(params.get('other_cost')!) || 0 : defaults.otherCosts,
    sellerLevel: (params.get('level') as any) || defaults.sellerLevel,
    storeSubscription: (params.get('store') as any) || defaults.storeSubscription,
    promotedListingRate: params.has('ad_rate') ? parseFloat(params.get('ad_rate')!) || 0 : defaults.promotedListingRate,
    isInternational: params.get('intl') === '1',
    salesTaxOrVatRate: params.has('tax') ? parseFloat(params.get('tax')!) || 0 : defaults.salesTaxOrVatRate,
    freeMonthlyListingsUsed: defaults.freeMonthlyListingsUsed,
    quantitySold: params.has('qty') ? parseInt(params.get('qty')!, 10) || 1 : defaults.quantitySold,
  };
}
