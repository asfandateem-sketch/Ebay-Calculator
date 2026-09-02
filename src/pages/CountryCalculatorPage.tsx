import React from 'react';
import { CountryCode } from '../types';
import { getCountryConfig } from '../data/fee-rules';
import { useCalculator } from '../hooks/useCalculator';
import { useSEO } from '../hooks/useSEO';
import { Calculator } from '../components/Calculator/Calculator';
import { BreakEvenTool } from '../components/PricingTools/BreakEvenTool';
import { FeeComparisonMatrix } from '../components/FeeComparison/FeeComparisonMatrix';
import { FAQSection } from '../components/FAQ/FAQSection';
import { CalculatorExplainer } from '../components/SEO/CalculatorExplainer';
import { ShieldCheck, ExternalLink, Globe, ArrowLeft } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { getCanonicalUrl } from '../hooks/useRouting';
import { CountryFlag } from '../components/CountrySelector/CountryFlag';
import { SITE_CONFIG } from '../config/site';

interface CountryCalculatorPageProps {
  countryCode: CountryCode;
  onNavigate: (path: string) => void;
}

export const CountryCalculatorPage: React.FC<CountryCalculatorPageProps> = ({ countryCode, onNavigate }) => {
  const config = getCountryConfig(countryCode);
  const { inputs, results, updateInput, setInputs } = useCalculator(countryCode);

  const countryMetaMap: Record<CountryCode, { title: string; description: string; keywords: string; canonical: string; h1: string }> = {
    US: {
      title: `United States eBay Fee Calculator (2026) — ebay.com Profit Solver | ${SITE_CONFIG.name}`,
      description: `Calculate accurate 2026 eBay US seller fees, managed payments (13.25% + $0.30), category tiers, store discounts, sales tax, and net profit with ${SITE_CONFIG.name}.`,
      keywords: 'seller margin calculator us, ebay fee calculator us, calculate ebay fees usa, ebay final value fee calculator 2026, ebay selling fee calculator, ebay profit calculator us, ebay managed payments fees, ebay seller calculator 2026',
      canonical: '/us',
      h1: 'United States eBay Fee Calculator (2026)',
    },
    UK: {
      title: `UK eBay Fee Calculator (2026) — eBay.co.uk Seller Profit Calculator | ${SITE_CONFIG.name}`,
      description: `Calculate exact 2026 eBay UK seller fees, private seller 0% final value fees, business rates (11.9%–14.9%), 20% VAT on fees, regulatory fees, and net profit in GBP (£) with ${SITE_CONFIG.name}.`,
      keywords: 'seller margin calculator uk, ebay fee calculator uk, ebay co uk fee calculator, ebay private seller fees uk, calculate ebay profit uk, ebay selling fees uk 2026, ebay fvf calculator uk, ebay fee calculator zero fees',
      canonical: '/uk',
      h1: 'UK eBay Fee Calculator (2026)',
    },
    AU: {
      title: `Australia eBay Fee Calculator (2026) — eBay.com.au Seller Calculator | ${SITE_CONFIG.name}`,
      description: `Calculate 2026 eBay Australia seller fees, casual seller 0% fees, commercial store plans, 10% GST on fees, and take-home net profit in AUD (A$) with ${SITE_CONFIG.name}.`,
      keywords: 'seller margin calculator australia, ebay fee calculator australia, ebay com au fee calculator, ebay selling fees australia, ebay profit calculator au, gst on ebay fees australia, ebay seller fees australia 2026',
      canonical: '/au',
      h1: 'Australia eBay Fee Calculator (2026)',
    },
    CA: {
      title: `Canada eBay Fee Calculator (2026) — eBay.ca Seller Profit Calculator | ${SITE_CONFIG.name}`,
      description: `Calculate 2026 eBay Canada seller final value fees, store discounts, GST/HST on fees, promoted listings, and net seller margin in CAD (C$) with ${SITE_CONFIG.name}.`,
      keywords: 'seller margin calculator canada, ebay fee calculator canada, ebay ca fee calculator, calculate ebay selling fees canada, ebay profit calculator ca, ebay final value fee canada, ebay seller fees ca 2026',
      canonical: '/ca',
      h1: 'Canada eBay Fee Calculator (2026)',
    },
    DE: {
      title: `Germany eBay Fee Calculator (2026) — eBay.de Gebühren Rechner | ${SITE_CONFIG.name}`,
      description: `Calculate 2026 eBay Germany (eBay.de) seller fees, private seller 0% zero-fee rules, commercial tiered rates, 19% VAT on fees, and net profit in EUR (€) with ${SITE_CONFIG.name}.`,
      keywords: 'seller margin calculator germany, ebay gebuehren rechner, ebay de gebuehrenrechner 2026, ebay verkaufsgebuehren rechner, ebay fee calculator germany, ebay rechner deutschland, ebay gewinn berechnen',
      canonical: '/de',
      h1: 'Germany eBay Fee Calculator (2026)',
    },
    FR: {
      title: `France eBay Fee Calculator (2026) — Calculateur Frais eBay.fr | ${SITE_CONFIG.name}`,
      description: `Calculate 2026 eBay France (eBay.fr) seller fees, 0.42% digital services regulatory fee, 20% VAT on fees, category commissions, and net profit in EUR (€) with ${SITE_CONFIG.name}.`,
      keywords: 'seller margin calculator france, calculateur frais ebay fr, calcul commission ebay france, frais de vente ebay 2026, ebay fee calculator france, calculer benefice ebay, simulateur frais ebay france',
      canonical: '/fr',
      h1: 'France eBay Fee Calculator (2026)',
    },
    IT: {
      title: `Italy eBay Fee Calculator (2026) — Calcolatore Tariffe eBay.it | ${SITE_CONFIG.name}`,
      description: `Calculate 2026 eBay Italy (eBay.it) seller fees, 0.42% regulatory fee, 22% Italian VAT on fees, store subscription rates, and take-home profit in EUR (€) with ${SITE_CONFIG.name}.`,
      keywords: 'seller margin calculator italia, calcolatore tariffe ebay it, calcolo commissioni vendita ebay italia, commissioni ebay 2026, ebay fee calculator italy, calcolo guadagno netto ebay, calcolatore vendite ebay',
      canonical: '/it',
      h1: 'Italy eBay Fee Calculator (2026)',
    },
    ES: {
      title: `Spain eBay Fee Calculator (2026) — Calculadora Comisiones eBay.es | ${SITE_CONFIG.name}`,
      description: `Calculate 2026 eBay Spain (eBay.es) seller fees, 0.42% regulatory operating fee, 21% Spanish IVA on fees, category tiers, and net profit in EUR (€) with ${SITE_CONFIG.name}.`,
      keywords: 'seller margin calculator espana, calculadora comisiones ebay es, tarifas vendedor ebay espana, calcular comision venta ebay 2026, ebay fee calculator spain, calcular beneficio ebay, simulador comisiones ebay espana',
      canonical: '/es',
      h1: 'Spain eBay Fee Calculator (2026)',
    },
  };

  const meta = countryMetaMap[countryCode] || countryMetaMap.US;

  useSEO({
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    canonical: meta.canonical,
    schemaJson: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: `eBay ${config.name} Fee Calculator (2026) — ${SITE_CONFIG.name}`,
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
            priceCurrency: config.currency.code,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: getCanonicalUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Calculators', item: getCanonicalUrl('/calculators') },
            { '@type': 'ListItem', position: 3, name: `${config.name} eBay Fee Calculator`, item: getCanonicalUrl(meta.canonical) },
          ],
        },
      ],
    },
  });

  return (
    <div style={{ paddingTop: '96px', paddingBottom: '96px', background: 'var(--color-white)' }}>
      <div className="container">
        {/* Back Link */}
        <RouterLink
          to="/"
          className="nav-tag-pill"
          style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={13} />
          <span>Back to Global Overview</span>
        </RouterLink>

        {/* Page Header */}
        <div style={{ marginBottom: '40px' }}>
          <div className="section-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <CountryFlag code={countryCode} width={18} height={13} ariaLabel={`${config.name} flag`} />
            <span>{config.domain} Hub</span>
          </div>
          <h1 className="section-title">
            {meta.h1}
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '800px' }}>
            Calculate accurate eBay {config.name} seller fees, final value rates, {config.vatName}, store subscription discounts, and net profits in {config.currency.code} ({config.currency.symbol}).
          </p>
        </div>

        {/* Calculator Component */}
        <div style={{ marginBottom: '64px' }}>
          <Calculator
            inputs={inputs}
            results={results}
            onUpdateInput={updateInput}
            onSetInputs={setInputs}
            onNavigate={onNavigate}
          />
        </div>

        {/* Category Fee Table for this country */}
        <div className="calc-card" style={{ marginBottom: '48px' }}>
          <div className="calc-card-header">
            <div className="calc-title-badge">
              <Globe size={18} color="var(--color-primary)" />
              <div>
                <h2 className="calc-title" style={{ fontSize: '18px', fontWeight: 600 }}>eBay {config.name} Category Fee Schedule</h2>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  Standard vs Store Subscription Final Value Rates
                </p>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Verified: <strong>{config.lastVerified}</strong>
            </div>
          </div>

          <div className="table-responsive-wrapper">
            <table className="table-comparison">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Standard Rate</th>
                  <th>Store Rate</th>
                  <th>Fixed Fee</th>
                  <th>Policy Notes</th>
                </tr>
              </thead>
              <tbody>
                {config.categories.map((cat) => (
                  <tr key={cat.id}>
                    <td><strong>{cat.name}</strong></td>
                    <td>{(cat.standardRate * 100).toFixed(2)}%</td>
                    <td>{cat.storeRate !== undefined ? `${(cat.storeRate * 100).toFixed(2)}%` : 'Standard'}</td>
                    <td>{config.currency.symbol}{cat.fixedFee.toFixed(2)}</td>
                    <td style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{cat.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Official Source Banner */}
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: 'var(--color-soft-gray)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '13px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} />
              <span>Official Reference: <strong>{config.officialSource}</strong></span>
            </div>
            <a
              href={config.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: 'var(--color-primary)' }}
            >
              <span>View Official eBay Docs</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Break-Even Sensitivity for this country */}
        <div style={{ marginBottom: '48px' }}>
          <BreakEvenTool inputs={inputs} onUpdateInput={updateInput} />
        </div>

        {/* Global Comparison */}
        <div style={{ marginBottom: '48px' }}>
          <FeeComparisonMatrix onSelectCountry={onNavigate} />
        </div>

        {/* SEO Explainer & Contextual Internal Links */}
        <CalculatorExplainer
          type="country"
          onNavigate={onNavigate}
          customHeading={`Understanding eBay ${config.name} Seller Fees & Payouts`}
          customWhatIsIt={`Learn how eBay ${config.name} (${config.domain}) structures final value fees, ${config.vatName}, and payment processing in ${config.currency.code} (${config.currency.symbol}). Compare rates across categories and explore related profit tools below.`}
        />

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
};
