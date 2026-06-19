import React from 'react';
import { Target, Globe, AlertTriangle, CheckCircle, Award } from 'lucide-react';

export default function Dashboard({ emissions }) {
  const { travel, home, food, shopping, total } = emissions;

  // Global Benchmarks (monthly in kg CO2e)
  const BENCHMARKS = {
    westernAverage: 1200,   // average per capita Western country (US/Europe mix)
    globalAverage: 400,     // global per capita average
    climateTarget: 180      // Paris agreement 1.5C target per capita by 2030
  };

  // Determine Status Rating
  const getRating = (val) => {
    if (val === 0) return { label: 'Not Started', color: '#64748b', desc: 'Enter data to check your footprint rating.' };
    if (val < BENCHMARKS.climateTarget) return { label: 'Eco-Champion', color: '#10b981', desc: 'Excellent! Your footprint is in line with global climate targets.' };
    if (val <= BENCHMARKS.globalAverage) return { label: 'Low Footprint', color: '#34d399', desc: 'Good job! You are below the global average.' };
    if (val <= BENCHMARKS.westernAverage) return { label: 'Moderate Footprint', color: '#f59e0b', desc: 'Moderate. Consider taking simple actions to reduce emissions.' };
    return { label: 'High Footprint', color: '#ef4444', desc: 'High impact. Explore the Advisor tab for substantial ways to cut emissions.' };
  };

  const rating = getRating(total);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Carbon Status Card */}
      <div className="glass-card" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background glow based on rating */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: rating.color,
          opacity: 0.08,
          filter: 'blur(40px)',
          zIndex: 0
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 className="metric-label" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
            Footprint Rating
          </h3>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: rating.color, marginBottom: '8px' }}>
            {rating.label}
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1', maxWidth: '320px', margin: '0 auto' }}>
            {rating.desc}
          </p>
        </div>
      </div>

      {/* Quick Category Stats */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">✈️ Travel</span>
          <div className="metric-val" style={{ color: '#06b6d4' }}>{travel.toLocaleString()}</div>
          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>kg CO₂e/mo</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">🔌 Utilities</span>
          <div className="metric-val" style={{ color: '#10b981' }}>{home.toLocaleString()}</div>
          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>kg CO₂e/mo</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">🍏 Diet & Food</span>
          <div className="metric-val" style={{ color: '#f59e0b' }}>{food.toLocaleString()}</div>
          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>kg CO₂e/mo</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">🛍️ Consumption</span>
          <div className="metric-val" style={{ color: '#3b82f6' }}>{shopping.toLocaleString()}</div>
          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>kg CO₂e/mo</span>
        </div>
      </div>

      {/* Comparisons with Benchmarks */}
      <div className="compare-container">
        <h4 className="compare-title">How You Compare</h4>
        
        <div className="compare-bar-container">
          
          {/* User Footprint */}
          <div className="compare-item">
            <div className="compare-item-label">
              <span>Your Footprint</span>
              <strong>{total.toLocaleString()} kg CO₂e/mo</strong>
            </div>
            <div className="compare-bar-bg">
              <div 
                className="compare-bar-fill user" 
                style={{ width: `${Math.min((total / Math.max(total, BENCHMARKS.westernAverage)) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Western average */}
          <div className="compare-item">
            <div className="compare-item-label">
              <span>Western Average</span>
              <span>{BENCHMARKS.westernAverage} kg CO₂e/mo</span>
            </div>
            <div className="compare-bar-bg">
              <div 
                className="compare-bar-fill average" 
                style={{ width: `${(BENCHMARKS.westernAverage / Math.max(total, BENCHMARKS.westernAverage)) * 100}%` }}
              />
            </div>
          </div>

          {/* Global average */}
          <div className="compare-item">
            <div className="compare-item-label">
              <span>Global Average</span>
              <span>{BENCHMARKS.globalAverage} kg CO₂e/mo</span>
            </div>
            <div className="compare-bar-bg">
              <div 
                className="compare-bar-fill average" 
                style={{ width: `${(BENCHMARKS.globalAverage / Math.max(total, BENCHMARKS.westernAverage)) * 100}%` }}
              />
            </div>
          </div>

          {/* Climate Target */}
          <div className="compare-item">
            <div className="compare-item-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Target size={12} style={{ color: 'var(--accent-tertiary)' }} /> 2030 Net-Zero Target
              </span>
              <span>{BENCHMARKS.climateTarget} kg CO₂e/mo</span>
            </div>
            <div className="compare-bar-bg">
              <div 
                className="compare-bar-fill target" 
                style={{ width: `${(BENCHMARKS.climateTarget / Math.max(total, BENCHMARKS.westernAverage)) * 100}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Global Impact Summary Info */}
      <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', background: 'rgba(59, 130, 246, 0.03)' }}>
        <Globe size={20} style={{ color: 'var(--accent-tertiary)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h5 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '4px' }}>Global Climate Context</h5>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: '1.4' }}>
            To limit global warming to 1.5°C in line with the Paris Agreement, global per capita carbon emissions must fall to around 2 tons per year (~180 kg/month) by 2030. Tracking and identifying where we can reduce is our first major step.
          </p>
        </div>
      </div>
      
    </div>
  );
}
