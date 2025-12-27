"use client";

import { useState } from "react";
import { CircularGauge } from "./CircularGauge";
import { InfoTooltip } from "./InfoTooltip";
import { METRIC_DESCRIPTIONS, getHealthStatus, getIntegrityStatus } from "../utils/metrics";

interface CoreMetricsSectionProps {
  overallHealth: number;
  engineIntegrity: number;
  openTooltip: string | null;
  onTooltipToggle: (key: string) => void;
}

export function CoreMetricsSection({
  overallHealth,
  engineIntegrity,
  openTooltip,
  onTooltipToggle,
}: CoreMetricsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-xs text-cyan-400/70 uppercase tracking-widest mb-4">Core Metrics</div>
      
      {/* Overall Health Gauge */}
      <div className="relative bg-black/40 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-cyan-300/80 uppercase tracking-wide">Overall Health</span>
          <InfoTooltip 
            metricKey="overall-health" 
            isOpen={openTooltip === "overall-health"}
            onToggle={() => onTooltipToggle("overall-health")}
          />
        </div>
        {openTooltip === "overall-health" && (
          <div className="mb-3 p-2 bg-black/80 rounded border border-cyan-500/30 text-xs text-cyan-300/70">
            {METRIC_DESCRIPTIONS["overall-health"]}
          </div>
        )}
        <div className="flex justify-center">
          <CircularGauge value={overallHealth} label="HEALTH" color="green" size={180} />
        </div>
        <div className="mt-3 text-center">
          <div className="text-sm font-mono text-green-400/90">
            {getHealthStatus(overallHealth)}
          </div>
        </div>
      </div>

      {/* Engine Integrity Gauge */}
      <div className="relative bg-black/40 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-blue-300/80 uppercase tracking-wide">Engine Integrity</span>
          <InfoTooltip 
            metricKey="engine-integrity" 
            isOpen={openTooltip === "engine-integrity"}
            onToggle={() => onTooltipToggle("engine-integrity")}
          />
        </div>
        {openTooltip === "engine-integrity" && (
          <div className="mb-3 p-2 bg-black/80 rounded border border-blue-500/30 text-xs text-blue-300/70">
            {METRIC_DESCRIPTIONS["engine-integrity"]}
          </div>
        )}
        <div className="flex justify-center">
          <CircularGauge value={engineIntegrity} label="INTEGRITY" color="blue" size={180} />
        </div>
        <div className="mt-3 text-center">
          <div className="text-sm font-mono text-blue-400/90">
            {getIntegrityStatus(engineIntegrity)}
          </div>
        </div>
      </div>
    </div>
  );
}

