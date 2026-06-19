import React from 'react';
import { ShoppingBag, Shirt, Monitor, Percent } from 'lucide-react';

export default function ShoppingTracker({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="glass-card">
      <h3 className="form-section-title">
        <ShoppingBag size={22} className="logo-icon" /> Shopping & Consumption
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '24px' }}>
        Manufacturing and supply chains generate substantial emissions. Track your consumption and buying patterns.
      </p>

      <div className="tracker-grid">
        {/* Products Bought */}
        <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.3)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#f1f5f9' }}>
            <Shirt size={18} style={{ color: '#3b82f6' }} /> Fashion & Appliances
          </h4>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                New Clothing Items 
                <span className="unit">{data.clothingItems || 0} / month</span>
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                className="range-slider"
                value={data.clothingItems || 0}
                onChange={(e) => updateField('clothingItems', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                New Furniture Items 
                <span className="unit">{data.furnitureItems || 0} / year</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                className="range-slider"
                value={data.furnitureItems || 0}
                onChange={(e) => updateField('furnitureItems', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        {/* Tech Products */}
        <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.3)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#f1f5f9' }}>
            <Monitor size={18} style={{ color: '#3b82f6' }} /> Tech & Electronics
          </h4>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                New Electronics (Phones, Laptops)
                <span className="unit">{data.electronicsItems || 0} / year</span>
              </label>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                className="range-slider"
                value={data.electronicsItems || 0}
                onChange={(e) => updateField('electronicsItems', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Misc Retail Spend
                <span className="unit">${data.miscSpend || 0} / month</span>
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                className="range-slider"
                value={data.miscSpend || 0}
                onChange={(e) => updateField('miscSpend', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        {/* Second Hand Offset */}
        <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.3)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
          <div className="form-group">
            <label className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontWeight: 600 }}>
                <Percent size={16} style={{ color: '#3b82f6' }} /> Second-Hand Preference
              </span>
              <span className="unit">{data.secondHandPercent || 0}% of purchases</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              className="range-slider"
              value={data.secondHandPercent || 0}
              onChange={(e) => updateField('secondHandPercent', parseInt(e.target.value) || 0)}
            />
            <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
              * Choosing pre-owned goods reduces the demand for new manufacturing, offsetting carbon emissions up to 50% for this category.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
