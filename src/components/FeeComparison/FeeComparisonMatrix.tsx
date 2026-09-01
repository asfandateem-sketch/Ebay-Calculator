import React, { useState } from 'react';
import { allCountryCodes, getCountryConfig } from '../../data/fee-rules';
import { calculateEbayFees } from '../../utils/calculator/engine';
import { formatCurrency, formatPercent } from '../../utils/currency';
import { useCurrencyContext } from '../../context/CurrencyContext';
import { Layers, ArrowRight, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import { RouterLink } from '../RouterLink';
import { CountryFlag } from '../CountrySelector/CountryFlag';

interface FeeComparisonMatrixProps {
  onSelectCountry?: (path: string) => void;
}

export const FeeComparisonMatrix: React.FC<FeeComparisonMatrixProps> = () => {
  const [benchmarkPrice, setBenchmarkPrice] = useState<number>(100);
  const [benchmarkCost, setBenchmarkCost] = useState<number>(35);
  const { isConversionEnabled, targetCurrency, formatConverted, toggleConversion } = useCurrencyContext();

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
      fixedFeeConverted: formatConverted(config.defaultFixedFee, code),
      intlFee: (config.internationalFeeRate * 100).toFixed(1) + '%',
      totalFees: formatCurrency(results.totalEbayFees, code),
      totalFeesConverted: formatConverted(results.totalEbayFees, code),
      effectiveRate: formatPercent(results.effectiveFeeRate),
      netProfit: formatCurrency(results.netProfit, code),
      netProfitConverted: formatConverted(results.netProfit, code),
      netProfitRaw: results.netProfit,
      margin: formatPercent(results.profitMargin),
      path: countryPaths[code] || '/usa-ebay-calculator',
      lastVerified: config.lastVerified,
    };
  });

  return (
    <div id="fee-comparison-matrix-wrapper" className="calc-card">
      <div className="calc-card-header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div className="calc-title-badge">
            <Layers size={20} color="var(--color-primary)" />
            <div>
              <h2 className="calc-title">International eBay Fee Comparison Matrix</h2>
              <p style={{ fontSize: '12px', color: 'var(--color-text-subtle)' }}>
                Side-by-side benchmark comparison across 8 global eBay marketplaces.
              </p>
            </div>
          </div>

          {/* Quick FX Conversion Switch */}
          <button
            type="button"
            className={isConversionEnabled ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '12px', padding: '6px 12px', minHeight: '32px' }}
            onClick={toggleConversion}
            title="Convert matrix metrics to unified target currency"
          >
            <ArrowRightLeft size={13} />
            <span>{isConversionEnabled ? `Normalized to ${targetCurrency}` : `Convert to ${targetCurrency}`}</span>
          </button>
        </div>

        {/* Benchmark Price Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-text-subtle)', fontWeight: 500 }}>Benchmark Sale (Local Units):</span>
          {[50, 100, 250, 500, 1000].map((amt) => (
            <button
              key={amt}
              type="button"
              className={benchmarkPrice === amt ? 'btn-primary' : 'btn-table-action'}
              style={{ minHeight: '30px', padding: '4px 12px' }}
              onClick={() => {
                setBenchmarkPrice(amt);
                setBenchmarkCost(Math.round(amt * 0.35));
              }}
            >
              {amt}
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
                    <CountryFlag code={row.code} width={18} height={13} ariaLabel={`${row.name} flag`} />
                    <span>{row.name}</span>
                  </RouterLink>
                </td>
                <td>{row.standardRate}</td>
                <td>
                  <span>{row.fixedFee}</span>
                  {isConversionEnabled && row.currency.code !== targetCurrency && (
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      ≈ {row.fixedFeeConverted}
                    </span>
                  )}
                </td>
                <td>
                  <span>{row.totalFees}</span>
                  {isConversionEnabled && row.currency.code !== targetCurrency && (
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      ≈ {row.totalFeesConverted}
                    </span>
                  )}
                </td>
                <td><strong>{row.effectiveRate}</strong></td>
                <td style={{ color: row.netProfitRaw >= 0 ? '#047857' : '#b91c1c', fontWeight: 600 }}>
                  <span>{row.netProfit}</span>
                  {isConversionEnabled && row.currency.code !== targetCurrency && (
                    <span style={{ display: 'block', fontSize: '11px', color: row.netProfitRaw >= 0 ? '#047857' : '#b91c1c' }}>
                      ≈ {row.netProfitConverted}
                    </span>
                  )}
                </td>
                <td>{row.margin}</td>
                <td>
                  <RouterLink
                    to={row.path}
                    className="btn-table-action"
                    aria-label={`Calculate eBay fees for ${row.name}`}
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
