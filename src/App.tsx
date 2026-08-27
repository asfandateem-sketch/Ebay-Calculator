import React, { lazy, Suspense } from 'react';
import { useRouting } from './hooks/useRouting';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage';
import { EmbedWidget } from './components/Embed/EmbedWidget';
import { CountryCode } from './types';
import { useGTMRouteTracker } from './hooks/useGTMRouteTracker';

// Code-split secondary routes on-demand to minimize initial critical JS bundle
const CalculatorPage = lazy(() => import('./pages/CalculatorPage').then(m => ({ default: m.CalculatorPage })));
const ProfitCalculatorPage = lazy(() => import('./pages/ProfitCalculatorPage').then(m => ({ default: m.ProfitCalculatorPage })));
const BreakEvenPage = lazy(() => import('./pages/BreakEvenPage').then(m => ({ default: m.BreakEvenPage })));
const PricingCalculatorPage = lazy(() => import('./pages/PricingCalculatorPage').then(m => ({ default: m.PricingCalculatorPage })));
const PromotedListingsPage = lazy(() => import('./pages/PromotedListingsPage').then(m => ({ default: m.PromotedListingsPage })));
const CountryCalculatorPage = lazy(() => import('./pages/CountryCalculatorPage').then(m => ({ default: m.CountryCalculatorPage })));
const FeeComparisonPage = lazy(() => import('./pages/FeeComparisonPage').then(m => ({ default: m.FeeComparisonPage })));
const FeeHistoryPage = lazy(() => import('./pages/FeeHistoryPage').then(m => ({ default: m.FeeHistoryPage })));
const SellerGuidesPage = lazy(() => import('./pages/SellerGuidesPage').then(m => ({ default: m.SellerGuidesPage })));
const ArticlePage = lazy(() => import('./pages/ArticlePage').then(m => ({ default: m.ArticlePage })));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage').then(m => ({ default: m.ResourcesPage })));
const EmbedPage = lazy(() => import('./pages/EmbedPage').then(m => ({ default: m.EmbedPage })));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage').then(m => ({ default: m.MethodologyPage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then(m => ({ default: m.LegalPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Non-shifting, lightweight route fallback
const RouteFallback: React.FC = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid rgba(0,0,0,0.1)', borderTopColor: '#000', animation: 'spin 0.6s linear infinite' }} />
  </div>
);

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

  // Country calculator route mapping (canonical + aliases)
  const countryRouteMap: Record<string, CountryCode> = {
    '/us': 'US',
    '/usa': 'US',
    '/usa-ebay-calculator': 'US',
    '/ebay-fee-calculator-us': 'US',
    '/uk': 'UK',
    '/uk-ebay-calculator': 'UK',
    '/ebay-fee-calculator-uk': 'UK',
    '/au': 'AU',
    '/australia': 'AU',
    '/australia-ebay-calculator': 'AU',
    '/ebay-fee-calculator-au': 'AU',
    '/ca': 'CA',
    '/canada': 'CA',
    '/canada-ebay-calculator': 'CA',
    '/ebay-fee-calculator-ca': 'CA',
    '/de': 'DE',
    '/germany': 'DE',
    '/germany-ebay-calculator': 'DE',
    '/ebay-fee-calculator-de': 'DE',
    '/fr': 'FR',
    '/france': 'FR',
    '/france-ebay-calculator': 'FR',
    '/ebay-fee-calculator-fr': 'FR',
    '/it': 'IT',
    '/italy': 'IT',
    '/italy-ebay-calculator': 'IT',
    '/ebay-fee-calculator-it': 'IT',
    '/es': 'ES',
    '/spain': 'ES',
    '/spain-ebay-calculator': 'ES',
    '/ebay-fee-calculator-es': 'ES',
  };

  const renderContent = () => {
    // 1. Home (Synchronous, instant rendering)
    if (path === '/' || path === '') {
      return <HomePage onNavigate={navigate} />;
    }

    // Secondary routes wrapped in Suspense
    return (
      <Suspense fallback={<RouteFallback />}>
        {/* 2. Specialized Core Calculators */}
        {(path === '/ebay-fee-calculator' || path === '/calculator') && (
          <CalculatorPage onNavigate={navigate} />
        )}
        {(path === '/ebay-profit-calculator' || path === '/profit') && (
          <ProfitCalculatorPage onNavigate={navigate} />
        )}
        {(path === '/ebay-break-even-calculator' || path === '/breakeven' || path === '/break-even') && (
          <BreakEvenPage onNavigate={navigate} />
        )}
        {(path === '/ebay-pricing-calculator' || path === '/pricing') && (
          <PricingCalculatorPage onNavigate={navigate} />
        )}
        {(path === '/ebay-promoted-listings-calculator' || path === '/promoted-listings' || path === '/promoted') && (
          <PromotedListingsPage onNavigate={navigate} />
        )}

        {/* 3. Country Marketplaces */}
        {countryRouteMap[path] && (
          <CountryCalculatorPage countryCode={countryRouteMap[path]} onNavigate={navigate} />
        )}

        {/* 4. Comparison & History */}
        {(path === '/ebay-fee-comparison' || path === '/comparison') && (
          <FeeComparisonPage onNavigate={navigate} />
        )}
        {(path === '/ebay-fee-history' || path === '/history') && (
          <FeeHistoryPage onNavigate={navigate} />
        )}

        {/* 5. Guides & Knowledge Base */}
        {(path === '/ebay-seller-guides' || path === '/guides' || path === '/articles') && (
          <SellerGuidesPage onNavigate={navigate} />
        )}
        {path.startsWith('/articles/') && (
          <ArticlePage slug={path.replace('/articles/', '')} onNavigate={navigate} />
        )}

        {/* 6. Resources & Embed */}
        {(path === '/tools/downloadable-resources' || path === '/resources') && (
          <ResourcesPage onNavigate={navigate} />
        )}
        {(path === '/embed/ebay-fee-calculator' || path === '/embed') && (
          <EmbedPage onNavigate={navigate} />
        )}

        {/* 7. Trust & Legal & Contact */}
        {path === '/contact' && <ContactPage onNavigate={navigate} />}
        {path === '/methodology' && <MethodologyPage onNavigate={navigate} />}
        {['/privacy', '/terms', '/disclaimer', '/about'].includes(path) && (
          <LegalPage type={path.replace('/', '') as 'privacy' | 'terms' | 'disclaimer' | 'about'} onNavigate={navigate} />
        )}

        {/* 8. 404 Fallback */}
        {!(path === '/' || path === '' ||
          path === '/ebay-fee-calculator' || path === '/calculator' ||
          path === '/ebay-profit-calculator' || path === '/profit' ||
          path === '/ebay-break-even-calculator' || path === '/breakeven' || path === '/break-even' ||
          path === '/ebay-pricing-calculator' || path === '/pricing' ||
          path === '/ebay-promoted-listings-calculator' || path === '/promoted-listings' || path === '/promoted' ||
          countryRouteMap[path] ||
          path === '/ebay-fee-comparison' || path === '/comparison' ||
          path === '/ebay-fee-history' || path === '/history' ||
          path === '/ebay-seller-guides' || path === '/guides' || path === '/articles' ||
          path.startsWith('/articles/') ||
          path === '/tools/downloadable-resources' || path === '/resources' ||
          path === '/embed/ebay-fee-calculator' || path === '/embed' ||
          path === '/contact' || path === '/methodology' ||
          ['/privacy', '/terms', '/disclaimer', '/about'].includes(path)
        ) && (
          <NotFoundPage onNavigate={navigate} />
        )}
      </Suspense>
    );
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

