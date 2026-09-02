import React, { useState } from 'react';
import { CalculatorInputs, CalculatorResults as ResultsType } from '../../types';
import { formatCurrency, formatPercent } from '../../utils/currency';
import { generateCsvExport, downloadCsv, encodeInputsToUrl, generateShareSummaryText } from '../../utils/export';
import { trackEvent } from '../../utils/analytics';
import { useCurrencyContext } from '../../context/CurrencyContext';
import { CurrencyConversionBar } from '../Currency/CurrencyConversionBar';
import { Copy, Check, Download, Target, ExternalLink, ArrowRightLeft, Share2, FileText } from 'lucide-react';

interface CalculatorResultsProps {
  inputs: CalculatorInputs;
  results: ResultsType;
  onNavigate?: (path: string) => void;
}

export const CalculatorResults: React.FC<CalculatorResultsProps> = ({ inputs, results, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const {
    isConversionEnabled,
    targetCurrency,
    formatConverted,
    getExchangeRateInfo,
  } = useCurrencyContext();

  const isProfitable = results.netProfit >= 0;
  const rateInfo = getExchangeRateInfo(inputs.country);
  const isConversionActive = isConversionEnabled && !rateInfo.isIdentity;

  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      const qs = encodeInputsToUrl(inputs);
      const url = `${window.location.origin}${window.location.pathname}?${qs}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        trackEvent('share_result', { country: inputs.country });
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleShareOrCopy = async () => {
    if (typeof window === 'undefined') return;
    const qs = encodeInputsToUrl(inputs);
    const url = `${window.location.origin}${window.location.pathname}?${qs}`;
    const summary = generateShareSummaryText(inputs, results, url);

    if (canNativeShare) {
      try {
        await navigator.share({
          title: `${inputs.country} eBay Fee & Profit Calculation`,
          text: summary,
          url,
        });
        trackEvent('share_native_success', { country: inputs.country });
        return;
      } catch {
        // Fall back to link copy if user dismissed or native share errored
      }
    }
    handleCopyShareLink();
  };

  const handleCopySummary = () => {
    if (typeof window === 'undefined') return;
    const qs = encodeInputsToUrl(inputs);
    const url = `${window.location.origin}${window.location.pathname}?${qs}`;
    const summary = generateShareSummaryText(inputs, results, url);
    navigator.clipboard.writeText(summary).then(() => {
      setCopiedSummary(true);
      trackEvent('copy_summary_snippet', { country: inputs.country });
      setTimeout(() => setCopiedSummary(false), 2500);
    });
  };

  const handleDownloadCsv = () => {
    const csvContent = generateCsvExport(inputs, results, {
      enabled: isConversionActive,
      targetCurrency,
      exchangeRateText: rateInfo.formattedRate,
      formatConverted: (val) => formatConverted(val, inputs.country),
    });
    downloadCsv(csvContent, `sellermargincalc-${inputs.country.toLowerCase()}-profit-report.csv`);
    trackEvent('download_result', { country: inputs.country });
  };

  return (
    <div id="calculator-results-column" className="calc-results-sticky">
      {/* Real-time Currency Conversion Toggle Bar */}
      <CurrencyConversionBar countryCode={inputs.country} />

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

          {/* Converted Hero Badge */}
          {isConversionActive && (
            <div
              id="result-net-profit-converted"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '8px',
                padding: '4px 12px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 'var(--radius-pill)',
                fontSize: '13px',
                fontWeight: 600,
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
              }}
            >
              <ArrowRightLeft size={13} />
              <span>≈ {formatConverted(results.netProfit, inputs.country)} {targetCurrency}</span>
            </div>
          )}

          <div style={{ fontSize: '12px', color: '#e2e8f0', marginTop: '6px' }}>
            {inputs.quantitySold > 1 ? (
              <span>
                (<strong>{formatCurrency(results.netProfit / inputs.quantitySold, inputs.country)}</strong>
                {isConversionActive && (
                  <span> ≈ {formatConverted(results.netProfit / inputs.quantitySold, inputs.country)}</span>
                )} / unit)
              </span>
            ) : (
              <span>After all eBay fees &amp; operational costs</span>
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
            {isConversionActive && (
              <div style={{ fontSize: '10px', color: '#e2e8f0', marginTop: '2px', opacity: 0.9 }}>
                ≈ {formatConverted(results.totalEbayFees, inputs.country)}
              </div>
            )}
          </div>
        </div>

        {/* Itemized Breakdown List */}
        <div className="results-breakdown-list">
          <div className="breakdown-row">
            <span className="breakdown-label">Gross Revenue</span>
            <span className="breakdown-value">
              {formatCurrency(results.grossRevenue, inputs.country)}
              {isConversionActive && (
                <span style={{ fontSize: '11px', color: '#cbd5e1', marginLeft: '6px', fontWeight: 400 }}>
                  (≈ {formatConverted(results.grossRevenue, inputs.country)})
                </span>
              )}
            </span>
          </div>

          <div className="breakdown-row">
            <span className="breakdown-label">Final Value Fee ({results.finalValueFeePercent}%)</span>
            <span className="breakdown-value">
              -{formatCurrency(results.totalFinalValueFee, inputs.country)}
              {isConversionActive && (
                <span style={{ fontSize: '11px', color: '#cbd5e1', marginLeft: '6px', fontWeight: 400 }}>
                  (-{formatConverted(results.totalFinalValueFee, inputs.country)})
                </span>
              )}
            </span>
          </div>

          {results.promotedListingFee > 0 && (
            <div className="breakdown-row">
              <span className="breakdown-label">Promoted Ad ({inputs.promotedListingRate}%)</span>
              <span className="breakdown-value">
                -{formatCurrency(results.promotedListingFee, inputs.country)}
                {isConversionActive && (
                  <span style={{ fontSize: '11px', color: '#cbd5e1', marginLeft: '6px', fontWeight: 400 }}>
                    (-{formatConverted(results.promotedListingFee, inputs.country)})
                  </span>
                )}
              </span>
            </div>
          )}

          {results.internationalFee > 0 && (
            <div className="breakdown-row">
              <span className="breakdown-label">International Fee</span>
              <span className="breakdown-value">
                -{formatCurrency(results.internationalFee, inputs.country)}
                {isConversionActive && (
                  <span style={{ fontSize: '11px', color: '#cbd5e1', marginLeft: '6px', fontWeight: 400 }}>
                    (-{formatConverted(results.internationalFee, inputs.country)})
                  </span>
                )}
              </span>
            </div>
          )}

          {results.regulatoryOperatingFee > 0 && (
            <div className="breakdown-row">
              <span className="breakdown-label">Regulatory Operating Fee</span>
              <span className="breakdown-value">
                -{formatCurrency(results.regulatoryOperatingFee, inputs.country)}
                {isConversionActive && (
                  <span style={{ fontSize: '11px', color: '#cbd5e1', marginLeft: '6px', fontWeight: 400 }}>
                    (-{formatConverted(results.regulatoryOperatingFee, inputs.country)})
                  </span>
                )}
              </span>
            </div>
          )}

          <div className="breakdown-row">
            <span className="breakdown-label">Total Item Cost (COGS)</span>
            <span className="breakdown-value">
              -{formatCurrency(results.totalItemCost, inputs.country)}
              {isConversionActive && (
                <span style={{ fontSize: '11px', color: '#cbd5e1', marginLeft: '6px', fontWeight: 400 }}>
                  (-{formatConverted(results.totalItemCost, inputs.country)})
                </span>
              )}
            </span>
          </div>

          <div className="breakdown-row">
            <span className="breakdown-label">Total Shipping &amp; Handling</span>
            <span className="breakdown-value">
              -{formatCurrency(results.totalShippingCost + results.totalOtherCost, inputs.country)}
              {isConversionActive && (
                <span style={{ fontSize: '11px', color: '#cbd5e1', marginLeft: '6px', fontWeight: 400 }}>
                  (-{formatConverted(results.totalShippingCost + results.totalOtherCost, inputs.country)})
                </span>
              )}
            </span>
          </div>

          <div className="breakdown-row" style={{ paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <span className="breakdown-label">Effective Fee Rate</span>
            <span className="breakdown-value">{formatPercent(results.effectiveFeeRate)}</span>
          </div>
        </div>

        {/* Actions / Export Toolbar */}
        <div className="results-export-toolbar" role="toolbar" aria-label="Result Actions & Export">
          <div className="results-export-header">
            <span className="results-export-label">Export &amp; Share Calculation:</span>
          </div>
          <div className="results-action-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
            <button
              id="btn-copy-share-result"
              type="button"
              className="results-action-btn"
              onClick={handleShareOrCopy}
              title={canNativeShare ? 'Share calculation scenario via apps' : 'Copy link to this exact calculation scenario'}
              aria-label={canNativeShare ? 'Share calculation' : 'Copy share link'}
            >
              {copied ? (
                <Check size={14} aria-hidden="true" />
              ) : canNativeShare ? (
                <Share2 size={14} aria-hidden="true" />
              ) : (
                <Copy size={14} aria-hidden="true" />
              )}
              <span>{copied ? 'Link Copied!' : canNativeShare ? 'Share Result' : 'Copy Link'}</span>
            </button>
            <button
              id="btn-copy-summary-snippet"
              type="button"
              className="results-action-btn"
              onClick={handleCopySummary}
              title="Copy formatted markdown text snippet for Reddit, Discord, or forums"
              aria-label="Copy summary snippet"
            >
              {copiedSummary ? <Check size={14} aria-hidden="true" /> : <FileText size={14} aria-hidden="true" />}
              <span>{copiedSummary ? 'Snippet Copied!' : 'Copy Summary'}</span>
            </button>
            <button
              id="btn-download-csv-result"
              type="button"
              className="results-action-btn"
              onClick={handleDownloadCsv}
              title="Download itemized CSV calculation report"
              aria-label="Download CSV report"
            >
              <Download size={14} aria-hidden="true" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Target Pricing & Intelligence Card */}
      <div id="intelligence-solver-card" className="intelligence-card">
        <div className="intelligence-title">
          <Target size={18} />
          <span>Pricing Intelligence &amp; Solver</span>
        </div>

        <div className="intelligence-list">
          <div className="intelligence-item">
            <span className="intelligence-item-label">Break-Even Price (0% Profit):</span>
            <span id="result-breakeven-price" className="intelligence-item-value">
              {formatCurrency(results.breakEvenPrice, inputs.country)}
              {isConversionActive && (
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginLeft: '6px', fontWeight: 500 }}>
                  (≈ {formatConverted(results.breakEvenPrice, inputs.country)})
                </span>
              )}
            </span>
          </div>
          <div className="intelligence-item">
            <span className="intelligence-item-label">Target 20% Net Margin Price:</span>
            <span id="result-target-20-price" className="intelligence-item-value" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              {formatCurrency(results.recommendedPrice20PercentMargin, inputs.country)}
              {isConversionActive && (
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginLeft: '6px', fontWeight: 500 }}>
                  (≈ {formatConverted(results.recommendedPrice20PercentMargin, inputs.country)})
                </span>
              )}
            </span>
          </div>
          <div className="intelligence-item">
            <span className="intelligence-item-label">Target 30% Net Margin Price:</span>
            <span id="result-target-30-price" className="intelligence-item-value" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              {formatCurrency(results.recommendedPrice30PercentMargin, inputs.country)}
              {isConversionActive && (
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginLeft: '6px', fontWeight: 500 }}>
                  (≈ {formatConverted(results.recommendedPrice30PercentMargin, inputs.country)})
                </span>
              )}
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
