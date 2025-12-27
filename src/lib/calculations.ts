import { ETFEngine, FlightLogEntry, ProjectionData, EngineType, EngineTypeCharacteristics } from "./types";

export function generateFlightLogData(
  engines: ETFEngine[],
  months: number = 24
): FlightLogEntry[] {
  const totalYearlyThrust = engines.reduce((sum, engine) => sum + engine.yearlyThrust, 0);
  const monthlyThrust = totalYearlyThrust / 12;
  
  const entries: FlightLogEntry[] = [];
  let actualWealth = 0;
  let projectedWealth = 0;
  
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);
  
  for (let i = 0; i <= months; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    
    // Actual wealth accumulates with distributions
    actualWealth += monthlyThrust;
    
    // Projected wealth assumes reinvestment (compound growth)
    // Simple projection: assumes 5% annual growth on reinvested distributions
    const growthRate = 1 + (0.05 / 12); // Monthly growth
    projectedWealth = projectedWealth * growthRate + monthlyThrust;
    
    entries.push({
      date: date.toISOString().split("T")[0],
      actualWealth: Math.round(actualWealth * 100) / 100,
      projectedWealth: Math.round(projectedWealth * 100) / 100,
    });
  }
  
  return entries;
}

export function calculateSpeed(flightLog: FlightLogEntry[]): number {
  if (flightLog.length < 2) return 0;
  
  const recent = flightLog.slice(-12); // Last 12 months
  if (recent.length < 2) return 0;
  
  const first = recent[0].actualWealth;
  const last = recent[recent.length - 1].actualWealth;
  const months = recent.length - 1;
  
  return (last - first) / months; // Monthly speed
}

export function calculateDistance(flightLog: FlightLogEntry[]): number {
  if (flightLog.length === 0) return 0;
  return flightLog[flightLog.length - 1].actualWealth;
}

export function getEngineTypeCharacteristics(type: EngineType): EngineTypeCharacteristics {
  const characteristics: Record<EngineType, EngineTypeCharacteristics> = {
    [EngineType.NUCLEAR]: {
      type: EngineType.NUCLEAR,
      defaultYield: 10,
      defaultNavDrag: 0.15,
      description: "Generates extreme thrust capable of dominating total portfolio output. Thrives when DRIP is active, converting volatility into rapid share accumulation. Experiences meaningful drag, requiring active efficiency monitoring (GEQS-based). Best used as a contained core reactor, not an uncontrolled majority position.",
      emoji: "☢️",
    },
    [EngineType.ELITE]: {
      type: EngineType.ELITE,
      defaultYield: 7.5,
      defaultNavDrag: 0.08,
      description: "Produces strong, reliable income with manageable drag. Maintains high Engine Quality (GEQS) across multiple market regimes. Serves as a primary propulsion source for sustained acceleration. Scales well with capital and is suitable for long-duration deployment.",
      emoji: "🚀",
    },
    [EngineType.STABILIZED]: {
      type: EngineType.STABILIZED,
      defaultYield: 5.5,
      defaultNavDrag: 0.04,
      description: "Delivers moderate thrust with enhanced distribution stability. Dampens volatility and smooths income during market stress. Exhibits lower drag, protecting portfolio mass over time. Functions as a counterweight to higher-energy engines.",
      emoji: "⚖️",
    },
    [EngineType.BASELINE]: {
      type: EngineType.BASELINE,
      defaultYield: 3,
      defaultNavDrag: 0.02,
      description: "Provides low but dependable thrust with minimal complexity. Preserves mass with consistently low drag. Acts as a foundation layer for conservative capital allocation. Offers predictability rather than acceleration.",
      emoji: "🏗️",
    },
    [EngineType.WIND_DEPENDENT]: {
      type: EngineType.WIND_DEPENDENT,
      defaultYield: 5,
      defaultNavDrag: 0.12,
      description: "Generates thrust only when market conditions are favorable. Performance is highly dependent on external tailwinds. Lacks internal thrust mechanisms, making DRIP less effective. Best suited for opportunistic or supplemental use, not core propulsion.",
      emoji: "🌬️",
    },
  };
  
  return characteristics[type];
}

