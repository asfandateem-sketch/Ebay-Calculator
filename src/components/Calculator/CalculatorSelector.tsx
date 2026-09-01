import React from 'react';
import { ALL_CALCULATORS } from '../../config/calculators';
import { useRouting } from '../../hooks/useRouting';

interface CalculatorSelectorProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const CalculatorSelector: React.FC<CalculatorSelectorProps> = ({
  currentPath: propCurrentPath,
  onNavigate,
  className = '',
  style,
}) => {
  const { currentPath: hookCurrentPath, navigate } = useRouting();
  const activePath = propCurrentPath || hookCurrentPath || '/';

  // Group calculators by category for a structured, professional dropdown
  const coreCalcs = ALL_CALCULATORS.filter((c) => c.category === 'core');
  const pricingCalcs = ALL_CALCULATORS.filter((c) => c.category === 'pricing');
  const profitCalcs = ALL_CALCULATORS.filter((c) => c.category === 'profit');
  const marketCalcs = ALL_CALCULATORS.filter((c) => c.category === 'marketplace');

  // Match the currently active calculator or find if an alias matches
  const matchedCalc = ALL_CALCULATORS.find(
    (c) => c.path === activePath || c.aliases.includes(activePath)
  );

  const selectedValue = matchedCalc ? matchedCalc.path : activePath;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetPath = e.target.value;
    if (onNavigate) {
      onNavigate(targetPath);
    } else {
      navigate(targetPath);
    }
  };

  return (
    <div className={`calculator-selector-wrap ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', ...style }}>
      <label htmlFor="global-calculator-select" className="form-label" style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: 'var(--color-text-title)', whiteSpace: 'nowrap' }}>
        Calculator:
      </label>
      <select
        id="global-calculator-select"
        className="form-select"
        style={{
          height: '36px',
          width: 'auto',
          minWidth: '220px',
          maxWidth: '280px',
          paddingRight: '28px',
          fontSize: '13px',
          fontWeight: 500,
          backgroundColor: 'var(--color-white)',
          borderColor: 'var(--color-border)',
          cursor: 'pointer',
        }}
        value={selectedValue}
        onChange={handleChange}
        aria-label="Select Financial Calculator Engine"
      >
        <optgroup label="Core Profit & Margins">
          {coreCalcs.map((calc) => (
            <option key={calc.id} value={calc.path}>
              {calc.name}
            </option>
          ))}
        </optgroup>

        {profitCalcs.length > 0 && (
          <optgroup label="Profit & Investment">
            {profitCalcs.map((calc) => (
              <option key={calc.id} value={calc.path}>
                {calc.name}
              </option>
            ))}
          </optgroup>
        )}

        <optgroup label="Pricing & Solvers">
          {pricingCalcs.map((calc) => (
            <option key={calc.id} value={calc.path}>
              {calc.name}
            </option>
          ))}
        </optgroup>

        <optgroup label="Marketplace Fees & Research">
          {marketCalcs.map((calc) => (
            <option key={calc.id} value={calc.path}>
              {calc.name}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};
