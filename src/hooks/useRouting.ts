import { useCallback, useEffect, useState } from 'react';
import { SITE_CONFIG } from '../config/site';

export const BASE_PATH = '/Ebay-Calculator';

/**
 * Returns the detected base path (e.g. '/Ebay-Calculator' or '')
 */
export function getAppBasePath(): string {
  if (typeof window === 'undefined') return BASE_PATH;
  const pathname = window.location.pathname;
  if (pathname.startsWith(BASE_PATH)) {
    return BASE_PATH;
  }
  return '';
}

/**
 * Normalizes a full browser path by stripping the base path prefix
 */
export function normalizePath(fullPath: string): string {
  const basePath = getAppBasePath();
  let normalized = fullPath;
  if (basePath && normalized.startsWith(basePath)) {
    normalized = normalized.slice(basePath.length);
  }
  if (!normalized || normalized === '') {
    normalized = '/';
  }
  // Remove duplicate slashes if any
  normalized = normalized.replace(/\/+/g, '/');
  return normalized;
}

/**
 * Transforms an internal route path (e.g. '/ebay-fee-calculator')
 * into the full path with the base path prefix (e.g. '/Ebay-Calculator/ebay-fee-calculator')
 */
export function formatHref(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/') {
    return `${BASE_PATH}/`;
  }
  return `${BASE_PATH}${cleanPath}`;
}

/**
 * Generates an absolute canonical URL for SEO
 */
export function getCanonicalUrl(path: string): string {
  const normalized = normalizePath(path);
  const cleanPath = normalized.startsWith('/') ? normalized.slice(1) : normalized;
  const baseUrl = SITE_CONFIG.url.replace(/\/+$/, '');
  if (!cleanPath) return `${baseUrl}/`;
  return `${baseUrl}/${cleanPath}`;
}

export function useRouting() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  const [currentSearch, setCurrentSearch] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.search || '';
    }
    return '';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      setCurrentSearch(window.location.search || '');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = useCallback((path: string, replace = false) => {
    if (typeof window === 'undefined') return;

    // External URLs
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:')) {
      window.location.href = path;
      return;
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const fullHref = formatHref(normalizedPath);

    if (replace) {
      window.history.replaceState({}, '', fullHref);
    } else {
      window.history.pushState({}, '', fullHref);
    }

    setCurrentPath(normalizePath(window.location.pathname));
    setCurrentSearch(window.location.search || '');

    window.dispatchEvent(new PopStateEvent('popstate'));

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return {
    currentPath,
    currentSearch,
    navigate,
    formatHref,
  };
}

