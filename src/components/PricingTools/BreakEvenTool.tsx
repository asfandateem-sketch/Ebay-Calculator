import React, { useEffect } from 'react';
import { CalculatorInputs } from '../../types';
import { generateBreakEvenCurve } from '../../utils/calculator/breakEven';
import { calculateEbayFees } from '../../utils/calculator/engine';
import { formatCurrency, formatPercent } from '../../utils/currency';
import { trackEvent } from '../../utils/analytics';
import { Target, TrendingUp, AlertTriangle } from 'lucide-react';

interface BreakEvenToolProps {
  inputs: CalculatorInputs;
  onUpdateInput: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
}

export const BreakEvenTool: React.FC<BreakEvenToolProps> = ({ inputs, onUpdateInput }) => {
  const baseResults = calculateEbayFees(inputs);
  const scenarios = generateBreakEvenCurve(inputs);

  useEffect(() => {
    trackEvent('break_even_calculated', {
      country: inputs.country,
      category: inputs.categoryId,
    });
  }, [baseResults.breakEvenPrice, inputs.country, inputs.categoryId]);

  return (
    <div id="breakeven-tool-wrapper" className="calc-card">
      <div className="calc-card-header">
        <div className="calc-title-badge">
          <Target size={20} color="var(--color-primary)" />
          <div>
            <h3 className="calc-title">eBay Break-Even Sensitivity & Pricing Horizon</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Evaluate profitability thresholds across varying selling price points.
            </p>
          </div>
        </div>
      </div>

      {/* Break-even highlight */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          padding: '20px',
          background: 'var(--color-soft-gray)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '24px',
        }}
      >
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
            Break-Even Selling Price
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-primary)' }}>
            {formatCurrency(baseResults.breakEvenPrice, inputs.country)}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            Zero profit / zero loss point
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
            Current Selling Price
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: baseResults.netProfit >= 0 ? '#047857' : '#b91c1c' }}>
            {formatCurrency(inputs.soldPrice, inputs.country)}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            Yields {formatCurrency(baseResults.netProfit, inputs.country)} profit ({formatPercent(baseResults.profitMargin)})
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
            Total Direct Cash Outlay
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-primary)' }}>
            {formatCurrency(baseResults.totalItemCost + baseResults.totalShippingCost + baseResults.totalOtherCost, inputs.country)}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            Item COGS + shipping label + packing
          </div>
        </div>
      </div>

      {/* Sensitivity Table */}
      <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
        Price Scenario Sensitivity Matrix
      </h4>
      <div className="table-responsive-wrapper">
        <table className="table-comparison">
          <thead>
            <tr>
              <th>Selling Price</th>
              <th>Gross Revenue</th>
              <th>Platform Fees</th>
              <th>Direct Costs</th>
              <th>Net Profit</th>
              <th>Net Margin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((sc, idx) => {
              const isCurrent = Math.abs(sc.price - inputs.soldPrice) < 0.01;
              const isBE = Math.abs(sc.price - baseResults.breakEvenPrice) < 0.5;
              return (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: isCurrent ? 'rgba(0, 0, 0, 0.04)' : undefined,
                    fontWeight: isCurrent ? 600 : 400,
                  }}
                >
                  <td>
                    <span>{formatCurrency(sc.price, inputs.country)}</span>
                    {isBE && (
                      <span style={{ marginLeft: '6px', fontSize: '10px', padding: '2px 6px', background: '#fef3c7', color: '#92400e', borderRadius: '4px' }}>
                        Break-Even
                      </span>
                    )}
                  </td>
                  <td>{formatCurrency(sc.revenue, inputs.country)}</td>
                  <td>{formatCurrency(sc.totalFees, inputs.country)}</td>
                  <td>{formatCurrency(sc.totalCosts - sc.totalFees, inputs.country)}</td>
                  <td style={{ color: sc.netProfit >= 0 ? '#047857' : '#b91c1c', fontWeight: 600 }}>
                    {formatCurrency(sc.netProfit, inputs.country)}
                  </td>
                  <td>{formatPercent(sc.margin)}</td>
                  <td>
                    <button
                      type="button"
                      className="nav-tag-pill"
                      style={{ fontSize: '11px', padding: '4px 10px' }}
                      onClick={() => onUpdateInput('soldPrice', sc.price)}
                    >
                      Set Price
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
