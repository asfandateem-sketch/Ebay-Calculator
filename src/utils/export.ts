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

const VALID_COUNTRIES: CalculatorInputs['country'][] = ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'ES'];
const VALID_SELLER_LEVELS: CalculatorInputs['sellerLevel'][] = ['standard', 'top_rated', 'below_standard'];
const VALID_STORE_SUBSCRIPTIONS: CalculatorInputs['storeSubscription'][] = ['none', 'starter', 'basic', 'premium', 'anchor', 'enterprise'];

function parseSafeNumber(val: string | null, fallback: number, min = 0, max = 100_000_000): number {
  if (val === null || val === undefined || val.trim() === '') return fallback;
  const num = Number(val);
  if (isNaN(num) || !isFinite(num)) return fallback;
  return Math.min(max, Math.max(min, num));
}

function parseSafeCategory(val: string | null, fallback: string): string {
  if (!val) return fallback;
  // Clean alphanumeric + underscore/hyphen strings up to 64 chars
  const sanitized = val.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
  return sanitized || fallback;
}

export function decodeInputsFromUrl(search: string, fallback: CalculatorInputs): CalculatorInputs {
  if (!search || typeof search !== 'string') return fallback;
  const params = new URLSearchParams(search);
  if (!params.has('price') && !params.has('country') && !params.has('category')) return fallback;

  const rawCountry = (params.get('country') || '').toUpperCase() as CalculatorInputs['country'];
  const country = VALID_COUNTRIES.includes(rawCountry) ? rawCountry : fallback.country;

  const rawSeller = (params.get('seller') || '').toLowerCase() as CalculatorInputs['sellerLevel'];
  const sellerLevel = VALID_SELLER_LEVELS.includes(rawSeller) ? rawSeller : fallback.sellerLevel;

  const rawStore = (params.get('store') || '').toLowerCase() as CalculatorInputs['storeSubscription'];
  const storeSubscription = VALID_STORE_SUBSCRIPTIONS.includes(rawStore) ? rawStore : fallback.storeSubscription;

  return {
    country,
    categoryId: parseSafeCategory(params.get('category'), fallback.categoryId),
    soldPrice: parseSafeNumber(params.get('price'), fallback.soldPrice),
    shippingCharged: parseSafeNumber(params.get('ship_charged'), fallback.shippingCharged),
    itemCost: parseSafeNumber(params.get('cost'), fallback.itemCost),
    shippingCost: parseSafeNumber(params.get('ship_cost'), fallback.shippingCost),
    otherCosts: parseSafeNumber(params.get('other'), fallback.otherCosts),
    sellerLevel,
    storeSubscription,
    promotedListingRate: parseSafeNumber(params.get('ad_rate'), fallback.promotedListingRate, 0, 100),
    isInternational: params.get('intl') === '1',
    salesTaxOrVatRate: parseSafeNumber(params.get('tax'), fallback.salesTaxOrVatRate, 0, 100),
    freeMonthlyListingsUsed: fallback.freeMonthlyListingsUsed,
    quantitySold: Math.floor(parseSafeNumber(params.get('qty'), fallback.quantitySold || 1, 1, 1_000_000)),
  };
}
