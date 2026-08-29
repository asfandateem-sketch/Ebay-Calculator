import React, { useState, useEffect } from 'react';
import { Globe, Menu, ChevronDown, Check } from 'lucide-react';
import { Logo } from './Logo';
import { NavMenuModal } from './NavMenuModal';
import { RouterLink } from '../RouterLink';
import { useRouting } from '../../hooks/useRouting';
import { CountryFlag } from '../CountrySelector/CountryFlag';

interface NavbarProps {
  onNavigate: (path: string) => void;
}

export const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', path: '/us', currency: 'USD ($)' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', path: '/uk', currency: 'GBP (£)' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', path: '/ca', currency: 'CAD (CA$)' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', path: '/au', currency: 'AUD (A$)' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', path: '/de', currency: 'EUR (€)' },
  { code: 'FR', name: 'France', flag: '🇫🇷', path: '/fr', currency: 'EUR (€)' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', path: '/it', currency: 'EUR (€)' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', path: '/es', currency: 'EUR (€)' },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const { currentPath } = useRouting();

  // Determine if a specific country page is active
  const activeCountry = COUNTRIES.find((c) => currentPath === c.path);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldBeScrolled = window.scrollY > 15;
          setIsScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close country dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#nav-country-dropdown-container')) {
        setIsCountryDropdownOpen(false);
      }
    };
    if (isCountryDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isCountryDropdownOpen]);

  return (
    <>
      <header
        id="main-navbar"
        className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}
      >
        <div className="navbar-inner">
          {/* Left: Brand Logo */}
          <div className="navbar-brand-container">
            <Logo onClick={() => onNavigate('/')} />
          </div>

          {/* Center: Desktop Quick Calculator Links */}
          <nav className="navbar-center-nav" aria-label="Quick Navigation">
            <RouterLink
              id="nav-quick-fee"
              to="/ebay-fee-calculator"
              className="nav-tag-pill"
            >
              Fee Calculator
            </RouterLink>
            <RouterLink
              id="nav-quick-profit"
              to="/ebay-profit-calculator"
              className="nav-tag-pill"
            >
              Profit & Margins
            </RouterLink>
            <RouterLink
              id="nav-quick-breakeven"
              to="/ebay-break-even-calculator"
              className="nav-tag-pill"
            >
              Break-Even
            </RouterLink>
            <RouterLink
              id="nav-quick-ecom"
              to="/ecommerce-investment-profit-calculator"
              className="nav-tag-pill"
            >
              Investment P&L
            </RouterLink>
            <RouterLink
              id="nav-quick-contact"
              to="/contact"
              className="nav-tag-pill"
            >
              Contact
            </RouterLink>
          </nav>

          {/* Right: 8 International Markets with Flags + Menu Button */}
          <div className="navbar-actions">
            {/* Country Selector Dropdown with International Flags */}
            <div id="nav-country-dropdown-container" className="nav-country-dropdown-wrap">
              <button
                type="button"
                id="btn-navbar-country-toggle"
                className="nav-country-btn"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                aria-expanded={isCountryDropdownOpen}
                aria-label="Select International Marketplace (8 countries supported)"
                title="Select international marketplace (8 countries supported)"
              >
                <span className="nav-country-label">8 Markets</span>
                <ChevronDown size={14} className={`nav-country-chevron ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Country Dropdown Menu with all 8 countries, flags, names & currencies */}
              {isCountryDropdownOpen && (
                <div className="nav-country-dropdown-menu" role="menu" aria-label="International Marketplaces">
                  <div className="nav-dropdown-header">
                    <span>8 International Marketplaces (2026 Rules)</span>
                  </div>
                  <div className="nav-dropdown-grid">
                    {COUNTRIES.map((c) => {
                      const isActive = currentPath === c.path;
                      return (
                        <button
                          key={c.code}
                          type="button"
                          id={`dropdown-country-${c.code.toLowerCase()}`}
                          role="menuitem"
                          className={`nav-country-option ${isActive ? 'active' : ''}`}
                          onClick={() => {
                            setIsCountryDropdownOpen(false);
                            onNavigate(c.path);
                          }}
                        >
                          <div className="country-option-name-row">
                            <CountryFlag code={c.code} width={18} height={13} ariaLabel={`${c.name} flag`} />
                            <span className="country-option-name">{c.name}</span>
                          </div>
                          <div className="country-option-meta-row">
                            <span className="country-option-currency">{c.currency}</span>
                            {isActive && <Check size={14} className="country-option-check" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="nav-dropdown-footer">
                    <RouterLink
                      to="/ebay-fee-comparison"
                      className="nav-dropdown-footer-link"
                      onClick={() => setIsCountryDropdownOpen(false)}
                    >
                      <Globe size={13} />
                      <span>Compare All 8 Markets Matrix</span>
                    </RouterLink>
                  </div>
                </div>
              )}
            </div>

            {/* Menu Trigger Button */}
            <button
              id="navbar-menu-btn"
              type="button"
              className="nav-menu-btn"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={isMenuOpen}
            >
              <div className="nav-menu-icon-circle">
                <Menu size={16} className="nav-menu-icon-svg" />
              </div>
              <span className="nav-menu-text">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Navigation Drawer / Modal */}
      <NavMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={(path) => {
          setIsMenuOpen(false);
          onNavigate(path);
        }}
      />
    </>
  );
};
