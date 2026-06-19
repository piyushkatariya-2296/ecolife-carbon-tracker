import React from 'react';
import { Apple, Leaf, Utensils, AlertTriangle } from 'lucide-react';

export default function DietTracker({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const dietOptions = [
    {
      id: 'vegan',
      name: 'Vegan',
      desc: 'Plant-based foods only, no animal products.',
      impact: 'Lowest Impact (~88kg CO₂e/mo)',
      icon: Leaf,
      color: '#10b981'
    },
    {
      id: 'vegetarian',
      name: 'Vegetarian',
      desc: 'No meat, but includes dairy products and eggs.',
      impact: 'Low Impact (~116kg CO₂e/mo)',
      icon: Apple,
      color: '#34d399'
    },
    {
      id: 'pescatarian',
      name: 'Pescatarian',
      desc: 'Vegetarian diet, but includes fish and seafood.',
      impact: 'Moderate Impact (~119kg CO₂e/mo)',
      icon: Utensils,
      color: '#67e8f9'
    },
    {
      id: 'lowMeat',
      name: 'Low Meat',
      desc: 'Red and white meat eaten sparingly (< 50g/day).',
      impact: 'Moderate-High (~142kg CO₂e/mo)',
      icon: Utensils,
      color: '#3b82f6'
    },
    {
      id: 'averageMeat',
      name: 'Average Meat',
      desc: 'Regular consumption of poultry, pork, and red meat.',
      impact: 'High Impact (~171kg CO₂e/mo)',
      icon: Utensils,
      color: '#a8a29e'
    },
    {
      id: 'heavyMeat',
      name: 'Heavy Meat',
      desc: 'Large quantities of meat consumed daily (> 100g/day).',
      impact: 'Highest Impact (~221kg CO₂e/mo)',
      icon: Utensils,
      color: '#ef4444'
    }
  ];

  return (
    <div className="glass-card">
      <h3 className="form-section-title">
        <Apple size={22} className="logo-icon" /> Food & Diet habits
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '24px' }}>
        Food systems account for nearly a third of global emissions. Tell us about your eating and food waste habits.
      </p>

      <div className="tracker-grid">
        {/* Diet Style Cards */}
        <div>
          <label className="form-label" style={{ marginBottom: '12px' }}>Select Your Diet Style</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {dietOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = (data.dietType || 'averageMeat') === opt.id;
              
              return (
                <div
                  key={opt.id}
                  onClick={() => updateField('dietType', opt.id)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.25)',
                    border: '1px solid',
                    borderColor: isSelected ? opt.color : 'rgba(255, 255, 255, 0.04)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? `0 0 12px ${opt.color}15` : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, color: isSelected ? '#fff' : '#cbd5e1', fontSize: '0.95rem' }}>{opt.name}</span>
                    <Icon size={16} style={{ color: opt.color }} />
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: '1.3', marginBottom: '8px' }}>{opt.desc}</p>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: opt.color }}>{opt.impact}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Food Waste */}
        <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.3)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)', marginTop: '8px' }}>
          <div className="form-group">
            <label className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontWeight: 600 }}>
                <AlertTriangle size={16} style={{ color: '#f59e0b' }} /> Food Waste Level
              </span>
              <span className="unit">{data.foodWastePercent || 0}% of food bought</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              className="range-slider"
              value={data.foodWastePercent || 0}
              onChange={(e) => updateField('foodWastePercent', parseInt(e.target.value) || 0)}
            />
            <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
              * Food waste in landfills produces methane, a potent greenhouse gas. Divert organic waste by composting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
