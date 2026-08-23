import React, { useState, useEffect } from 'react';
import { Plus, Globe, Menu } from 'lucide-react';
import { Logo } from './Logo';
import { NavMenuModal } from './NavMenuModal';
import { RouterLink } from '../RouterLink';

interface NavbarProps {
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="main-navbar"
        className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}
      >
        <div className="navbar-inner container">
          {/* Left: Brand Logo (Always visible on mobile & desktop) */}
          <div className="navbar-brand-container">
            <Logo onClick={() => onNavigate('/')} />
          </div>

          {/* Center: Desktop Quick Calculator Links (Hidden on mobile) */}
          <nav className="navbar-center-nav" aria-label="Quick Calculators">
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
              id="nav-quick-contact"
              to="/contact"
              className="nav-tag-pill"
            >
              Contact
            </RouterLink>
          </nav>

          {/* Right: Country Hub & Menu Button */}
          <div className="navbar-actions">
            {/* Country indicator (Desktop only) */}
            <RouterLink
              id="nav-country-pill"
              to="/ebay-fee-comparison"
              className="nav-country-btn"
              title="Compare 8 international marketplace fee schedules"
            >
              <span>8 Countries</span>
              <div className="nav-country-icon">
                <Globe size={13} />
              </div>
            </RouterLink>

            {/* Menu Trigger Button (Always visible) */}
            <button
              id="navbar-menu-btn"
              type="button"
              className="nav-menu-btn"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={isMenuOpen}
            >
              <div className="nav-menu-icon-circle">
                <Menu size={16} className="nav-menu-icon-bars" />
                <Plus size={16} className="nav-menu-icon-plus" />
              </div>
              <span className="nav-menu-text">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Modal / Drawer */}
      <NavMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};
