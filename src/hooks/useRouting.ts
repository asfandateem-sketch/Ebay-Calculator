import { useCallback, useEffect, useState } from 'react';

const BASE_PATH = '/Ebay-Calculator';

function getAppPath(): string {
  const pathname = window.location.pathname;

  // Remove GitHub Pages repository base path
  if (pathname === BASE_PATH || pathname === `${BASE_PATH}/`) {
    return '/';
  }

  if (pathname.startsWith(`${BASE_PATH}/`)) {
    const appPath = pathname.slice(BASE_PATH.length);
    return appPath || '/';
  }

  // Local development / custom domain
  return pathname || '/';
}

export function useRouting() {
  const [currentPath, setCurrentPath] = useState<string>(getAppPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getAppPath());
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = useCallback((path: string) => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    const fullPath =
      normalizedPath === '/'
        ? `${BASE_PATH}/`
        : `${BASE_PATH}${normalizedPath}`;

    window.history.pushState({}, '', fullPath);
    setCurrentPath(normalizedPath);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return {
    currentPath,
    navigate,
  };
}
