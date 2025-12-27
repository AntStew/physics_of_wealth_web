"use client";

import { ETFEngine, EngineType } from "@/lib/types";
import { getEngineTypeBreakdown } from "../utils/metrics";

interface EngineTypeBarChartProps {
  engines: ETFEngine[];
}

export function EngineTypeBarChart({ engines }: EngineTypeBarChartProps) {
  const breakdown = getEngineTypeBreakdown(engines);
  const total = engines.length || 1;
  const colors: Record<string, { fill: string; glow: string; name: string }> = {
    [EngineType.NUCLEAR]: { fill: "#ef4444", glow: "rgba(239,68,68,0.6)", name: "NUCLEAR" },
    [EngineType.ELITE]: { fill: "#3b82f6", glow: "rgba(59,130,246,0.6)", name: "ELITE" },
    [EngineType.STABILIZED]: { fill: "#10b981", glow: "rgba(16,185,129,0.6)", name: "STABILIZED" },
    [EngineType.BASELINE]: { fill: "#f59e0b", glow: "rgba(245,158,11,0.6)", name: "BASELINE" },
    [EngineType.WIND_DEPENDENT]: { fill: "#8b5cf6", glow: "rgba(139,92,246,0.6)", name: "WIND-DEP" },
    "Unknown": { fill: "#6b7280", glow: "rgba(107,114,128,0.6)", name: "UNKNOWN" }
  };
  
  const entries = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return null;
  
  const maxCount = Math.max(...entries.map(([, count]) => count), 1);
  const barHeight = 20;
  const barSpacing = 4;
  const rightLabelWidth = 80; // Space for labels on the right
  const chartWidth = 200;
  const chartHeight = entries.length * (barHeight + barSpacing) + barSpacing;
  
  return (
    <div className="w-full h-full overflow-hidden">
      <svg 
        viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
        className="w-full h-full" 
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {entries.map(([type]) => {
            const color = colors[type] || colors["Unknown"];
            return (
              <linearGradient key={type} id={`bar-gradient-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color.fill} stopOpacity="0.9" />
                <stop offset="100%" stopColor={color.fill} stopOpacity="0.6" />
              </linearGradient>
            );
          })}
        </defs>
        
        {entries.map(([type, count], index) => {
          const color = colors[type] || colors["Unknown"];
          const percentage = count / maxCount;
          const availableWidth = chartWidth - rightLabelWidth - 10;
          const barWidth = Math.max(percentage * availableWidth, 2);
          const y = index * (barHeight + barSpacing) + barSpacing;
          const x = 5; // Start from left
          
          return (
            <g key={type}>
              {/* Glow effect behind bar */}
              <rect
                x={x - 1}
                y={y + 1}
                width={barWidth + 2}
                height={barHeight}
                rx="3"
                fill={color.glow}
                opacity="0.3"
                style={{ filter: 'blur(2px)' }}
              />
              
              {/* Main bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="3"
                fill={`url(#bar-gradient-${type})`}
                stroke={color.fill}
                strokeWidth="0.5"
                style={{ filter: `drop-shadow(0 0 3px ${color.glow})` }}
              />
              
              {/* Count and percentage label on the right */}
              <text
                x={x + barWidth + 4}
                y={y + barHeight / 2 + 3}
                className="text-[9px] fill-cyan-400 font-mono font-bold"
                dominantBaseline="middle"
              >
                {count} ({Math.round((count / total) * 100)}%)
              </text>
              
              {/* Type label on the right side of bar */}
              <text
                x={x + barWidth + 4}
                y={y + barHeight / 2 - 6}
                className="text-[8px] fill-cyan-300/80 font-mono uppercase"
                dominantBaseline="middle"
              >
                {color.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

