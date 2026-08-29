import React from 'react';
import { EcommerceScenario } from '../../types/ecommerce';
import { Sliders, TrendingUp, ShieldAlert, Zap } from 'lucide-react';

interface Props {
  scenarios: EcommerceScenario[];
}

export const EcommerceScenarioAnalysis: React.FC<Props> = ({ scenarios }) => {
  const formatCurrency = (val: number) => {
    return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getScenarioIcon = (name: string) => {
    switch (name) {
      case 'Conservative':
        return <ShieldAlert size={15} style={{ color: '#d97706' }} />;
      case 'Expected':
        return <TrendingUp size={15} style={{ color: '#2563eb' }} />;
      case 'Optimistic':
        return <Zap size={15} style={{ color: '#16a34a' }} />;
      default:
        return null;
    }
  };

  return (
    <div
      id="ecommerce-scenario-analysis"
      style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Sliders size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-primary)', margin: 0 }}>
              Velocity Sensitivity & Scenario Modeling
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>
            Compare financial outcomes at 70% (bear), 100% (target base), and 130% (bull) monthly sales velocities.
          </p>
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            padding: '4px 10px',
            backgroundColor: 'var(--color-soft-gray)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-pill)',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Stress Test Engine
        </span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)', backgroundColor: 'var(--color-soft-gray)' }}>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-primary)' }}>Scenario</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-primary)' }}>Monthly Velocity</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-primary)' }}>Gross Revenue</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-primary)' }}>Total Expenses</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-primary)' }}>Net Profit</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-primary)' }}>Margin</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-primary)' }}>Monthly ROI</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((sc) => {
              const isProfitable = sc.netProfit > 0;
              const isLoss = sc.netProfit < 0;

              return (
                <tr
                  key={sc.name}
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                    backgroundColor: sc.name === 'Expected' ? 'rgba(37, 99, 235, 0.03)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '14px 16px', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {getScenarioIcon(sc.name)}
                      <span>{sc.name}</span>
                      {sc.name === 'Expected' && (
                        <span
                          style={{
                            fontSize: '10px',
                            backgroundColor: '#dbeafe',
                            color: '#1e40af',
                            padding: '1px 6px',
                            borderRadius: 'var(--radius-pill)',
                            fontWeight: 700,
                          }}
                        >
                          Base
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--color-text-body)' }}>
                    {sc.unitsSold} units / mo
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 500, color: 'var(--color-primary)' }}>
                    {formatCurrency(sc.revenue)}
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)' }}>
                    {formatCurrency(sc.expenses)}
                  </td>
                  <td
                    style={{
                      padding: '14px 16px',
                      fontWeight: 700,
                      color: isProfitable ? '#16a34a' : isLoss ? '#dc2626' : 'var(--color-text-body)',
                    }}
                  >
                    {isLoss ? '-' : ''}{formatCurrency(Math.abs(sc.netProfit))}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600 }}>
                    {sc.profitMargin !== null ? (
                      <span style={{ color: sc.profitMargin > 0 ? '#16a34a' : sc.profitMargin < 0 ? '#dc2626' : 'var(--color-text-body)' }}>
                        {sc.profitMargin.toFixed(1)}%
                      </span>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600 }}>
                    {sc.roi !== null ? (
                      <span style={{ color: sc.roi > 0 ? '#16a34a' : sc.roi < 0 ? '#dc2626' : 'var(--color-text-body)' }}>
                        {sc.roi.toFixed(1)}%
                      </span>
                    ) : (
                      'N/A'
                    )}
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
