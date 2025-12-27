"use client";

import { ETFEngine } from "@/lib/types";
import { formatCurrencyTable } from "@/lib/formatCurrency";

interface EngineCardProps {
  engine: ETFEngine;
  rank?: number;
}

export function EngineCard({ engine, rank }: EngineCardProps) {
  return (
    <div className="flex items-start gap-3">
      {rank && (
        <span className="text-2xl font-bold text-blue-400 flex-shrink-0 pt-1">
          #{rank}
        </span>
      )}
      <div className="flex-1 p-3 bg-white/15 dark:bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-[0_4px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-white">{engine.ticker}</span>
          <span className="text-sm font-medium text-green-400">
            {formatCurrencyTable(engine.yearlyThrust)}
          </span>
        </div>
        <div className="text-xs text-zinc-300 space-y-1">
          <div>Value: {formatCurrencyTable(engine.currentValue)}</div>
          <div>ER: {engine.escapeRatio}</div>
          <div>DSI: {engine.distributionStabilityIndex}</div>
        </div>
      </div>
    </div>
  );
}

