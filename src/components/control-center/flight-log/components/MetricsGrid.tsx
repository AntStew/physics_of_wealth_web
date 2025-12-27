import { TrendingUp, DollarSign, BarChart3, Wallet } from "lucide-react";
import { InfoTooltip } from "../../rocketship/components/InfoTooltip";
import { MetricCard } from "./MetricCard";

interface MetricsGridProps {
  portfolioGrowth: number;
  portfolioGrowthPercent: number;
  sp500Growth: number;
  sp500GrowthPercent: number;
  totalInvested: number;
  totalGained: number;
  totalGainedPercent: number;
  openTooltip: string | null;
  onTooltipToggle: (key: string) => void;
}

export function MetricsGrid({
  portfolioGrowth,
  portfolioGrowthPercent,
  sp500Growth,
  sp500GrowthPercent,
  totalInvested,
  totalGained,
  totalGainedPercent,
  openTooltip,
  onTooltipToggle,
}: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Portfolio Growth"
        value={`$${portfolioGrowth.toFixed(2)}`}
        subtitle={`${portfolioGrowthPercent.toFixed(1)}%`}
        icon={<TrendingUp className="w-5 h-5" />}
        borderColor="border-green-500/30"
        textColor="text-green-300/80"
        iconColor="text-green-400"
        tooltipKey="total-growth"
        tooltipText="Projected portfolio value growth over the selected time period."
        isTooltipOpen={openTooltip === "total-growth"}
        onTooltipToggle={() => onTooltipToggle("total-growth")}
      />
      
      <MetricCard
        title="S&P 500 Growth"
        value={`$${sp500Growth.toFixed(2)}`}
        subtitle={`${sp500GrowthPercent.toFixed(1)}%`}
        icon={<BarChart3 className="w-5 h-5" />}
        borderColor="border-blue-500/30"
        textColor="text-blue-300/80"
        iconColor="text-blue-400"
        tooltipKey="sp500-growth"
        tooltipText="Projected growth if invested in S&P 500 (10% annual return) over the selected time period."
        isTooltipOpen={openTooltip === "sp500-growth"}
        onTooltipToggle={() => onTooltipToggle("sp500-growth")}
      />
      
      <MetricCard
        title="Total Money Invested"
        value={`$${totalInvested.toFixed(2)}`}
        subtitle="INITIAL CAPITAL"
        icon={<Wallet className="w-5 h-5" />}
        borderColor="border-teal-500/30"
        textColor="text-teal-300/80"
        iconColor="text-teal-400"
        tooltipKey="total-invested"
        tooltipText="Estimated total capital invested based on portfolio value at the start of the selected time period."
        isTooltipOpen={openTooltip === "total-invested"}
        onTooltipToggle={() => onTooltipToggle("total-invested")}
      />
      
      <div className={`relative bg-black/40 border ${totalGained >= 0 ? 'border-purple-500/30' : 'border-red-500/30'} rounded-lg p-4 backdrop-blur-sm`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs ${totalGained >= 0 ? 'text-purple-300/80' : 'text-red-300/80'} uppercase tracking-wide`}>
            Total Money Gained
          </span>
          <InfoTooltip 
            metricKey="total-gained" 
            isOpen={openTooltip === "total-gained"}
            onToggle={() => onTooltipToggle("total-gained")}
          />
        </div>
        {openTooltip === "total-gained" && (
          <div className={`mb-3 p-2 bg-black/80 rounded border ${totalGained >= 0 ? 'border-purple-500/30' : 'border-red-500/30'} text-xs ${totalGained >= 0 ? 'text-purple-300/70' : 'text-red-300/70'}`}>
            Total gains from investments (current value minus initial capital invested).
          </div>
        )}
        <div className="flex items-center gap-2 mb-1">
          <DollarSign className={`w-5 h-5 ${totalGained >= 0 ? 'text-purple-400' : 'text-red-400'}`} />
          <div className={`text-3xl font-bold font-mono ${totalGained >= 0 ? 'text-purple-400' : 'text-red-400'}`}>
            ${totalGained.toFixed(2)}
          </div>
        </div>
        <div className={`text-xs font-mono ${totalGained >= 0 ? 'text-purple-300/60' : 'text-red-300/60'}`}>
          {totalGainedPercent >= 0 ? '+' : ''}{totalGainedPercent.toFixed(1)}% {totalGained >= 0 ? 'PROFIT' : 'LOSS'}
        </div>
      </div>
    </div>
  );
}

