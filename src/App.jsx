import React, { useState, useEffect } from 'react';
import { Leaf, LayoutDashboard, Car, Home, Apple, ShoppingBag, Award, RotateCcw } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TravelTracker from './components/TravelTracker';
import HomeTracker from './components/HomeTracker';
import DietTracker from './components/DietTracker';
import ShoppingTracker from './components/ShoppingTracker';
import Advisor from './components/Advisor';
import EmissionChart from './components/EmissionChart';
import { calculateTotalFootprint } from './utils/carbonCalculator';

// Starter default values for empty storage
const DEFAULT_INPUTS = {
  travel: {
    carKm: 350,
    carType: 'petrolCar',
    motorcycleKm: 0,
    busKm: 80,
    railKm: 150,
    flightHoursShort: 4,
    flightHoursLong: 0
  },
  home: {
    electricityKwh: 280,
    naturalGasM3: 35,
    heatingOilLiters: 0,
    waterLiters: 4500,
    wasteKg: 25,
    recyclingPercent: 40
  },
  food: {
    dietType: 'averageMeat',
    foodWastePercent: 15
  },
  shopping: {
    clothingItems: 3,
    furnitureItems: 1,
    electronicsItems: 1,
    miscSpend: 150,
    secondHandPercent: 20
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inputs, setInputs] = useState(() => {
    const saved = localStorage.getItem('ecolife_inputs');
    return saved ? JSON.parse(saved) : DEFAULT_INPUTS;
  });
  
  const [selectedActions, setSelectedActions] = useState(() => {
    const saved = localStorage.getItem('ecolife_actions');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to Local Storage
  useEffect(() => {
    localStorage.setItem('ecolife_inputs', JSON.stringify(inputs));
  }, [inputs]);

  useEffect(() => {
    localStorage.setItem('ecolife_actions', JSON.stringify(selectedActions));
  }, [selectedActions]);

  const handleInputChange = (category, categoryData) => {
    setInputs(prev => ({
      ...prev,
      [category]: categoryData
    }));
  };

  const handleActionToggle = (actionId) => {
    setSelectedActions(prev => 
      prev.includes(actionId) 
        ? prev.filter(id => id !== actionId) 
        : [...prev, actionId]
    );
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all inputs to defaults?')) {
      setInputs(DEFAULT_INPUTS);
      setSelectedActions([]);
      setActiveTab('dashboard');
    }
  };

  // Calculate carbon emissions
  const emissions = calculateTotalFootprint(inputs);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="app-title-container">
          <Leaf size={32} className="logo-icon pulse-glow" />
          <div>
            <h1 className="app-title">EcoLife</h1>
            <p className="app-subtitle">Carbon Tracker & Eco-Advisory System</p>
          </div>
        </div>
        
        <button className="btn-secondary" onClick={handleReset} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
          <RotateCcw size={15} /> Reset Data
        </button>
      </header>

      {/* Tabs */}
      <nav className="nav-tabs">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={18} /> Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'travel' ? 'active' : ''}`}
          onClick={() => setActiveTab('travel')}
        >
          <Car size={18} /> Travel
        </button>
        <button 
          className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Home size={18} /> Utilities
        </button>
        <button 
          className={`tab-btn ${activeTab === 'diet' ? 'active' : ''}`}
          onClick={() => setActiveTab('diet')}
        >
          <Apple size={18} /> Diet
        </button>
        <button 
          className={`tab-btn ${activeTab === 'shopping' ? 'active' : ''}`}
          onClick={() => setActiveTab('shopping')}
        >
          <ShoppingBag size={18} /> Shopping
        </button>
        <button 
          className={`tab-btn ${activeTab === 'advisor' ? 'active' : ''}`}
          onClick={() => setActiveTab('advisor')}
        >
          <Award size={18} style={{ color: 'var(--accent-warning)' }} /> Advisor
        </button>
      </nav>

      {/* Main Layout Grid */}
      <main className="main-grid">
        {/* Left Column - Forms & Actions */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {activeTab === 'dashboard' && (
            <Dashboard emissions={emissions} />
          )}
          {activeTab === 'travel' && (
            <TravelTracker 
              data={inputs.travel} 
              onChange={(data) => handleInputChange('travel', data)} 
            />
          )}
          {activeTab === 'home' && (
            <HomeTracker 
              data={inputs.home} 
              onChange={(data) => handleInputChange('home', data)} 
            />
          )}
          {activeTab === 'diet' && (
            <DietTracker 
              data={inputs.food} 
              onChange={(data) => handleInputChange('food', data)} 
            />
          )}
          {activeTab === 'shopping' && (
            <ShoppingTracker 
              data={inputs.shopping} 
              onChange={(data) => handleInputChange('shopping', data)} 
            />
          )}
          {activeTab === 'advisor' && (
            <Advisor 
              emissions={emissions} 
              selectedActions={selectedActions} 
              onActionToggle={handleActionToggle} 
            />
          )}
        </section>

        {/* Right Column - Permanent Visual Feedback Chart */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: 'fit-content', position: 'sticky', top: '24px' }}>
          <EmissionChart 
            travel={emissions.travel}
            home={emissions.home}
            food={emissions.food}
            shopping={emissions.shopping}
            total={emissions.total}
          />
          
          {/* Quick status widget shown on tabs other than dashboard/advisor */}
          {activeTab !== 'dashboard' && activeTab !== 'advisor' && (
            <div className="glass-card" style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.02)', textAlign: 'center' }}>
              <span className="metric-label" style={{ fontSize: '0.78rem' }}>Current Footprint</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: '4px 0' }}>
                {emissions.total.toLocaleString()} kg CO₂e/mo
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Benchmark: Western Avg (~1,200 kg) | Target (~180 kg)
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
