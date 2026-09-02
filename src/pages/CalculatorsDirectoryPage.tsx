import React, { useState, useMemo } from 'react';
import { ALL_CALCULATORS, COUNTRY_MARKETPLACES } from '../config/calculators';
import { useSEO } from '../hooks/useSEO';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../hooks/useRouting';
import { RouterLink } from '../components/RouterLink';
import {
  Layers,
  ArrowRight,
  Sparkles,
  DollarSign,
  Percent,
  Target,
  Tags,
  TrendingUp,
  Package,
  Globe,
  BarChart3,
  ShieldCheck,
  Search,
  X,
  SlidersHorizontal,
} from 'lucide-react';

interface CalculatorsDirectoryPageProps {
  onNavigate: (path: string) => void;
}

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  DollarSign,
  TrendingUp,
  Target,
  Percent,
  Package,
  Tags,
  Sparkles,
  Layers,
  Globe,
  BarChart3,
};

export const CalculatorsDirectoryPage: React.FC<CalculatorsDirectoryPageProps> = ({ onNavigate }) => {
  useSEO({
    title: `All Ecommerce & Marketplace Calculators Directory | ${SITE_CONFIG.name}`,
    description:
      `Complete directory of verified profit, fee, margin, pricing, break-even, and landed cost calculators for online sellers by ${SITE_CONFIG.name} across 8 international marketplaces.`,
    keywords:
      'seller margin calculator, seller margin calculator directory, ecommerce calculators directory, ebay calculators list, seller margin calculators suite, marketplace fee tools, product pricing solver, ecommerce profit tools, online seller calculators',
    canonical: '/calculators',
    schemaJson: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: `${SITE_CONFIG.name} Directory`,
          description: 'Explore the full suite of ecommerce profit, fee, and pricing calculators.',
          url: getCanonicalUrl('/calculators'),
          provider: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
            url: getCanonicalUrl('/'),
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: getCanonicalUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Calculators Directory', item: getCanonicalUrl('/calculators') },
          ],
        },
      ],
    },
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const categories = [
    {
      id: 'core',
      title: 'Core Profit & Margin Modeling',
      description: 'Analyze net cash flow, profit margins, item markups, and capital recovery velocity.',
    },
    {
      id: 'pricing',
      title: 'Pricing Solvers & Ad Optimizers',
      description: 'Reverse-engineer optimal selling prices, calculate zero-loss break-even floors, and optimize sponsored ad rates.',
    },
    {
      id: 'marketplace',
      title: 'Marketplace Fee Engines & Comparisons',
      description: 'Compute precise final value fees, category tier brackets, store discounts, and multi-channel fee differences.',
    },
  ];

  // Normalized search query
  const query = searchQuery.trim().toLowerCase();

  // Filtered calculators
  const filteredCalculators = useMemo(() => {
    return ALL_CALCULATORS.filter((calc) => {
      // Category filter check
      if (activeCategoryFilter !== 'all') {
        const matchesCategory =
          calc.category === activeCategoryFilter ||
          (activeCategoryFilter === 'core' && calc.category === 'profit');
        if (!matchesCategory) return false;
      }

      // Search query check
      if (!query) return true;

      const nameMatch = calc.name.toLowerCase().includes(query);
      const shortNameMatch = calc.shortName.toLowerCase().includes(query);
      const descMatch = calc.description.toLowerCase().includes(query);
      const keywordsMatch = calc.keywords.toLowerCase().includes(query);
      const categoryLabelMatch = calc.categoryLabel.toLowerCase().includes(query);
      const marketsMatch = calc.markets.some((m) => m.toLowerCase().includes(query));
      const badgeMatch = calc.badge ? calc.badge.toLowerCase().includes(query) : false;

      return nameMatch || shortNameMatch || descMatch || keywordsMatch || categoryLabelMatch || marketsMatch || badgeMatch;
    });
  }, [query, activeCategoryFilter]);

  // Filtered international marketplaces
  const filteredMarkets = useMemo(() => {
    if (!query) return COUNTRY_MARKETPLACES;
    return COUNTRY_MARKETPLACES.filter((m) => {
      return (
        m.name.toLowerCase().includes(query) ||
        m.code.toLowerCase().includes(query) ||
        m.currency.toLowerCase().includes(query) ||
        m.domain.toLowerCase().includes(query)
      );
    });
  }, [query]);

  const totalResultsCount = filteredCalculators.length + (activeCategoryFilter === 'all' ? filteredMarkets.length : 0);

  return (
    <div className="directory-page-wrapper" style={{ paddingTop: '96px', paddingBottom: '96px', background: 'var(--color-white)' }}>
      <div className="container">
        {/* Page Header */}
        <div className="directory-header" style={{ maxWidth: '800px', marginBottom: '36px' }}>
          <div className="nav-tag-pill" style={{ marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={13} />
            <span>Master Tool Directory</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '16px', color: '#000000' }}>
            Ecommerce Calculators & Sourcing Tools
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--color-text-muted)', maxWidth: '680px' }}>
            Browse our complete collection of purpose-built calculators. Each tool is built with verified 2026 fee schedules and mathematical formulas to protect your margins before you list.
          </p>
        </div>

        {/* Search Bar & Filter Controls */}
        <div
          id="calculator-directory-search-container"
          style={{
            background: '#fcfcfd',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '16px',
            padding: '20px 24px',
            marginBottom: '48px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          }}
        >
          {/* Main Search Input */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '16px',
                color: '#6b7280',
                pointerEvents: 'none',
              }}
            />
            <input
              id="calculator-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search calculators by name, keyword, or marketplace (e.g., 'break-even', 'promoted', 'margin', 'UK', 'fee')..."
              aria-label="Search calculators"
              style={{
                width: '100%',
                padding: '13px 44px 13px 44px',
                fontSize: '15px',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.12)',
                background: '#ffffff',
                color: '#111827',
                outline: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
              }}
            />
            {searchQuery && (
              <button
                id="calculator-search-clear-btn"
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9ca3af',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Chips & Status */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginRight: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <SlidersHorizontal size={13} /> Filter:
              </span>
              <button
                id="filter-category-all-btn"
                type="button"
                onClick={() => setActiveCategoryFilter('all')}
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: activeCategoryFilter === 'all' ? '#000000' : 'rgba(0,0,0,0.08)',
                  background: activeCategoryFilter === 'all' ? '#000000' : '#ffffff',
                  color: activeCategoryFilter === 'all' ? '#ffffff' : '#4b5563',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                All Tools ({ALL_CALCULATORS.length + COUNTRY_MARKETPLACES.length})
              </button>
              <button
                id="filter-category-core-btn"
                type="button"
                onClick={() => setActiveCategoryFilter('core')}
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: activeCategoryFilter === 'core' ? '#000000' : 'rgba(0,0,0,0.08)',
                  background: activeCategoryFilter === 'core' ? '#000000' : '#ffffff',
                  color: activeCategoryFilter === 'core' ? '#ffffff' : '#4b5563',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Profit & Margins
              </button>
              <button
                id="filter-category-pricing-btn"
                type="button"
                onClick={() => setActiveCategoryFilter('pricing')}
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: activeCategoryFilter === 'pricing' ? '#000000' : 'rgba(0,0,0,0.08)',
                  background: activeCategoryFilter === 'pricing' ? '#000000' : '#ffffff',
                  color: activeCategoryFilter === 'pricing' ? '#ffffff' : '#4b5563',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Pricing & Solvers
              </button>
              <button
                id="filter-category-marketplace-btn"
                type="button"
                onClick={() => setActiveCategoryFilter('marketplace')}
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: activeCategoryFilter === 'marketplace' ? '#000000' : 'rgba(0,0,0,0.08)',
                  background: activeCategoryFilter === 'marketplace' ? '#000000' : '#ffffff',
                  color: activeCategoryFilter === 'marketplace' ? '#ffffff' : '#4b5563',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Marketplace Fees
              </button>
            </div>

            {/* Match Counter */}
            {(query || activeCategoryFilter !== 'all') && (
              <div style={{ fontSize: '13px', color: '#6b7280' }}>
                Showing <strong>{filteredCalculators.length}</strong> {filteredCalculators.length === 1 ? 'tool' : 'tools'}
                {query && <> matching &ldquo;<strong>{searchQuery}</strong>&rdquo;</>}
              </div>
            )}
          </div>
        </div>

        {/* Zero Results State */}
        {filteredCalculators.length === 0 && (activeCategoryFilter !== 'all' || filteredMarkets.length === 0) && (
          <div
            id="directory-no-results-state"
            style={{
              textAlign: 'center',
              padding: '64px 24px',
              background: '#f9fafb',
              borderRadius: '16px',
              border: '1px dashed rgba(0,0,0,0.15)',
              marginBottom: '64px',
            }}
          >
            <Search size={36} style={{ color: '#9ca3af', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>
              No calculators found matching &ldquo;{searchQuery}&rdquo;
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', maxWidth: '440px', margin: '0 auto 20px' }}>
              Try adjusting your search terms or filter settings, or clear the search to view all calculators.
            </p>
            <button
              id="directory-reset-search-btn"
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategoryFilter('all');
              }}
              style={{
                padding: '10px 20px',
                background: '#000000',
                color: '#ffffff',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* Grouped Calculator Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px', marginBottom: '64px' }}>
          {categories.map((cat) => {
            const categoryCalculators = filteredCalculators.filter(
              (c) => c.category === cat.id || (cat.id === 'core' && c.category === 'profit')
            );

            if (categoryCalculators.length === 0) {
              return null;
            }

            return (
              <section key={cat.id} className="directory-category-section">
                <div style={{ marginBottom: '24px', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '16px' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', color: '#000000', marginBottom: '6px' }}>
                    {cat.title}
                  </h2>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{cat.description}</p>
                </div>

                <div className="directory-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
                  {categoryCalculators.map((calc) => {
                    const IconComponent = iconMap[calc.iconName] || Layers;

                    return (
                      <div
                        key={calc.id}
                        className="directory-tool-card"
                        style={{
                          background: '#ffffff',
                          border: '1px solid rgba(0,0,0,0.09)',
                          borderRadius: '16px',
                          padding: '24px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <div
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'rgba(0,0,0,0.04)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000000',
                              }}
                            >
                              <IconComponent size={20} />
                            </div>
                            {calc.badge && (
                              <span
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em',
                                  padding: '4px 10px',
                                  borderRadius: '9999px',
                                  background: 'rgba(0,0,0,0.05)',
                                  color: '#374151',
                                }}
                              >
                                {calc.badge}
                              </span>
                            )}
                          </div>

                          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#000000', marginBottom: '8px' }}>
                            {calc.name}
                          </h3>

                          <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#4b5563', marginBottom: '16px' }}>
                            {calc.description}
                          </p>

                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                            {calc.markets.map((m) => (
                              <span
                                key={m}
                                style={{
                                  fontSize: '11px',
                                  padding: '2px 8px',
                                  borderRadius: '6px',
                                  background: '#f4f4f6',
                                  color: '#6b7280',
                                }}
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>

                        <RouterLink
                          to={calc.path}
                          className="directory-card-launch-btn"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 16px',
                            background: '#000000',
                            color: '#ffffff',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'opacity 0.15s ease',
                          }}
                        >
                          <span>Open Calculator</span>
                          <ArrowRight size={14} />
                        </RouterLink>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Regional Marketplaces Directory (shown if all categories or if search matches countries) */}
        {(activeCategoryFilter === 'all' || activeCategoryFilter === 'marketplace') && filteredMarkets.length > 0 && (
          <div
            className="directory-regional-section"
            style={{
              background: '#fafafa',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '64px',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#000000', marginBottom: '6px' }}>
                International eBay Marketplaces
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                Dedicated calculation engines calibrated for country-specific VAT rules, regulatory operating fees, and domestic category fee structures.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
              {filteredMarkets.map((market) => (
                <RouterLink
                  key={market.code}
                  to={market.path}
                  className="directory-country-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 18px',
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: '#111111',
                    transition: 'transform 0.15s ease, border-color 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{market.flag}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{market.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      {market.domain} · {market.currency}
                    </div>
                  </div>
                </RouterLink>
              ))}
            </div>
          </div>
        )}

        {/* Strategic Methodology Overview */}
        <div
          className="directory-flow-infobox"
          style={{
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '16px',
            padding: '28px',
            background: '#ffffff',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} className="text-emerald-700" />
            <span>Recommended Product Evaluation Workflow</span>
          </h3>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#4b5563', marginBottom: '16px' }}>
            For maximum profitability and margin defense, run your inventory through this 4-step sequence before committing purchase capital:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '12px', background: '#f9f9fb', borderRadius: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#000000', marginBottom: '4px' }}>1. Sourcing & Landed Cost</div>
              <div style={{ fontSize: '13px', color: '#4b5563' }}>Compute exact unit cost including ocean freight, customs tariffs, and port handling.</div>
            </div>
            <div style={{ padding: '12px', background: '#f9f9fb', borderRadius: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#000000', marginBottom: '4px' }}>2. Break-Even Solver</div>
              <div style={{ fontSize: '13px', color: '#4b5563' }}>Identify the absolute zero-loss floor price that covers all platform commissions and shipping.</div>
            </div>
            <div style={{ padding: '12px', background: '#f9f9fb', borderRadius: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#000000', marginBottom: '4px' }}>3. Target Price & Ad ROAS</div>
              <div style={{ fontSize: '13px', color: '#4b5563' }}>Set your retail listing price to secure your target 25%+ margin while budgeting for Promoted Ads.</div>
            </div>
            <div style={{ padding: '12px', background: '#f9f9fb', borderRadius: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#000000', marginBottom: '4px' }}>4. Investment & Payback</div>
              <div style={{ fontSize: '13px', color: '#4b5563' }}>Forecast monthly cash returns, inventory turnaround velocity, and ROI on the full batch.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
