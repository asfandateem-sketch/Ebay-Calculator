import { CalculatorInputs, CalculatorResults } from '../types';
import { formatCurrency } from './currency';

export function generateCsvExport(inputs: CalculatorInputs, results: CalculatorResults): string {
  const rows = [
    ['Metric / Parameter', 'Value'],
    ['Marketplace', inputs.country],
    ['Category ID', inputs.categoryId],
    ['Quantity', inputs.quantitySold.toString()],
    ['Selling Price (per unit)', inputs.soldPrice.toFixed(2)],
    ['Shipping Charged (per unit)', inputs.shippingCharged.toFixed(2)],
    ['Item Cost (per unit)', inputs.itemCost.toFixed(2)],
    ['Shipping Cost (per unit)', inputs.shippingCost.toFixed(2)],
    ['Other Direct Costs (per unit)', inputs.otherCosts.toFixed(2)],
    ['Seller Level', inputs.sellerLevel],
    ['Store Subscription', inputs.storeSubscription],
    ['Promoted Listings Ad Rate', `${inputs.promotedListingRate}%`],
    ['International Sale', inputs.isInternational ? 'Yes' : 'No'],
    ['Buyer Sales Tax / VAT Rate', `${inputs.salesTaxOrVatRate}%`],
    ['', ''],
    ['--- CALCULATION RESULTS ---', '---'],
    ['Gross Revenue', formatCurrency(results.grossRevenue, inputs.country)],
    ['Total Final Value Fee', formatCurrency(results.totalFinalValueFee, inputs.country)],
    ['Promoted Listing Ad Fee', formatCurrency(results.promotedListingFee, inputs.country)],
    ['International Fee', formatCurrency(results.internationalFee, inputs.country)],
    ['Insertion Fee', formatCurrency(results.insertionFee, inputs.country)],
    ['Total eBay Fees', formatCurrency(results.totalEbayFees, inputs.country)],
    ['Effective Fee %', `${results.effectiveFeeRate}%`],
    ['Total Item & Shipping Costs', formatCurrency(results.totalItemCost + results.totalShippingCost + results.totalOtherCost, inputs.country)],
    ['Net Profit', formatCurrency(results.netProfit, inputs.country)],
    ['Profit Margin', `${results.profitMargin}%`],
    ['Return on Investment (ROI)', `${results.roi}%`],
    ['Break-Even Selling Price', formatCurrency(results.breakEvenPrice, inputs.country)],
    ['Target 20% Margin Price', formatCurrency(results.recommendedPrice20PercentMargin, inputs.country)],
    ['Target 30% Margin Price', formatCurrency(results.recommendedPrice30PercentMargin, inputs.country)],
    ['Exported Via', 'ProfitEbay (https://asfandateem-sketch.github.io/Ebay-Calculator/)'],
    ['Generated At', new Date().toISOString()],
  ];

  return rows.map((r) => r.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
}

export function downloadCsv(content: string, filename = 'profitebay-ebay-calculation.csv'): void {
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
  params.set('other', inputs.otherCosts.toString());
  params.set('seller', inputs.sellerLevel);
  params.set('store', inputs.storeSubscription);
  params.set('ad_rate', inputs.promotedListingRate.toString());
  params.set('intl', inputs.isInternational ? '1' : '0');
  params.set('tax', inputs.salesTaxOrVatRate.toString());
  params.set('qty', inputs.quantitySold.toString());
  return params.toString();
}

export function decodeInputsFromUrl(search: string, fallback: CalculatorInputs): CalculatorInputs {
  const params = new URLSearchParams(search);
  if (!params.has('price') && !params.has('country')) return fallback;

  return {
    country: (params.get('country') as CalculatorInputs['country']) || fallback.country,
    categoryId: params.get('category') || fallback.categoryId,
    soldPrice: Number(params.get('price')) || fallback.soldPrice,
    shippingCharged: Number(params.get('ship_charged')) || fallback.shippingCharged,
    itemCost: Number(params.get('cost')) || fallback.itemCost,
    shippingCost: Number(params.get('ship_cost')) || fallback.shippingCost,
    otherCosts: Number(params.get('other')) || fallback.otherCosts,
    sellerLevel: (params.get('seller') as CalculatorInputs['sellerLevel']) || fallback.sellerLevel,
    storeSubscription: (params.get('store') as CalculatorInputs['storeSubscription']) || fallback.storeSubscription,
    promotedListingRate: Number(params.get('ad_rate')) || fallback.promotedListingRate,
    isInternational: params.get('intl') === '1',
    salesTaxOrVatRate: Number(params.get('tax')) || fallback.salesTaxOrVatRate,
    freeMonthlyListingsUsed: fallback.freeMonthlyListingsUsed,
    quantitySold: Number(params.get('qty')) || 1,
  };
}
