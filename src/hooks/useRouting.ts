import { useState, useEffect, useCallback } from 'react';

export function useRouting() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
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
      setCurrentPath(window.location.pathname || '/');
      setCurrentSearch(window.location.search || '');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, replace = false) => {
    if (typeof window !== 'undefined') {
      const url = new URL(to, window.location.origin);
      if (replace) {
        window.history.replaceState({}, '', url.pathname + url.search);
      } else {
        window.history.pushState({}, '', url.pathname + url.search);
      }
      setCurrentPath(url.pathname);
      setCurrentSearch(url.search);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return { currentPath, currentSearch, navigate };
}
