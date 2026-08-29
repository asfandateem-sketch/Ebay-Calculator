import { SITE_CONFIG } from '../config/site';
import { trackGtmPageView, trackGtmCustomEvent, trackGtmFormSubmit, FormTrackingOptions } from './gtm';

export const GTM_CONTAINER_ID = SITE_CONFIG.tagManagerId || 'GTM-KMQ9LRH8';
export const GA_MEASUREMENT_ID = SITE_CONFIG.googleAnalyticsId;

export type AnalyticsEventName =
  | 'calculator_used'
  | 'marketplace_selected'
  | 'seller_type_selected'
  | 'break_even_calculated'
  | 'target_margin_calculated'
  | 'promoted_listing_estimated'
  | 'contact_email_click'
  | 'contact_whatsapp_click'
  | 'contact_phone_click'
  | 'calculator_started'
  | 'calculator_completed'
  | 'country_selected'
  | 'category_selected'
  | 'advanced_options_opened'
  | 'profit_calculated'
  | 'copy_result'
  | 'share_result'
  | 'download_result'
  | 'embed_clicked'
  | 'source_clicked'
  | 'article_cta_clicked'
  | 'form_submission';

/**
 * Tracks custom user interactions and conversions via GA4 (gtag) and GTM dataLayer with non-PII guarantee
 */
export function trackEvent(eventName: AnalyticsEventName | string, properties: Record<string, unknown> = {}): void {
  trackGtmCustomEvent(eventName, properties);
}

/**
 * Tracks route navigation / virtual page views for Single Page Application via GA4 & GTM dataLayer
 */
export function trackPageView(path?: string, title?: string, extraMetadata: Record<string, unknown> = {}): void {
  trackGtmPageView(path, title, extraMetadata);
}

/**
 * Tracks form submissions securely into GTM & GA4 dataLayer without PII
 */
export function trackFormSubmission(options: FormTrackingOptions): void {
  trackGtmFormSubmit(options);
}

/**
 * Helpers for standard anonymous events
 */
export const analytics = {
  trackCalculatorUsed: (country: string, categoryId?: string, isStore?: boolean) => {
    trackEvent('calculator_used', { country, categoryId, isStore });
  },
  trackMarketplaceSelected: (country: string, source = 'selector') => {
    trackEvent('marketplace_selected', { country, selection_source: source });
  },
  trackSellerTypeSelected: (sellerLevel: string, storeSubscription?: string, country?: string) => {
    trackEvent('seller_type_selected', { seller_level: sellerLevel, store_subscription: storeSubscription, country });
  },
  trackBreakEvenCalculated: (country: string, categoryId?: string) => {
    trackEvent('break_even_calculated', { country, category_id: categoryId });
  },
  trackTargetMarginCalculated: (country: string, targetType: 'profit' | 'margin') => {
    trackEvent('target_margin_calculated', { country, target_type: targetType });
  },
  trackPromotedListingEstimated: (country: string, adRate: number) => {
    trackEvent('promoted_listing_estimated', { country, ad_rate: adRate });
  },
  trackContactEmailClick: () => {
    trackEvent('contact_email_click');
  },
  trackContactWhatsAppClick: () => {
    trackEvent('contact_whatsapp_click');
  },
  trackContactPhoneClick: () => {
    trackEvent('contact_phone_click');
  },
};



