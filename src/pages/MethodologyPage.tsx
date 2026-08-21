import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { ShieldCheck, ArrowLeft, CheckCircle2, Layers } from 'lucide-react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const MethodologyPage: React.FC<PageProps> = ({ onNavigate }) => {
  useSEO({
    title: 'Data & Mathematical Methodology — ProfitIQ',
    description: 'Detailed explanation of ProfitIQ calculation algorithms, sales tax base handling, tiered final value fees, and cross-border currency models.',
    canonical: 'https://profitiq.app/methodology',
  });

  return (
    <div style={{ paddingTop: '96px', paddingBottom: '96px', background: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <button
          type="button"
          className="nav-tag-pill"
          onClick={() => onNavigate('/')}
          style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={13} />
          <span>Home</span>
        </button>

        <div style={{ marginBottom: '36px' }}>
          <div className="section-eyebrow">
            <ShieldCheck size={13} />
            <span>Transparency & Rigor</span>
          </div>
          <h1 className="section-title">Calculation Methodology & Accuracy Standards</h1>
          <p className="section-subtitle">
            How ProfitIQ models eBay Managed Payments fees, variable category tiers, and profit margins with arithmetic precision.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '15px', lineHeight: 1.7, color: 'var(--color-text-body)' }}>
          <section className="calc-card">
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '12px' }}>
              1. The Total Amount of Sale Fee Basis Rule
            </h2>
            <p>
              Under eBay's official Managed Payments policy, Final Value Fees (FVF) are calculated on the <strong>Total Amount of the Sale</strong>. This includes:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', margin: '12px 0' }}>
              <li>• Item selling price multiplied by quantity</li>
              <li>• Shipping & handling charges collected from buyer</li>
              <li>• Applicable state sales taxes (US) or VAT/GST (UK, EU, AU) collected at checkout</li>
            </ul>
            <p>
              Most online calculators mistakenly apply the percentage only to the item price. ProfitIQ models the exact composite base, ensuring zero surprise deductions on your seller payout statements.
            </p>
          </section>

          <section className="calc-card">
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '12px' }}>
              2. Fixed Per-Order Processing Fees
            </h2>
            <p>
              In addition to variable percentages, eBay assesses a fixed per-order fee ($0.30 to $0.40 in the US depending on order subtotal). When orders are $10.00 or less, the fixed fee is automatically discounted to $0.30; for orders exceeding $10.00, it is $0.40. ProfitIQ dynamically applies this threshold logic.
            </p>
          </section>

          <section className="calc-card">
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '12px' }}>
              3. Break-Even Price Closed-Form Solution
            </h2>
            <p>
              ProfitIQ utilizes exact closed-form algebraic solutions rather than iterative approximations to compute the exact break-even floor price:
            </p>
            <div className="article-formula-card" style={{ margin: '16px 0' }}>
              Break-Even Price = (Item COGS + Shipping Label + Other Costs + Fixed Fee - Shipping Charged * (1 - Net Fee Rate)) / (1 - Net Fee Rate)
            </div>
            <p>
              where Net Fee Rate accounts for the standard FVF, Promoted Ad %, and International surcharges combined with tax multiplier factors.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
