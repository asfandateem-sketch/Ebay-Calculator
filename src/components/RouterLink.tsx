import React from 'react';

interface RouterLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

const BASE_PATH = '/Ebay-Calculator';

export function RouterLink({
  to,
  children,
  onClick,
  ...props
}: RouterLinkProps) {
  const normalizedPath = to.startsWith('/') ? to : `/${to}`;

  const href =
    normalizedPath === '/'
      ? `${BASE_PATH}/`
      : `${BASE_PATH}${normalizedPath}`;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow browser's normal behavior for new tabs,
    // middle-click, Ctrl/Cmd-click, etc.
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();

    window.history.pushState({}, '', href);

    window.dispatchEvent(new PopStateEvent('popstate'));

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    onClick?.(event);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
