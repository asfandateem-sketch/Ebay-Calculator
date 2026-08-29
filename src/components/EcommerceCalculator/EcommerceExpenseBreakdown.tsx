import React from 'react';
import { EcommerceProfitResults } from '../../types/ecommerce';
import { PieChart, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  results: EcommerceProfitResults;
}

export const EcommerceExpenseBreakdown: React.FC<Props> = ({ results }) => {
  const total = results.totalMonthlyExpenses > 0 ? results.totalMonthlyExpenses : 1;
  const revenue = results.monthlyRevenue > 0 ? results.monthlyRevenue : 1;

  const items = [
    {
      label: 'Product COGS (Landed)',
      amount: results.monthlyProductCost,
      color: '#3b82f6', // blue
      benchmark: '< 35% of Revenue',
      actualRevPct: (results.monthlyProductCost / revenue) * 100,
      isGood: (results.monthlyProductCost / revenue) <= 0.35,
    },
    {
      label: 'Marketplace Selling Fees',
      amount: results.marketplaceFees,
      color: '#8b5cf6', // purple
      benchmark: '< 15% of Revenue',
      actualRevPct: (results.marketplaceFees / revenue) * 100,
      isGood: (results.marketplaceFees / revenue) <= 0.16,
    },
    {
      label: 'Payment Processing',
      amount: results.paymentProcessingFees,
      color: '#06b6d4', // cyan
      benchmark: '< 3% of Revenue',
      actualRevPct: (results.paymentProcessingFees / revenue) * 100,
      isGood: (results.paymentProcessingFees / revenue) <= 0.035,
    },
    {
      label: 'Advertising & PPC',
      amount: results.advertisingCost,
      color: '#f59e0b', // amber
      benchmark: '< 10% of Revenue',
      actualRevPct: (results.advertisingCost / revenue) * 100,
      isGood: (results.advertisingCost / revenue) <= 0.10,
    },
    {
      label: 'Packaging Supplies',
      amount: results.packagingCost,
      color: '#10b981', // emerald
      benchmark: '< 5% of Revenue',
      actualRevPct: (results.packagingCost / revenue) * 100,
      isGood: (results.packagingCost / revenue) <= 0.05,
    },
    {
      label: 'Fixed Overhead & Tools',
      amount: results.otherMonthlyExpenses,
      color: '#64748b', // slate
      benchmark: '< 5% of Revenue',
      actualRevPct: (results.otherMonthlyExpenses / revenue) * 100,
      isGood: (results.otherMonthlyExpenses / revenue) <= 0.05,
    },
  ];

  const formatCurrency = (val: number) => {
    return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div
      id="ecommerce-expense-breakdown"
      style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <PieChart size={18} style={{ color: 'var(--color-primary)' }} />
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-primary)', margin: 0 }}>
          Cost Structure & Expense Allocation
        </h3>
      </div>
      <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '0 0 24px 0' }}>
        Detailed capital distribution across product sourcing, channel commissions, transaction processing, and advertising.
      </p>

      {/* Visual Stacked Bar */}
      <div
        style={{
          display: 'flex',
          height: '20px',
          borderRadius: 'var(--radius-pill)',
          overflow: 'hidden',
          backgroundColor: 'var(--color-soft-gray)',
          marginBottom: '24px',
        }}
      >
        {items.map((item, idx) => {
          const pct = Math.max(0, (item.amount / total) * 100);
          if (pct === 0) return null;
          return (
            <div
              key={idx}
              style={{
                width: `${pct}%`,
                backgroundColor: item.color,
                transition: 'width var(--transition-fast)',
              }}
              title={`${item.label}: ${formatCurrency(item.amount)} (${pct.toFixed(1)}%)`}
            />
          );
        })}
      </div>

      {/* Grid of Expense Categories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {items.map((item, idx) => {
          const expensePct = ((item.amount / total) * 100).toFixed(1);
          const revPct = item.actualRevPct.toFixed(1);

          return (
            <div
              key={idx}
              style={{
                padding: '16px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-soft-gray)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)' }}>{item.label}</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {formatCurrency(item.amount)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                <span>Share of Expenses:</span>
                <span style={{ fontWeight: 500 }}>{expensePct}%</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                <span>Share of Revenue:</span>
                <span style={{ fontWeight: 500 }}>{revPct}%</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: item.isGood ? 'rgba(22, 163, 74, 0.08)' : 'rgba(220, 38, 38, 0.08)',
                  color: item.isGood ? '#15803d' : '#b91c1c',
                }}
              >
                {item.isGood ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                <span>Benchmark: {item.benchmark}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
