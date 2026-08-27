import React, { useState } from 'react';
import { allCountryCodes, getCountryConfig } from '../../data/fee-rules';
import { calculateEbayFees } from '../../utils/calculator/engine';
import { formatCurrency, formatPercent } from '../../utils/currency';
import { Layers, ArrowRight, ShieldCheck } from 'lucide-react';
import { RouterLink } from '../RouterLink';

interface FeeComparisonMatrixProps {
  onSelectCountry?: (path: string) => void;
}

export const FeeComparisonMatrix: React.FC<FeeComparisonMatrixProps> = () => {
  const [benchmarkPrice, setBenchmarkPrice] = useState<number>(100);
  const [benchmarkCost, setBenchmarkCost] = useState<number>(35);

  const countryPaths: Record<string, string> = {
    US: '/us',
    UK: '/uk',
    AU: '/au',
    CA: '/ca',
    DE: '/de',
    FR: '/fr',
    IT: '/it',
    ES: '/es',
  };

  const comparisons = allCountryCodes.map((code) => {
    const config = getCountryConfig(code);
    const results = calculateEbayFees({
      country: code,
      categoryId: config.categories[0].id,
      soldPrice: benchmarkPrice,
      shippingCharged: 0,
      itemCost: benchmarkCost,
      shippingCost: 8,
      otherCosts: 2,
      sellerLevel: 'standard',
      storeSubscription: 'none',
      promotedListingRate: 0,
      isInternational: false,
      salesTaxOrVatRate: config.defaultVatOrTaxRate * 100,
      freeMonthlyListingsUsed: false,
      quantitySold: 1,
    });

    return {
      code,
      name: config.name,
      flag: config.flag,
      currency: config.currency,
      standardRate: (config.defaultStandardRate * 100).toFixed(1) + '%',
      fixedFee: formatCurrency(config.defaultFixedFee, code),
      intlFee: (config.internationalFeeRate * 100).toFixed(1) + '%',
      totalFees: formatCurrency(results.totalEbayFees, code),
      effectiveRate: formatPercent(results.effectiveFeeRate),
      netProfit: formatCurrency(results.netProfit, code),
      margin: formatPercent(results.profitMargin),
      path: countryPaths[code] || '/usa-ebay-calculator',
      lastVerified: config.lastVerified,
    };
  });

  return (
    <div id="fee-comparison-matrix-wrapper" className="calc-card">
      <div className="calc-card-header">
        <div className="calc-title-badge">
          <Layers size={20} color="var(--color-primary)" />
          <div>
            <h3 className="calc-title">International eBay Fee Comparison Matrix</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Side-by-side benchmark comparison across 8 global eBay marketplaces.
            </p>
          </div>
        </div>

        {/* Benchmark Price Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Benchmark Sale:</span>
          {[50, 100, 250, 500, 1000].map((amt) => (
            <button
              key={amt}
              type="button"
              className={benchmarkPrice === amt ? 'btn-primary' : 'nav-tag-pill'}
              style={{ fontSize: '11px', padding: '4px 10px', minHeight: '28px' }}
              onClick={() => {
                setBenchmarkPrice(amt);
                setBenchmarkCost(Math.round(amt * 0.35));
              }}
            >
              ${amt}
            </button>
          ))}
        </div>
      </div>

      <div className="table-responsive-wrapper">
        <table className="table-comparison">
          <thead>
            <tr>
              <th>Marketplace</th>
              <th>Base Fee Rate</th>
              <th>Fixed Per-Order Fee</th>
              <th>Estimated Total Fees</th>
              <th>Effective Fee %</th>
              <th>Net Profit</th>
              <th>Profit Margin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((row) => (
              <tr key={row.code}>
                <td>
                  <RouterLink
                    to={row.path}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'inherit', textDecoration: 'none' }}
                  >
                    <span>{row.flag}</span>
                    <span>{row.name}</span>
                  </RouterLink>
                </td>
                <td>{row.standardRate}</td>
                <td>{row.fixedFee}</td>
                <td>{row.totalFees}</td>
                <td><strong>{row.effectiveRate}</strong></td>
                <td style={{ color: '#10b981', fontWeight: 600 }}>{row.netProfit}</td>
                <td>{row.margin}</td>
                <td>
                  <RouterLink
                    to={row.path}
                    className="country-card-link"
                    style={{ fontSize: '11px', whiteSpace: 'nowrap' }}
                  >
                    <span>Calculate</span>
                    <ArrowRight size={12} />
                  </RouterLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
        <ShieldCheck size={14} />
        <span>Estimated figures based on published 2026 fee schedules. Verified across all 8 international domains.</span>
      </div>
    </div>
  );
};
