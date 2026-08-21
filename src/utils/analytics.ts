import { SITE_CONFIG } from '../config/site';
import { trackGtmPageView, trackGtmCustomEvent, trackGtmFormSubmit, FormTrackingOptions } from './gtm';

export const GTM_CONTAINER_ID = SITE_CONFIG.tagManagerId || 'GTM-KMQ9LRH8';
export const GA_MEASUREMENT_ID = SITE_CONFIG.googleAnalyticsId;

export type AnalyticsEventName =
  | 'calculator_started'
  | 'calculator_completed'
  | 'country_selected'
  | 'category_selected'
  | 'advanced_options_opened'
  | 'profit_calculated'
  | 'break_even_calculated'
  | 'copy_result'
  | 'share_result'
  | 'download_result'
  | 'embed_clicked'
  | 'source_clicked'
  | 'article_cta_clicked'
  | 'form_submission';

/**
 * Tracks custom user interactions and conversions via Google Tag Manager dataLayer with non-PII guarantee
 */
export function trackEvent(eventName: AnalyticsEventName | string, properties: Record<string, unknown> = {}): void {
  trackGtmCustomEvent(eventName, properties);
}

/**
 * Tracks route navigation / virtual page views for Single Page Application via GTM dataLayer
 */
export function trackPageView(path?: string, title?: string, extraMetadata?: Record<string, unknown>): void {
  trackGtmPageView(path, title, extraMetadata);
}

/**
 * Tracks form submissions securely into GTM dataLayer without PII
 */
export function trackFormSubmission(options: FormTrackingOptions): void {
  trackGtmFormSubmit(options);
}



