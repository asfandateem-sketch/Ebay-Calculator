import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { useGTM } from '../hooks/useGTM';
import { downloadCsv } from '../utils/export';
import { FileSpreadsheet, Download, CheckCircle, ArrowLeft } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../hooks/useRouting';

interface PageProps {
  onNavigate?: (path: string) => void;
}

export const ResourcesPage: React.FC<PageProps> = () => {
  const { trackFormSubmit } = useGTM();

  useSEO({
    title: `Free eBay Fee & Profit Spreadsheet Templates (Excel / Sheets) | ${SITE_CONFIG.name}`,
    description: `Download free eBay profit tracking templates, batch fee calculators, and break-even spreadsheets compatible with Excel and Google Sheets from ${SITE_CONFIG.name}.`,
    keywords: 'free ebay fee spreadsheet, ebay profit spreadsheet template, ebay inventory tracking excel, google sheets ebay calculator',
    canonical: '/tools/downloadable-resources',
    schemaJson: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'DigitalDocument',
          name: 'eBay Inventory & Profit Master Sheet Spreadsheet Template',
          fileFormat: 'text/csv',
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
            { '@type': 'ListItem', position: 2, name: 'Downloadable Resources', item: getCanonicalUrl('/tools/downloadable-resources') },
          ],
        },
      ],
    },
  });

  const handleDownloadTemplate = () => {
    trackFormSubmit({
      formId: 'form-download-inventory-template',
      formName: 'eBay Inventory & Profit Master Sheet CSV Download',
      formType: 'download',
      status: 'success',
      nonPiiFields: {
        resource_format: 'csv',
        resource_category: 'spreadsheet_template',
      },
    });

    const csvTemplate = `SKU,Item Title,Marketplace,Category,Sold Price,Shipping Charged,Wholesale Cost,Shipping Label Cost,Packaging Cost,Promoted Ad Rate %,Net Profit,Profit Margin %,ROI %\nPROD-001,Vintage Leather Jacket,US,Clothing Shoes & Accessories,125.00,14.50,35.00,12.20,2.50,3.0,,,\nPROD-002,Wireless Noise-Cancelling Headphones,US,Consumer Electronics,85.00,0.00,42.00,6.50,1.20,0.0,,,\nPROD-003,Collectible Trading Card Booster Pack,US,Collectibles & Art,45.00,4.00,15.00,3.80,0.90,5.0,,,\n`;
    downloadCsv(csvTemplate, 'sellermargincalc-inventory-profit-template.csv');
  };

  return (
    <div style={{ paddingTop: '96px', paddingBottom: '96px', background: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
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
            <FileSpreadsheet size={13} />
            <span>Seller Templates</span>
          </div>
          <h1 className="section-title">Downloadable Seller Resources</h1>
          <p className="section-subtitle">
            Free spreadsheets, bulk fee templates, and profit modeling sheets for high-volume eBay sellers.
          </p>
        </div>

        {/* Template Card 1 */}
        <div
          className="calc-card"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '24px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <FileSpreadsheet size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>eBay Inventory & Profit Master Sheet</h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', maxWidth: '520px', lineHeight: 1.5 }}>
              Track hundreds of inventory items, automated fee deductions, actual shipping labels, and cumulative monthly net ROI. Fully formatted for Microsoft Excel & Google Sheets.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} color="#10b981" /> 2026 Fee Formulas</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} color="#10b981" /> Promoted Ad Logic</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} color="#10b981" /> CSV / XLSX</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={handleDownloadTemplate}
          >
            <Download size={15} />
            <span>Download CSV Template</span>
          </button>
        </div>
      </div>
    </div>
  );
};
