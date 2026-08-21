import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { Calculator, ArrowRight } from 'lucide-react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<PageProps> = ({ onNavigate }) => {
  useSEO({
    title: '404 Page Not Found — ProfitIQ',
    description: 'The requested page could not be found. Return to the ProfitIQ eBay Fee & Profit Calculator.',
  });

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '120px', textAlign: 'center', background: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: '540px' }}>
        <div style={{ fontSize: '72px', fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '-0.04em' }}>
          404
        </div>
        <h1 className="section-title" style={{ fontSize: '24px', margin: '16px 0' }}>
          Page Not Found
        </h1>
        <p className="section-subtitle" style={{ marginBottom: '32px' }}>
          The calculator, guide, or resource page you requested does not exist or has been moved.
        </p>

        <button
          type="button"
          className="btn-primary"
          style={{ margin: '0 auto' }}
          onClick={() => onNavigate('/')}
        >
          <Calculator size={16} />
          <span>Return to Fee Calculator</span>
        </button>
      </div>
    </div>
  );
};
