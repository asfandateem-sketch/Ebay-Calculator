import React, { useState } from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import { useSEO } from '../../hooks/useSEO';
import { formatCurrency, formatPercent } from '../../utils/currency';
import { Logo } from '../Navbar/Logo';
import { ExternalLink, Copy, Check } from 'lucide-react';

export const EmbedWidget: React.FC = () => {
  useSEO({
    title: 'eBay Fee Calculator Widget — ProfitEbay',
    description: 'Embeddable eBay fee calculator widget for e-commerce websites and seller blogs.',
    noIndex: true,
  });

  const { inputs, results, updateInput } = useCalculator();

  return (
    <div className="embed-widget-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
        <Logo />
        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Fee Calculator Widget
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="input-embed-sold-price" className="form-label" style={{ fontSize: '11px' }}>Sold Price</label>
          <div className="input-with-adornment">
            <span className="input-adornment-prefix" style={{ fontSize: '13px' }}>$</span>
            <input
              id="input-embed-sold-price"
              name="soldPrice"
              type="number"
              min="0"
              step="0.01"
              className="form-input has-prefix"
              style={{ height: '38px', fontSize: '14px' }}
              aria-label="Item Sold Price"
              value={inputs.soldPrice || ''}
              onChange={(e) => updateInput('soldPrice', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="input-embed-item-cost" className="form-label" style={{ fontSize: '11px' }}>Item Cost (COGS)</label>
          <div className="input-with-adornment">
            <span className="input-adornment-prefix" style={{ fontSize: '13px' }}>$</span>
            <input
              id="input-embed-item-cost"
              name="itemCost"
              type="number"
              min="0"
              step="0.01"
              className="form-input has-prefix"
              style={{ height: '38px', fontSize: '14px' }}
              aria-label="Item Purchase Cost (COGS)"
              value={inputs.itemCost || ''}
              onChange={(e) => updateInput('itemCost', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      {/* Results Block */}
      <div
        style={{
          background: 'var(--color-primary)',
          color: 'var(--color-white)',
          padding: '16px',
          borderRadius: 'var(--radius-sm)',
          textAlign: 'center',
          marginBottom: '12px',
        }}
      >
        <div style={{ fontSize: '11px', color: '#f1f5f9', textTransform: 'uppercase', fontWeight: 600 }}>Net Profit</div>
        <div style={{ fontSize: '24px', fontWeight: 600, margin: '2px 0' }}>
          {formatCurrency(results.netProfit, inputs.country)}
        </div>
        <div style={{ fontSize: '12px', color: '#e2e8f0' }}>
          Margin: {formatPercent(results.profitMargin)} • Total Fees: {formatCurrency(results.totalEbayFees, inputs.country)}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-muted)' }}>
        <span>Break-Even: {formatCurrency(results.breakEvenPrice, inputs.country)}</span>
        <span>Effective Fee: {formatPercent(results.effectiveFeeRate)}</span>
      </div>

      <a
        href="https://asfandateem-sketch.github.io/Ebay-Calculator/"
        target="_blank"
        rel="noopener noreferrer"
        className="embed-badge-link"
      >
        <span>Powered by <strong>ProfitEbay</strong> Seller Intelligence</span>
        <ExternalLink size={12} />
      </a>
    </div>
  );
};
