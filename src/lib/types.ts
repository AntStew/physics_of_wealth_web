export enum EngineType {
  NUCLEAR = "Nuclear Propulsion",
  ELITE = "Elite Propulsion",
  STABILIZED = "Stabilized Propulsion",
  BASELINE = "Baseline Propulsion",
  WIND_DEPENDENT = "Wind-Dependent",
}

export interface ETFEngine {
  ticker: string;
  frequency: string;
  shares: number;
  currentValue: number;
  yearlyThrust: number;
  escapeRatio: string;
  distributionStabilityIndex: string;
  geqs: string; // Gavel Engine Quality Score - maps to EngineType
  engineEnergyCost: string;
  engineType?: EngineType; // Derived from GEQS
}

export interface PortfolioData {
  engines: ETFEngine[];
  totalValue: number;
  totalYearlyThrust: number;
  overallHealth: number;
}

export interface FlightLogEntry {
  date: string;
  actualWealth: number;
  projectedWealth: number;
}

export interface ProjectionData {
  currentThrust: number;
  goalThrust: number;
  dominantEngineType: EngineType;
  defaultYield: number;
  defaultNavDrag: number;
  timeline: FlightLogEntry[];
  yearsToGoal: number;
}

export interface EngineTypeCharacteristics {
  type: EngineType;
  defaultYield: number;
  defaultNavDrag: number;
  description: string;
  emoji: string;
}

