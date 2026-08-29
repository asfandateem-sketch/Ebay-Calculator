import React from 'react';
import { useEcommerceCalculator } from '../hooks/useEcommerceCalculator';
import { useSEO } from '../hooks/useSEO';
import { EcommercePresetScenarios } from '../components/EcommerceCalculator/EcommercePresetScenarios';
import { EcommerceCalculatorForm } from '../components/EcommerceCalculator/EcommerceCalculatorForm';
import { EcommerceCalculatorResults } from '../components/EcommerceCalculator/EcommerceCalculatorResults';
import { EcommerceScenarioAnalysis } from '../components/EcommerceCalculator/EcommerceScenarioAnalysis';
import { EcommerceExpenseBreakdown } from '../components/EcommerceCalculator/EcommerceExpenseBreakdown';
import { EcommerceGuideContent } from '../components/EcommerceCalculator/EcommerceGuideContent';
import { EcommerceFAQ, ECOMMERCE_FAQS } from '../components/EcommerceCalculator/EcommerceFAQ';
import { RouterLink } from '../components/RouterLink';
import { ArrowLeft, Calculator, TrendingUp, ShieldCheck, DollarSign } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface PageProps {
  onNavigate?: (path: string) => void;
}

export const EcommerceInvestmentCalculatorPage: React.FC<PageProps> = () => {
  const {
    inputs,
    results,
    scenarios,
    updateInput,
    loadPreset,
    resetDefaults,
  } = useEcommerceCalculator();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ECOMMERCE_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'E-commerce Investment & Profit Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Calculate initial inventory investment, landed costs, monthly revenue, selling fees, advertising spend, net profit, ROI, and break-even unit metrics.',
  };

  useSEO({
    title: `E-commerce Investment & Profit Calculator (2026) — ROI, Landed Cost & Break-Even | ${SITE_CONFIG.name}`,
    description: 'Calculate your initial inventory capital, true landed cost per unit, monthly net profit, profit margins, ROI, and break-even sales velocity for online selling.',
    canonical: '/ecommerce-investment-profit-calculator',
    schemaJson: [faqSchema, softwareSchema],
  });

  return (
    <div style={{ paddingTop: '96px', paddingBottom: '96px', backgroundColor: '#fafafb', minHeight: '100vh' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RouterLink
            to="/"
            className="nav-tag-pill"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={13} />
            <span>Home</span>
          </RouterLink>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>/</span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '13px', fontWeight: 500 }}>
            E-commerce Investment & Profit Calculator
          </span>
        </div>

        {/* Hero Section */}
        <div className="section-header-centered" style={{ marginBottom: '40px' }}>
          <div className="section-eyebrow">
            <TrendingUp size={13} />
            <span>Capital & Working Profit Engine</span>
          </div>
          <h1 className="section-title">
            E-commerce Investment & Profit Calculator
          </h1>
          <p className="section-subtitle">
            Model your inventory batch investment, import duties, landed costs, channel commissions, advertising spend, net margins, ROI, and break-even horizon with precision.
          </p>
        </div>

        {/* Quick Model Presets */}
        <EcommercePresetScenarios onSelectPreset={loadPreset} />

        {/* Primary 2-Column Calculator Grid */}
        <div className="calculator-grid" style={{ marginBottom: '48px' }}>
          {/* Left Form Column */}
          <EcommerceCalculatorForm
            inputs={inputs}
            results={results}
            onUpdateInput={updateInput}
          />

          {/* Right Sticky Results Column */}
          <EcommerceCalculatorResults
            inputs={inputs}
            results={results}
            onReset={resetDefaults}
          />
        </div>

        {/* Expense Structure & Visual Breakdown */}
        <div style={{ marginBottom: '48px' }}>
          <EcommerceExpenseBreakdown results={results} />
        </div>

        {/* Scenario Analysis Table (Conservative / Expected / Optimistic) */}
        <div style={{ marginBottom: '48px' }}>
          <EcommerceScenarioAnalysis scenarios={scenarios} />
        </div>

        {/* Educational Handbook / Guide */}
        <div style={{ marginBottom: '48px' }}>
          <EcommerceGuideContent />
        </div>

        {/* FAQ Accordion */}
        <div style={{ marginBottom: '32px' }}>
          <EcommerceFAQ />
        </div>
      </div>
    </div>
  );
};
