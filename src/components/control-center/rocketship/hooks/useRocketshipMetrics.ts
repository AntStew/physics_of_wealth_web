import { useMemo } from "react";
import { ETFEngine, EngineType } from "@/lib/types";
import { calculatePortfolioData } from "@/lib/dataTransform";

export function useRocketshipMetrics(engines: ETFEngine[]) {
  const portfolio = useMemo(() => calculatePortfolioData(engines), [engines]);
  
  const engineIntegrity = useMemo(() => {
    if (engines.length === 0) return 0;
    const integrityScores: number[] = engines.map(engine => {
      if (engine.engineType === EngineType.NUCLEAR) return 100;
      if (engine.engineType === EngineType.ELITE) return 80;
      if (engine.engineType === EngineType.STABILIZED) return 60;
      if (engine.engineType === EngineType.BASELINE) return 40;
      if (engine.engineType === EngineType.WIND_DEPENDENT) return 30;
      return 50;
    });
    return Math.round(integrityScores.reduce((sum, score) => sum + score, 0) / integrityScores.length);
  }, [engines]);

  const avgEngineLevel = useMemo(() => {
    if (engines.length === 0) return 0;
    const levelScores: number[] = engines.map(engine => {
      if (engine.engineType === EngineType.NUCLEAR) return 100;
      if (engine.engineType === EngineType.ELITE) return 75;
      if (engine.engineType === EngineType.STABILIZED) return 50;
      if (engine.engineType === EngineType.BASELINE) return 25;
      if (engine.engineType === EngineType.WIND_DEPENDENT) return 10;
      return 0;
    });
    return Math.round(levelScores.reduce((sum, score) => sum + score, 0) / levelScores.length);
  }, [engines]);

  const thrustReliability = useMemo(() => {
    if (engines.length === 0) return 0;
    const reliabilityScores: number[] = engines.map(engine => {
      if (engine.distributionStabilityIndex.includes("Ultra-Stable")) return 100;
      if (engine.distributionStabilityIndex.includes("Stable")) return 75;
      if (engine.distributionStabilityIndex.includes("Moderate")) return 50;
      if (engine.distributionStabilityIndex.includes("Variable")) return 25;
      return 0;
    });
    return Math.round(reliabilityScores.reduce((sum, score) => sum + score, 0) / reliabilityScores.length);
  }, [engines]);

  const avgEEC = useMemo(() => {
    if (engines.length === 0) return 0;
    const eecScores: number[] = engines.map(engine => {
      if (engine.engineEnergyCost.includes("Ultra-Efficient")) return 100;
      if (engine.engineEnergyCost.includes("Efficient")) return 75;
      if (engine.engineEnergyCost.includes("Moderate")) return 50;
      if (engine.engineEnergyCost.includes("Inefficient")) return 25;
      return 0;
    });
    return Math.round(eecScores.reduce((sum, score) => sum + score, 0) / eecScores.length);
  }, [engines]);

  const incomePerMonth = useMemo(() => portfolio.totalYearlyThrust / 12, [portfolio.totalYearlyThrust]);

  return {
    portfolio,
    engineIntegrity,
    avgEngineLevel,
    thrustReliability,
    avgEEC,
    incomePerMonth,
  };
}

