import { SITE_CONFIG } from '../config/site';

export const GTM_ID = SITE_CONFIG.tagManagerId || 'GTM-KMQ9LRH8';

/**
 * Known PII keys that must be scrubbed before passing to Google Tag Manager dataLayer
 */
const PII_KEY_REGEX =
  /(email|mail|e-mail|name|first_name|firstname|last_name|lastname|fullname|phone|telephone|mobile|cell|address|street|zip|postal|ssn|tax_id|password|pass|secret|credit_card|card_num|cardnumber|cvv|ip_address|ipaddress|user_id|userid|token)/i;

/**
 * Pattern detectors for string values containing PII
 */
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_REGEX = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const CREDIT_CARD_REGEX = /\b(?:\d[ -]*?){13,16}\b/;

/**
 * Deeply sanitizes an object or value to ensure NO personally identifiable information (PII)
 * is sent to Google Tag Manager or Google Analytics 4.
 */
export function sanitizeNonPII<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  // Primitive strings: check for embedded emails, phone numbers, or card numbers
  if (typeof data === 'string') {
    if (EMAIL_REGEX.test(data) || PHONE_REGEX.test(data) || CREDIT_CARD_REGEX.test(data)) {
      return '[REDACTED_PII]' as unknown as T;
    }
    return data;
  }

  // Numbers, booleans, symbols
  if (typeof data !== 'object') {
    return data;
  }

  // Arrays
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeNonPII(item)) as unknown as T;
  }

  // Plain objects
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    // If the key name itself matches a PII identifier, omit it
    if (PII_KEY_REGEX.test(key)) {
      sanitized[key] = '[REDACTED_PII]';
      continue;
    }

    sanitized[key] = sanitizeNonPII(value);
  }

  return sanitized as T;
}

export interface GTMDataLayerWindow extends Window {
  dataLayer?: Array<Record<string, unknown>>;
}

/**
 * Initializes and retrieves the Google Tag Manager dataLayer array safely
 */
export function initDataLayer(): Array<Record<string, unknown>> {
  if (typeof window === 'undefined') {
    return [];
  }

  const win = window as GTMDataLayerWindow;
  if (!Array.isArray(win.dataLayer)) {
    win.dataLayer = [];
  }

  return win.dataLayer;
}

/**
 * Pushes an event object safely to window.dataLayer
 */
export function pushToDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  const dataLayer = initDataLayer();
  const sanitizedPayload = sanitizeNonPII(payload);

  dataLayer.push({
    timestamp: new Date().toISOString(),
    ...sanitizedPayload,
  });
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a sanitized event to Google Analytics 4 (gtag.js)
 */
export function sendToGA4(
  eventName: string,
  parameters: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined') return;

  const sanitizedParams = sanitizeNonPII(parameters);

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, sanitizedParams);
  }
}

let lastTrackedPath = '';
let lastTrackedTime = 0;

/**
 * Tracks a Single Page Application (SPA) Virtual Page View in GTM & GA4 with deduplication
 */
export function trackGtmPageView(
  pagePath?: string,
  pageTitle?: string,
  extraMetadata: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined') return;

  const path = pagePath || (window.location.pathname + window.location.search);
  const title = pageTitle || document.title;
  const location = window.location.href;
  const now = Date.now();

  // Deduplicate rapid duplicate calls for the exact same path within 300ms
  if (path === lastTrackedPath && (now - lastTrackedTime) < 300) {
    return;
  }

  lastTrackedPath = path;
  lastTrackedTime = now;

  const pageViewPayload = {
    page_path: path,
    page_title: title,
    page_location: location,
    ...extraMetadata,
  };

  // 1. Send page_view to GA4 via gtag
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', pageViewPayload);
  }

  // 2. Push page_view to GTM dataLayer
  pushToDataLayer({
    event: 'page_view',
    ...pageViewPayload,
  });
}

export interface FormTrackingOptions {
  formId: string;
  formName: string;
  formType?: 'calculator' | 'search' | 'filter' | 'export' | 'download' | 'contact' | 'custom';
  status?: 'attempt' | 'success' | 'failure';
  nonPiiFields?: Record<string, unknown>;
  stepIndex?: number;
  totalSteps?: number;
}

/**
 * Tracks form submissions securely into GTM dataLayer without PII
 */
export function trackGtmFormSubmit({
  formId,
  formName,
  formType = 'calculator',
  status = 'success',
  nonPiiFields = {},
  stepIndex,
  totalSteps,
}: FormTrackingOptions): void {
  pushToDataLayer({
    event: 'form_submission',
    form_id: formId,
    form_name: formName,
    form_type: formType,
    submission_status: status,
    step_index: stepIndex,
    total_steps: totalSteps,
    ...nonPiiFields,
  });
}

/**
 * Generic GTM and GA4 custom event dispatcher with automatic non-PII filtering
 */
export function trackGtmCustomEvent(
  eventName: string,
  parameters: Record<string, unknown> = {}
): void {
  // 1. Send directly to GA4
  sendToGA4(eventName, parameters);

  // 2. Push to GTM dataLayer
  pushToDataLayer({
    event: eventName,
    ...parameters,
  });
}
