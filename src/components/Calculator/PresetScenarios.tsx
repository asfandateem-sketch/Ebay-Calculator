import React from 'react';
import { CalculatorInputs, CountryCode } from '../../types';
import { Sparkles } from 'lucide-react';

interface PresetScenariosProps {
  onSelectPreset: (preset: Partial<CalculatorInputs>) => void;
  currentCountry: CountryCode;
}

export const PresetScenarios: React.FC<PresetScenariosProps> = ({ onSelectPreset, currentCountry }) => {
  const presets = [
    {
      label: '👟 $250 Sneaker Flip',
      data: {
        soldPrice: 250,
        shippingCharged: 12,
        itemCost: 140,
        shippingCost: 10.5,
        otherCosts: 2,
        promotedListingRate: 3,
      },
    },
    {
      label: '🎮 $65 Video Game',
      data: {
        soldPrice: 65,
        shippingCharged: 4.5,
        itemCost: 18,
        shippingCost: 4.2,
        otherCosts: 1,
        promotedListingRate: 0,
      },
    },
    {
      label: '⌚ $850 Luxury Watch',
      data: {
        soldPrice: 850,
        shippingCharged: 25,
        itemCost: 480,
        shippingCost: 22,
        otherCosts: 5,
        promotedListingRate: 2,
      },
    },
    {
      label: '👕 $35 Vintage Thrift',
      data: {
        soldPrice: 35,
        shippingCharged: 6,
        itemCost: 5,
        shippingCost: 5.5,
        otherCosts: 0.8,
        promotedListingRate: 2.5,
      },
    },
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
        <Sparkles size={14} style={{ color: 'var(--color-text-accent)' }} />
        <span>Quick Scenario Presets:</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            className="nav-tag-pill"
            onClick={() => onSelectPreset(preset.data)}
            style={{ fontSize: '12px', padding: '6px 12px', cursor: 'pointer' }}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
};
