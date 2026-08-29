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
  if (pathname.toLowerCase().startsWith(BASE_PATH.toLowerCase())) {
    return pathname.slice(0, BASE_PATH.length);
  }
  return '';
}

/**
 * Normalizes a full browser path by stripping the base path prefix,
 * removing trailing slashes, stripping hash/query, and handling lowercased paths.
 */
export function normalizePath(fullPath: string): string {
  if (!fullPath) return '/';
  
  // Strip query string and hash if present
  let normalized = fullPath.split('?')[0].split('#')[0];

  const basePath = getAppBasePath();
  if (basePath && normalized.toLowerCase().startsWith(basePath.toLowerCase())) {
    normalized = normalized.slice(basePath.length);
  }
  
  if (!normalized || normalized === '') {
    return '/';
  }
  
  // Remove duplicate consecutive slashes
  normalized = normalized.replace(/\/+/g, '/');
  
  // Strip trailing slash unless root
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  
  // For standard non-article paths, normalize lowercase
  if (!normalized.startsWith('/articles/')) {
    normalized = normalized.toLowerCase();
  }
  
  return normalized || '/';
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
    if (typeof window === 'undefined' || !path) return;

    const trimmed = path.trim();

    // Block dangerous pseudo-protocols like javascript:, data:, vbscript:
    if (/^(javascript|data|vbscript):/i.test(trimmed)) {
      console.warn('Blocked navigation to unsafe URI scheme');
      return;
    }

    // External URLs
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:')) {
      window.location.href = trimmed;
      return;
    }

    const normalizedPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
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

