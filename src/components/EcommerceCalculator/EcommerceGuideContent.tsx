import React from 'react';
import { BookOpen, CheckCircle2, ShieldCheck, DollarSign, Calculator, Target } from 'lucide-react';

export const EcommerceGuideContent: React.FC = () => {
  return (
    <article
      id="ecommerce-guide-content"
      style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        color: 'var(--color-text-body)',
        lineHeight: 1.7,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <BookOpen size={20} style={{ color: 'var(--color-primary)' }} />
        <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-primary)', margin: 0 }}>
          Comprehensive Guide: E-commerce Capital, Landed Cost & Profit Economics
        </h2>
      </div>
      <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', marginBottom: '32px' }}>
        A practical financial handbook for multi-channel sellers, private label brands, and e-commerce entrepreneurs evaluating inventory investments and operating cash flow.
      </p>

      {/* Section 1 */}
      <section style={{ marginBottom: '36px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calculator size={18} style={{ color: 'var(--color-primary)' }} />
          1. The Mathematics of True Landed Cost
        </h3>
        <p style={{ fontSize: '14px', marginBottom: '14px' }}>
          One of the most dangerous mistakes new e-commerce sellers make is calculating profit using only the supplier’s invoice unit price (FOB or Ex-Works). True profitability requires calculating the <strong>Landed Cost Per Unit</strong>, which integrates all logistics and governmental friction costs incurred between the manufacturing plant and the fulfillment center:
        </p>

        <div
          style={{
            backgroundColor: 'var(--color-soft-gray)',
            borderLeft: '4px solid var(--color-primary)',
            padding: '16px 20px',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            fontFamily: 'monospace',
            fontSize: '13px',
            marginBottom: '16px',
            color: 'var(--color-primary)',
          }}
        >
          Total Landed Cost = (Unit Purchase Cost × Batch Size) + Freight Shipping + Customs & Tariffs + Port / Handling Fees
          <br />
          Landed Cost Per Unit = Total Landed Cost ÷ Total Units In Batch
        </div>

        <p style={{ fontSize: '14px' }}>
          By factoring overseas freight, import duties, and port brokerage into the inventory cost base, each unit sold carries its true amortized cost, preventing artificial profit spikes on your income statement.
        </p>
      </section>

      {/* Section 2 */}
      <section style={{ marginBottom: '36px', borderTop: '1px solid var(--color-border)', paddingTop: '28px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <DollarSign size={18} style={{ color: 'var(--color-primary)' }} />
          2. Multi-Channel Fee Structures & Variable Selling Costs
        </h3>
        <p style={{ fontSize: '14px', marginBottom: '14px' }}>
          Selling online involves variable deductions that scale directly with top-line transaction volume. To accurately model cash flow, account for each layer:
        </p>

        <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <CheckCircle2 size={16} style={{ color: '#16a34a', flexShrink: 0, marginTop: '3px' }} />
            <span><strong>Marketplace Commission (8% – 15%):</strong> Platform referral fee charged by eBay, Amazon, or Etsy on the total buyer-paid amount (including tax and shipping in many jurisdictions).</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <CheckCircle2 size={16} style={{ color: '#16a34a', flexShrink: 0, marginTop: '3px' }} />
            <span><strong>Payment Processing (2.5% – 3.5% + $0.30):</strong> Gateway fees from Stripe, PayPal, or marketplace managed payment systems.</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <CheckCircle2 size={16} style={{ color: '#16a34a', flexShrink: 0, marginTop: '3px' }} />
            <span><strong>Advertising & PPC (5% – 12%):</strong> Total Advertising Cost of Sales (TACoS) necessary to secure listing visibility and search velocity.</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <CheckCircle2 size={16} style={{ color: '#16a34a', flexShrink: 0, marginTop: '3px' }} />
            <span><strong>Packaging Supplies ($0.50 – $3.00/unit):</strong> Outer boxes, poly mailers, bubble wrap, custom inserts, and thermal shipping labels.</span>
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '28px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={18} style={{ color: 'var(--color-primary)' }} />
          3. Unit Contribution Margin, Operating Break-Even & Capital Payback
        </h3>
        <p style={{ fontSize: '14px', marginBottom: '14px' }}>
          It is critical to distinguish between <strong>Operating Break-Even</strong> (the monthly sales volume needed to cover recurring fixed overhead) and <strong>Capital Recovery / Payback</strong> (the timeline needed to fully recoup upfront inventory investments):
        </p>

        <div
          style={{
            backgroundColor: 'var(--color-soft-gray)',
            borderLeft: '4px solid var(--color-primary)',
            padding: '16px 20px',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            fontFamily: 'monospace',
            fontSize: '13px',
            marginBottom: '16px',
            color: 'var(--color-primary)',
            lineHeight: 1.8,
          }}
        >
          Unit Contribution Margin = Selling Price − (Landed Cost + Packaging + Variable Channel Fees + Variable Ad Spend)
          <br />
          Operating Break-Even Units = Monthly Fixed Overhead ÷ Unit Contribution Margin
          <br />
          Capital Recovery Units = Initial Landed Inventory Outlay ÷ Unit Contribution Margin
          <br />
          Capital Payback Period (Months) = Initial Inventory Outlay ÷ Monthly Net Cash Profit
        </div>

        <p style={{ fontSize: '14px', margin: 0 }}>
          Once your monthly sales velocity exceeds the operating break-even threshold, recurring operations run cash-flow positive. Each subsequent unit sold contributes directly toward amortizing initial inventory working capital until complete payback is achieved.
        </p>
      </section>
    </article>
  );
};
