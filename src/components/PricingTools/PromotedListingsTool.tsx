import React from 'react';
import { CalculatorInputs } from '../../types';
import { comparePromotedRates } from '../../utils/calculator/promoted';
import { formatCurrency, formatPercent } from '../../utils/currency';
import { TrendingUp, Award, BarChart3, HelpCircle } from 'lucide-react';

interface PromotedListingsToolProps {
  inputs: CalculatorInputs;
  onUpdateInput: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
}

export const PromotedListingsTool: React.FC<PromotedListingsToolProps> = ({ inputs, onUpdateInput }) => {
  const comparisonTiers = comparePromotedRates(inputs, [0, 2, 4, 6, 8, 10, 12, 15]);

  return (
    <div id="promoted-listings-tool-wrapper" className="calc-card">
      <div className="calc-card-header">
        <div className="calc-title-badge">
          <TrendingUp size={20} color="var(--color-primary)" />
          <div>
            <h3 className="calc-title">eBay Promoted Listings Ad Rate & ROI Intelligence</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Evaluate ad spend trade-offs between sales velocity and margin erosion.
            </p>
          </div>
        </div>
      </div>

      <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-text-muted)', marginBottom: '20px' }}>
        Promoted Listings Standard charges a percentage of total sale revenue ONLY when an item sells through an ad click within 30 days. Higher ad rates boost search impressions, but require higher sales velocity to justify the margin deduction.
      </div>

      {/* Comparison Table */}
      <div className="table-responsive-wrapper">
        <table className="table-comparison">
          <thead>
            <tr>
              <th>Ad Rate %</th>
              <th>Ad Fee</th>
              <th>Total eBay Fees</th>
              <th>Net Profit</th>
              <th>Net Margin</th>
              <th>Breakeven Velocity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comparisonTiers.map((tier, idx) => {
              const isSelected = Math.abs(tier.adRate - inputs.promotedListingRate) < 0.1;
              return (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.04)' : undefined,
                    fontWeight: isSelected ? 600 : 400,
                  }}
                >
                  <td>
                    <span>{tier.adRate === 0 ? '0% (Organic Only)' : `${tier.adRate}%`}</span>
                    {isSelected && (
                      <span style={{ marginLeft: '6px', fontSize: '10px', padding: '2px 6px', background: '#000', color: '#fff', borderRadius: '4px' }}>
                        Active
                      </span>
                    )}
                  </td>
                  <td>{tier.adFee > 0 ? formatCurrency(tier.adFee, inputs.country) : '$0.00'}</td>
                  <td>{formatCurrency(tier.totalFees, inputs.country)}</td>
                  <td style={{ color: tier.netProfit >= 0 ? '#10b981' : '#ef4444' }}>
                    {formatCurrency(tier.netProfit, inputs.country)}
                  </td>
                  <td>{formatPercent(tier.margin)}</td>
                  <td>
                    {tier.adRate === 0 ? '1.00x (Base)' : `${tier.breakevenSalesMultiplier}x units needed`}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="nav-tag-pill"
                      style={{ fontSize: '11px', padding: '4px 10px' }}
                      onClick={() => onUpdateInput('promotedListingRate', tier.adRate)}
                    >
                      Use Rate
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
