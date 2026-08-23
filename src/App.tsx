import React from 'react';
import { useRouting } from './hooks/useRouting';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ProfitCalculatorPage } from './pages/ProfitCalculatorPage';
import { BreakEvenPage } from './pages/BreakEvenPage';
import { PricingCalculatorPage } from './pages/PricingCalculatorPage';
import { PromotedListingsPage } from './pages/PromotedListingsPage';
import { CountryCalculatorPage } from './pages/CountryCalculatorPage';
import { FeeComparisonPage } from './pages/FeeComparisonPage';
import { FeeHistoryPage } from './pages/FeeHistoryPage';
import { SellerGuidesPage } from './pages/SellerGuidesPage';
import { ArticlePage } from './pages/ArticlePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { EmbedPage } from './pages/EmbedPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { LegalPage } from './pages/LegalPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { EmbedWidget } from './components/Embed/EmbedWidget';
import { CountryCode } from './types';
import { useGTMRouteTracker } from './hooks/useGTMRouteTracker';

export default function App() {
  const { currentPath: path, navigate } = useRouting();

  // Automatic GTM dataLayer page_view tracking on route transitions
  useGTMRouteTracker(path);

  // Standalone embed widget route without site chrome
  if (path === '/embed-widget') {
    return (
      <div style={{ padding: '16px', background: '#f4f4f6', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <EmbedWidget />
      </div>
    );
  }

  // Country calculator route mapping
  const countryRouteMap: Record<string, CountryCode> = {
    '/usa-ebay-calculator': 'US',
    '/uk-ebay-calculator': 'UK',
    '/australia-ebay-calculator': 'AU',
    '/canada-ebay-calculator': 'CA',
    '/germany-ebay-calculator': 'DE',
    '/france-ebay-calculator': 'FR',
    '/italy-ebay-calculator': 'IT',
    '/spain-ebay-calculator': 'ES',
  };

  const renderContent = () => {
    // 1. Home
    if (path === '/' || path === '') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. Specialized Core Calculators
    if (path === '/ebay-fee-calculator') {
      return <CalculatorPage onNavigate={navigate} />;
    }
    if (path === '/ebay-profit-calculator') {
      return <ProfitCalculatorPage onNavigate={navigate} />;
    }
    if (path === '/ebay-break-even-calculator') {
      return <BreakEvenPage onNavigate={navigate} />;
    }
    if (path === '/ebay-pricing-calculator') {
      return <PricingCalculatorPage onNavigate={navigate} />;
    }
    if (path === '/ebay-promoted-listings-calculator') {
      return <PromotedListingsPage onNavigate={navigate} />;
    }

    // 3. Country Marketplaces
    if (countryRouteMap[path]) {
      return <CountryCalculatorPage countryCode={countryRouteMap[path]} onNavigate={navigate} />;
    }

    // 4. Comparison & History
    if (path === '/ebay-fee-comparison') {
      return <FeeComparisonPage onNavigate={navigate} />;
    }
    if (path === '/ebay-fee-history') {
      return <FeeHistoryPage onNavigate={navigate} />;
    }

    // 5. Guides & Knowledge Base
    if (path === '/ebay-seller-guides') {
      return <SellerGuidesPage onNavigate={navigate} />;
    }
    if (path.startsWith('/articles/')) {
      const slug = path.replace('/articles/', '');
      return <ArticlePage slug={slug} onNavigate={navigate} />;
    }

    // 6. Resources & Embed
    if (path === '/tools/downloadable-resources') {
      return <ResourcesPage onNavigate={navigate} />;
    }
    if (path === '/embed/ebay-fee-calculator') {
      return <EmbedPage onNavigate={navigate} />;
    }

    // 7. Trust & Legal & Contact
    if (path === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (path === '/methodology') {
      return <MethodologyPage onNavigate={navigate} />;
    }
    if (['/privacy', '/terms', '/disclaimer', '/about'].includes(path)) {
      const type = path.replace('/', '') as 'privacy' | 'terms' | 'disclaimer' | 'about';
      return <LegalPage type={type} onNavigate={navigate} />;
    }

    // 8. 404 Fallback
    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="app-layout">
      {/* Sticky / Fixed Navigation Bar */}
      <Navbar onNavigate={navigate} />

      {/* Main Page Dynamic View */}
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Authoritative Global Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
