const envGA = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
const envGTM = import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID;

export const CURRENT_SITE_URL = 'https://asfandateem-sketch.github.io/Ebay-Calculator';
export const FUTURE_SITE_URL = 'https://sellermargincalc.pro';

export const SITE_CONFIG = {
  name: 'Seller Margin Calculator',
  brandName: 'Seller Margin Calculator',
  url: import.meta.env.VITE_SITE_URL || CURRENT_SITE_URL,
  futureUrl: FUTURE_SITE_URL,
  basePath: import.meta.env.VITE_BASE_PATH !== undefined ? import.meta.env.VITE_BASE_PATH : '/Ebay-Calculator',
  // Active GA4 Measurement ID
  googleAnalyticsId: envGA || 'G-P4N1XE6JFW',
  // Active GTM Container ID
  googleTagManagerId: envGTM || 'GTM-KMQ9LRH8',
  tagManagerId: envGTM || 'GTM-KMQ9LRH8',
  tagline: 'Calculate. Analyze. Maximize.',
  description:
    'Calculate your true selling costs, profit margins, break-even prices, and fees across marketplaces.',
  officialDisclaimer:
    'Seller Margin Calculator is an independent financial and fee estimation tool and is not affiliated with, endorsed by, or sponsored by eBay Inc., Amazon, Etsy, or Shopify. eBay and associated marks are trademarks of eBay Inc. All fee calculations are estimates based on published fee schedules. Always confirm your final fees in your official seller portal before making final pricing decisions.',
};

