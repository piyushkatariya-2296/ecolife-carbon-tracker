import React from 'react';

export default function EmissionChart({ travel, home, food, shopping, total }) {
  // Categories configurations
  const categories = [
    { name: 'Travel', value: travel, color: '#06b6d4', gradient: 'url(#cyanGrad)' },
    { name: 'Home Utilities', value: home, color: '#10b981', gradient: 'url(#emeraldGrad)' },
    { name: 'Diet & Food', value: food, color: '#f59e0b', gradient: 'url(#amberGrad)' },
    { name: 'Consumption', value: shopping, color: '#3b82f6', gradient: 'url(#blueGrad)' }
  ];

  // Calculate percentages
  const activeCategories = categories.map(cat => ({
    ...cat,
    percentage: total > 0 ? (cat.value / total) * 100 : 0
  }));

  // Donut chart parameters
  const radius = 70;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  
  let accumulatedPercentage = 0;

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 className="form-section-title">Emissions Breakdown</h3>
      
      {total === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
          <p style={{ fontSize: '1rem', fontWeight: 500 }}>No emissions tracked yet.</p>
          <p style={{ fontSize: '0.82rem', marginTop: '4px' }}>Fill in the forms to see your analysis.</p>
        </div>
      ) : (
        <>
          <div className="circle-chart-container">
            <svg viewBox="0 0 200 200" width="100%" height="100%">
              <defs>
                {/* Gradients */}
                <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                {/* Drop shadow */}
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth={strokeWidth}
              />

              {/* Render segments */}
              {activeCategories.map((cat, idx) => {
                if (cat.value === 0) return null;

                const strokeDashoffset = circumference - (cat.percentage / 100) * circumference;
                const rotation = (accumulatedPercentage / 100) * 360 - 90;
                accumulatedPercentage += cat.percentage;

                return (
                  <circle
                    key={idx}
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke={cat.gradient}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(${rotation} 100 100)`}
                    strokeLinecap="round"
                    style={{
                      transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s ease'
                    }}
                    filter="url(#shadow)"
                  />
                );
              })}
            </svg>
            
            <div className="circle-chart-text">
              <span className="circle-chart-num">
                {total >= 1000 ? (total / 1000).toFixed(1) : total}
              </span>
              <span className="circle-chart-unit">
                {total >= 1000 ? 'Metric Tons CO₂e' : 'kg CO₂e'} / mo
              </span>
            </div>
          </div>

          <div className="category-indicators">
            {activeCategories.map((cat, idx) => {
              if (cat.value === 0) return null;
              return (
                <div key={idx} className="indicator-row">
                  <span className="indicator-label">
                    <span 
                      className="indicator-dot" 
                      style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                    />
                    {cat.name}
                  </span>
                  <span className="indicator-val">
                    {cat.value.toLocaleString()} kg ({cat.percentage.toFixed(0)}%)
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
