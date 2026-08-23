import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { Calculator } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { SITE_CONFIG } from '../config/site';

interface PageProps {
  onNavigate?: (path: string) => void;
}

export const NotFoundPage: React.FC<PageProps> = () => {
  useSEO({
    title: `404 Page Not Found — ${SITE_CONFIG.name}`,
    description: `The requested page could not be found. Return to the ${SITE_CONFIG.name} eBay Fee & Profit Calculator.`,
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

        <RouterLink
          to="/"
          className="btn-primary"
          style={{ margin: '0 auto', display: 'inline-flex' }}
        >
          <Calculator size={16} />
          <span>Return to Fee Calculator</span>
        </RouterLink>
      </div>
    </div>
  );
};
