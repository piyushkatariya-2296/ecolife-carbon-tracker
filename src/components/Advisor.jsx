import React from 'react';
import { ECO_ACTIONS } from '../utils/carbonCalculator';
import { Sparkles, Check, CheckCircle2, TrendingDown, Info } from 'lucide-react';

export default function Advisor({ emissions, selectedActions, onActionToggle }) {
  // Find highest emission category
  const { travel, home, food, shopping } = emissions;
  const categories = [
    { name: 'Travel', value: travel, tips: 'Consider cycling or walking for short trips, carpooling to work, or using public transport. Reducing flight frequency is the single biggest travel reduction you can make.' },
    { name: 'Home Utilities', value: home, tips: 'Switch to energy-efficient LED light bulbs, adjust your thermostat by 1-2 degrees, ensure your house is well-insulated, and try wash laundry on cold cycles.' },
    { name: 'Diet & Food', value: food, tips: 'Reducing red meat and dairy consumption has a massive impact. Try implementing Meatless Mondays, buying locally produced food, and reducing food waste.' },
    { name: 'Consumption', value: shopping, tips: 'Before buying new, check if you can rent, borrow, or buy second-hand. Focus on quality over quantity and avoid single-use plastics.' }
  ];

  const highestCategory = [...categories].sort((a, b) => b.value - a.value)[0];

  // Calculate total savings from selected actions
  const totalSavings = ECO_ACTIONS.reduce((sum, action) => {
    return selectedActions.includes(action.id) ? sum + action.savings : sum;
  }, 0);

  const totalEmissions = travel + home + food + shopping;
  const reductionPercentage = totalEmissions > 0 ? (totalSavings / totalEmissions) * 100 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Personalized insight card */}
      <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-warning)', background: 'rgba(245, 158, 11, 0.03)' }}>
        <h3 className="form-section-title" style={{ color: 'var(--accent-warning)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={22} /> Personalized Advice
        </h3>
        
        {totalEmissions === 0 ? (
          <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            Enter your daily activities in the tracker tabs to receive custom recommendations.
          </p>
        ) : (
          <div>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '8px' }}>
              Your highest emission source is <span style={{ color: 'var(--accent-warning)', textTransform: 'uppercase' }}>{highestCategory.name}</span> ({highestCategory.value.toLocaleString()} kg CO₂e).
            </p>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.5' }}>
              {highestCategory.tips}
            </p>
          </div>
        )}
      </div>

      {/* Simulator / Progress */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(6, 182, 212, 0.05))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className="form-section-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingDown size={22} className="logo-icon" /> Reduction Simulator
          </h3>
          {totalSavings > 0 && (
            <span className="badge badge-savings" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
              Saving {totalSavings} kg CO₂e / month!
            </span>
          )}
        </div>
        
        <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '20px' }}>
          Check actions in the list below to simulate how much carbon you can save and see your potential reduction.
        </p>

        {totalEmissions > 0 && totalSavings > 0 ? (
          <div>
            <div style={{ display: 'flex', justifySelf: 'space-between', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px' }}>
              <span>Footprint Reduction</span>
              <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{reductionPercentage.toFixed(0)}% lower</span>
            </div>
            
            <div className="compare-bar-bg" style={{ height: '14px', borderRadius: '7px' }}>
              <div 
                className="compare-bar-fill user" 
                style={{ 
                  width: `${Math.min(reductionPercentage, 100)}%`,
                  height: '100%',
                  borderRadius: '7px',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
                }}
              />
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '10px', textAlign: 'center' }}>
              ✨ New Monthly Footprint: <strong>{Math.max(0, totalEmissions - totalSavings).toLocaleString()} kg CO₂e</strong> (down from {totalEmissions.toLocaleString()} kg)
            </p>
          </div>
        ) : (
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--glass-border)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Select actions below to start simulating your impact reduction!
            </p>
          </div>
        )}
      </div>

      {/* Action list */}
      <div className="glass-card">
        <h3 className="form-section-title">Eco-Action Checklist</h3>
        <div style={{ marginTop: '16px' }}>
          {ECO_ACTIONS.map((action) => {
            const isCompleted = selectedActions.includes(action.id);
            
            return (
              <div 
                key={action.id} 
                className={`eco-action-card ${isCompleted ? 'completed' : ''}`}
                onClick={() => onActionToggle(action.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className={`action-checkbox ${isCompleted ? 'checked' : ''}`}>
                  {isCompleted && <Check size={14} strokeWidth={3} />}
                </div>
                
                <div className="action-info">
                  <div className="action-title">{action.title}</div>
                  <div className="action-desc">{action.desc}</div>
                  
                  <div className="action-meta">
                    <span className="badge badge-savings">
                      -{action.savings} kg CO₂e/mo
                    </span>
                    <span className="badge badge-diff">
                      {action.difficulty}
                    </span>
                    <span className="badge badge-diff">
                      {action.cost}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