export function calculateProjection(
  currentThrust: number,
  goalThrust: number,
  dominantEngineType: EngineType,
  years: number = 10
): ProjectionData {
  const characteristics = getEngineTypeCharacteristics(dominantEngineType);
  const defaultYield = characteristics.defaultYield / 100; // Convert to decimal
  const defaultNavDrag = characteristics.defaultNavDrag;
  
  const timeline: FlightLogEntry[] = [];
  let currentCapital = currentThrust / defaultYield; // Estimate current capital from current thrust
  const monthlyYield = defaultYield / 12;
  const monthlyDrag = defaultNavDrag / 12;
  
  const startDate = new Date();
  
  for (let i = 0; i <= years * 12; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    
    // Calculate monthly distribution
    const monthlyThrust = currentCapital * monthlyYield;
    
    // Apply drag (reduces capital over time)
    currentCapital = currentCapital * (1 - monthlyDrag);
    
    // Reinvest distributions (compound growth)
    currentCapital += monthlyThrust;
    
    // Calculate actual thrust at this point
    const actualThrust = currentCapital * monthlyYield * 12; // Annualized
    
    timeline.push({
      date: date.toISOString().split("T")[0],
      actualWealth: actualThrust,
      projectedWealth: actualThrust,
    });
    
    // Check if we've reached the goal
    if (actualThrust >= goalThrust && timeline.length > 1) {
      break;
    }
  }
  
  const yearsToGoal = timeline.length / 12;
  
  return {
    currentThrust,
    goalThrust,
    dominantEngineType,
    defaultYield: characteristics.defaultYield,
    defaultNavDrag: characteristics.defaultNavDrag,
    timeline,
    yearsToGoal: Math.round(yearsToGoal * 10) / 10,
  };
}

export interface VolatileProjectionData {
  initialInvestment: number;
  monthlyInvestment: number;
  engineType: EngineType;
  desiredGoal: number;
  timeline: FlightLogEntry[];
  yearsToGoal: number | null;
  finalValue: number;
  valueAtGoal: number | null; // Value when goal is reached
}

/**
 * Calculate projection with volatile year-to-year returns based on engine type.
 * Higher yield engines are more volatile (could be 1% one year, 35% next).
 * Smaller engines have smaller growth but more consistent returns.
 */
