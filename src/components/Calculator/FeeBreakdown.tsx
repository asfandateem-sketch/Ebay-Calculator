import React from 'react';
import { CalculatorInputs, CalculatorResults } from '../../types';
import { getCountryConfig } from '../../data/fee-rules';
import { formatCurrency, formatPercent } from '../../utils/currency';
import { ShieldCheck, ExternalLink, Info, AlertCircle } from 'lucide-react';

interface FeeBreakdownProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
}

export const FeeBreakdown: React.FC<FeeBreakdownProps> = ({ inputs, results }) => {
  const countryConfig = getCountryConfig(inputs.country);

  return (
    <div id="fee-transparency-card" className="calc-card" style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={18} color="var(--color-primary)" />
          <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Fee Computation & Authoritative Policy</h3>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
          Fee data last verified: <strong>{countryConfig.lastVerified}</strong>
        </div>
      </div>

      <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-text-body)', marginBottom: '12px' }}>
        <strong>Estimated eBay selling fees based on published eBay fee schedules.</strong> {countryConfig.disclaimer}
      </div>

      {/* Official Source Link */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: 'var(--color-soft-gray)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Info size={16} />
          <span>Official Source: <strong>{countryConfig.officialSource}</strong></span>
        </div>
        <a
          href={countryConfig.officialSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: 'var(--color-primary)' }}
        >
          <span>View official eBay fee source</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Trust & Tax Caution Notice */}
      <div
        style={{
          padding: '12px 16px',
          background: 'rgba(0, 0, 0, 0.03)',
          borderLeft: '3px solid var(--color-primary)',
          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          lineHeight: 1.5,
          marginBottom: '16px',
        }}
      >
        <p style={{ marginBottom: '6px' }}>
          <strong>Important Verification:</strong> Always confirm your final fees in eBay Seller Hub before making pricing decisions.
        </p>
        <p>
          Tax treatment can vary by seller location, registration status, product, and jurisdiction. Consult a qualified tax professional for tax advice.
        </p>
      </div>

      {/* Fee Rules Specific Notes */}
      <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
        <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {countryConfig.notes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
