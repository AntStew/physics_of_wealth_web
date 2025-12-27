"use client";

import { useState, useEffect } from "react";
import { ETFEngine, EngineType } from "@/lib/types";
import { groupEnginesByType, generateDividendYield } from "@/lib/dataTransform";
import { getEngineTypeCharacteristics } from "@/lib/calculations";

interface TopEnginesByTypeSectionProps {
  engines: ETFEngine[];
}

export function TopEnginesByTypeSection({ engines }: TopEnginesByTypeSectionProps) {
  const [selectedType, setSelectedType] = useState<EngineType | null>(null);
  const enginesByType = groupEnginesByType(engines);
  
  // Sort engines by yearlyThrust for each type
  const sortedEnginesByType: Record<EngineType, ETFEngine[]> = {} as Record<EngineType, ETFEngine[]>;
  Object.entries(enginesByType).forEach(([type, typeEngines]) => {
    sortedEnginesByType[type as EngineType] = [...typeEngines].sort((a, b) => b.yearlyThrust - a.yearlyThrust);
  });

  const engineTypes = [
    EngineType.NUCLEAR,
    EngineType.ELITE,
    EngineType.STABILIZED,
    EngineType.BASELINE,
    EngineType.WIND_DEPENDENT,
  ];

  const getEngineTypeVisual = (type: EngineType) => {
    const visuals = {
      [EngineType.NUCLEAR]: "☢️",
      [EngineType.ELITE]: "🚀",
      [EngineType.STABILIZED]: "⚖️",
      [EngineType.BASELINE]: "🏗️",
      [EngineType.WIND_DEPENDENT]: "🌬️",
    };
    return visuals[type] || "⚙️";
  };

  const getEngineTypeColor = (type: EngineType) => {
    const colors = {
      [EngineType.NUCLEAR]: "from-red-500 to-orange-500",
      [EngineType.ELITE]: "from-blue-500 to-cyan-500",
      [EngineType.STABILIZED]: "from-green-500 to-emerald-500",
      [EngineType.BASELINE]: "from-gray-500 to-slate-500",
      [EngineType.WIND_DEPENDENT]: "from-yellow-500 to-amber-500",
    };
    return colors[type] || "from-zinc-500 to-zinc-600";
  };

  const getEngineTypeBorderColor = (type: EngineType) => {
    const colors = {
      [EngineType.NUCLEAR]: "border-red-500/50",
      [EngineType.ELITE]: "border-blue-500/50",
      [EngineType.STABILIZED]: "border-green-500/50",
      [EngineType.BASELINE]: "border-gray-500/50",
      [EngineType.WIND_DEPENDENT]: "border-yellow-500/50",
    };
    return colors[type] || "border-white/20";
  };

  const getTypeDisplayName = (type: EngineType) => {
    return type.replace(" Propulsion", "").replace("Wind-Dependent", "Wind Dependent");
  };

  // Auto-select first available type on mount
  useEffect(() => {
    if (!selectedType) {
      const firstAvailableType = engineTypes.find(type => sortedEnginesByType[type]?.length > 0);
      if (firstAvailableType) {
        setSelectedType(firstAvailableType);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get engines for selected type (top 5 only)
  const displayedEngines = selectedType 
    ? (sortedEnginesByType[selectedType] || []).slice(0, 5)
    : [];

  return (
    <section className="mb-16">
      <div className="relative bg-gradient-to-br from-slate-900/95 via-black/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3),inset_0_0_50px_rgba(6,182,212,0.1)] overflow-hidden p-6">
        {/* Hexagonal Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.1) 2px, rgba(6,182,212,0.1) 4px),
                           repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(6,182,212,0.1) 2px, rgba(6,182,212,0.1) 4px)`,
          backgroundSize: '40px 40px'
        }} />
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400/60"></div>
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-400/60"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-400/60"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-400/60"></div>
        <div className="relative">
          <h2 className="text-xl font-bold mb-4 text-cyan-400/90 uppercase tracking-wider">Top ETF Engines by Type</h2>
        
        {/* Engine Type Buttons */}
        <div className="relative z-10 flex flex-wrap gap-2 mb-4">
          {engineTypes.map((type) => {
            const typeEngines = sortedEnginesByType[type] || [];
            const isSelected = selectedType === type;
            const hasEngines = typeEngines.length > 0;
            
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                disabled={!hasEngines}
                className={`
                  px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300
                  flex items-center gap-1.5 relative overflow-hidden
                  ${isSelected 
                    ? `bg-gradient-to-r ${getEngineTypeColor(type)} text-white shadow-[0_4px_12px_rgba(0,0,0,0.4)] scale-105` 
                    : hasEngines
                      ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                      : 'bg-white/5 text-zinc-500 border border-white/10 cursor-not-allowed opacity-50'
                  }
                `}
                style={isSelected ? {
                  boxShadow: `0 4px 16px rgba(0, 0, 0, 0.4), 0 0 20px ${getEngineTypeColor(type).includes('red') ? 'rgba(239, 68, 68, 0.3)' : getEngineTypeColor(type).includes('blue') ? 'rgba(59, 130, 246, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
                } : {}}
              >
                <span className="text-base">{getEngineTypeVisual(type)}</span>
                <span className="font-semibold">{getTypeDisplayName(type)}</span>
              </button>
            );
          })}
        </div>

        {/* Tickers List with Ranks */}
        {displayedEngines.length > 0 && (
          <div className="relative z-10 space-y-2">
            {displayedEngines.map((engine, index) => {
              // Generate dividend yield
              const dividendYield = generateDividendYield(engine).toFixed(2);
              
              return (
                <div
                  key={`${engine.ticker}-${index}`}
                  className={`group relative overflow-hidden p-3 bg-gradient-to-br from-white/15 via-white/10 to-white/5 dark:from-black/30 dark:via-black/20 dark:to-black/10 backdrop-blur-xl rounded-lg border ${selectedType ? getEngineTypeBorderColor(selectedType) : "border-white/30"} hover:border-white/50 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-all duration-300`}
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  }}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedType ? getEngineTypeColor(selectedType) : "from-blue-500 to-cyan-500"} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />
                  {/* Subtle diagonal pattern */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px)'
                  }} />
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedType ? getEngineTypeColor(selectedType) : "from-blue-500 to-cyan-500"} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* Compact View */}
                    <div className="flex items-center gap-3">
                      {/* Rank Badge */}
                      <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-br ${selectedType ? getEngineTypeColor(selectedType) : "from-blue-500 to-cyan-500"} rounded-lg text-white font-bold text-sm shadow-[0_2px_8px_rgba(0,0,0,0.3)]`}>
                        #{index + 1}
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            <span className="font-bold text-cyan-400 text-base tracking-tight font-mono">{engine.ticker}</span>
                            <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-xs font-semibold rounded border border-cyan-500/30 whitespace-nowrap">
                              Yield: {dividendYield}%
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-cyan-400 font-mono">
                              ${engine.currentValue.toFixed(2)}
                            </div>
                            <div className="text-xs text-cyan-300/60">Value</div>
                          </div>
                        </div>
                        
                        {/* Stats Row */}
                        <div className="flex items-center gap-3 text-xs">
                          <div className="flex items-center gap-1">
                            <span className="text-cyan-300/60">DSI:</span>
                            <span className="text-cyan-300/80 font-medium truncate max-w-[100px]">{engine.distributionStabilityIndex}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-cyan-300/60">EEC:</span>
                            <span className="text-cyan-300/80 font-medium truncate max-w-[100px]">{engine.engineEnergyCost}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded View on Hover */}
                    <div className="max-h-0 overflow-hidden group-hover:max-h-96 group-hover:mt-3 transition-all duration-300 border-t border-cyan-500/30 pt-3 mt-0">
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <div className="text-cyan-300/60 mb-1">Yearly Thrust</div>
                          <div className="text-cyan-300/80 font-semibold font-mono">${engine.yearlyThrust.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-cyan-300/60 mb-1">Frequency</div>
                          <div className="text-cyan-300/80 font-semibold font-mono uppercase">{engine.frequency}</div>
                        </div>
                        <div>
                          <div className="text-cyan-300/60 mb-1">Shares</div>
                          <div className="text-cyan-300/80 font-semibold font-mono">{engine.shares.toFixed(3)}</div>
                        </div>
                        <div>
                          <div className="text-cyan-300/60 mb-1">ER</div>
                          <div className="text-cyan-300/80 font-semibold font-mono">{engine.escapeRatio}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-cyan-300/60 mb-1">Engine Type</div>
                          <div className="text-cyan-300/80 font-semibold">{engine.engineType || "N/A"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        </div>
      </div>
    </section>
  );
}

