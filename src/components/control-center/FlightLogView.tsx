"use client";

import { useState, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { ETFEngine } from "@/lib/types";
import { TimePeriod } from "./flight-log/constants";
import { useFlightLogCalculations } from "./flight-log/hooks/useFlightLogCalculations";
import { generateFakeTransactions } from "./flight-log/utils/transactionGenerator";
import { TimePeriodToggle } from "./flight-log/components/TimePeriodToggle";
import { MetricsGrid } from "./flight-log/components/MetricsGrid";
import { TransactionLog } from "./flight-log/components/TransactionLog";

// Lazy load Recharts component to reduce initial bundle size
const PortfolioChart = dynamic(
  () => import("./flight-log/components/PortfolioChart").then(mod => ({ default: mod.PortfolioChart })),
  {
    loading: () => (
      <div className="relative bg-black/40 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm">
        <div className="animate-pulse">
          <div className="h-96 bg-zinc-800/50 rounded"></div>
        </div>
      </div>
    ),
    ssr: false,
  }
);

interface FlightLogViewProps {
  engines: ETFEngine[];
}

export function FlightLogView({ engines }: FlightLogViewProps) {
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("1year");

  const handleTooltipToggle = (key: string) => {
    setOpenTooltip(openTooltip === key ? null : key);
  };

  const { selectedPeriod, metrics, chartData } = useFlightLogCalculations(engines, timePeriod);

  const transactions = useMemo(
    () => generateFakeTransactions(engines, selectedPeriod.monthsPast),
    [engines, selectedPeriod.monthsPast]
  );

  return (
    <div className="w-full px-2 md:px-4 space-y-8">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400/70 uppercase tracking-widest mb-2">
          FLIGHT LOG ANALYTICS
        </h1>
        <p className="text-sm text-cyan-300/60 mt-2 mb-3">
          Historical performance tracking and portfolio growth analysis
        </p>
        <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
      </div>

      {/* Time Period Toggle */}
      <TimePeriodToggle 
        timePeriod={timePeriod} 
        onTimePeriodChange={setTimePeriod} 
      />

      {/* Metrics */}
      <MetricsGrid
        portfolioGrowth={metrics.portfolioGrowth}
        portfolioGrowthPercent={metrics.portfolioGrowthPercentDisplay}
        sp500Growth={metrics.sp500Growth}
        sp500GrowthPercent={metrics.sp500GrowthPercentDisplay}
        totalInvested={metrics.totalInvested}
        totalGained={metrics.totalGained}
        totalGainedPercent={metrics.totalGainedPercent}
        openTooltip={openTooltip}
        onTooltipToggle={handleTooltipToggle}
      />

      {/* Portfolio Value Chart */}
      <Suspense fallback={
        <div className="relative bg-black/40 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm">
          <div className="animate-pulse">
            <div className="h-96 bg-zinc-800/50 rounded"></div>
          </div>
        </div>
      }>
        <PortfolioChart 
          chartData={chartData} 
          monthsPast={selectedPeriod.monthsPast} 
        />
      </Suspense>

      {/* Transaction Log */}
      <TransactionLog transactions={transactions} />
    </div>
  );
}
