import React, { useState, useEffect } from 'react';
import { Calculator, ArrowUp, Compass, Globe } from 'lucide-react';

export const FloatingNavAid: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating navigation after scrolling past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const prefersReducedMotion = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  };

  const getScrollBehavior = (): ScrollBehavior => {
    return prefersReducedMotion() ? 'auto' : 'smooth';
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: getScrollBehavior(),
    });
  };

  if (!isVisible) return null;

  return (
    <nav
      id="floating-navigation-aid"
      className="floating-nav-dock"
      aria-label="Quick Page Navigation"
    >
      <div className="floating-nav-inner">
        <button
          type="button"
          id="btn-nav-to-calculator"
          className="floating-nav-item"
          onClick={() => scrollToSection('main-calculator-section')}
          title="Jump to eBay Fee & Profit Calculator"
          aria-label="Jump to Calculator"
        >
          <Calculator size={15} aria-hidden="true" />
          <span className="floating-nav-text">Calculator</span>
        </button>

        <button
          type="button"
          id="btn-nav-to-tools"
          className="floating-nav-item"
          onClick={() => scrollToSection('pricing-tools-section')}
          title="Jump to Break-Even & Pricing Solvers"
          aria-label="Jump to Tools & Solvers"
        >
          <Compass size={15} aria-hidden="true" />
          <span className="floating-nav-text">Tools & Solvers</span>
        </button>

        <button
          type="button"
          id="btn-nav-to-markets"
          className="floating-nav-item"
          onClick={() => scrollToSection('international-marketplaces-section')}
          title="Jump to 8 Global Marketplaces"
          aria-label="Jump to Marketplaces"
        >
          <Globe size={15} aria-hidden="true" />
          <span className="floating-nav-text">Marketplaces</span>
        </button>

        <div className="floating-nav-divider" aria-hidden="true" />

        <button
          type="button"
          id="btn-nav-to-top"
          className="floating-nav-item floating-nav-top"
          onClick={scrollToTop}
          title="Scroll back to top of page"
          aria-label="Back to Top"
        >
          <ArrowUp size={15} aria-hidden="true" />
          <span className="floating-nav-text">Top</span>
        </button>
      </div>
    </nav>
  );
};
