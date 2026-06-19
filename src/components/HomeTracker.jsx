import React from 'react';
import { Home, Zap, Flame, Droplet, Trash2 } from 'lucide-react';

export default function HomeTracker({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="glass-card">
      <h3 className="form-section-title">
        <Home size={22} className="logo-icon" /> Home Utilities & Energy
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '24px' }}>
        Track your household energy use, water, and waste recycling to evaluate home emissions.
      </p>

      <div className="tracker-grid">
        {/* Electricity & Heating */}
        <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.3)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#f1f5f9' }}>
            <Zap size={18} style={{ color: '#10b981' }} /> Energy Consumption
          </h4>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Electricity 
                <span className="unit">{data.electricityKwh || 0} kWh/mo</span>
              </label>
              <input
                type="range"
                min="0"
                max="1200"
                step="10"
                className="range-slider"
                value={data.electricityKwh || 0}
                onChange={(e) => updateField('electricityKwh', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Natural Gas 
                <span className="unit">{data.naturalGasM3 || 0} m³/mo</span>
              </label>
              <input
                type="range"
                min="0"
                max="500"
                step="5"
                className="range-slider"
                value={data.naturalGasM3 || 0}
                onChange={(e) => updateField('naturalGasM3', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="form-grid" style={{ marginTop: '16px' }}>
            <div className="form-group">
              <label className="form-label">
                Heating Oil 
                <span className="unit">{data.heatingOilLiters || 0} Liters/mo</span>
              </label>
              <input
                type="range"
                min="0"
                max="500"
                step="5"
                className="range-slider"
                value={data.heatingOilLiters || 0}
                onChange={(e) => updateField('heatingOilLiters', parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="form-group" style={{ justifyContent: 'center' }}>
              {/* Spacer or explanation */}
              <div style={{ fontSize: '0.8rem', color: '#64748b', padding: '12px', background: 'rgba(255,255,255,0.01)', borderRadius: '8px' }}>
                💡 Tip: Switching to energy-efficient appliances or green electricity tariffs cuts these emissions significantly.
              </div>
            </div>
          </div>
        </div>

        {/* Water Usage */}
        <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.3)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
          <div className="form-group">
            <label className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontWeight: 600 }}>
                <Droplet size={16} style={{ color: '#10b981' }} /> Water Usage
              </span>
              <span className="unit">{data.waterLiters || 0} Liters/month</span>
            </label>
            <input
              type="range"
              min="0"
              max="15000"
              step="100"
              className="range-slider"
              value={data.waterLiters || 0}
              onChange={(e) => updateField('waterLiters', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Waste & Recycling */}
        <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.3)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#f1f5f9' }}>
            <Trash2 size={18} style={{ color: '#10b981' }} /> Household Waste & Recycling
          </h4>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Total Waste Produced 
                <span className="unit">{data.wasteKg || 0} kg/mo</span>
              </label>
              <input
                type="range"
                min="0"
                max="150"
                step="2"
                className="range-slider"
                value={data.wasteKg || 0}
                onChange={(e) => updateField('wasteKg', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Recycling & Composting Rate 
                <span className="unit">{data.recyclingPercent || 0}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                className="range-slider"
                value={data.recyclingPercent || 0}
                onChange={(e) => updateField('recyclingPercent', parseInt(e.target.value) || 0)}
                disabled={!(data.wasteKg > 0)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
