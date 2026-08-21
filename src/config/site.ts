const envGA = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
const envGTM = import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID;

export const SITE_CONFIG = {
  name: import.meta.env.VITE_SITE_NAME || 'ProfitEbay',
  url: import.meta.env.VITE_SITE_URL || 'https://profitebay.ai.studio',
  // Active GA4 Measurement ID
  googleAnalyticsId: envGA && envGA !== 'G-P4N1XE6JFW' ? envGA : 'G-ZL44FN3N1L',
  // Active GTM Container ID
  googleTagManagerId: envGTM || 'GTM-KMQ9LRH8',
  tagManagerId: envGTM || 'GTM-KMQ9LRH8',
  tagline: 'Know Your Profit. Before You List.',
  description:
    'Advanced eBay fee & profit intelligence calculator platform. Calculate real eBay fees, margins, ROI, and break-even pricing across international marketplaces.',
};
