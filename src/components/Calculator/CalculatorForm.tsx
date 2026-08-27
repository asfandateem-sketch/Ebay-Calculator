import React, { useState } from 'react';
import { CalculatorInputs, CountryCode } from '../../types';
import { getCountryConfig, allCountryCodes } from '../../data/fee-rules';
import { ChevronDown, ChevronUp, Sliders, Globe, DollarSign, Percent, ShieldCheck } from 'lucide-react';
import { PresetScenarios } from './PresetScenarios';
import { useGTM } from '../../hooks/useGTM';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onUpdateInput: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
  onSetInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  inputs,
  onUpdateInput,
  onSetInputs,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const countryConfig = getCountryConfig(inputs.country);
  const currencySymbol = countryConfig.currency.symbol;
  const { trackFormSubmit } = useGTM();

  const handlePresetSelect = (preset: Partial<CalculatorInputs>) => {
    trackFormSubmit({
      formId: 'form-calculator-preset',
      formName: 'eBay Preset Scenario Selection',
      formType: 'calculator',
      status: 'success',
      nonPiiFields: {
        country: inputs.country,
        category_id: preset.categoryId || inputs.categoryId,
        preset_action: 'applied',
      },
    });

    onSetInputs((prev) => ({
      ...prev,
      ...preset,
    }));
  };

  return (
    <div id="calculator-form-container" className="calc-card">
      <div className="calc-card-header">
        <div className="calc-title-badge">
          <span style={{ fontSize: '20px' }}>{countryConfig.flag}</span>
          <div>
            <h2 className="calc-title">Listing & Cost Parameters</h2>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Official eBay {countryConfig.name} ({countryConfig.domain}) Fee Schedule
            </p>
          </div>
        </div>

        {/* Quick Country Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label htmlFor="country-select" className="form-label" style={{ margin: 0, fontSize: '12px' }}>
            Region:
          </label>
          <select
            id="country-select"
            className="form-select"
            style={{ height: '36px', width: 'auto', paddingRight: '28px', fontSize: '13px' }}
            value={inputs.country}
            onChange={(e) => onUpdateInput('country', e.target.value as CountryCode)}
          >
            {allCountryCodes.map((code) => {
              const cfg = getCountryConfig(code);
              return (
                <option key={code} value={code}>
                  {cfg.flag} {cfg.name} ({cfg.currency.code})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Quick Preset Buttons */}
      <PresetScenarios
        onSelectPreset={handlePresetSelect}
        currentCountry={inputs.country}
      />

      {/* Category Selection */}
      <div className="form-group">
        <label htmlFor="category-select" className="form-label">
          Product Category
          <span className="form-label-hint">Determines Final Value Fee tier</span>
        </label>
        <select
          id="category-select"
          className="form-select"
          value={inputs.categoryId}
          onChange={(e) => onUpdateInput('categoryId', e.target.value)}
        >
          {countryConfig.categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({Math.round(cat.standardRate * 1000) / 10}%)
            </option>
          ))}
        </select>
      </div>

      {/* Price & Shipping Charged */}
      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="input-sold-price" className="form-label">
            Item Sold Price
          </label>
          <div className="input-with-adornment">
            <span className="input-adornment-prefix">{currencySymbol}</span>
            <input
              id="input-sold-price"
              type="number"
              min="0"
              step="0.01"
              className="form-input has-prefix"
              placeholder="0.00"
              value={inputs.soldPrice === 0 ? '' : inputs.soldPrice}
              onChange={(e) => onUpdateInput('soldPrice', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="input-shipping-charged" className="form-label">
            Shipping Charged to Buyer
            <span className="form-label-hint">($0 for Free Shipping)</span>
          </label>
          <div className="input-with-adornment">
            <span className="input-adornment-prefix">{currencySymbol}</span>
            <input
              id="input-shipping-charged"
              type="number"
              min="0"
              step="0.01"
              className="form-input has-prefix"
              placeholder="0.00"
              value={inputs.shippingCharged === 0 ? '' : inputs.shippingCharged}
              onChange={(e) => onUpdateInput('shippingCharged', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      {/* Direct Product & Shipping Costs */}
      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="input-item-cost" className="form-label">
            Item Purchase / Wholesale Cost
            <span className="form-label-hint">(COGS)</span>
          </label>
          <div className="input-with-adornment">
            <span className="input-adornment-prefix">{currencySymbol}</span>
            <input
              id="input-item-cost"
              type="number"
              min="0"
              step="0.01"
              className="form-input has-prefix"
              placeholder="0.00"
              value={inputs.itemCost === 0 ? '' : inputs.itemCost}
              onChange={(e) => onUpdateInput('itemCost', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="input-shipping-cost" className="form-label">
            Actual Shipping Label Cost
            <span className="form-label-hint">(What you pay carrier)</span>
          </label>
          <div className="input-with-adornment">
            <span className="input-adornment-prefix">{currencySymbol}</span>
            <input
              id="input-shipping-cost"
              type="number"
              min="0"
              step="0.01"
              className="form-input has-prefix"
              placeholder="0.00"
              value={inputs.shippingCost === 0 ? '' : inputs.shippingCost}
              onChange={(e) => onUpdateInput('shippingCost', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      {/* Quantity & Other Direct Costs */}
      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="input-other-costs" className="form-label">
            Packaging & Other Costs
            <span className="form-label-hint">(Boxes, poly mailers, labels)</span>
          </label>
          <div className="input-with-adornment">
            <span className="input-adornment-prefix">{currencySymbol}</span>
            <input
              id="input-other-costs"
              type="number"
              min="0"
              step="0.01"
              className="form-input has-prefix"
              placeholder="0.00"
              value={inputs.otherCosts === 0 ? '' : inputs.otherCosts}
              onChange={(e) => onUpdateInput('otherCosts', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="input-quantity-sold" className="form-label">
            Quantity Sold
          </label>
          <input
            id="input-quantity-sold"
            type="number"
            min="1"
            step="1"
            className="form-input"
            value={inputs.quantitySold}
            onChange={(e) => onUpdateInput('quantitySold', Math.max(1, parseInt(e.target.value, 10) || 1))}
          />
        </div>
      </div>

      {/* Progressive Disclosure: Advanced Settings */}
      <div className="expandable-section">
        <button
          id="btn-toggle-advanced-calc"
          type="button"
          className="expandable-toggle-btn"
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-expanded={showAdvanced}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={16} />
            <span>Advanced Seller Options (Store, Promoted Ads, VAT, Top Rated)</span>
          </span>
          {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showAdvanced && (
          <div className="expandable-content">
            <div className="form-grid-2">
              {/* Seller Level */}
              <div className="form-group">
                <label htmlFor="select-seller-level" className="form-label">
                  Seller Status / Level
                </label>
                <select
                  id="select-seller-level"
                  className="form-select"
                  value={inputs.sellerLevel}
                  onChange={(e) => onUpdateInput('sellerLevel', e.target.value as CalculatorInputs['sellerLevel'])}
                >
                  <option value="standard">Standard Seller</option>
                  <option value="top_rated">Top Rated Plus (10% FVF Discount)</option>
                  <option value="below_standard">Below Standard (+5% FVF Penalty)</option>
                </select>
              </div>

              {/* Store Subscription */}
              <div className="form-group">
                <label htmlFor="select-store-subscription" className="form-label">
                  eBay Store Subscription
                </label>
                <select
                  id="select-store-subscription"
                  className="form-select"
                  value={inputs.storeSubscription}
                  onChange={(e) => onUpdateInput('storeSubscription', e.target.value as CalculatorInputs['storeSubscription'])}
                >
                  <option value="none">No Store Subscription</option>
                  <option value="starter">Starter Store</option>
                  <option value="basic">Basic Store</option>
                  <option value="premium">Premium Store</option>
                  <option value="anchor">Anchor Store</option>
                  <option value="enterprise">Enterprise Store</option>
                </select>
              </div>
            </div>

            {/* Promoted Listings Rate */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label htmlFor="input-promoted-rate" className="form-label" style={{ margin: 0 }}>
                  Promoted Listings Standard Ad Rate
                </label>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{inputs.promotedListingRate}%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <input
                  id="slider-promoted-rate"
                  name="promotedRateSlider"
                  type="range"
                  min="0"
                  max="30"
                  step="0.5"
                  aria-label="Promoted Listings Standard Ad Rate Slider"
                  value={inputs.promotedListingRate}
                  onChange={(e) => onUpdateInput('promotedListingRate', parseFloat(e.target.value) || 0)}
                  style={{ flex: 1, accentColor: 'var(--color-primary)' }}
                />
                <div className="input-with-adornment" style={{ width: '90px' }}>
                  <input
                    id="input-promoted-rate"
                    name="promotedRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="form-input has-suffix"
                    style={{ height: '36px', fontSize: '13px' }}
                    aria-label="Promoted Listings Standard Ad Rate Percentage"
                    value={inputs.promotedListingRate}
                    onChange={(e) => onUpdateInput('promotedListingRate', parseFloat(e.target.value) || 0)}
                  />
                  <span className="input-adornment-suffix" style={{ right: '8px' }}>%</span>
                </div>
              </div>
            </div>

            {/* Estimated Buyer Tax / VAT */}
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="input-sales-tax" className="form-label">
                  Estimated Buyer {countryConfig.vatName}
                  <span className="form-label-hint">(Impacts FVF basis)</span>
                </label>
                <div className="input-with-adornment">
                  <input
                    id="input-sales-tax"
                    name="salesTaxOrVatRate"
                    type="number"
                    min="0"
                    max="50"
                    step="0.5"
                    className="form-input has-suffix"
                    aria-label={`Estimated Buyer ${countryConfig.vatName} Rate`}
                    value={inputs.salesTaxOrVatRate}
                    onChange={(e) => onUpdateInput('salesTaxOrVatRate', parseFloat(e.target.value) || 0)}
                  />
                  <span className="input-adornment-suffix">%</span>
                </div>
              </div>

              {/* Switches */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '20px' }}>
                <div className="switch-control-group" style={{ marginBottom: 0 }}>
                  <div className="switch-label-block">
                    <span className="switch-title">International Sale</span>
                    <span className="switch-desc">Adds {Math.round(countryConfig.internationalFeeRate * 1000) / 10}% cross-border fee</span>
                  </div>
                  <label className="custom-switch" htmlFor="switch-international" aria-label="International Cross-Border Fee Switch">
                    <input
                      id="switch-international"
                      name="isInternational"
                      type="checkbox"
                      aria-label="Toggle International Sale Cross-Border Fee"
                      checked={inputs.isInternational}
                      onChange={(e) => onUpdateInput('isInternational', e.target.checked)}
                    />
                    <span className="switch-slider" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
