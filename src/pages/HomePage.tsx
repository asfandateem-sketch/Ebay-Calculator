import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { Calculator } from '../components/Calculator/Calculator';
import { CountryGrid } from '../components/CountrySelector/CountryGrid';
import { BreakEvenTool } from '../components/PricingTools/BreakEvenTool';
import { TargetPricingTool } from '../components/PricingTools/TargetPricingTool';
import { PromotedListingsTool } from '../components/PricingTools/PromotedListingsTool';
import { FeeComparisonMatrix } from '../components/FeeComparison/FeeComparisonMatrix';
import { FeeHistoryTimeline } from '../components/FeeHistory/FeeHistoryTimeline';
import { ArticleList } from '../components/SellerGuides/ArticleList';
import { FAQSection } from '../components/FAQ/FAQSection';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../hooks/useRouting';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { inputs, results, updateInput, setInputs } = useCalculator();

  useSEO({
    title: `${SITE_CONFIG.name} — Advanced eBay Fee & Profit Intelligence Calculator (2026)`,
    description:
      'Calculate estimated eBay seller fees, shipping costs, promoted ad ROI, and break-even pricing across US, UK, Australia, Canada, Germany, France, Italy & Spain based on published fee schedules.',
    canonical: '/',
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: SITE_CONFIG.name,
      url: getCanonicalUrl('/'),
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      description: SITE_CONFIG.description,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  });

  const scrollToCalculator = () => {
    const el = document.getElementById('main-calculator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('faq-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home-page-container">
      {/* 1. Full-Height Hero Video Stage */}
      <Hero
        onCalculateClick={scrollToCalculator}
        onHowItWorksClick={scrollToHowItWorks}
      />

      {/* 2. Primary Calculator Interactive Stage */}
      <section id="main-calculator-section" className="calculator-section">
        <div className="container">
          <div className="section-header-centered">
            <div className="section-eyebrow">Interactive Engine</div>
            <h2 id="calculator-section-title" className="section-title">
              eBay Fee & Profit Intelligence Engine
            </h2>
            <p className="section-subtitle">
              Calculations for final value fees, insertion charges, promoted listing ROI,
              and net seller profit margins based on published eBay policies.
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

      {/* 3. Global Marketplaces Direct Selector */}
      <CountryGrid onSelectCountry={onNavigate} />

      {/* 4. Specialized Pricing & Optimization Tools */}
      <section id="pricing-tools-section" className="section-padding bg-subtle">
        <div className="container space-y-12">
          <div className="section-header-centered">
            <div className="section-eyebrow">Sensitivity & Solver</div>
            <h2 className="section-title">Deep Profit & Ad Optimization Tools</h2>
            <p className="section-subtitle">
              Interactive sensitivity modeling, target margin solvers, and sponsored ad return
              calculators.
            </p>
          </div>

          <BreakEvenTool inputs={inputs} onUpdateInput={updateInput} />
          <TargetPricingTool inputs={inputs} onUpdateInput={updateInput} />
          <PromotedListingsTool inputs={inputs} onUpdateInput={updateInput} />
        </div>
      </section>

      {/* 5. International Marketplace Fee Comparison Matrix */}
      <section id="fee-comparison-section" className="section-padding">
        <div className="container">
          <FeeComparisonMatrix onSelectCountry={onNavigate} />
        </div>
      </section>

      {/* 6. Fee Policy History & Changelog */}
      <section id="fee-history-section" className="section-padding bg-subtle">
        <div className="container">
          <FeeHistoryTimeline />
        </div>
      </section>

      {/* 7. Seller Strategy Guides & Knowledge Hub */}
      <section id="guides-section" className="section-padding">
        <div className="container">
          <div className="section-header-centered">
            <div className="section-eyebrow">Knowledge Hub</div>
            <h2 className="section-title">eBay Seller Fee & Strategy Guides</h2>
            <p className="section-subtitle">
              Comprehensive breakdowns, mathematical derivations, and fee optimization frameworks.
            </p>
          </div>

          <ArticleList
            onSelectArticle={(slug) => onNavigate(`/articles/${slug}`)}
            limit={6}
          />
        </div>
      </section>

      {/* 8. Frequently Asked Questions Section */}
      <FAQSection />

      {/* 9. Contact / Feedback CTA Section */}
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
              Help us keep ProfitEbay useful. Contact us for questions, corrections, feature requests, partnerships or business inquiries.
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
                <span>Contact ProfitEbay</span>
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
    </div>
  );
};
