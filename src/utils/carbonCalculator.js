// Carbon footprint emission factors (kg CO2e per unit)

export const EMISSION_FACTORS = {
  // Travel (per km)
  travel: {
    petrolCar: 0.18,      // kg CO2e per km
    dieselCar: 0.17,      // kg CO2e per km
    hybridCar: 0.10,      // kg CO2e per km
    electricCar: 0.05,    // kg CO2e per km (electric grid average)
    motorcycle: 0.10,     // kg CO2e per km
    busTransit: 0.06,     // kg CO2e per passenger km
    railTransit: 0.03,    // kg CO2e per passenger km
    flightShort: 0.25,    // kg CO2e per km (< 1500 km, includes radiative forcing)
    flightLong: 0.18      // kg CO2e per km (> 1500 km, includes radiative forcing)
  },

  // Home utilities (per unit per month)
  home: {
    electricity: 0.38,    // kg CO2e per kWh
    naturalGas: 2.03,     // kg CO2e per m³ (or therm equivalent: 5.3 kg per therm)
    heatingOil: 2.68,     // kg CO2e per liter
    water: 0.298,         // kg CO2e per m³ (1000 liters)
    waste: {
      base: 1.2,          // kg CO2e per kg of general waste
      recycledDiscount: 0.8 // deduction multiplier for recycled waste
    }
  },

  // Food / Diet (kg CO2e per day based on diet type)
  food: {
    heavyMeat: 7.26,      // Heavy meat eater (>100g/day)
    averageMeat: 5.63,    // Medium meat eater (50-100g/day)
    lowMeat: 4.67,        // Low meat eater (<50g/day)
    pescatarian: 3.91,    // Fish eater
    vegetarian: 3.81,     // Vegetarian
    vegan: 2.89           // Vegan
  },

  // Shopping / Consumption (kg CO2e per item/purchase)
  shopping: {
    clothing: 15.0,       // average garment
    electronics: 180.0,   // smartphone/laptop average manufacturing emission
    furniture: 80.0,      // average item
    miscellaneous: 5.0    // average miscellaneous retail item
  }
};

/**
 * Calculates monthly emissions for Travel in kg CO2e
 */
export function calculateTravelEmissions(inputs) {
  let emissions = 0;

  // Car travel (monthly km)
  if (inputs.carKm && inputs.carType) {
    const factor = EMISSION_FACTORS.travel[inputs.carType] || EMISSION_FACTORS.travel.petrolCar;
    emissions += inputs.carKm * factor;
  }

  // Motorcycle travel (monthly km)
  if (inputs.motorcycleKm) {
    emissions += inputs.motorcycleKm * EMISSION_FACTORS.travel.motorcycle;
  }

  // Public transit: Bus (monthly km)
  if (inputs.busKm) {
    emissions += inputs.busKm * EMISSION_FACTORS.travel.busTransit;
  }

  // Public transit: Rail (monthly km)
  if (inputs.railKm) {
    emissions += inputs.railKm * EMISSION_FACTORS.travel.railTransit;
  }

  // Flights (annual flight hours translated to monthly km)
  // Average commercial speed is 800 km/h
  if (inputs.flightHoursShort) {
    const annualKm = inputs.flightHoursShort * 750; // short haul average speed
    const monthlyKm = annualKm / 12;
    emissions += monthlyKm * EMISSION_FACTORS.travel.flightShort;
  }
  if (inputs.flightHoursLong) {
    const annualKm = inputs.flightHoursLong * 850; // long haul average speed
    const monthlyKm = annualKm / 12;
    emissions += monthlyKm * EMISSION_FACTORS.travel.flightLong;
  }

  return Math.round(emissions);
}

/**
 * Calculates monthly emissions for Home Utilities in kg CO2e
 */
export function calculateHomeEmissions(inputs) {
  let emissions = 0;

  // Electricity (monthly kWh)
  if (inputs.electricityKwh) {
    emissions += inputs.electricityKwh * EMISSION_FACTORS.home.electricity;
  }

  // Natural Gas (monthly m³)
  if (inputs.naturalGasM3) {
    emissions += inputs.naturalGasM3 * EMISSION_FACTORS.home.naturalGas;
  }

  // Heating Oil (monthly Liters)
  if (inputs.heatingOilLiters) {
    emissions += inputs.heatingOilLiters * EMISSION_FACTORS.home.heatingOil;
  }

  // Water usage (monthly Liters, converted to m³)
  if (inputs.waterLiters) {
    const waterM3 = inputs.waterLiters / 1000;
    emissions += waterM3 * EMISSION_FACTORS.home.water;
  }

  // Waste (monthly kg)
  if (inputs.wasteKg) {
    const recyclingRate = (inputs.recyclingPercent || 0) / 100;
    const generalWaste = inputs.wasteKg * (1 - recyclingRate);
    const recycledWaste = inputs.wasteKg * recyclingRate;
    
    emissions += generalWaste * EMISSION_FACTORS.home.waste.base;
    emissions += recycledWaste * (EMISSION_FACTORS.home.waste.base - EMISSION_FACTORS.home.waste.recycledDiscount);
  }

  return Math.round(emissions);
}

/**
 * Calculates monthly emissions for Food in kg CO2e (daily factor * 30.4 days)
 */
