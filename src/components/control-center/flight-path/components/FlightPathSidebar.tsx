import { EngineType } from "@/lib/types";
import { VolatileProjectionData } from "@/lib/calculations";

interface FlightPathSidebarProps {
  initialInvestment: number;
  monthlyInvestment: number;
  engineType: EngineType;
  desiredGoal: number;
  onInitialInvestmentChange: (value: number) => void;
  onMonthlyInvestmentChange: (value: number) => void;
  onEngineTypeChange: (value: EngineType) => void;
  onDesiredGoalChange: (value: number) => void;
}

export function FlightPathSidebar({
  initialInvestment,
  monthlyInvestment,
  engineType,
  desiredGoal,
  onInitialInvestmentChange,
  onMonthlyInvestmentChange,
  onEngineTypeChange,
  onDesiredGoalChange,
}: FlightPathSidebarProps) {
  const getVolatilityDescription = (type: EngineType): string => {
    switch (type) {
      case EngineType.NUCLEAR:
        return "High volatility: 20% - 50% annual returns";
      case EngineType.ELITE:
        return "Moderate-high volatility: 20% - 50% annual returns";
      case EngineType.STABILIZED:
        return "Moderate volatility: 20% - 50% annual returns";
      case EngineType.BASELINE:
        return "Low volatility: 20% - 50% annual returns (consistent)";
      case EngineType.WIND_DEPENDENT:
        return "High volatility: 20% - 50% annual returns";
      default:
        return "";
    }
  };

  return (
    <div className="w-full md:h-full bg-black/40 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm overflow-hidden">
      <h2 className="text-lg font-bold mb-6 text-cyan-400/70 uppercase tracking-widest">
        Flight Path Settings
      </h2>
      
      <div className="space-y-6">
        {/* Initial Investment */}
        <div>
          <label className="block text-xs text-cyan-400/70 uppercase tracking-widest mb-2">
            Initial Investment
          </label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => onInitialInvestmentChange(parseFloat(e.target.value) || 0)}
            min="0"
            step="100"
            className="w-full px-4 py-2 border border-cyan-500/30 rounded-lg bg-black/40 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
          <p className="text-xs text-cyan-300/60 mt-1">
            Starting capital amount
          </p>
        </div>

        {/* Monthly Investment */}
        <div>
          <label className="block text-xs text-cyan-400/70 uppercase tracking-widest mb-2">
            Monthly Investment
          </label>
          <input
            type="number"
            value={monthlyInvestment}
            onChange={(e) => onMonthlyInvestmentChange(parseFloat(e.target.value) || 0)}
            min="0"
            step="10"
            className="w-full px-4 py-2 border border-cyan-500/30 rounded-lg bg-black/40 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
          <p className="text-xs text-cyan-300/60 mt-1">
            Amount added each month
          </p>
        </div>

        {/* Engine Type */}
        <div>
          <label className="block text-xs text-cyan-400/70 uppercase tracking-widest mb-2">
            Engine Type
          </label>
          <select
            value={engineType}
            onChange={(e) => onEngineTypeChange(e.target.value as EngineType)}
            className="w-full px-4 py-2 border border-cyan-500/30 rounded-lg bg-black/40 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            <option value={EngineType.NUCLEAR}>☢️ Nuclear Propulsion</option>
            <option value={EngineType.ELITE}>🚀 Elite Propulsion</option>
            <option value={EngineType.STABILIZED}>⚖️ Stabilized Propulsion</option>
            <option value={EngineType.BASELINE}>🏗️ Baseline Propulsion</option>
            <option value={EngineType.WIND_DEPENDENT}>🌬️ Wind-Dependent</option>
          </select>
          <p className="text-xs text-cyan-300/60 mt-1">
            {getVolatilityDescription(engineType)}
          </p>
        </div>

        {/* Desired Goal */}
        <div>
          <label className="block text-xs text-cyan-400/70 uppercase tracking-widest mb-2">
            Desired Goal
          </label>
          <input
            type="number"
            value={desiredGoal}
            onChange={(e) => onDesiredGoalChange(parseFloat(e.target.value) || 0)}
            min="0"
            step="1000"
            className="w-full px-4 py-2 border border-cyan-500/30 rounded-lg bg-black/40 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
          <p className="text-xs text-cyan-300/60 mt-1">
            Target portfolio value
          </p>
        </div>
      </div>
    </div>
  );
}

