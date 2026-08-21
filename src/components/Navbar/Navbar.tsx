import React, { useState, useEffect } from 'react';
import { Plus, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { NavMenuModal } from './NavMenuModal';

interface NavbarProps {
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
        {/* Left Section: Menu button */}
        <div className="navbar-left">
          <button
            id="navbar-menu-btn"
            type="button"
            className="nav-menu-btn"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <div className="nav-menu-icon-circle">
              <Plus size={16} />
            </div>
            <span>Menu</span>
          </button>
        </div>

        {/* Center Section: Brand Logo */}
        <div className="navbar-center">
          <Logo onClick={() => onNavigate('/')} />
        </div>

        {/* Right Section: Tags */}
        <div className="navbar-right">
          <div className="nav-tags-group">
            <button
              type="button"
              className="nav-tag-pill"
              onClick={() => onNavigate('/ebay-fee-calculator')}
            >
              Fee Calculator
            </button>
            <button
              type="button"
              className="nav-tag-pill"
              onClick={() => onNavigate('/ebay-profit-calculator')}
            >
              Profit & Margins
            </button>
            <button
              type="button"
              className="nav-tag-pill"
              onClick={() => onNavigate('/ebay-break-even-calculator')}
            >
              Break-Even
            </button>
          </div>
          <button
            type="button"
            className="nav-right-pill"
            onClick={() => onNavigate('/global-matrix')}
          >
            <span>8 Countries</span>
            <div className="nav-right-circle-btn">
              <Globe size={13} />
            </div>
          </button>
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