export function calculateFoodEmissions(inputs) {
  const dietType = inputs.dietType || 'averageMeat';
  const dailyFactor = EMISSION_FACTORS.food[dietType] || EMISSION_FACTORS.food.averageMeat;
  let emissions = dailyFactor * 30.4; // Average days in month

  // Food waste adjustment (additional impact of wasted food)
  if (inputs.foodWastePercent) {
    // Waste adds an efficiency penalty (approx. up to 15% increase for high waste)
    emissions += emissions * (inputs.foodWastePercent / 100) * 0.5;
  }

  return Math.round(emissions);
}

/**
 * Calculates monthly emissions for Shopping / Consumption in kg CO2e
 */
export function calculateShoppingEmissions(inputs) {
  let emissions = 0;

  // Clothes (items per month)
  if (inputs.clothingItems) {
    emissions += inputs.clothingItems * EMISSION_FACTORS.shopping.clothing;
  }

  // Electronics (annual items, converted to monthly)
  if (inputs.electronicsItems) {
    emissions += (inputs.electronicsItems * EMISSION_FACTORS.shopping.electronics) / 12;
  }

  // Furniture/Home items (annual items, converted to monthly)
  if (inputs.furnitureItems) {
    emissions += (inputs.furnitureItems * EMISSION_FACTORS.shopping.furniture) / 12;
  }

  // Monthly misc spending (per $10 spend approximation, say 0.5 kg CO2e per dollar)
  if (inputs.miscSpend) {
    emissions += inputs.miscSpend * 0.2;
  }

  // Second-hand adjustment: reduces shopping emissions
  if (inputs.secondHandPercent) {
    const discount = (inputs.secondHandPercent / 100) * 0.5; // up to 50% discount on shopping footprint
    emissions = emissions * (1 - discount);
  }

  return Math.round(emissions);
}

/**
 * Calculates total footprint
 */
export function calculateTotalFootprint(allInputs) {
  const travel = calculateTravelEmissions(allInputs.travel || {});
  const home = calculateHomeEmissions(allInputs.home || {});
  const food = calculateFoodEmissions(allInputs.food || {});
  const shopping = calculateShoppingEmissions(allInputs.shopping || {});

  const total = travel + home + food + shopping;

  return {
    travel,
    home,
    food,
    shopping,
    total
  };
}

/**
 * Returns potential savings (kg CO2e / month) for specific actions
 */
export const ECO_ACTIONS = [
  {
    id: 'led_bulbs',
    category: 'home',
    title: 'Switch to LED Lighting',
    desc: 'Replace standard incandescent bulbs with energy-efficient LEDs.',
    savings: 15, // kg CO2e / month
    difficulty: 'Easy',
    cost: 'Low'
  },
  {
    id: 'meatless_days',
    category: 'food',
    title: 'Three Meatless Days / Week',
    desc: 'Replace meat with plant-based alternatives three days a week.',
    savings: 40,
    difficulty: 'Medium',
    cost: 'Free/Saves Money'
  },
  {
    id: 'carpool',
    category: 'travel',
    title: 'Carpool or Public Transit',
    desc: 'Commute via carpool, bus, or rail instead of driving alone twice a week.',
    savings: 65,
    difficulty: 'Medium',
    cost: 'Saves Money'
  },
  {
    id: 'thermostat',
    category: 'home',
    title: 'Adjust Thermostat by 2°C',
    desc: 'Lower heating by 2°C in winter and raise AC by 2°C in summer.',
    savings: 25,
    difficulty: 'Easy',
    cost: 'Free'
  },
  {
    id: 'cold_laundry',
    category: 'home',
    title: 'Wash Laundry in Cold Water',
    desc: 'Using cold water instead of hot saves electricity for water heating.',
    savings: 10,
    difficulty: 'Easy',
    cost: 'Free'
  },
  {
    id: 'reduce_waste',
    category: 'home',
    title: 'Compost & Recycle 80%+',
    desc: 'Divert organic waste and recyclable materials from landfills.',
    savings: 20,
    difficulty: 'Medium',
    cost: 'Low'
  },
  {
    id: 'buy_secondhand',
    category: 'shopping',
    title: 'Buy 50% Second-hand',
    desc: 'Purchase clothing and books pre-owned instead of brand new.',
    savings: 22,
    difficulty: 'Easy',
    cost: 'Saves Money'
  },
  {
    id: 'line_dry',
    category: 'home',
    title: 'Line Dry Clothes',
    desc: 'Air dry clothes instead of using a tumble dryer.',
    savings: 18,
    difficulty: 'Easy',
    cost: 'Free'
  },
  {
    id: 'eco_drive',
    category: 'travel',
    title: 'Eco-driving Habits',
    desc: 'Maintain steady speed, avoid rapid acceleration, and keep tires inflated.',
    savings: 12,
    difficulty: 'Easy',
    cost: 'Saves Money'
  },
  {
    id: 'avoid_single_use',
    category: 'shopping',
    title: 'Zero Single-Use Plastics',
    desc: 'Use reusable bags, bottles, coffee cups, and containers.',
    savings: 8,
    difficulty: 'Easy',
    cost: 'Low'
  }
];
