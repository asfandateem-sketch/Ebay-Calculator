import React, { useState } from 'react';
import { CalculatorInputs, CalculatorResults as ResultsType } from '../../types';
import { formatCurrency, formatPercent } from '../../utils/currency';
import { generateCsvExport, downloadCsv, encodeInputsToUrl } from '../../utils/export';
import { trackEvent } from '../../utils/analytics';
import { Copy, Check, Download, Target, ExternalLink } from 'lucide-react';

interface CalculatorResultsProps {
  inputs: CalculatorInputs;
  results: ResultsType;
  onNavigate?: (path: string) => void;
}

export const CalculatorResults: React.FC<CalculatorResultsProps> = ({ inputs, results, onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const isProfitable = results.netProfit >= 0;

  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      const qs = encodeInputsToUrl(inputs);
      const url = `${window.location.origin}${window.location.pathname}?${qs}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        trackEvent('share_result', { country: inputs.country, netProfit: results.netProfit });
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleDownloadCsv = () => {
    const csvContent = generateCsvExport(inputs, results);
    downloadCsv(csvContent, `profitebay-${inputs.country.toLowerCase()}-profit-report.csv`);
    trackEvent('download_result', { country: inputs.country });
  };

  return (
    <div id="calculator-results-column" className="calc-results-sticky">
      {/* 1. Primary Net Profit Hero Card */}
      <div id="results-primary-card" className="results-card">
        <div className="results-profit-hero">
          <div className="results-profit-label">Net Estimated Seller Profit</div>
          <div
            id="result-net-profit"
            className={`results-profit-value ${!isProfitable ? 'negative' : ''}`}
          >
            {formatCurrency(results.netProfit, inputs.country)}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '6px' }}>
            {inputs.quantitySold > 1 ? (
              <span>
                (<strong>{formatCurrency(results.netProfit / inputs.quantitySold, inputs.country)}</strong> / unit)
              </span>
            ) : (
              <span>After all eBay fees & operational costs</span>
            )}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="results-metrics-grid">
          <div className="metric-mini-card">
            <div className="metric-mini-label">Margin</div>
            <div id="result-margin" className="metric-mini-value">
              {formatPercent(results.profitMargin)}
            </div>
          </div>
          <div className="metric-mini-card">
            <div className="metric-mini-label">ROI</div>
            <div id="result-roi" className="metric-mini-value">
              {formatPercent(results.roi)}
            </div>
          </div>
          <div className="metric-mini-card">
            <div className="metric-mini-label">Total Fees</div>
            <div id="result-total-fees" className="metric-mini-value">
              {formatCurrency(results.totalEbayFees, inputs.country)}
            </div>
          </div>
        </div>

        {/* Itemized Breakdown List */}
        <div className="results-breakdown-list">
          <div className="breakdown-row">
            <span className="breakdown-label">Gross Revenue</span>
            <span className="breakdown-value">{formatCurrency(results.grossRevenue, inputs.country)}</span>
          </div>
          <div className="breakdown-row">
            <span className="breakdown-label">Final Value Fee ({results.finalValueFeePercent}%)</span>
            <span className="breakdown-value">-{formatCurrency(results.totalFinalValueFee, inputs.country)}</span>
          </div>
          {results.promotedListingFee > 0 && (
            <div className="breakdown-row">
              <span className="breakdown-label">Promoted Ad ({inputs.promotedListingRate}%)</span>
              <span className="breakdown-value">-{formatCurrency(results.promotedListingFee, inputs.country)}</span>
            </div>
          )}
          {results.internationalFee > 0 && (
            <div className="breakdown-row">
              <span className="breakdown-label">International Fee</span>
              <span className="breakdown-value">-{formatCurrency(results.internationalFee, inputs.country)}</span>
            </div>
          )}
          <div className="breakdown-row">
            <span className="breakdown-label">Total Item Cost (COGS)</span>
            <span className="breakdown-value">-{formatCurrency(results.totalItemCost, inputs.country)}</span>
          </div>
          <div className="breakdown-row">
            <span className="breakdown-label">Total Shipping & Handling</span>
            <span className="breakdown-value">-{formatCurrency(results.totalShippingCost + results.totalOtherCost, inputs.country)}</span>
          </div>
          <div className="breakdown-row" style={{ paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <span className="breakdown-label">Effective Fee Rate</span>
            <span className="breakdown-value">{formatPercent(results.effectiveFeeRate)}</span>
          </div>
        </div>

        {/* Action Row */}
        <div className="results-action-row">
          <button
            id="btn-copy-share-result"
            type="button"
            className="results-action-btn"
            onClick={handleCopyShareLink}
            aria-label="Copy share link"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Share Link'}</span>
          </button>
          <button
            id="btn-download-csv-result"
            type="button"
            className="results-action-btn"
            onClick={handleDownloadCsv}
            aria-label="Download CSV report"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Target Pricing & Intelligence Card */}
      <div id="intelligence-solver-card" className="intelligence-card">
        <div className="intelligence-title">
          <Target size={18} />
          <span>Pricing Intelligence & Solver</span>
        </div>

        <div className="intelligence-list">
          <div className="intelligence-item">
            <span className="intelligence-item-label">Break-Even Price (0% Profit):</span>
            <span id="result-breakeven-price" className="intelligence-item-value">
              {formatCurrency(results.breakEvenPrice, inputs.country)}
            </span>
          </div>
          <div className="intelligence-item">
            <span className="intelligence-item-label">Target 20% Net Margin Price:</span>
            <span id="result-target-20-price" className="intelligence-item-value" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              {formatCurrency(results.recommendedPrice20PercentMargin, inputs.country)}
            </span>
          </div>
          <div className="intelligence-item">
            <span className="intelligence-item-label">Target 30% Net Margin Price:</span>
            <span id="result-target-30-price" className="intelligence-item-value" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              {formatCurrency(results.recommendedPrice30PercentMargin, inputs.country)}
            </span>
          </div>
        </div>

        {onNavigate && (
          <div style={{ marginTop: '16px' }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ width: '100%', fontSize: '13px', padding: '10px 16px' }}
              onClick={() => onNavigate('/ebay-break-even-calculator')}
            >
              <span>Explore Break-Even Sensitivity</span>
              <ExternalLink size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
