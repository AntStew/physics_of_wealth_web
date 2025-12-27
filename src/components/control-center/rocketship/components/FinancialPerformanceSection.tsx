"use client";

import { InfoTooltip } from "./InfoTooltip";
import { METRIC_DESCRIPTIONS, getClassification } from "../utils/metrics";
import { formatCurrency } from "@/lib/formatCurrency";

interface FinancialPerformanceSectionProps {
  incomePerMonth: number;
  totalYearlyThrust: number;
  totalValue: number;
  enginesCount: number;
  avgEngineLevel: number;
  thrustReliability: number;
  avgEEC: number;
  openTooltip: string | null;
  onTooltipToggle: (key: string) => void;
}

export function FinancialPerformanceSection({
  incomePerMonth,
  totalYearlyThrust,
  totalValue,
  enginesCount,
  avgEngineLevel,
  thrustReliability,
  avgEEC,
  openTooltip,
  onTooltipToggle,
}: FinancialPerformanceSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-xs text-cyan-400/70 uppercase tracking-widest mb-4">Financial Performance</div>
      
      {/* Monthly Income */}
      <div className="relative bg-black/40 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-purple-300/80 uppercase tracking-wide">Monthly Income</span>
          <InfoTooltip 
            metricKey="income-per-month" 
            isOpen={openTooltip === "income-per-month"}
            onToggle={() => onTooltipToggle("income-per-month")}
          />
        </div>
        {openTooltip === "income-per-month" && (
          <div className="mb-3 p-2 bg-black/80 rounded border border-purple-500/30 text-xs text-purple-300/70">
            {METRIC_DESCRIPTIONS["income-per-month"]}
          </div>
        )}
        <div className="text-4xl font-bold text-purple-400 font-mono mb-2">{formatCurrency(incomePerMonth)}</div>
        <div className="text-xs text-purple-300/60 font-mono">YEARLY: {formatCurrency(totalYearlyThrust)}</div>
      </div>

      {/* Portfolio Value */}
      <div className="relative bg-black/40 border border-teal-500/30 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-teal-300/80 uppercase tracking-wide">Portfolio Value</span>
          <InfoTooltip 
            metricKey="total-value" 
            isOpen={openTooltip === "total-value"}
            onToggle={() => onTooltipToggle("total-value")}
          />
        </div>
        {openTooltip === "total-value" && (
          <div className="mb-3 p-2 bg-black/80 rounded border border-teal-500/30 text-xs text-teal-300/70">
            {METRIC_DESCRIPTIONS["total-value"]}
          </div>
        )}
        <div className="text-4xl font-bold text-teal-400 font-mono mb-2">{formatCurrency(totalValue)}</div>
        <div className="text-xs text-teal-300/60 font-mono">ACTIVE ENGINES: {enginesCount}</div>
      </div>

      {/* Performance Bars */}
      <div className="relative bg-black/40 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm">
        <div className="text-xs text-cyan-400/70 uppercase tracking-widest mb-4">Performance Metrics</div>
        <div className="space-y-4">
          {/* Engine Level */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-xs text-cyan-300/80 uppercase">Engine Level</span>
                <InfoTooltip 
                  metricKey="avg-engine-level" 
                  isOpen={openTooltip === "avg-engine-level"}
                  onToggle={() => onTooltipToggle("avg-engine-level")}
                />
              </div>
              <span className="text-sm font-bold text-cyan-400 font-mono">{avgEngineLevel}%</span>
            </div>
            {openTooltip === "avg-engine-level" && (
              <div className="mb-2 p-2 bg-black/80 rounded border border-cyan-500/30 text-xs text-cyan-300/70">
                {METRIC_DESCRIPTIONS["avg-engine-level"]}
              </div>
            )}
            <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-cyan-500/20">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-700 shadow-[0_0_6px_rgba(6,182,212,0.6)]"
                style={{ width: `${avgEngineLevel}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-cyan-300/50">
              <span>BASELINE</span>
              <span>NUCLEAR</span>
            </div>
          </div>

          {/* Thrust Reliability */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-xs text-indigo-300/80 uppercase">Reliability</span>
                <InfoTooltip 
                  metricKey="thrust-reliability" 
                  isOpen={openTooltip === "thrust-reliability"}
                  onToggle={() => onTooltipToggle("thrust-reliability")}
                />
              </div>
              <span className="text-sm font-bold text-indigo-400 font-mono">{thrustReliability}%</span>
            </div>
            {openTooltip === "thrust-reliability" && (
              <div className="mb-2 p-2 bg-black/80 rounded border border-indigo-500/30 text-xs text-indigo-300/70">
                {METRIC_DESCRIPTIONS["thrust-reliability"]}
              </div>
            )}
            <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-indigo-500/20">
              <div 
                className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-700 shadow-[0_0_6px_rgba(99,102,241,0.6)]"
                style={{ width: `${thrustReliability}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-indigo-300/50">
              <span>VARIABLE</span>
              <span>ULTRA-STABLE</span>
            </div>
          </div>

          {/* Energy Efficiency */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-xs text-violet-300/80 uppercase">Efficiency</span>
                <InfoTooltip 
                  metricKey="average-eec" 
                  isOpen={openTooltip === "average-eec"}
                  onToggle={() => onTooltipToggle("average-eec")}
                />
              </div>
              <span className="text-sm font-bold text-violet-400 font-mono">{avgEEC}%</span>
            </div>
            {openTooltip === "average-eec" && (
              <div className="mb-2 p-2 bg-black/80 rounded border border-violet-500/30 text-xs text-violet-300/70">
                {METRIC_DESCRIPTIONS["average-eec"]}
              </div>
            )}
            <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-violet-500/20">
              <div 
                className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-all duration-700 shadow-[0_0_6px_rgba(139,92,246,0.6)]"
                style={{ width: `${avgEEC}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-violet-300/50">
              <span>INEFFICIENT</span>
              <span>ULTRA-EFFICIENT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

