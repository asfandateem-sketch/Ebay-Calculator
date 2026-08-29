import React from 'react';
import { EcommerceProfitInputs, EcommerceProfitResults } from '../../types/ecommerce';
import { Package, DollarSign, Percent, Truck, Layers, HelpCircle, ArrowRight } from 'lucide-react';

interface Props {
  inputs: EcommerceProfitInputs;
  results: EcommerceProfitResults;
  onUpdateInput: <K extends keyof EcommerceProfitInputs>(key: K, value: EcommerceProfitInputs[K]) => void;
}

export const EcommerceCalculatorForm: React.FC<Props> = ({
  inputs,
  results,
  onUpdateInput,
}) => {
  const handleNumberChange = (key: keyof EcommerceProfitInputs, val: string) => {
    const parsed = parseFloat(val);
    onUpdateInput(key, isNaN(parsed) ? 0 : parsed);
  };

  return (
    <div className="calc-card" id="ecommerce-calculator-form">
      <div className="calc-card-header">
        <div className="calc-title-badge">
          <Layers size={18} />
          <h2 className="calc-title">Investment & Cost Model</h2>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
          Deterministic 2026 Engine
        </span>
      </div>

      {/* SECTION 1: INVENTORY & LANDED COST */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Package size={16} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            1. Inventory Sourcing & Landed Costs
          </h3>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="input-units-purchased" className="form-label">
              Units Purchased (Batch Size)
              <span className="form-label-hint">— Initial order quantity</span>
            </label>
            <div className="input-with-adornment">
              <input
                id="input-units-purchased"
                type="number"
                min="0"
                step="1"
                className="form-input"
                value={inputs.unitsPurchased || ''}
                onChange={(e) => handleNumberChange('unitsPurchased', e.target.value)}
                placeholder="500"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="input-product-cost" className="form-label">
              Product Purchase Cost (Per Unit)
              <span className="form-label-hint">— Ex-factory / supplier unit price</span>
            </label>
            <div className="input-with-adornment">
              <span className="input-adornment-prefix">$</span>
              <input
                id="input-product-cost"
                type="number"
                min="0"
                step="0.01"
                className="form-input has-prefix"
                value={inputs.productCostPerUnit || ''}
                onChange={(e) => handleNumberChange('productCostPerUnit', e.target.value)}
                placeholder="10.00"
              />
            </div>
          </div>
        </div>

        <div className="form-grid-2" style={{ marginTop: '12px' }}>
          <div className="form-group">
            <label htmlFor="input-shipping-freight" className="form-label">
              Shipping & Ocean / Air Freight (Total Batch)
              <span className="form-label-hint">— Freight to warehouse</span>
            </label>
            <div className="input-with-adornment">
              <span className="input-adornment-prefix">$</span>
              <input
                id="input-shipping-freight"
                type="number"
                min="0"
                step="1"
                className="form-input has-prefix"
                value={inputs.shippingFreight || ''}
                onChange={(e) => handleNumberChange('shippingFreight', e.target.value)}
                placeholder="500"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="input-customs-duties" className="form-label">
              Customs, Duties & Tariffs (Total Batch)
              <span className="form-label-hint">— Import duties & port fees</span>
            </label>
            <div className="input-with-adornment">
              <span className="input-adornment-prefix">$</span>
              <input
                id="input-customs-duties"
                type="number"
                min="0"
                step="1"
                className="form-input has-prefix"
                value={inputs.customsDuties || ''}
                onChange={(e) => handleNumberChange('customsDuties', e.target.value)}
                placeholder="250"
              />
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '12px' }}>
          <label htmlFor="input-other-import" className="form-label">
            Other Import / Handling Expenses (Total Batch)
            <span className="form-label-hint">— Brokerage, port drayage, inspection</span>
          </label>
          <div className="input-with-adornment">
            <span className="input-adornment-prefix">$</span>
            <input
              id="input-other-import"
              type="number"
              min="0"
              step="1"
              className="form-input has-prefix"
              value={inputs.otherImportCosts || ''}
              onChange={(e) => handleNumberChange('otherImportCosts', e.target.value)}
              placeholder="100"
            />
          </div>
        </div>

        {/* Live Landed Cost Summary Callout */}
        <div
          style={{
            backgroundColor: 'var(--color-soft-gray)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block' }}>
              Computed Landed Inventory Cost
            </span>
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary)' }}>
              ${results.totalLandedInventoryCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowRight size={14} style={{ color: 'var(--color-text-muted)' }} />
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block' }}>
                Landed Cost / Unit
              </span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary)' }}>
                ${results.landedCostPerUnit.toFixed(2)} <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--color-text-muted)' }}>/ unit</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: SALES & PRICING */}
      <div style={{ marginBottom: '28px', borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <DollarSign size={16} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            2. Selling Price & Sales Velocity
          </h3>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="input-selling-price" className="form-label">
              Selling Price (Per Unit)
              <span className="form-label-hint">— Customer retail price</span>
            </label>
            <div className="input-with-adornment">
              <span className="input-adornment-prefix">$</span>
              <input
                id="input-selling-price"
                type="number"
                min="0"
                step="0.01"
                className="form-input has-prefix"
                value={inputs.sellingPricePerUnit || ''}
                onChange={(e) => handleNumberChange('sellingPricePerUnit', e.target.value)}
                placeholder="35.00"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="input-monthly-units" className="form-label">
              Monthly Units Sold (Velocity)
              <span className="form-label-hint">— Projected monthly sales</span>
            </label>
            <div className="input-with-adornment">
              <input
                id="input-monthly-units"
                type="number"
                min="0"
                step="1"
                className="form-input"
                value={inputs.monthlyUnitsSold || ''}
                onChange={(e) => handleNumberChange('monthlyUnitsSold', e.target.value)}
                placeholder="100"
              />
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '12px' }}>
          <label htmlFor="input-initial-stock-override" className="form-label">
            Initial Working Capital Base (Optional Override)
            <span className="form-label-hint">— Defaults to total landed inventory cost (${results.totalLandedInventoryCost.toFixed(2)})</span>
          </label>
          <div className="input-with-adornment">
            <span className="input-adornment-prefix">$</span>
            <input
              id="input-initial-stock-override"
              type="number"
              min="0"
              step="1"
              className="form-input has-prefix"
              value={inputs.initialStockInvestment || ''}
              onChange={(e) => handleNumberChange('initialStockInvestment', e.target.value)}
              placeholder={results.totalLandedInventoryCost ? String(results.totalLandedInventoryCost) : '5850'}
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: SELLING & CHANNEL EXPENSES */}
      <div style={{ marginBottom: '28px', borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Percent size={16} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            3. Selling & Channel Expenses
          </h3>
        </div>

        {/* Marketplace Fee */}
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label htmlFor="input-mkt-fee-val" className="form-label" style={{ margin: 0 }}>
              Marketplace Commission Fee
              <span className="form-label-hint">— eBay, Amazon, Etsy, or Shopify fee</span>
            </label>
            <div style={{ display: 'flex', gap: '4px', background: 'var(--color-soft-gray)', padding: '2px', borderRadius: '4px' }}>
              <button
                type="button"
                onClick={() => onUpdateInput('marketplaceFeeType', 'percentage')}
                style={{
                  fontSize: '11px',
                  fontWeight: inputs.marketplaceFeeType === 'percentage' ? 600 : 400,
                  backgroundColor: inputs.marketplaceFeeType === 'percentage' ? 'var(--color-white)' : 'transparent',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  boxShadow: inputs.marketplaceFeeType === 'percentage' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                % Percent
              </button>
              <button
                type="button"
                onClick={() => onUpdateInput('marketplaceFeeType', 'fixed')}
                style={{
                  fontSize: '11px',
                  fontWeight: inputs.marketplaceFeeType === 'fixed' ? 600 : 400,
                  backgroundColor: inputs.marketplaceFeeType === 'fixed' ? 'var(--color-white)' : 'transparent',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  boxShadow: inputs.marketplaceFeeType === 'fixed' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                $ Fixed/Unit
              </button>
            </div>
          </div>
          <div className="input-with-adornment">
            {inputs.marketplaceFeeType === 'percentage' ? (
              <>
                <input
                  id="input-mkt-fee-val"
                  type="number"
                  min="0"
                  step="0.01"
                  className="form-input has-suffix"
                  value={inputs.marketplaceFeeValue || ''}
                  onChange={(e) => handleNumberChange('marketplaceFeeValue', e.target.value)}
                  placeholder="13.25"
                />
                <span className="input-adornment-suffix">%</span>
              </>
            ) : (
              <>
                <span className="input-adornment-prefix">$</span>
                <input
                  id="input-mkt-fee-val"
                  type="number"
                  min="0"
                  step="0.01"
                  className="form-input has-prefix"
                  value={inputs.marketplaceFeeValue || ''}
                  onChange={(e) => handleNumberChange('marketplaceFeeValue', e.target.value)}
                  placeholder="4.50"
                />
              </>
            )}
          </div>
        </div>

        {/* Payment Processing Fee */}
        <div className="form-group" style={{ marginTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label htmlFor="input-pay-fee-val" className="form-label" style={{ margin: 0 }}>
              Payment Processing Fee
              <span className="form-label-hint">— Stripe, PayPal, or Managed Payments</span>
            </label>
            <div style={{ display: 'flex', gap: '4px', background: 'var(--color-soft-gray)', padding: '2px', borderRadius: '4px' }}>
              <button
                type="button"
                onClick={() => onUpdateInput('paymentProcessingFeeType', 'percentage')}
                style={{
                  fontSize: '11px',
                  fontWeight: inputs.paymentProcessingFeeType === 'percentage' ? 600 : 400,
                  backgroundColor: inputs.paymentProcessingFeeType === 'percentage' ? 'var(--color-white)' : 'transparent',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  boxShadow: inputs.paymentProcessingFeeType === 'percentage' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                % Percent
              </button>
              <button
                type="button"
                onClick={() => onUpdateInput('paymentProcessingFeeType', 'fixed')}
                style={{
                  fontSize: '11px',
                  fontWeight: inputs.paymentProcessingFeeType === 'fixed' ? 600 : 400,
                  backgroundColor: inputs.paymentProcessingFeeType === 'fixed' ? 'var(--color-white)' : 'transparent',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  boxShadow: inputs.paymentProcessingFeeType === 'fixed' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                $ Fixed/Mo
              </button>
            </div>
          </div>
          <div className="input-with-adornment">
            {inputs.paymentProcessingFeeType === 'percentage' ? (
              <>
                <input
                  id="input-pay-fee-val"
                  type="number"
                  min="0"
                  step="0.01"
                  className="form-input has-suffix"
                  value={inputs.paymentProcessingFeeValue || ''}
                  onChange={(e) => handleNumberChange('paymentProcessingFeeValue', e.target.value)}
                  placeholder="2.90"
                />
                <span className="input-adornment-suffix">%</span>
              </>
            ) : (
              <>
                <span className="input-adornment-prefix">$</span>
                <input
                  id="input-pay-fee-val"
                  type="number"
                  min="0"
                  step="0.01"
                  className="form-input has-prefix"
                  value={inputs.paymentProcessingFeeValue || ''}
                  onChange={(e) => handleNumberChange('paymentProcessingFeeValue', e.target.value)}
                  placeholder="100.00"
                />
              </>
            )}
          </div>
        </div>

        {/* Advertising / PPC Cost */}
        <div className="form-group" style={{ marginTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label htmlFor="input-ad-fee-val" className="form-label" style={{ margin: 0 }}>
              Advertising / PPC / Promoted Ads
              <span className="form-label-hint">— Ad spend or Promoted Listings</span>
            </label>
            <div style={{ display: 'flex', gap: '4px', background: 'var(--color-soft-gray)', padding: '2px', borderRadius: '4px' }}>
              <button
                type="button"
                onClick={() => onUpdateInput('advertisingFeeType', 'percentage')}
                style={{
                  fontSize: '11px',
                  fontWeight: inputs.advertisingFeeType === 'percentage' ? 600 : 400,
                  backgroundColor: inputs.advertisingFeeType === 'percentage' ? 'var(--color-white)' : 'transparent',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  boxShadow: inputs.advertisingFeeType === 'percentage' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                % Of Rev
              </button>
              <button
                type="button"
                onClick={() => onUpdateInput('advertisingFeeType', 'fixed')}
                style={{
                  fontSize: '11px',
                  fontWeight: inputs.advertisingFeeType === 'fixed' ? 600 : 400,
                  backgroundColor: inputs.advertisingFeeType === 'fixed' ? 'var(--color-white)' : 'transparent',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  boxShadow: inputs.advertisingFeeType === 'fixed' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                $ Fixed/Mo
              </button>
            </div>
          </div>
          <div className="input-with-adornment">
            {inputs.advertisingFeeType === 'percentage' ? (
              <>
                <input
                  id="input-ad-fee-val"
                  type="number"
                  min="0"
                  step="0.01"
                  className="form-input has-suffix"
                  value={inputs.advertisingFeeValue || ''}
                  onChange={(e) => handleNumberChange('advertisingFeeValue', e.target.value)}
                  placeholder="5.00"
                />
                <span className="input-adornment-suffix">%</span>
              </>
            ) : (
              <>
                <span className="input-adornment-prefix">$</span>
                <input
                  id="input-ad-fee-val"
                  type="number"
                  min="0"
                  step="1"
                  className="form-input has-prefix"
                  value={inputs.advertisingFeeValue || ''}
                  onChange={(e) => handleNumberChange('advertisingFeeValue', e.target.value)}
                  placeholder="200.00"
                />
              </>
            )}
          </div>
        </div>

        {/* Packaging Cost */}
        <div className="form-group" style={{ marginTop: '12px' }}>
          <label htmlFor="input-pkg-cost" className="form-label">
            Packaging & Poly Mailers / Boxes (Per Unit)
            <span className="form-label-hint">— Tape, boxes, bubble wrap, labels</span>
          </label>
          <div className="input-with-adornment">
            <span className="input-adornment-prefix">$</span>
            <input
              id="input-pkg-cost"
              type="number"
              min="0"
              step="0.01"
              className="form-input has-prefix"
              value={inputs.packagingCostPerUnit || ''}
              onChange={(e) => handleNumberChange('packagingCostPerUnit', e.target.value)}
              placeholder="1.50"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: OPERATING & FIXED OVERHEAD */}
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Truck size={16} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            4. Other Monthly Overhead & Tools
          </h3>
        </div>

        <div className="form-group">
          <label htmlFor="input-other-monthly" className="form-label">
            Software, Subscriptions & Storage (Monthly Fixed)
            <span className="form-label-hint">— Helium10, JungleScout, Shopify sub, 3PL base fee</span>
          </label>
          <div className="input-with-adornment">
            <span className="input-adornment-prefix">$</span>
            <input
              id="input-other-monthly"
              type="number"
              min="0"
              step="1"
              className="form-input has-prefix"
              value={inputs.otherMonthlyExpenses || ''}
              onChange={(e) => handleNumberChange('otherMonthlyExpenses', e.target.value)}
              placeholder="100.00"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
