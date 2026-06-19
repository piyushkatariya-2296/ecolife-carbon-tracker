import React from 'react';
import { Car, Plane, Navigation, Compass } from 'lucide-react';

export default function TravelTracker({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="glass-card">
      <h3 className="form-section-title">
        <Car size={22} className="logo-icon" /> Travel & Transportation
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '24px' }}>
        Track your commuting habits, public transport, and flight history to calculate transport emissions.
      </p>

      <div className="tracker-grid">
        {/* Car Travel */}
        <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.3)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#f1f5f9' }}>
            <Car size={18} style={{ color: '#06b6d4' }} /> Personal Car
          </h4>
          
          <div className="form-grid" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
            <div className="form-group">
              <label className="form-label">
                Monthly Driving 
                <span className="unit">{data.carKm || 0} km</span>
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                className="range-slider"
                value={data.carKm || 0}
                onChange={(e) => updateField('carKm', parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Fuel / Engine</label>
              <select
                className="form-input form-select"
                value={data.carType || 'petrolCar'}
                onChange={(e) => updateField('carType', e.target.value)}
                disabled={!(data.carKm > 0)}
              >
                <option value="petrolCar">Petrol (Gas)</option>
                <option value="dieselCar">Diesel</option>
                <option value="hybridCar">Hybrid</option>
                <option value="electricCar">Electric</option>
              </select>
            </div>
          </div>
        </div>

        {/* Motorcycle Travel */}
        <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.3)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
          <div className="form-group">
            <label className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontWeight: 600 }}>
                <Navigation size={16} style={{ color: '#06b6d4' }} /> Motorcycle / Scooter
              </span>
              <span className="unit">{data.motorcycleKm || 0} km/month</span>
            </label>
            <input
              type="range"
              min="0"
              max="2000"
              step="20"
              className="range-slider"
              value={data.motorcycleKm || 0}
              onChange={(e) => updateField('motorcycleKm', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Public Transit */}
        <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.3)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#f1f5f9' }}>
            <Compass size={18} style={{ color: '#06b6d4' }} /> Public Transit
          </h4>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Bus Travel 
                <span className="unit">{data.busKm || 0} km/month</span>
              </label>
              <input
                type="range"
                min="0"
                max="1500"
                step="25"
                className="range-slider"
                value={data.busKm || 0}
                onChange={(e) => updateField('busKm', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Train / Metro 
                <span className="unit">{data.railKm || 0} km/month</span>
              </label>
              <input
                type="range"
                min="0"
                max="2000"
                step="25"
                className="range-slider"
                value={data.railKm || 0}
                onChange={(e) => updateField('railKm', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        {/* Flights */}
        <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.3)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#f1f5f9' }}>
            <Plane size={18} style={{ color: '#06b6d4' }} /> Flights (Annualized)
          </h4>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Short-haul (&lt; 3 hrs) 
                <span className="unit">{data.flightHoursShort || 0} hours/year</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="2"
                className="range-slider"
                value={data.flightHoursShort || 0}
                onChange={(e) => updateField('flightHoursShort', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Long-haul (&gt; 3 hrs) 
                <span className="unit">{data.flightHoursLong || 0} hours/year</span>
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                className="range-slider"
                value={data.flightHoursLong || 0}
                onChange={(e) => updateField('flightHoursLong', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
