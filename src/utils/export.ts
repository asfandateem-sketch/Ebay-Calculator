import { CalculatorInputs, CalculatorResults, CountryCode } from '../types';
import { formatCurrency } from './currency';

export interface ConversionExportOptions {
  enabled: boolean;
  targetCurrency: string;
  exchangeRateText?: string;
  formatConverted?: (val: number) => string;
}

/**
 * Sanitizes a CSV cell value to prevent CSV Formula Injection (CWE-1236).
 * If a cell begins with =, +, -, @, \t, or \r, prepend a single quote (') so spreadsheet
 * software (Excel, Calc, Google Sheets) interprets it strictly as safe text.
 */
export function sanitizeCsvCell(cell: string | number | null | undefined): string {
  if (cell === null || cell === undefined) return '""';
  let str = String(cell).trim();
  if (/^[=+\-@\t\r]/.test(str)) {
    // If it's a valid standard negative number (e.g. -12.34 or -$12.34), it's safe unless followed by formula characters
    if (/^-\$?[0-9]+(\.[0-9]+)?%?$/.test(str)) {
      // Safe negative numeric representation
    } else {
      str = `'${str}`;
    }
  }
  return `"${str.replace(/"/g, '""')}"`;
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
    ['=== CALCULATION RESULTS ===', '===', ...(isConv ? ['==='] : [])],
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

  return rows.map((r) => r.map(sanitizeCsvCell).join(',')).join('\n');
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

const VALID_COUNTRIES: CountryCode[] = ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'ES'];

function sanitizePositiveFloat(val: string | null, fallback: number, max = 1000000): number {
  if (!val) return fallback;
  const parsed = parseFloat(val);
  if (isNaN(parsed) || !isFinite(parsed) || parsed < 0) return fallback;
  return Math.min(parsed, max);
}

function sanitizePositiveInt(val: string | null, fallback: number, max = 10000): number {
  if (!val) return fallback;
  const parsed = parseInt(val, 10);
  if (isNaN(parsed) || !isFinite(parsed) || parsed < 1) return fallback;
  return Math.min(parsed, max);
}

export function decodeInputsFromUrl(queryString: string, defaults: CalculatorInputs): CalculatorInputs {
  if (!queryString) return defaults;
  const params = new URLSearchParams(queryString);
  
  const rawCountry = params.get('country')?.toUpperCase() as CountryCode;
  const country = VALID_COUNTRIES.includes(rawCountry) ? rawCountry : defaults.country;

  return {
    country,
    categoryId: (params.get('category') || defaults.categoryId).slice(0, 80),
    soldPrice: sanitizePositiveFloat(params.get('price'), defaults.soldPrice),
    shippingCharged: sanitizePositiveFloat(params.get('ship_charged'), defaults.shippingCharged),
    itemCost: sanitizePositiveFloat(params.get('cost'), defaults.itemCost),
    shippingCost: sanitizePositiveFloat(params.get('ship_cost'), defaults.shippingCost),
    otherCosts: sanitizePositiveFloat(params.get('other_cost'), defaults.otherCosts),
    sellerLevel: (params.get('level') as any) || defaults.sellerLevel,
    storeSubscription: (params.get('store') as any) || defaults.storeSubscription,
    promotedListingRate: sanitizePositiveFloat(params.get('ad_rate'), defaults.promotedListingRate, 100),
    isInternational: params.get('intl') === '1',
    salesTaxOrVatRate: sanitizePositiveFloat(params.get('tax'), defaults.salesTaxOrVatRate, 100),
    freeMonthlyListingsUsed: defaults.freeMonthlyListingsUsed,
    quantitySold: sanitizePositiveInt(params.get('qty'), defaults.quantitySold),
  };
}

/**
 * Generates a clean, viral-ready text summary snippet for Reddit, Discord, WhatsApp, or forum posts.
 */
export function generateShareSummaryText(inputs: CalculatorInputs, results: CalculatorResults, url: string): string {
  const isProfitable = results.netProfit >= 0;
  const profitIcon = isProfitable ? '💰' : '⚠️';
  return [
    `${profitIcon} eBay Profit & Fee Calculation (${inputs.country}):`,
    `• Sold Price: ${formatCurrency(inputs.soldPrice, inputs.country)}${inputs.shippingCharged > 0 ? ` (+ ${formatCurrency(inputs.shippingCharged, inputs.country)} shipping)` : ''}`,
    `• Total eBay Fees: ${formatCurrency(results.totalEbayFees, inputs.country)} (${results.effectiveFeeRate}% effective)`,
    `• Total Costs (COGS + Ship): ${formatCurrency(results.totalItemCost + results.totalShippingCost + results.totalOtherCost, inputs.country)}`,
    `• Net Seller Profit: ${formatCurrency(results.netProfit, inputs.country)} (${results.profitMargin}% margin | ${results.roi}% ROI)`,
    `• Break-Even Price: ${formatCurrency(results.breakEvenPrice, inputs.country)}`,
    `Verified with Seller Margin Calculator: ${url}`,
  ].join('\n');
}
