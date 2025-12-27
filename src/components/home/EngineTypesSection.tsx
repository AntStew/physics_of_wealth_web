"use client";

import { EngineType } from "@/lib/types";
import { getEngineTypeCharacteristics } from "@/lib/calculations";

export function EngineTypesSection() {
  const engineTypes = [
    EngineType.NUCLEAR,
    EngineType.ELITE,
    EngineType.STABILIZED,
    EngineType.BASELINE,
    EngineType.WIND_DEPENDENT,
  ];

  const getTypeGradient = (type: EngineType) => {
    const gradients = {
      [EngineType.NUCLEAR]: "from-red-500 to-orange-500",
      [EngineType.ELITE]: "from-blue-500 to-cyan-500",
      [EngineType.STABILIZED]: "from-green-500 to-emerald-500",
      [EngineType.BASELINE]: "from-gray-500 to-slate-500",
      [EngineType.WIND_DEPENDENT]: "from-yellow-500 to-amber-500",
    };
    return gradients[type] || "from-zinc-500 to-zinc-600";
  };

  const getThrustLevel = (type: EngineType) => {
    const levels = {
      [EngineType.NUCLEAR]: "Ultra-High",
      [EngineType.ELITE]: "High",
      [EngineType.STABILIZED]: "Moderate",
      [EngineType.BASELINE]: "Low",
      [EngineType.WIND_DEPENDENT]: "Variable",
    };
    return levels[type] || "Unknown";
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-6 text-cyan-400/90 uppercase tracking-wider">Physics of Wealth Definitions</h2>
      
      {/* Main Description Widget */}
      <div className="relative bg-gradient-to-br from-slate-900/95 via-black/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3),inset_0_0_50px_rgba(6,182,212,0.1)] overflow-hidden p-6 mb-6">
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
          <h3 className="text-2xl font-bold mb-4 text-cyan-400/90">ETF Engine</h3>
          <p className="text-cyan-300/80 text-lg leading-relaxed">
            An ETF engine is a classification system that categorizes exchange-traded funds based on their 
            performance characteristics, distribution patterns, and risk profiles. Each engine type represents 
            a distinct propulsion mechanism for portfolio growth, with unique attributes including default yield, 
            NAV drag, and thrust capabilities. Understanding engine types helps investors optimize their portfolio 
            composition for desired outcomes, whether seeking maximum acceleration, stability, or balanced growth.
          </p>
        </div>
      </div>

      {/* ER, DSI, EEC Definition Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative bg-gradient-to-br from-slate-900/95 via-black/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3),inset_0_0_50px_rgba(6,182,212,0.1)] overflow-hidden p-6 hover:border-cyan-400/60 transition-all duration-300">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.1) 2px, rgba(6,182,212,0.1) 4px),
                             repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(6,182,212,0.1) 2px, rgba(6,182,212,0.1) 4px)`,
            backgroundSize: '40px 40px'
          }}></div>
          <div className="relative">
            <h3 className="text-cyan-400/90 font-bold text-lg mb-3">ER (Escape Ratio)</h3>
            <p className="text-cyan-300/80 text-sm leading-relaxed">
              A metric that measures the efficiency of capital deployment, indicating how effectively an engine 
              converts invested capital into distribution income. Higher escape ratios suggest more efficient 
              capital utilization and better income generation relative to portfolio value.
            </p>
          </div>
        </div>
        <div className="relative bg-gradient-to-br from-slate-900/95 via-black/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3),inset_0_0_50px_rgba(6,182,212,0.1)] overflow-hidden p-6 hover:border-cyan-400/60 transition-all duration-300">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.1) 2px, rgba(6,182,212,0.1) 4px),
                             repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(6,182,212,0.1) 2px, rgba(6,182,212,0.1) 4px)`,
            backgroundSize: '40px 40px'
          }}></div>
          <div className="relative">
            <h3 className="text-cyan-400/90 font-bold text-lg mb-3">DSI (Distribution Stability Index)</h3>
            <p className="text-cyan-300/80 text-sm leading-relaxed">
              An assessment of the consistency and predictability of distribution payments over time. Engines with 
              higher DSI ratings (Ultra-Stable, Stable) provide more reliable income streams, while moderate ratings 
              indicate some variability in distribution patterns.
            </p>
          </div>
        </div>
        <div className="relative bg-gradient-to-br from-slate-900/95 via-black/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3),inset_0_0_50px_rgba(6,182,212,0.1)] overflow-hidden p-6 hover:border-cyan-400/60 transition-all duration-300">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.1) 2px, rgba(6,182,212,0.1) 4px),
                             repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(6,182,212,0.1) 2px, rgba(6,182,212,0.1) 4px)`,
            backgroundSize: '40px 40px'
          }}></div>
          <div className="relative">
            <h3 className="text-cyan-400/90 font-bold text-lg mb-3">EEC (Engine Energy Cost)</h3>
            <p className="text-cyan-300/80 text-sm leading-relaxed">
              A measure of the operational efficiency of an engine, reflecting the cost-to-benefit ratio of maintaining 
              the position. Engines with higher efficiency ratings (Ultra-Efficient, Efficient) generate more thrust 
              relative to their maintenance costs, making them more cost-effective for long-term portfolio growth.
            </p>
          </div>
        </div>
      </div>

      {/* Engine Type Definition Widgets - Horizontal Scrollable */}
      <div className="w-screen -ml-[calc(50vw-50%)] overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 py-4 px-4 md:px-6 lg:px-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {engineTypes.map((type) => {
            const characteristics = getEngineTypeCharacteristics(type);

            return (
              <div
                key={type}
                className="flex-shrink-0 w-80 relative bg-gradient-to-br from-slate-900/95 via-black/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3),inset_0_0_50px_rgba(6,182,212,0.1)] hover:border-cyan-400/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Hexagonal Pattern Overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.1) 2px, rgba(6,182,212,0.1) 4px),
                                   repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(6,182,212,0.1) 2px, rgba(6,182,212,0.1) 4px)`,
                  backgroundSize: '40px 40px'
                }}></div>
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400/60"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-400/60"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-400/60"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400/60"></div>
                <div className="relative">
                {/* Header with gradient background */}
                <div className={`bg-gradient-to-br ${getTypeGradient(type)} p-6 border-b-2 border-cyan-500/30`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-5xl drop-shadow-lg">{characteristics.emoji}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{type}</h3>
                      <p className="text-sm text-white/90 font-medium">
                        {getThrustLevel(type)} Thrust
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-cyan-300/80 leading-relaxed text-sm">
                    {characteristics.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-cyan-500/30">
                    <div className="bg-black/40 rounded-lg p-3 border border-cyan-500/30">
                      <div className="text-xs text-cyan-300/70 mb-1">Default Yield</div>
                      <div className="text-xl font-bold text-cyan-400">{characteristics.defaultYield}%</div>
                    </div>
                    <div className="bg-black/40 rounded-lg p-3 border border-cyan-500/30">
                      <div className="text-xs text-cyan-300/70 mb-1">NAV Drag</div>
                      <div className="text-xl font-bold text-cyan-400">{(characteristics.defaultNavDrag * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            );
          })}
          {/* Spacer for end padding */}
          <div className="flex-shrink-0 w-4"></div>
        </div>
      </div>
    </section>
  );
}

