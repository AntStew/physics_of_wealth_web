export const METRIC_DESCRIPTIONS: Record<string, string> = {
  "overall-health": "Overall Health measures the combined quality of all engines in your portfolio, factoring in engine type (GEQS), distribution stability (DSI), and energy efficiency (EEC). Higher values indicate a more robust and reliable rocketship.",
  "engine-integrity": "Engine Integrity reflects the average quality and reliability of your engine types. Nuclear and Elite engines contribute more to integrity, while Baseline and Wind-Dependent engines contribute less.",
  "income-per-month": "Income per Month shows your average monthly distribution income from all engines. This is calculated by dividing your total yearly thrust by 12.",
  "total-value": "Total Value represents the combined current market value of all engines in your portfolio. This is the sum of all individual engine values.",
  "avg-engine-level": "Average Engine Level indicates the overall propulsion tier of your portfolio, ranging from Baseline Propulsion (lowest) to Nuclear Propulsion (highest). Higher levels typically generate more thrust but may have higher drag.",
  "thrust-reliability": "Thrust Reliability measures the consistency of your income distributions. Ultra-Stable engines provide predictable income, while Variable engines have more fluctuation in their distributions.",
  "average-eec": "Average EEC (Engine Energy Cost) evaluates the efficiency of your engines. Ultra-Efficient engines maximize output while minimizing drag, while Inefficient engines may consume more capital over time."
};

export function getClassification(value: number, metricKey: string): string {
  if (metricKey === "avg-engine-level") {
    if (value >= 90) return "Nuclear Propulsion";
    if (value >= 70) return "Elite Propulsion";
    if (value >= 40) return "Stabilized Propulsion";
    if (value >= 20) return "Baseline Propulsion";
    return "Wind-Dependent";
  }
  if (metricKey === "thrust-reliability") {
    if (value >= 90) return "Ultra-Stable";
    if (value >= 70) return "Stable";
    if (value >= 40) return "Moderate";
    return "Variable";
  }
  if (metricKey === "average-eec") {
    if (value >= 90) return "Ultra-Efficient";
    if (value >= 70) return "Efficient";
    if (value >= 40) return "Moderate";
    return "Inefficient";
  }
  return "";
}

export function getEngineTypeBreakdown(engines: { engineType?: string }[]) {
  const breakdown: Record<string, number> = {};
  engines.forEach(engine => {
    const type = engine.engineType || "Unknown";
    breakdown[type] = (breakdown[type] || 0) + 1;
  });
  return breakdown;
}

export function getHealthStatus(health: number): string {
  if (health >= 90) return "ROCKET STATUS: OPTIMAL";
  if (health >= 75) return "ROCKET STATUS: EXCELLENT";
  if (health >= 60) return "ROCKET STATUS: GOOD";
  if (health >= 40) return "ROCKET STATUS: MODERATE";
  if (health >= 25) return "ROCKET STATUS: FAIR";
  return "ROCKET STATUS: NEEDS ATTENTION";
}

export function getIntegrityStatus(integrity: number): string {
  if (integrity >= 90) return "ENGINE STATUS: OPTIMAL";
  if (integrity >= 75) return "ENGINE STATUS: EXCELLENT";
  if (integrity >= 60) return "ENGINE STATUS: GOOD";
  if (integrity >= 40) return "ENGINE STATUS: MODERATE";
  if (integrity >= 25) return "ENGINE STATUS: FAIR";
  return "ENGINE STATUS: NEEDS ATTENTION";
}

