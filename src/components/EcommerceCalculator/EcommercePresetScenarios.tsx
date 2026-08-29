import React from 'react';
import { ECOMMERCE_PRESETS, EcommercePreset } from '../../hooks/useEcommerceCalculator';
import { Sparkles } from 'lucide-react';

interface Props {
  onSelectPreset: (preset: EcommercePreset) => void;
}

export const EcommercePresetScenarios: React.FC<Props> = ({ onSelectPreset }) => {
  return (
    <div className="preset-scenarios-container" style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
        <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Industry Model Presets
        </span>
      </div>
      <div className="preset-scenarios-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {ECOMMERCE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelectPreset(preset)}
            className="preset-btn"
            style={{
              padding: '12px 14px',
              backgroundColor: 'var(--color-soft-gray)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)' }}>{preset.name}</span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  padding: '2px 6px',
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-pill)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {preset.badge}
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.4 }}>
              {preset.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
