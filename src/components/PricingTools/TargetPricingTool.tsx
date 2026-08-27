import React, { useState, useEffect } from 'react';
import { CalculatorInputs } from '../../types';
import { solveTargetPriceForProfit, solveTargetPriceForMargin } from '../../utils/calculator/breakEven';
import { formatCurrency, formatPercent } from '../../utils/currency';
import { trackEvent } from '../../utils/analytics';
import { DollarSign, Percent, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TargetPricingToolProps {
  inputs: CalculatorInputs;
  onUpdateInput: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
}

export const TargetPricingTool: React.FC<TargetPricingToolProps> = ({ inputs, onUpdateInput }) => {
  const [targetType, setTargetType] = useState<'profit' | 'margin'>('profit');
  const [targetProfitValue, setTargetProfitValue] = useState<number>(35);
  const [targetMarginValue, setTargetMarginValue] = useState<number>(25);

  const solvedProfit = solveTargetPriceForProfit(inputs, targetProfitValue);
  const solvedMargin = solveTargetPriceForMargin(inputs, targetMarginValue);

  const activeSolution = targetType === 'profit' ? solvedProfit : solvedMargin;

  useEffect(() => {
    trackEvent('target_margin_calculated', {
      country: inputs.country,
      target_type: targetType,
      target_value: targetType === 'profit' ? targetProfitValue : targetMarginValue,
      required_price: activeSolution.requiredPrice,
    });
  }, [targetType, targetProfitValue, targetMarginValue, activeSolution.requiredPrice, inputs.country]);

  return (
    <div id="target-pricing-tool-wrapper" className="calc-card">
      <div className="calc-card-header">
        <div className="calc-title-badge">
          <DollarSign size={20} color="var(--color-primary)" />
          <div>
            <h3 className="calc-title">eBay Target Profit & Margin Pricing Solver</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Determine the exact Buy It Now price required to achieve your financial objectives.
            </p>
          </div>
        </div>
      </div>

      {/* Target Selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          type="button"
          className={targetType === 'profit' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '13px', minHeight: '38px', padding: '8px 18px' }}
          onClick={() => setTargetType('profit')}
        >
          <DollarSign size={14} />
          <span>Target Dollar Profit ($)</span>
        </button>

        <button
          type="button"
          className={targetType === 'margin' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '13px', minHeight: '38px', padding: '8px 18px' }}
          onClick={() => setTargetType('margin')}
        >
          <Percent size={14} />
          <span>Target Margin (%)</span>
        </button>
      </div>

      {/* Goal Input */}
      <div className="form-group" style={{ maxWidth: '320px', marginBottom: '24px' }}>
        <label
          htmlFor={targetType === 'profit' ? 'input-target-profit-amount' : 'input-target-margin-percent'}
          className="form-label"
        >
          {targetType === 'profit' ? 'Desired Net Profit Amount:' : 'Desired Net Margin Percentage:'}
        </label>
        <div className="input-with-adornment">
          {targetType === 'profit' ? (
            <>
              <span className="input-adornment-prefix">$</span>
              <input
                id="input-target-profit-amount"
                name="targetProfitAmount"
                type="number"
                min="1"
                step="1"
                className="form-input has-prefix"
                aria-label="Desired Net Profit Dollar Amount"
                value={targetProfitValue}
                onChange={(e) => setTargetProfitValue(parseFloat(e.target.value) || 1)}
              />
            </>
          ) : (
            <>
              <input
                id="input-target-margin-percent"
                name="targetMarginPercent"
                type="number"
                min="1"
                max="90"
                step="1"
                className="form-input has-suffix"
                aria-label="Desired Net Profit Margin Percentage"
                value={targetMarginValue}
                onChange={(e) => setTargetMarginValue(parseFloat(e.target.value) || 1)}
              />
              <span className="input-adornment-suffix">%</span>
            </>
          )}
        </div>
      </div>

      {/* Solved Output Box */}
      <div
        style={{
          background: 'var(--color-primary)',
          color: 'var(--color-white)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.65 }}>
            Required Listing Price
          </div>
          <div style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.02em', marginTop: '4px' }}>
            {formatCurrency(activeSolution.requiredPrice, inputs.country)}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.75, marginTop: '2px' }}>
            Generates {formatCurrency(activeSolution.results.netProfit, inputs.country)} Net Profit ({formatPercent(activeSolution.results.profitMargin)} margin)
          </div>
        </div>

        <button
          type="button"
          className="btn-primary"
          style={{ background: 'var(--color-white)', color: 'var(--color-primary)', minHeight: '40px' }}
          onClick={() => onUpdateInput('soldPrice', activeSolution.requiredPrice)}
        >
          <CheckCircle2 size={16} />
          <span>Apply to Calculator</span>
        </button>
      </div>
    </div>
  );
};
