import React from 'react';
import { formatHref, normalizePath, useRouting } from '../hooks/useRouting';

export interface RouterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children?: React.ReactNode;
  activeClassName?: string;
  ariaLabel?: string;
}

export const RouterLink: React.FC<RouterLinkProps> = ({
  to,
  children,
  className = '',
  activeClassName = 'active',
  onClick,
  ariaLabel,
  target,
  rel,
  ...props
}) => {
  const { currentPath, navigate } = useRouting();
  const isUnsafeScheme = /^(javascript|data|vbscript):/i.test(to.trim());
  const isExternal = to.startsWith('http://') || to.startsWith('https://') || to.startsWith('mailto:');
  const normalizedTarget = isUnsafeScheme ? '/' : normalizePath(to);
  const isActive = !isExternal && !isUnsafeScheme && (currentPath === normalizedTarget || (normalizedTarget !== '/' && currentPath.startsWith(normalizedTarget)));
  const combinedClassName = `${className} ${isActive && activeClassName ? activeClassName : ''}`.trim();
  const href = isUnsafeScheme ? '#' : isExternal ? to : formatHref(to);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isUnsafeScheme) {
      event.preventDefault();
      return;
    }

    // Allow browser's normal behavior for new tabs,
    // middle-click, Ctrl/Cmd-click, etc.
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0 ||
      isExternal ||
      target === '_blank'
    ) {
      onClick?.(event);
      return;
    }

    event.preventDefault();
    navigate(to);
    onClick?.(event);
  };

  return (
    <a
      href={href}
      className={combinedClassName}
      onClick={handleClick}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      target={target}
      rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
      {...props}
    >
      {children}
    </a>
  );
};

