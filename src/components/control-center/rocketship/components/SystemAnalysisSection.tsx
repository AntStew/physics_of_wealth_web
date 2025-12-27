"use client";

import { ETFEngine } from "@/lib/types";
import { PortfolioValueLineChart } from "./PortfolioValueLineChart";
import { EngineTypeBarChart } from "./EngineTypeBarChart";

interface SystemAnalysisSectionProps {
  engines: ETFEngine[];
  portfolioValue: number;
}

export function SystemAnalysisSection({ engines, portfolioValue }: SystemAnalysisSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-xs text-cyan-400/70 uppercase tracking-widest mb-4">System Analysis</div>
      
      {/* Portfolio Value Over Time Exponential Line Chart */}
      <div className="relative bg-black/40 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm">
        <div className="text-xs text-cyan-300/80 uppercase tracking-wide mb-3">Portfolio Value Over Time</div>
        <PortfolioValueLineChart currentValue={portfolioValue} />
      </div>

      {/* Engine Type Breakdown Bar Chart */}
      <div className="relative bg-black/40 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm">
        <div className="text-xs text-cyan-300/80 uppercase tracking-wide mb-3">Engine Type Distribution</div>
        <EngineTypeBarChart engines={engines} />
      </div>
    </div>
  );
}

