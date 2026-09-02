import React from 'react';
import { PromotedListingsTool } from '../components/PricingTools/PromotedListingsTool';
import { Calculator } from '../components/Calculator/Calculator';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { FAQSection } from '../components/FAQ/FAQSection';
import { CalculatorExplainer } from '../components/SEO/CalculatorExplainer';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../hooks/useRouting';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const PromotedListingsPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { inputs, results, updateInput, setInputs } = useCalculator();

  useSEO({
    title: `eBay Promoted Listings Calculator (2026) — Ad Fee & ROAS Optimizer | ${SITE_CONFIG.name}`,
    description: `Calculate eBay Promoted Listings Standard ad fees, evaluate margin impact across ad rates (2% - 15%), and compute required sales velocity multipliers with ${SITE_CONFIG.name}.`,
    keywords: 'seller margin calculator, ebay promoted listings calculator, ebay ad rate calculator, ebay roas calculator, ebay advertising fees, sponsored listing profit impact, ebay cpc calculator',
    canonical: '/ebay-promoted-listings-calculator',
    schemaJson: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: `eBay Promoted Listings Calculator — ${SITE_CONFIG.name}`,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'All',
          provider: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
            url: getCanonicalUrl('/'),
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: getCanonicalUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Calculators', item: getCanonicalUrl('/calculators') },
            { '@type': 'ListItem', position: 3, name: 'eBay Promoted Listings Calculator', item: getCanonicalUrl('/ebay-promoted-listings-calculator') },
          ],
        },
      ],
    },
  });

  return (
    <div style={{ paddingTop: '96px', paddingBottom: '96px', background: 'var(--color-white)' }}>
      <div className="container">
        <RouterLink
          to="/"
          className="nav-tag-pill"
          style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={13} />
          <span>Home</span>
        </RouterLink>

        <div style={{ marginBottom: '36px' }}>
          <div className="section-eyebrow">
            <TrendingUp size={13} />
            <span>Ad Optimization</span>
          </div>
          <h1 className="section-title">eBay Promoted Listings Calculator</h1>
          <p className="section-subtitle">
            Optimize your advertising spend. Model ad rate scenarios to identify the sweet spot between visibility gains and margin erosion.
          </p>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <PromotedListingsTool inputs={inputs} onUpdateInput={updateInput} />
        </div>

        <div style={{ marginBottom: '48px' }}>
          <Calculator
            inputs={inputs}
            results={results}
            onUpdateInput={updateInput}
            onSetInputs={setInputs}
            onNavigate={onNavigate}
          />
        </div>

        <CalculatorExplainer type="promoted" onNavigate={onNavigate} />
        <FAQSection />
      </div>
    </div>
  );
};
