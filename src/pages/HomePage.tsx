import React, { lazy, Suspense } from 'react';
import { Hero } from '../components/Hero/Hero';
import { CalculatorHub } from '../components/CalculatorHub/CalculatorHub';
import { Calculator } from '../components/Calculator/Calculator';
import { CountryGrid } from '../components/CountrySelector/CountryGrid';
import { FloatingNavAid } from '../components/Navigation/FloatingNavAid';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../hooks/useRouting';

// Lazy load below-the-fold interactive sections for lightweight initial paint & mobile LCP < 2.2s
const BreakEvenTool = lazy(() =>
  import('../components/PricingTools/BreakEvenTool').then((m) => ({ default: m.BreakEvenTool }))
);
const TargetPricingTool = lazy(() =>
  import('../components/PricingTools/TargetPricingTool').then((m) => ({ default: m.TargetPricingTool }))
);
const PromotedListingsTool = lazy(() =>
  import('../components/PricingTools/PromotedListingsTool').then((m) => ({ default: m.PromotedListingsTool }))
);
const FeeComparisonMatrix = lazy(() =>
  import('../components/FeeComparison/FeeComparisonMatrix').then((m) => ({ default: m.FeeComparisonMatrix }))
);
const FeeHistoryTimeline = lazy(() =>
  import('../components/FeeHistory/FeeHistoryTimeline').then((m) => ({ default: m.FeeHistoryTimeline }))
);
const ArticleList = lazy(() =>
  import('../components/SellerGuides/ArticleList').then((m) => ({ default: m.ArticleList }))
);
const FAQSection = lazy(() =>
  import('../components/FAQ/FAQSection').then((m) => ({ default: m.FAQSection }))
);

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { inputs, results, updateInput, setInputs } = useCalculator();

  useSEO({
    title: `Seller Margin Calculator — Free E-commerce Profit, eBay Fee & Margin Calculator Suite (2026)`,
    description:
      'Calculate marketplace fees, landed costs, profit, ROI, pricing and break-even accurately and instantly across 8 global marketplaces with Seller Margin Calculator.',
    keywords:
      'seller margin calculator, ecommerce profit calculator, ebay fee calculator, ebay profit calculator, break even calculator, product pricing calculator, ecommerce profit margin, marketplace fees, ebay seller calculator 2026',
    canonical: '/',
    schemaJson: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${getCanonicalUrl('/')}#website`,
          url: getCanonicalUrl('/'),
          name: SITE_CONFIG.name,
          description: 'The Ultimate E-commerce Calculator Suite for multi-channel sellers.',
          publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
            url: getCanonicalUrl('/'),
          },
        },
        {
          '@type': 'SoftwareApplication',
          name: `${SITE_CONFIG.name} E-commerce Calculator Suite`,
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
          ],
        },
        {
          '@type': 'ItemList',
          name: 'E-commerce Calculators',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'E-commerce Profit & Investment Calculator',
              url: getCanonicalUrl('/ecommerce-investment-profit-calculator'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'eBay Fee & Profit Calculator',
              url: getCanonicalUrl('/ebay-fee-calculator'),
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Break-Even Price Solver',
              url: getCanonicalUrl('/ebay-break-even-calculator'),
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: 'Target Margin Selling Price Solver',
              url: getCanonicalUrl('/ebay-pricing-calculator'),
            },
          ],
        },
      ],
    },
  });

  const scrollToCalculator = () => {
    const el = document.getElementById('main-calculator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHub = () => {
    const el = document.getElementById('calculator-hub-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home-page-container">
      {/* 1. Luxury SaaS Hero Stage (Instant initial paint & LCP) */}
      <Hero
        onCalculateClick={scrollToCalculator}
        onExploreHubClick={scrollToHub}
      />

      {/* 2. Structured Calculator Hub (All 12+ Financial Engines & 8-Marketplace Flag Bar) */}
      <CalculatorHub onNavigate={onNavigate} />

      {/* 3. Primary Interactive Calculator Stage */}
      <section id="main-calculator-section" className="calculator-section">
        <div className="container">
          <div className="section-header-centered">
            <div className="section-eyebrow">Interactive Engine</div>
            <h2 id="calculator-section-title" className="section-title">
              eBay Fee &amp; Profit Intelligence Engine
            </h2>
            <p className="section-subtitle">
              Calculations for final value fees, insertion charges, promoted listing ROI,
              and net seller profit margins based on published 2026 marketplace schedules.
            </p>
          </div>

          <Calculator
            inputs={inputs}
            results={results}
            onUpdateInput={updateInput}
            onSetInputs={setInputs}
            onNavigate={onNavigate}
          />
        </div>
      </section>

      {/* 4. Global Marketplaces Direct Selector */}
      <CountryGrid onSelectCountry={onNavigate} />

      {/* 5. Specialized Pricing & Optimization Tools */}
      <section id="pricing-tools-section" className="section-padding bg-subtle">
        <div className="container space-y-12">
          <div className="section-header-centered">
            <div className="section-eyebrow">Sensitivity &amp; Solver</div>
            <h2 className="section-title">Deep Profit &amp; Ad Optimization Tools</h2>
            <p className="section-subtitle">
              Interactive sensitivity modeling, target margin solvers, and sponsored ad return
              calculators.
            </p>
          </div>

          <Suspense fallback={<div className="h-48 flex items-center justify-center text-slate-400">Loading analysis tools...</div>}>
            <BreakEvenTool inputs={inputs} onUpdateInput={updateInput} />
            <TargetPricingTool inputs={inputs} onUpdateInput={updateInput} />
            <PromotedListingsTool inputs={inputs} onUpdateInput={updateInput} />
          </Suspense>
        </div>
      </section>

      {/* 6. International Marketplace Fee Comparison Matrix */}
      <section id="fee-comparison-section" className="section-padding">
        <div className="container">
          <Suspense fallback={<div className="h-48 flex items-center justify-center text-slate-400">Loading comparison matrix...</div>}>
            <FeeComparisonMatrix onSelectCountry={onNavigate} />
          </Suspense>
        </div>
      </section>

      {/* 7. Fee Policy History & Changelog */}
      <section id="fee-history-section" className="section-padding bg-subtle">
        <div className="container">
          <Suspense fallback={<div className="h-48 flex items-center justify-center text-slate-400">Loading fee history...</div>}>
            <FeeHistoryTimeline />
          </Suspense>
        </div>
      </section>

      {/* 8. Seller Strategy Guides & Knowledge Hub */}
      <section id="guides-section" className="section-padding">
        <div className="container">
          <div className="section-header-centered">
            <div className="section-eyebrow">Knowledge Hub</div>
            <h2 className="section-title">Seller Strategy Guides &amp; Frameworks</h2>
            <p className="section-subtitle">
              Comprehensive breakdowns, mathematical derivations, and fee optimization frameworks.
            </p>
          </div>

          <Suspense fallback={<div className="h-48 flex items-center justify-center text-slate-400">Loading strategy guides...</div>}>
            <ArticleList
              onSelectArticle={(slug) => onNavigate(`/articles/${slug}`)}
              limit={6}
            />
          </Suspense>
        </div>
      </section>

      {/* 9. Frequently Asked Questions Section */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center text-slate-400">Loading FAQs...</div>}>
        <FAQSection />
      </Suspense>

      {/* 10. Contact / Feedback CTA Section */}
      <section id="homepage-contact-cta" className="section-padding bg-subtle">
        <div className="container">
          <div
            className="calc-card"
            style={{
              background: 'var(--color-white)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px 24px',
              textAlign: 'center',
              maxWidth: '840px',
              margin: '0 auto',
              border: '1px solid var(--color-border)',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--color-text-title)',
                marginBottom: '12px',
                letterSpacing: '-0.02em',
              }}
            >
              Have a question or spotted a fee-data issue?
            </h2>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--color-text-body)',
                maxWidth: '600px',
                margin: '0 auto 24px',
                lineHeight: 1.6,
              }}
            >
              Help us keep {SITE_CONFIG.name} useful. Contact us for questions, corrections, feature requests, partnerships or business inquiries.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="btn-primary"
                style={{
                  minHeight: '44px',
                  padding: '10px 24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: '8px',
                }}
              >
                <span>Contact {SITE_CONFIG.name}</span>
              </button>
              <a
                href="mailto:asfandateem@gmail.com"
                className="btn-secondary"
                style={{
                  minHeight: '44px',
                  padding: '10px 24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Quick Navigation Aid */}
      <FloatingNavAid />
    </div>
  );
};