export function calculateVolatileProjection(
  initialInvestment: number,
  monthlyInvestment: number,
  engineType: EngineType,
  desiredGoal: number,
  maxYears: number = 50
): VolatileProjectionData {
  const characteristics = getEngineTypeCharacteristics(engineType);
  const defaultNavDrag = characteristics.defaultNavDrag;
  
  // Determine volatility based on engine type
  // All engines now have 20% to 50% annual returns
  let volatilityRange: [number, number];
  let consistencyFactor: number; // How much the returns vary year to year
  
  switch (engineType) {
    case EngineType.NUCLEAR:
      // High volatility: 20% to 50% annual returns
      volatilityRange = [0.20, 0.50];
      consistencyFactor = 0.8; // High variation
      break;
    case EngineType.ELITE:
      // Moderate-high volatility: 20% to 50% annual returns
      volatilityRange = [0.20, 0.50];
      consistencyFactor = 0.6;
      break;
    case EngineType.STABILIZED:
      // Moderate volatility: 20% to 50% annual returns
      volatilityRange = [0.20, 0.50];
      consistencyFactor = 0.3;
      break;
    case EngineType.BASELINE:
      // Low volatility: 20% to 50% annual returns (more consistent within range)
      volatilityRange = [0.20, 0.50];
      consistencyFactor = 0.1;
      break;
    case EngineType.WIND_DEPENDENT:
      // High volatility: 20% to 50% annual returns (wind dependent)
      volatilityRange = [0.20, 0.50];
      consistencyFactor = 0.7;
      break;
    default:
      volatilityRange = [0.20, 0.50];
      consistencyFactor = 0.4;
  }
  
  // Use midpoint of volatility range as base return (35% for 20-50% range)
  const baseYield = (volatilityRange[0] + volatilityRange[1]) / 2; // 0.35 (35%)
  
  const timeline: FlightLogEntry[] = [];
  let currentValue = initialInvestment;
  const monthlyDrag = defaultNavDrag / 12;
  
  const startDate = new Date();
  let currentYearReturn = baseYield; // Start with midpoint of range
  let yearsToGoal: number | null = null;
  let valueAtGoal: number | null = null;
  
  // Generate monthly data
  for (let month = 0; month <= maxYears * 12; month++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + month);
    
    // Determine if we're in a new year (for annual return calculation)
    const isNewYear = month % 12 === 0 && month > 0;
    
    if (isNewYear) {
      // Calculate new annual return with volatility
      // Use a deterministic pseudo-random based on year index for consistent results
      // This creates a pattern that shows volatility while being reproducible
      const yearIndex = Math.floor(month / 12);
      // Simple seeded random using year index and engine type hash
      const typeHash = engineType.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const seed = yearIndex * 1000 + typeHash;
      const pseudoRandom = ((seed * 9301 + 49297) % 233280) / 233280; // Linear congruential generator
      const randomFactor = (pseudoRandom - 0.5) * 2; // -1 to 1
      const volatility = (volatilityRange[1] - volatilityRange[0]) * consistencyFactor;
      const targetReturn = baseYield + randomFactor * volatility;
      
      // Clamp to volatility range
      currentYearReturn = Math.max(
        volatilityRange[0],
        Math.min(volatilityRange[1], targetReturn)
      );
    }
    
    // Apply monthly return (annual return / 12)
    const monthlyReturn = currentYearReturn / 12;
    currentValue = currentValue * (1 + monthlyReturn);
    
    // Apply drag (reduces capital over time)
    currentValue = currentValue * (1 - monthlyDrag);
    
    // Add monthly investment
    currentValue += monthlyInvestment;
    
    timeline.push({
      date: date.toISOString().split("T")[0],
      actualWealth: currentValue,
      projectedWealth: currentValue,
    });
    
    // Check if we've reached the goal
    if (currentValue >= desiredGoal && yearsToGoal === null) {
      yearsToGoal = month / 12;
      valueAtGoal = currentValue;
    }
  }
  
  return {
    initialInvestment,
    monthlyInvestment,
    engineType,
    desiredGoal,
    timeline,
    yearsToGoal: yearsToGoal !== null ? Math.round(yearsToGoal * 10) / 10 : null,
    finalValue: currentValue,
    valueAtGoal: valueAtGoal,
  };
}

export interface PortfolioValueEntry {
  date: string;
  portfolioValue: number;
  sp500Value: number;
  portfolioProjected: number;
  sp500Projected: number;
}

