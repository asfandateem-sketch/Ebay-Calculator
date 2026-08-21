import React, { useState } from 'react';
import { generalFAQs } from '../../data/faqs';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': false,
  });

  const toggle = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faq-section" style={{ padding: '80px 0', background: 'var(--color-white)' }}>
      <div className="container">
        <div className="section-header-centered">
          <div className="section-eyebrow">
            <HelpCircle size={13} />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="section-title">Common Questions About eBay Fees & Profit</h2>
          <p className="section-subtitle">
            Clear, authoritative answers based on official 2026 eBay Managed Payments regulations.
          </p>
        </div>

        <div className="faq-accordion">
          {generalFAQs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
