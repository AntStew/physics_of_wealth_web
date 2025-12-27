"use client";

import { useState, useMemo } from "react";
import { ETFEngine } from "@/lib/types";
import { filterEngines, generateDividendYield } from "@/lib/dataTransform";
import { Search, ArrowUp, ArrowDown } from "lucide-react";

interface EngineDatabaseProps {
  engines: ETFEngine[];
}

type SortField = "ticker" | "engineType" | "frequency" | "shares" | "currentValue" | "yearlyThrust" | "dividendYield" | "escapeRatio" | "distributionStabilityIndex" | "engineEnergyCost";
type SortDirection = "asc" | "desc" | null;

export function EngineDatabase({ engines }: EngineDatabaseProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const filteredEngines = filterEngines(engines, searchTerm, undefined);

  // Generate dividend yield for each engine
  const enginesWithDividendYield = useMemo(() => {
    return filteredEngines.map(engine => ({
      ...engine,
      dividendYield: generateDividendYield(engine)
    }));
  }, [filteredEngines]);

  const sortedEngines = useMemo(() => {
    if (!sortField || !sortDirection) return enginesWithDividendYield;

    return [...enginesWithDividendYield].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case "ticker":
          aValue = a.ticker.toLowerCase();
          bValue = b.ticker.toLowerCase();
          break;
        case "engineType":
          aValue = a.engineType || "";
          bValue = b.engineType || "";
          break;
        case "frequency":
          aValue = a.frequency.toLowerCase();
          bValue = b.frequency.toLowerCase();
          break;
        case "shares":
          aValue = a.shares;
          bValue = b.shares;
          break;
        case "currentValue":
          aValue = a.currentValue;
          bValue = b.currentValue;
          break;
        case "yearlyThrust":
          aValue = a.yearlyThrust;
          bValue = b.yearlyThrust;
          break;
        case "dividendYield":
          aValue = (a as any).dividendYield || 0;
          bValue = (b as any).dividendYield || 0;
          break;
        case "escapeRatio":
          aValue = a.escapeRatio;
          bValue = b.escapeRatio;
          break;
        case "distributionStabilityIndex":
          aValue = a.distributionStabilityIndex;
          bValue = b.distributionStabilityIndex;
          break;
        case "engineEnergyCost":
          aValue = a.engineEnergyCost;
          bValue = b.engineEnergyCost;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [enginesWithDividendYield, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <button
          onClick={() => handleSort(field)}
          className="ml-2 text-cyan-400/60 hover:text-cyan-300 transition-colors"
        >
          <ArrowUp className="w-4 h-4 opacity-50" />
        </button>
      );
    }
    return (
      <button
        onClick={() => handleSort(field)}
        className="ml-2 text-cyan-300"
      >
        {sortDirection === "asc" ? (
          <ArrowUp className="w-4 h-4" />
        ) : (
          <ArrowDown className="w-4 h-4" />
        )}
      </button>
    );
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-6 text-cyan-400/90 uppercase tracking-wider">ETF Database</h2>
      
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400/60" />
          <input
            type="text"
            placeholder="Search by ticker, frequency, or escape ratio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-cyan-500/40 rounded-lg bg-black/40 backdrop-blur-sm text-cyan-300 placeholder-cyan-300/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto max-h-[600px] scrollbar-cyan">
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
          <div className="relative">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-br from-slate-900/98 via-black/98 to-slate-900/98 backdrop-blur-sm border-b border-cyan-500/30">
              <th className="px-4 py-3 text-left">
                <div className="flex items-center text-cyan-300/70">
                  Ticker
                  <SortIcon field="ticker" />
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center text-cyan-300/70">
                  Type
                  <SortIcon field="engineType" />
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center text-cyan-300/70">
                  Frequency
                  <SortIcon field="frequency" />
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center text-cyan-300/70">
                  Shares
                  <SortIcon field="shares" />
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center text-cyan-300/70">
                  Value
                  <SortIcon field="currentValue" />
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center text-cyan-300/70">
                  Yearly Thrust
                  <SortIcon field="yearlyThrust" />
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center text-cyan-300/70">
                  Yield %
                  <SortIcon field="dividendYield" />
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center text-cyan-300/70">
                  ER
                  <SortIcon field="escapeRatio" />
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center text-cyan-300/70">
                  DSI
                  <SortIcon field="distributionStabilityIndex" />
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center text-cyan-300/70">
                  EEC
                  <SortIcon field="engineEnergyCost" />
                </div>
              </th>
                </tr>
              </thead>
              <tbody>
                {sortedEngines.map((engine, index) => (
                  <tr
                    key={`${engine.ticker}-${index}`}
                    className={`border-b border-cyan-500/10 ${
                      index % 2 === 1 ? "bg-black/20" : "bg-transparent"
                    } hover:bg-cyan-500/5 transition-colors`}
                  >
                    <td className="px-4 py-3 font-mono font-bold text-cyan-400">{engine.ticker}</td>
                    <td className="px-4 py-3 text-cyan-300/80">{engine.engineType || "N/A"}</td>
                    <td className="px-4 py-3 text-cyan-300/80 font-mono uppercase">{engine.frequency}</td>
                    <td className="px-4 py-3 text-cyan-300/80 font-mono">{engine.shares.toFixed(3)}</td>
                    <td className="px-4 py-3 text-cyan-300/80 font-mono">${engine.currentValue.toFixed(2)}</td>
                    <td className="px-4 py-3 font-medium text-cyan-300/80 font-mono">
                      ${engine.yearlyThrust.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 font-medium text-cyan-400 font-mono">
                      {(engine as any).dividendYield?.toFixed(2) || '0.00'}%
                    </td>
                    <td className="px-4 py-3 text-cyan-300/80 font-mono">{engine.escapeRatio}</td>
                    <td className="px-4 py-3 text-cyan-300/80">{engine.distributionStabilityIndex}</td>
                    <td className="px-4 py-3 text-cyan-300/80">{engine.engineEnergyCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

