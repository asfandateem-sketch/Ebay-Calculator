import { useEffect } from 'react';
import { trackPageView } from '../utils/analytics';
import { getCanonicalUrl } from './useRouting';
import { SITE_CONFIG } from '../config/site';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  image?: string;
  schemaJson?: object | object[];
  noIndex?: boolean;
}

export function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  image = `${SITE_CONFIG.url}/og-image.jpg`,
  schemaJson,
  noIndex = false,
}: SEOProps) {
  useEffect(() => {
    // Scroll window smoothly to top on route / meta change
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

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

    // Set meta keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Set robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute(
      'content',
      noIndex
        ? 'noindex, follow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // Set OpenGraph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    let ogTypeEl = document.querySelector('meta[property="og:type"]');
    if (!ogTypeEl) {
      ogTypeEl = document.createElement('meta');
      ogTypeEl.setAttribute('property', 'og:type');
      document.head.appendChild(ogTypeEl);
    }
    ogTypeEl.setAttribute('content', ogType);

    let ogSiteName = document.querySelector('meta[property="og:site_name"]');
    if (!ogSiteName) {
      ogSiteName = document.createElement('meta');
      ogSiteName.setAttribute('property', 'og:site_name');
      document.head.appendChild(ogSiteName);
    }
    ogSiteName.setAttribute('content', SITE_CONFIG.name);

    if (image) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute('content', image);

      let ogImageWidth = document.querySelector('meta[property="og:image:width"]');
      if (!ogImageWidth) {
        ogImageWidth = document.createElement('meta');
        ogImageWidth.setAttribute('property', 'og:image:width');
        document.head.appendChild(ogImageWidth);
      }
      ogImageWidth.setAttribute('content', '1200');

      let ogImageHeight = document.querySelector('meta[property="og:image:height"]');
      if (!ogImageHeight) {
        ogImageHeight = document.createElement('meta');
        ogImageHeight.setAttribute('property', 'og:image:height');
        document.head.appendChild(ogImageHeight);
      }
      ogImageHeight.setAttribute('content', '630');
    }

    // Set Twitter tags
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twTitle) {
      twTitle = document.createElement('meta');
      twTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twTitle);
    }
    twTitle.setAttribute('content', title);

    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twDesc) {
      twDesc = document.createElement('meta');
      twDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(twDesc);
    }
    twDesc.setAttribute('content', description);

    if (image) {
      let twImage = document.querySelector('meta[name="twitter:image"]');
      if (!twImage) {
        twImage = document.createElement('meta');
        twImage.setAttribute('name', 'twitter:image');
        document.head.appendChild(twImage);
      }
      twImage.setAttribute('content', image);
    }

    // Canonical calculation: if relative or missing, format with getCanonicalUrl
    const effectiveCanonical = canonical
      ? canonical.startsWith('http')
        ? canonical
        : getCanonicalUrl(canonical)
      : getCanonicalUrl(window.location.pathname);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', effectiveCanonical);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', effectiveCanonical);
    }

    // Set Structured Data JSON-LD
    let scriptEl = document.getElementById('sellermargincalc-jsonld') as HTMLScriptElement | null;
    if (schemaJson) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'sellermargincalc-jsonld';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schemaJson);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, keywords, canonical, ogType, image, schemaJson, noIndex]);
}

