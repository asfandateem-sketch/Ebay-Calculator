const envGA = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
const envGTM = import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID;

export const SITE_CONFIG = {
  name: import.meta.env.VITE_SITE_NAME || 'ProfitEbay',
  url: import.meta.env.VITE_SITE_URL || 'https://asfandateem-sketch.github.io/Ebay-Calculator',
  basePath: '/Ebay-Calculator',
  // Active GA4 Measurement ID
  googleAnalyticsId: envGA || 'G-P4N1XE6JFW',
  // Active GTM Container ID
  googleTagManagerId: envGTM || 'GTM-KMQ9LRH8',
  tagManagerId: envGTM || 'GTM-KMQ9LRH8',
  tagline: 'Know Your Profit. Before You List.',
  description:
    'Advanced eBay fee & profit intelligence calculator platform. Calculate real eBay fees, margins, ROI, and break-even pricing across international marketplaces.',
  officialDisclaimer:
    'ProfitEbay is an independent fee estimation tool and is not affiliated with, endorsed by, or sponsored by eBay Inc. eBay and associated marks are trademarks of eBay Inc. All fee calculations are estimates based on published fee schedules. Always confirm your final fees in eBay Seller Hub before making pricing decisions.',
};
