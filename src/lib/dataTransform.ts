import { ETFEngine, EngineType, PortfolioData } from "./types";

// Generate consistent dividend yield for an engine based on its properties (0-100%)
export function generateDividendYield(engine: ETFEngine): number {
  const seed = engine.ticker.charCodeAt(0) + (engine.ticker.charCodeAt(engine.ticker.length - 1) || 0);
  // Generate a value between 0 and 100
  const baseYield = (seed % 50) + (engine.ticker.charCodeAt(0) % 50);
  const thrustBonus = ((engine.yearlyThrust / 1000) % 30);
  const valueBonus = ((engine.currentValue / 10000) % 20);
  const totalYield = (baseYield + thrustBonus + valueBonus) % 100;
  return parseFloat(Math.max(0, Math.min(100, totalYield)).toFixed(2));
}

export function groupEnginesByType(engines: ETFEngine[]): Record<EngineType, ETFEngine[]> {
  const grouped: Record<string, ETFEngine[]> = {};
  
  engines.forEach(engine => {
    if (engine.engineType) {
      if (!grouped[engine.engineType]) {
        grouped[engine.engineType] = [];
      }
      grouped[engine.engineType].push(engine);
    }
  });
  
  return grouped as Record<EngineType, ETFEngine[]>;
}

export function getTopEnginesByType(
  engines: ETFEngine[],
  metric: "yearlyThrust" | "currentValue" | "shares" = "yearlyThrust",
  limit: number = 5
): Record<EngineType, ETFEngine[]> {
  const grouped = groupEnginesByType(engines);
  const topEngines: Record<string, ETFEngine[]> = {};
  
  Object.entries(grouped).forEach(([type, typeEngines]) => {
    const sorted = [...typeEngines].sort((a, b) => b[metric] - a[metric]);
    topEngines[type] = sorted.slice(0, limit);
  });
  
  return topEngines as Record<EngineType, ETFEngine[]>;
}

export function getTopMovers(engines: ETFEngine[], limit: number = 10): ETFEngine[] {
  // Calculate a "mover" score based on multiple factors
  const movers = engines.map(engine => ({
    ...engine,
    moverScore: engine.yearlyThrust * (engine.currentValue / 1000), // Simple scoring
  }));
  
  return movers
    .sort((a, b) => (b.moverScore || 0) - (a.moverScore || 0))
    .slice(0, limit)
    .map(({ moverScore, ...engine }) => engine);
}

export function calculatePortfolioData(engines: ETFEngine[]): PortfolioData {
  const totalValue = engines.reduce((sum, engine) => sum + engine.currentValue, 0);
  const totalYearlyThrust = engines.reduce((sum, engine) => sum + engine.yearlyThrust, 0);
  
  // Calculate overall health based on GEQS, DSI, and EEC
  const healthScores = engines.map(engine => {
    let score = 0;
    
    // GEQS contribution (engine type quality)
    if (engine.engineType === EngineType.NUCLEAR) score += 30;
    else if (engine.engineType === EngineType.ELITE) score += 25;
    else if (engine.engineType === EngineType.STABILIZED) score += 20;
    else if (engine.engineType === EngineType.BASELINE) score += 15;
    else if (engine.engineType === EngineType.WIND_DEPENDENT) score += 10;
    
    // DSI contribution
    if (engine.distributionStabilityIndex.includes("Ultra-Stable")) score += 20;
    else if (engine.distributionStabilityIndex.includes("Stable")) score += 15;
    else if (engine.distributionStabilityIndex.includes("Moderate")) score += 10;
    
    // EEC contribution
    if (engine.engineEnergyCost.includes("Ultra-Efficient")) score += 20;
    else if (engine.engineEnergyCost.includes("Efficient")) score += 15;
    
    return score;
  });
  
  const averageHealth = healthScores.length > 0
    ? healthScores.reduce((sum, score) => sum + score, 0) / healthScores.length
    : 0;
  
  const overallHealth = Math.min(100, Math.round(averageHealth));
  
  return {
    engines,
    totalValue,
    totalYearlyThrust,
    overallHealth,
  };
}

export function filterEngines(
  engines: ETFEngine[],
  searchTerm: string,
  engineType?: EngineType
): ETFEngine[] {
  let filtered = engines;
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      engine =>
        engine.ticker.toLowerCase().includes(term) ||
        engine.frequency.toLowerCase().includes(term) ||
        engine.escapeRatio.toLowerCase().includes(term)
    );
  }
  
  if (engineType) {
    filtered = filtered.filter(engine => engine.engineType === engineType);
  }
  
  return filtered;
}

