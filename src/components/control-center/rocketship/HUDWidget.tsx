"use client";

import { ETFEngine } from "@/lib/types";
import { CoreMetricsSection } from "./components/CoreMetricsSection";
import { FinancialPerformanceSection } from "./components/FinancialPerformanceSection";
import { SystemAnalysisSection } from "./components/SystemAnalysisSection";

interface HUDWidgetProps {
  engines: ETFEngine[];
  overallHealth: number;
  engineIntegrity: number;
  incomePerMonth: number;
  totalYearlyThrust: number;
  totalValue: number;
  avgEngineLevel: number;
  thrustReliability: number;
  avgEEC: number;
  openTooltip: string | null;
  onTooltipToggle: (key: string) => void;
}

export function HUDWidget({
  engines,
  overallHealth,
  engineIntegrity,
  incomePerMonth,
  totalYearlyThrust,
  totalValue,
  avgEngineLevel,
  thrustReliability,
  avgEEC,
  openTooltip,
  onTooltipToggle,
}: HUDWidgetProps) {
  return (
    <div className="relative bg-gradient-to-br from-slate-900/95 via-black/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3),inset_0_0_50px_rgba(6,182,212,0.1)] overflow-hidden">
      {/* Hexagonal Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.1) 2px, rgba(6,182,212,0.1) 4px),
                         repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(6,182,212,0.1) 2px, rgba(6,182,212,0.1) 4px)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400/60"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-400/60"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-400/60"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-400/60"></div>

      <div className="relative p-6 md:p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-cyan-500/30">
          <div>
            <div className="text-xs text-cyan-400/70 uppercase tracking-widest mb-1">System Status</div>
            <div className="text-sm text-green-400 font-mono">ACTIVE | ONLINE</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-cyan-400/70 uppercase tracking-widest mb-1">Engines</div>
            <div className="text-2xl font-bold text-cyan-400 font-mono">{engines.length}</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-x-visible scrollbar-hide pb-2 lg:pb-0">
          {/* Left Column - Core Metrics */}
          <div className="min-w-[300px] lg:min-w-0 flex-shrink-0 lg:flex-shrink">
            <CoreMetricsSection
              overallHealth={overallHealth}
              engineIntegrity={engineIntegrity}
              openTooltip={openTooltip}
              onTooltipToggle={onTooltipToggle}
            />
          </div>

          {/* Middle Column - Financial Performance */}
          <div className="min-w-[300px] lg:min-w-0 flex-shrink-0 lg:flex-shrink">
            <FinancialPerformanceSection
              incomePerMonth={incomePerMonth}
              totalYearlyThrust={totalYearlyThrust}
              totalValue={totalValue}
              enginesCount={engines.length}
              avgEngineLevel={avgEngineLevel}
              thrustReliability={thrustReliability}
              avgEEC={avgEEC}
              openTooltip={openTooltip}
              onTooltipToggle={onTooltipToggle}
            />
          </div>

          {/* Right Column - System Analysis */}
          <div className="min-w-[300px] lg:min-w-0 flex-shrink-0 lg:flex-shrink">
            <SystemAnalysisSection
              engines={engines}
              portfolioValue={totalValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

