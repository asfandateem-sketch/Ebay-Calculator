import { useEffect, useRef } from 'react';
import { trackGtmPageView } from '../utils/gtm';
import { SITE_CONFIG } from '../config/site';

/**
 * Automatically tracks page-view events into Google Tag Manager dataLayer on route changes
 */
export function useGTMRouteTracker(currentPath: string): void {
  const isFirstMount = useRef(true);
  const prevPathRef = useRef(currentPath);

  useEffect(() => {
    // Determine route name / title
    const pageTitle = document.title || SITE_CONFIG.name;
    const pagePath = currentPath || window.location.pathname;

    if (isFirstMount.current) {
      isFirstMount.current = false;
      trackGtmPageView(pagePath, pageTitle, {
        navigation_type: 'initial_load',
      });
      return;
    }

    if (prevPathRef.current !== currentPath) {
      prevPathRef.current = currentPath;
      trackGtmPageView(pagePath, pageTitle, {
        navigation_type: 'spa_navigation',
      });
    }
  }, [currentPath]);
}

