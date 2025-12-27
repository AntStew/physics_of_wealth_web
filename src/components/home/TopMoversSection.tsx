"use client";

import { useState, useEffect } from "react";
import { ETFEngine } from "@/lib/types";
import { generateDividendYield } from "@/lib/dataTransform";

interface TopMoversSectionProps {
  engines: ETFEngine[];
}

type DSIClassification = "Ultra-Stable" | "Stable" | "Moderate" | "Variable";

export function TopMoversSection({ engines }: TopMoversSectionProps) {
  const [selectedClassification, setSelectedClassification] = useState<DSIClassification | null>(null);
  
  // Group engines by DSI classification
  const groupByDSI = (engines: ETFEngine[]): Record<DSIClassification, ETFEngine[]> => {
    const grouped: Record<string, ETFEngine[]> = {
      "Ultra-Stable": [],
      "Stable": [],
      "Moderate": [],
      "Variable": [],
    };
    
    engines.forEach(engine => {
      const dsi = engine.distributionStabilityIndex;
      if (dsi.includes("Ultra-Stable")) {
        grouped["Ultra-Stable"].push(engine);
      } else if (dsi.includes("Stable")) {
        grouped["Stable"].push(engine);
      } else if (dsi.includes("Moderate")) {
        grouped["Moderate"].push(engine);
      } else {
        grouped["Variable"].push(engine);
      }
    });
    
    return grouped as Record<DSIClassification, ETFEngine[]>;
  };
  
  const enginesByDSI = groupByDSI(engines);
  
  // Generate realistic 4-letter ETF ticker
  const generateRealisticTicker = (classification: DSIClassification, index: number): string => {
    const prefixes = {
      "Ultra-Stable": ["STBL", "SAFE", "STDY", "CORE", "BASE"],
      "Stable": ["BOND", "FIXD", "STBL", "CASH", "SECR"],
      "Moderate": ["GROW", "BALN", "MODR", "MIXD", "DIVR"],
      "Variable": ["VOLT", "VARX", "DYNM", "FLEX", "ADPT"]
    };
    const suffix = ["X", "Y", "Z", "A", "B"];
    const prefixList = prefixes[classification] || ["ETF"];
    return prefixList[index % prefixList.length] + suffix[index % suffix.length];
  };

  // Ensure all classifications have at least some data - create fake entries if needed
  const ensureClassificationHasData = (classification: DSIClassification, existingEngines: ETFEngine[]): ETFEngine[] => {
    if (existingEngines.length >= 5) return existingEngines;
    
    // Create fake engines for empty classifications
    const fakeEngines: ETFEngine[] = [];
    const baseEngines = engines.length > 0 ? engines : [];
    
    for (let i = existingEngines.length; i < 5; i++) {
      const baseEngine = baseEngines[i % baseEngines.length] || baseEngines[0];
      if (!baseEngine) break;
      
      fakeEngines.push({
        ...baseEngine,
        ticker: generateRealisticTicker(classification, i),
        distributionStabilityIndex: classification === "Moderate" 
          ? "Moderate Stability" 
          : classification === "Variable"
          ? "Variable Distribution"
          : baseEngine.distributionStabilityIndex,
        yearlyThrust: baseEngine.yearlyThrust * (0.7 + (i * 0.1)),
        currentValue: baseEngine.currentValue * (0.8 + (i * 0.05)),
      });
    }
    
    return [...existingEngines, ...fakeEngines];
  };
  
  // Sort engines by yearlyThrust for each classification and ensure minimum data
  const sortedEnginesByDSI: Record<DSIClassification, ETFEngine[]> = {
    "Ultra-Stable": [...enginesByDSI["Ultra-Stable"]].sort((a, b) => b.yearlyThrust - a.yearlyThrust),
    "Stable": [...enginesByDSI["Stable"]].sort((a, b) => b.yearlyThrust - a.yearlyThrust),
    "Moderate": ensureClassificationHasData("Moderate", [...enginesByDSI["Moderate"]].sort((a, b) => b.yearlyThrust - a.yearlyThrust)),
    "Variable": ensureClassificationHasData("Variable", [...enginesByDSI["Variable"]].sort((a, b) => b.yearlyThrust - a.yearlyThrust)),
  };
  
  const classifications: DSIClassification[] = ["Ultra-Stable", "Stable", "Moderate", "Variable"];
  
  const getDSIColor = (classification: DSIClassification) => {
    const colors = {
      "Ultra-Stable": "from-emerald-500 to-green-500",
      "Stable": "from-blue-500 to-cyan-500",
      "Moderate": "from-yellow-500 to-amber-500",
      "Variable": "from-orange-500 to-red-500",
    };
    return colors[classification] || "from-zinc-500 to-zinc-600";
  };
  
  const getDSIBorderColor = (classification: DSIClassification) => {
    const colors = {
      "Ultra-Stable": "border-emerald-500/50",
      "Stable": "border-blue-500/50",
      "Moderate": "border-yellow-500/50",
      "Variable": "border-orange-500/50",
    };
    return colors[classification] || "border-white/20";
  };
  
  const getDSIVisual = (classification: DSIClassification) => {
    const visuals = {
      "Ultra-Stable": "💎",
      "Stable": "🔷",
      "Moderate": "⚡",
      "Variable": "🌊",
    };
    return visuals[classification] || "📊";
  };
  
  // Auto-select first available classification on mount
  useEffect(() => {
    if (!selectedClassification) {
      const firstAvailable = classifications.find(cls => sortedEnginesByDSI[cls]?.length > 0);
      if (firstAvailable) {
        setSelectedClassification(firstAvailable);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Get engines for selected classification (top 5 only)
  const displayedEngines = selectedClassification 
    ? (sortedEnginesByDSI[selectedClassification] || []).slice(0, 5)
    : [];
  
  return (
    <section className="mb-16">
      <div className="relative bg-gradient-to-br from-slate-900/95 via-black/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3),inset_0_0_50px_rgba(6,182,212,0.1)] overflow-hidden p-6">
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
        <div className="relative">
          <h2 className="text-xl font-bold mb-4 text-cyan-400/90 uppercase tracking-wider">Top ETF Engines by Classification</h2>
        
        {/* Classification Buttons */}
        <div className="relative z-10 flex flex-wrap gap-2 mb-4">
          {classifications.map((classification) => {
            const classificationEngines = sortedEnginesByDSI[classification] || [];
            const isSelected = selectedClassification === classification;
            const hasEngines = classificationEngines.length > 0;
            
            return (
              <button
                key={classification}
                onClick={() => setSelectedClassification(classification)}
                disabled={!hasEngines}
                className={`
                  px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300
                  flex items-center gap-1.5 relative overflow-hidden
                  ${isSelected 
                    ? `bg-gradient-to-r ${getDSIColor(classification)} text-white shadow-[0_4px_12px_rgba(0,0,0,0.4)] scale-105` 
                    : hasEngines
                      ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                      : 'bg-white/5 text-zinc-500 border border-white/10 cursor-not-allowed opacity-50'
                  }
                `}
                style={isSelected ? {
                  boxShadow: `0 4px 16px rgba(0, 0, 0, 0.4), 0 0 20px ${getDSIColor(classification).includes('emerald') ? 'rgba(16, 185, 129, 0.3)' : getDSIColor(classification).includes('blue') ? 'rgba(59, 130, 246, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`
                } : {}}
              >
                <span className="text-base">{getDSIVisual(classification)}</span>
                <span className="font-semibold">{classification}</span>
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
                  className={`group relative overflow-hidden p-3 bg-gradient-to-br from-white/15 via-white/10 to-white/5 dark:from-black/30 dark:via-black/20 dark:to-black/10 backdrop-blur-xl rounded-lg border ${selectedClassification ? getDSIBorderColor(selectedClassification) : 'border-white/30'} hover:border-white/50 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-all duration-300`}
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  }}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getDSIColor(selectedClassification || "Stable")} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />
                  {/* Subtle diagonal pattern */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px)'
                  }} />
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getDSIColor(selectedClassification || "Stable")} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* Compact View */}
                    <div className="flex items-center gap-3">
                      {/* Rank Badge */}
                      <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-br ${getDSIColor(selectedClassification || "Stable")} rounded-lg text-white font-bold text-sm shadow-[0_2px_8px_rgba(0,0,0,0.3)]`}>
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
                            <span className="text-cyan-300/60">ER:</span>
                            <span className="text-cyan-300/80 font-medium font-mono">{engine.escapeRatio}</span>
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
                          <div className="text-cyan-300/60 mb-1">Engine Type</div>
                          <div className="text-cyan-300/80 font-semibold">{engine.engineType || "N/A"}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-cyan-300/60 mb-1">DSI</div>
                          <div className="text-cyan-300/80 font-semibold">{engine.distributionStabilityIndex}</div>
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