export function generatePortfolioValueTimeline(
  engines: ETFEngine[],
  monthsPast: number = 24,
  monthsFuture: number = 24
): PortfolioValueEntry[] {
  if (monthsPast < 0) monthsPast = 0;
  if (monthsFuture < 0) monthsFuture = 0;
  const currentValue = engines.reduce((sum, engine) => sum + engine.currentValue, 0);
  const totalYearlyThrust = engines.reduce((sum, engine) => sum + engine.yearlyThrust, 0);
  const monthlyThrust = totalYearlyThrust / 12;
  
  // Calculate average yield for portfolio growth projection
  // Weight by portfolio value for more accurate average
  let totalWeightedYield = 0;
  let totalWeight = 0;
  engines.forEach(engine => {
    if (engine.currentValue > 0) {
      const yieldRate = engine.yearlyThrust / engine.currentValue;
      totalWeightedYield += yieldRate * engine.currentValue;
      totalWeight += engine.currentValue;
    }
  });
  const avgYield = totalWeight > 0 ? totalWeightedYield / totalWeight : 0.05; // Default to 5% if no engines
  const monthlyYield = avgYield / 12;
  
  // S&P 500 average annual return - drastically increased for steeper slope
  const sp500AnnualReturn = 0.25; // 25% annual return for much steeper slope
  const sp500MonthlyReturn = sp500AnnualReturn / 12;
  
  const entries: PortfolioValueEntry[] = [];
  const now = new Date();
  
  // Generate past values (going backwards from current)
  // Calculate from start date forward to ensure values increase over time
  const startDate = new Date(now);
  startDate.setMonth(startDate.getMonth() - monthsPast);
  
  // Estimate starting values (smaller than current)
  const portfolioGrowthRate = avgYield * 0.6; // Annual growth rate
  const portfolioStartValue = currentValue / Math.pow(1 + portfolioGrowthRate, monthsPast / 12);
  
  const sp500StartValue = currentValue / (1 + sp500AnnualReturn * monthsPast / 12);
  
  let pastPortfolioValue = portfolioStartValue;
  let pastSp500Value = sp500StartValue;
  
  for (let i = 0; i <= monthsPast; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    
    if (i === 0) {
      // First entry (furthest in past)
      entries.push({
        date: date.toISOString().split("T")[0],
        portfolioValue: Math.round(pastPortfolioValue * 100) / 100,
        sp500Value: Math.round(pastSp500Value * 100) / 100,
        portfolioProjected: 0,
        sp500Projected: 0,
      });
    } else {
      // Portfolio: exponential growth (compound monthly)
      const monthlyDistribution = pastPortfolioValue * monthlyYield;
      pastPortfolioValue = pastPortfolioValue + monthlyDistribution;
      pastPortfolioValue = pastPortfolioValue * (1 + monthlyYield * 0.4); // Capital appreciation
      
      // S&P 500: linear growth (constant monthly addition)
      pastSp500Value = pastSp500Value + (sp500MonthlyReturn * sp500StartValue);
      
      entries.push({
        date: date.toISOString().split("T")[0],
        portfolioValue: Math.round(pastPortfolioValue * 100) / 100,
        sp500Value: Math.round(pastSp500Value * 100) / 100,
        portfolioProjected: 0,
        sp500Projected: 0,
      });
    }
  }
  
  // Current value should be at the last past entry
  // Update the last entry to match current value exactly
  if (entries.length > 0) {
    const lastIndex = entries.length - 1;
    entries[lastIndex] = {
      date: now.toISOString().split("T")[0],
      portfolioValue: currentValue,
      sp500Value: currentValue,
      portfolioProjected: currentValue,
      sp500Projected: currentValue,
    };
  }
  
  const currentIndex = entries.length - 1;
  
  // Generate future values (going forwards from current)
  let futurePortfolioValue = currentValue;
  let futureSp500Value = currentValue;
  const sp500MonthlyGrowth = sp500MonthlyReturn * currentValue; // Constant monthly growth amount
  
  for (let i = 1; i <= monthsFuture; i++) {
    const date = new Date(now);
    date.setMonth(date.getMonth() + i);
    
    // Portfolio growth: exponential growth with reinvestment
    // Monthly distribution from current portfolio value
    const monthlyDistribution = futurePortfolioValue * monthlyYield;
    // Reinvest the distribution (compound effect - this creates exponential growth)
    futurePortfolioValue = futurePortfolioValue + monthlyDistribution;
    // Add capital appreciation (exponential growth factor)
    // Use exponential growth: value * e^(rate * time)
    const growthFactor = Math.exp((avgYield * 0.5) / 12); // Exponential growth
    futurePortfolioValue = futurePortfolioValue * growthFactor;
    
    // S&P 500 growth: linear growth (constant monthly addition)
    // Linear: value = previous + constant_monthly_growth
    futureSp500Value = futureSp500Value + sp500MonthlyGrowth;
    
    entries.push({
      date: date.toISOString().split("T")[0],
      portfolioValue: 0,
      sp500Value: 0,
      portfolioProjected: Math.round(futurePortfolioValue * 100) / 100,
      sp500Projected: Math.round(futureSp500Value * 100) / 100,
    });
  }
  
  return entries;
}

