import { Target, DollarSign, TrendingUp, Wallet } from "lucide-react";
import { VolatileProjectionData } from "@/lib/calculations";
import { formatCurrency } from "@/lib/formatCurrency";

interface ProjectionMetricsProps {
  projection: VolatileProjectionData;
}

export function ProjectionMetrics({ projection }: ProjectionMetricsProps) {
  // Use goal time if available, otherwise use 50 years
  const monthsToGoal = projection.yearsToGoal !== null 
    ? Math.ceil(projection.yearsToGoal * 12) 
    : 50 * 12;
  
  // Calculate money invested up to goal time (initial + monthly contributions until goal)
  const moneyInvested = projection.initialInvestment + (projection.monthlyInvestment * monthsToGoal);
  
  // Use value at goal time if available, otherwise use final value (50 years)
  const valueAtGoal = projection.valueAtGoal !== null 
    ? projection.valueAtGoal 
    : projection.finalValue;
  
  // Calculate income gained (value at goal - money invested)
  const incomeGained = valueAtGoal - moneyInvested;
  
  // Calculate total % growth
  const totalReturn = moneyInvested > 0 ? (valueAtGoal / moneyInvested) : 1;
  const totalGrowthPercent = ((totalReturn - 1) * 100).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {/* Time to Goal */}
      <div className="bg-black/40 border border-cyan-500/30 text-cyan-300 rounded-lg p-5 backdrop-blur-sm shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
            <Target className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-400/70">
            Time to Goal
          </h3>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-cyan-300 mb-1">
          {projection.yearsToGoal !== null 
            ? `${projection.yearsToGoal.toFixed(1)}`
            : "50+"}
          <span className="text-lg text-cyan-300/70 ml-1">yrs</span>
        </div>
        {projection.yearsToGoal !== null && (
          <div className="text-xs text-cyan-300/60">
            {new Date(
              new Date().setFullYear(new Date().getFullYear() + Math.ceil(projection.yearsToGoal))
            ).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </div>
        )}
      </div>

      {/* Money Invested */}
      <div className="bg-black/40 border border-cyan-500/30 text-cyan-300 rounded-lg p-5 backdrop-blur-sm shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
            <Wallet className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-400/70">
            Money Invested
          </h3>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-cyan-300 mb-1">
          {formatCurrency(moneyInvested)}
        </div>
        <div className="text-xs text-cyan-300/60">
          ${moneyInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
      </div>

      {/* Income Gained */}
      <div className="bg-black/40 border border-cyan-500/30 text-cyan-300 rounded-lg p-5 backdrop-blur-sm shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-400/70">
            Income Gained
          </h3>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-cyan-300 mb-1">
          {formatCurrency(incomeGained)}
        </div>
        <div className="text-xs text-cyan-300/60">
          {totalGrowthPercent}% total growth
        </div>
      </div>

      {/* Total Value */}
      <div className="bg-black/40 border border-cyan-500/30 text-cyan-300 rounded-lg p-5 backdrop-blur-sm shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
            <DollarSign className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-400/70">
            Total Value
          </h3>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-cyan-300 mb-1">
          {formatCurrency(valueAtGoal)}
        </div>
        <div className="text-xs text-cyan-300/60">
          {projection.yearsToGoal !== null 
            ? `At goal (${projection.yearsToGoal.toFixed(1)} years)`
            : "After 50 years"}
        </div>
      </div>
    </div>
  );
}

