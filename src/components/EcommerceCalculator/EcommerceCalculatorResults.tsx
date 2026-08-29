import React, { useState, useRef, useEffect } from 'react';
import { EcommerceProfitInputs, EcommerceProfitResults } from '../../types/ecommerce';
import { Copy, Check, RotateCcw, AlertTriangle, ShieldCheck, TrendingUp, Info, Download, FileText, FileSpreadsheet, ChevronDown } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';
import { downloadEcommerceCsv, printEcommercePdfReport } from '../../utils/ecommerceExport';

interface Props {
  inputs: EcommerceProfitInputs;
  results: EcommerceProfitResults;
  onReset: () => void;
}

export const EcommerceCalculatorResults: React.FC<Props> = ({
  inputs,
  results,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const exportDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target as Node)) {
        setExportOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatCurrency = (val: number) => {
    return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleDownloadCsv = () => {
    downloadEcommerceCsv(inputs, results);
    trackEvent('download_result', { calculator: 'ecommerce_investment_profit', format: 'csv' });
    setExportOpen(false);
  };

  const handleExportPdf = () => {
    printEcommercePdfReport(inputs, results);
    trackEvent('download_result', { calculator: 'ecommerce_investment_profit', format: 'pdf' });
    setExportOpen(false);
  };

  const handleCopySummary = () => {
    const lines = [
      `--- E-COMMERCE INVESTMENT & PROFIT BREAKDOWN (ProfitEbay) ---`,
      `Initial Batch Size: ${inputs.unitsPurchased} units`,
      `Landed Cost / Unit: ${formatCurrency(results.landedCostPerUnit)}`,
      `Total Landed Inventory Cost: ${formatCurrency(results.totalLandedInventoryCost)}`,
      `Selling Price / Unit: ${formatCurrency(inputs.sellingPricePerUnit)}`,
      `Monthly Sales Velocity: ${inputs.monthlyUnitsSold} units`,
      `----------------------------------------------------`,
      `Monthly Gross Revenue: ${formatCurrency(results.monthlyRevenue)}`,
      `Total Monthly Expenses: ${formatCurrency(results.totalMonthlyExpenses)}`,
      `  - Product COGS: ${formatCurrency(results.monthlyProductCost)}`,
      `  - Marketplace Fees: ${formatCurrency(results.marketplaceFees)}`,
      `  - Payment Processing: ${formatCurrency(results.paymentProcessingFees)}`,
      `  - Advertising / PPC: ${formatCurrency(results.advertisingCost)}`,
      `  - Packaging Supplies: ${formatCurrency(results.packagingCost)}`,
      `  - Monthly Overhead: ${formatCurrency(results.otherMonthlyExpenses)}`,
      `----------------------------------------------------`,
      `NET MONTHLY PROFIT: ${formatCurrency(results.netProfit)}`,
      `Net Profit Margin: ${results.profitMargin !== null ? results.profitMargin.toFixed(2) + '%' : 'N/A'}`,
      `Monthly ROI: ${results.roi !== null ? results.roi.toFixed(2) + '%' : 'N/A'}`,
      `Annualized Simple ROI: ${results.annualizedRoi !== null ? results.annualizedRoi.toFixed(2) + '%' : 'N/A'}`,
      `Contribution Margin / Unit: ${formatCurrency(results.contributionMarginPerUnit)}`,
      `Operating Break-Even: ${results.operatingBreakEvenUnits !== null ? results.operatingBreakEvenUnits + ' units/mo' : 'Unreachable'}`,
      `Capital Recovery Units: ${results.capitalRecoveryUnits !== null ? results.capitalRecoveryUnits + ' units' : 'N/A'}`,
      `Capital Payback Period: ${results.monthsToRecoverInvestment !== null ? results.monthsToRecoverInvestment.toFixed(1) + ' months' : 'N/A'}`,
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    trackEvent('copy_result', { calculator: 'ecommerce_investment_profit' });
    setTimeout(() => setCopied(false), 2500);
  };

  const getStatusBadge = () => {
    switch (results.profitabilityStatus) {
      case 'PROFITABLE':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              color: '#4ade80',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            <ShieldCheck size={12} />
            Profitable Model
          </span>
        );
      case 'BREAK-EVEN':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(234, 179, 8, 0.2)',
              color: '#facc15',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            <Info size={12} />
            Break-Even
          </span>
        );
      case 'LOSS':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(239, 68, 68, 0.25)',
              color: '#f87171',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            <AlertTriangle size={12} />
            Negative Cash Flow (Loss)
          </span>
        );
    }
  };

  return (
    <div className="calc-results-sticky" id="ecommerce-results-sidebar">
      <div className="results-card">
        {/* Top Profit Hero */}
        <div className="results-profit-hero">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            {getStatusBadge()}
          </div>
          <div className="results-profit-label">Net Monthly Profit</div>
          <div className={`results-profit-value ${results.netProfit < 0 ? 'negative' : ''}`}>
            {results.netProfit < 0 ? '-' : ''}{formatCurrency(Math.abs(results.netProfit))}
          </div>
          <div style={{ fontSize: '12px', color: '#e2e8f0', marginTop: '4px' }}>
            Based on {inputs.monthlyUnitsSold} units / month sales velocity
          </div>
        </div>

        {/* 3 Metric Mini Cards */}
        <div className="results-metrics-grid">
          <div className="metric-mini-card">
            <div className="metric-mini-label">Profit Margin</div>
            <div className="metric-mini-value" style={{ color: results.profitMargin && results.profitMargin > 0 ? '#4ade80' : results.profitMargin && results.profitMargin < 0 ? '#fca5a5' : '#ffffff' }}>
              {results.profitMargin !== null ? `${results.profitMargin.toFixed(1)}%` : 'N/A'}
            </div>
          </div>

          <div className="metric-mini-card">
            <div className="metric-mini-label">Monthly ROI</div>
            <div className="metric-mini-value" style={{ color: results.roi && results.roi > 0 ? '#4ade80' : results.roi && results.roi < 0 ? '#fca5a5' : '#ffffff' }}>
              {results.roi !== null ? `${results.roi.toFixed(1)}%` : 'N/A'}
            </div>
          </div>

          <div className="metric-mini-card">
            <div className="metric-mini-label">Landed / Unit</div>
            <div className="metric-mini-value">
              {formatCurrency(results.landedCostPerUnit)}
            </div>
          </div>
        </div>

        {/* Financial Flow Breakdown */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f1f5f9', marginBottom: '10px', fontWeight: 600 }}>
            Monthly P&L Ledger
          </div>
          <div className="results-breakdown-list">
            <div className="breakdown-row">
              <span className="breakdown-label">Monthly Gross Revenue</span>
              <span className="breakdown-value" style={{ color: '#4ade80' }}>
                +{formatCurrency(results.monthlyRevenue)}
              </span>
            </div>

            <div className="breakdown-row">
              <span className="breakdown-label">Product Cost of Goods (COGS)</span>
              <span className="breakdown-value">
                -{formatCurrency(results.monthlyProductCost)}
              </span>
            </div>

            <div className="breakdown-row">
              <span className="breakdown-label">Marketplace Selling Fees</span>
              <span className="breakdown-value">
                -{formatCurrency(results.marketplaceFees)}
              </span>
            </div>

            <div className="breakdown-row">
              <span className="breakdown-label">Payment Processing</span>
              <span className="breakdown-value">
                -{formatCurrency(results.paymentProcessingFees)}
              </span>
            </div>

            <div className="breakdown-row">
              <span className="breakdown-label">Advertising / PPC Spend</span>
              <span className="breakdown-value">
                -{formatCurrency(results.advertisingCost)}
              </span>
            </div>

            <div className="breakdown-row">
              <span className="breakdown-label">Packaging & Shipping Supplies</span>
              <span className="breakdown-value">
                -{formatCurrency(results.packagingCost)}
              </span>
            </div>

            <div className="breakdown-row">
              <span className="breakdown-label">Fixed Overhead & Tools</span>
              <span className="breakdown-value">
                -{formatCurrency(results.otherMonthlyExpenses)}
              </span>
            </div>

            <div className="breakdown-row" style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '8px', fontWeight: 600 }}>
              <span className="breakdown-label" style={{ opacity: 0.9 }}>Total Monthly Expenses</span>
              <span className="breakdown-value" style={{ color: '#fca5a5' }}>
                -{formatCurrency(results.totalMonthlyExpenses)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="results-action-row" style={{ position: 'relative', flexWrap: 'wrap' }}>
          {/* Export as PDF/CSV Menu */}
          <div ref={exportDropdownRef} style={{ position: 'relative', flex: '1 1 100%' }}>
            <button
              type="button"
              id="btn-ecommerce-export"
              className="results-action-btn"
              style={{
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.25)',
              }}
              onClick={() => setExportOpen((prev) => !prev)}
            >
              <Download size={14} />
              <span>Export as PDF / CSV</span>
              <ChevronDown size={13} style={{ marginLeft: 'auto', transform: exportOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }} />
            </button>

            {exportOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  right: 0,
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
                  border: '1px solid #e2e8f0',
                  padding: '6px',
                  zIndex: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <button
                  type="button"
                  id="btn-export-pdf"
                  onClick={handleExportPdf}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#0f172a',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <FileText size={16} style={{ color: '#dc2626' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Save / Print as PDF (.pdf)</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Formatted executive summary & breakdown ledger</div>
                  </div>
                </button>

                <button
                  type="button"
                  id="btn-export-csv"
                  onClick={handleDownloadCsv}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#0f172a',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <FileSpreadsheet size={16} style={{ color: '#16a34a' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Download Spreadsheet CSV (.csv)</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Raw financial model for Excel, Sheets, Numbers</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="results-action-btn"
            onClick={handleCopySummary}
          >
            {copied ? <Check size={14} style={{ color: '#4ade80' }} /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            type="button"
            className="results-action-btn"
            onClick={onReset}
            title="Reset to standard defaults"
            style={{ maxWidth: '90px' }}
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Intelligence & Recovery Card */}
      <div className="intelligence-card">
        <div className="intelligence-title">
          <TrendingUp size={16} />
          <span>Payback & Break-Even Intelligence</span>
        </div>

        <div className="intelligence-list">
          <div className="intelligence-item">
            <span className="intelligence-item-label">Unit Contribution Margin</span>
            <span className="intelligence-item-val" style={{ color: results.contributionMarginPerUnit > 0 ? '#16a34a' : '#dc2626' }}>
              {formatCurrency(results.contributionMarginPerUnit)} / unit
            </span>
          </div>

          <div className="intelligence-item">
            <span className="intelligence-item-label">Operating Break-Even</span>
            <span className="intelligence-item-val">
              {results.operatingBreakEvenUnits !== null ? (
                <>
                  {results.operatingBreakEvenUnits} units / mo <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 400 }}>({formatCurrency(results.operatingBreakEvenRevenue || 0)} / mo)</span>
                </>
              ) : (
                <span style={{ color: '#dc2626', fontSize: '11px' }}>Unreachable</span>
              )}
            </span>
          </div>

          <div className="intelligence-item">
            <span className="intelligence-item-label">Initial Inventory Outlay</span>
            <span className="intelligence-item-val">
              {formatCurrency(results.effectiveInitialInvestment)}
            </span>
          </div>

          <div className="intelligence-item">
            <span className="intelligence-item-label">Capital Recovery Units</span>
            <span className="intelligence-item-val">
              {results.capitalRecoveryUnits !== null ? (
                `${results.capitalRecoveryUnits.toLocaleString()} units total`
              ) : (
                <span style={{ color: '#dc2626', fontSize: '11px' }}>N/A</span>
              )}
            </span>
          </div>

          <div className="intelligence-item">
            <span className="intelligence-item-label">Capital Payback Timeline</span>
            <span className="intelligence-item-val">
              {results.monthsToRecoverInvestment !== null ? (
                `${results.monthsToRecoverInvestment.toFixed(1)} Months`
              ) : (
                <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>Negative Cashflow</span>
              )}
            </span>
          </div>

          <div className="intelligence-item">
            <span className="intelligence-item-label">Annualized ROI Projection</span>
            <span className="intelligence-item-val">
              {results.annualizedRoi !== null ? `${results.annualizedRoi.toFixed(1)}% / yr` : 'N/A'}
            </span>
          </div>
        </div>

        {results.breakEvenMessage && (
          <div
            style={{
              marginTop: '12px',
              padding: '10px 12px',
              backgroundColor: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              color: '#991b1b',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <AlertTriangle size={14} style={{ flexShrink: 0 }} />
            <span>{results.breakEvenMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
