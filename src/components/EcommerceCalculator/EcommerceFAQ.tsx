import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const ECOMMERCE_FAQS: FAQItem[] = [
  {
    question: 'What is the difference between unit product cost and true landed cost?',
    answer: 'Unit product cost (ex-factory price) is merely the price paid to the manufacturer per item. True landed cost accounts for the entire total cost required to bring that product into your warehouse or 3PL ready for sale. It includes overseas freight (ocean or air), customs duties and tariffs, port handling/drayage, customs brokerage, and inbound shipping. Calculating profitability using ex-factory cost rather than landed cost often causes sellers to overestimate margins by 15% to 30%.',
  },
  {
    question: 'How is e-commerce inventory Return on Investment (ROI) calculated?',
    answer: 'E-commerce inventory ROI measures how much net cash profit is generated relative to the initial working capital deployed into the inventory batch. The formula is: ROI (%) = (Monthly Net Profit ÷ Initial Inventory Capital Deployed) × 100. For an annualized comparison against other asset classes, multiply the monthly ROI by 12 (assuming steady turnover velocity).',
  },
  {
    question: 'What is a healthy net profit margin for an e-commerce business in 2026?',
    answer: 'Across major marketplace channels (Amazon, eBay, Walmart, Shopify), a net profit margin of 15% to 25% (after all COGS, ad spend, marketplace fees, payment fees, and operating tools) is considered healthy and sustainable. Margins below 10% leave very little room for advertising fluctuations, returns, or unexpected tariff spikes, while margins above 30% represent high-margin private label or niche proprietary products.',
  },
  {
    question: 'How do you calculate operating break-even units and capital recovery?',
    answer: 'Unit Contribution Margin is calculated as: Selling Price − (Landed Cost Per Unit + Packaging Per Unit + Variable Marketplace Fees + Variable Payment Fees + Variable Ad Spend Per Unit). Operating Break-Even Units = Monthly Fixed Overhead ÷ Unit Contribution Margin. Capital Recovery Units = Initial Inventory Outlay ÷ Unit Contribution Margin. Capital Payback Timeline = Initial Inventory Outlay ÷ Monthly Net Cash Profit. If contribution margin is negative, selling more units increases losses unless price is raised or sourcing costs are reduced.',
  },
  {
    question: 'How should advertising and PPC spend be factored into unit economics?',
    answer: 'In modern e-commerce, advertising is rarely optional. When estimating unit economics, you can either assign a target Total Advertising Cost of Sales (TACoS) percentage (typically 5% to 10% of gross revenue for established products, or 10% to 18% during launch phase) or a fixed monthly marketing budget. Factoring this into your unit ledger ensures you never scale unprofitable ad campaigns.',
  },
  {
    question: 'What hidden deductions commonly surprise new e-commerce sellers?',
    answer: 'The five most common hidden deductions include: 1) Tiered payment processor fixed transaction fees (e.g. $0.30 per transaction on low-ticket items), 2) Packaging mailers, void fill, and thermal barcode labels, 3) SaaS tooling subscriptions (product research, repricing, accounting software), 4) Unplanned customs inspection and port demurrage charges, and 5) Marketplace return processing and restocking fees.',
  },
];

export const EcommerceFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div
      id="ecommerce-faq-section"
      style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '36px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <HelpCircle size={20} style={{ color: 'var(--color-primary)' }} />
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-primary)', margin: 0 }}>
          Frequently Asked Questions: E-commerce Investment & Profitability
        </h3>
      </div>
      <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: '0 0 28px 0' }}>
        Authoritative guidance on landed cost models, inventory capital allocation, contribution margins, and financial forecasting.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {ECOMMERCE_FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                backgroundColor: isOpen ? 'var(--color-soft-gray)' : 'var(--color-white)',
                transition: 'background-color var(--transition-fast)',
              }}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                }}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform var(--transition-fast)',
                    flexShrink: 0,
                    color: 'var(--color-text-muted)',
                  }}
                />
              </button>
              {isOpen && (
                <div
                  style={{
                    padding: '0 20px 18px 20px',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'var(--color-text-body)',
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
