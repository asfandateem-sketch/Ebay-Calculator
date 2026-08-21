import { useEffect, useCallback } from 'react';
import {
  initDataLayer,
  pushToDataLayer,
  trackGtmPageView,
  trackGtmFormSubmit,
  trackGtmCustomEvent,
  FormTrackingOptions,
  GTM_ID,
} from '../utils/gtm';

export interface UseGTMReturn {
  gtmId: string;
  trackPageView: (pagePath?: string, pageTitle?: string, extraMetadata?: Record<string, unknown>) => void;
  trackFormSubmit: (options: FormTrackingOptions) => void;
  trackEvent: (eventName: string, parameters?: Record<string, unknown>) => void;
  pushData: (payload: Record<string, unknown>) => void;
}

/**
 * Custom React hook to interact with Google Tag Manager dataLayer with full PII sanitization
 */
export function useGTM(): UseGTMReturn {
  useEffect(() => {
    initDataLayer();
  }, []);

  const trackPageView = useCallback(
    (pagePath?: string, pageTitle?: string, extraMetadata?: Record<string, unknown>) => {
      trackGtmPageView(pagePath, pageTitle, extraMetadata);
    },
    []
  );

  const trackFormSubmit = useCallback((options: FormTrackingOptions) => {
    trackGtmFormSubmit(options);
  }, []);

  const trackEvent = useCallback((eventName: string, parameters?: Record<string, unknown>) => {
    trackGtmCustomEvent(eventName, parameters);
  }, []);

  const pushData = useCallback((payload: Record<string, unknown>) => {
    pushToDataLayer(payload);
  }, []);

  return {
    gtmId: GTM_ID,
    trackPageView,
    trackFormSubmit,
    trackEvent,
    pushData,
  };
}
