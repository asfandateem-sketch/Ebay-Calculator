import { useEffect } from 'react';
import { trackPageView } from '../utils/analytics';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  schemaJson?: object | object[];
}

export function useSEO({ title, description, canonical, ogType = 'website', schemaJson }: SEOProps) {
  useEffect(() => {
    // Set page title
    document.title = title;

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Set OpenGraph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    let ogTypeEl = document.querySelector('meta[property="og:type"]');
    if (ogTypeEl) ogTypeEl.setAttribute('content', ogType);

    // Set Canonical
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }

    // Set Structured Data JSON-LD
    let scriptEl = document.getElementById('profitebay-jsonld') as HTMLScriptElement | null;
    if (schemaJson) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'profitebay-jsonld';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schemaJson);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    // GA4 SPA Page View tracking
    trackPageView(window.location.pathname + window.location.search, title);
  }, [title, description, canonical, ogType, schemaJson]);
}
