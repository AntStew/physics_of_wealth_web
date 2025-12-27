"use client";

import { useState, useMemo } from "react";
import { ETFEngine } from "@/lib/types";
import { formatCurrencyTable } from "@/lib/formatCurrency";
import { Search, ArrowUpDown, Plus, Trash2, Edit2, ArrowUp, ArrowDown, X } from "lucide-react";

interface ETFManagementSectionProps {
  engines: ETFEngine[];
}

export function ETFManagementSection({ engines }: ETFManagementSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof ETFEngine | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedEngine, setSelectedEngine] = useState<ETFEngine | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter and sort engines
  const filteredAndSortedEngines = useMemo(() => {
    let filtered = engines.filter(engine =>
      engine.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engine.engineType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engine.distributionStabilityIndex.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = String(aVal || "").toLowerCase();
        const bStr = String(bVal || "").toLowerCase();
        
        if (sortDirection === "asc") {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }

    return filtered;
  }, [engines, searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof ETFEngine) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortButton = ({ field, label }: { field: keyof ETFEngine; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 text-cyan-300/70 hover:text-cyan-300 transition-colors"
    >
      {label}
      {sortField === field ? (
        sortDirection === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-50" />
      )}
    </button>
  );

  return (
    <div className="mt-8">
      <div className="relative bg-gradient-to-br from-slate-900/95 via-black/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3),inset_0_0_50px_rgba(6,182,212,0.1)] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-cyan-500/30">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-cyan-400/90 uppercase tracking-wider mb-1">
                ETF Portfolio Management
              </h2>
              <p className="text-sm text-cyan-300/60 font-mono">
                {engines.length} Engines Active
              </p>
            </div>
            
            {/* Search and Add */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400/60" />
                <input
                  type="text"
                  placeholder="Search ETFs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-300 placeholder-cyan-300/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-lg text-cyan-300 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-semibold">Add ETF</span>
              </button>
            </div>
          </div>
        </div>

        {/* ETF Table */}
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto scrollbar-cyan">
          <table className="w-full">
            <thead className="sticky top-0 bg-gradient-to-br from-slate-900/98 via-black/98 to-slate-900/98 backdrop-blur-sm z-10 border-b border-cyan-500/20">
              <tr className="border-b border-cyan-500/20">
                <th className="px-4 py-3 text-center">
                  <span className="text-cyan-300/70">Actions</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <SortButton field="ticker" label="Ticker" />
                </th>
                <th className="px-4 py-3 text-left">
                  <SortButton field="engineType" label="Type" />
                </th>
                <th className="px-4 py-3 text-left">
                  <SortButton field="shares" label="Shares" />
                </th>
                <th className="px-4 py-3 text-left">
                  <SortButton field="currentValue" label="Value" />
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-cyan-300/70">Monthly Income</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-cyan-300/70">Dividend Yield</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-cyan-300/70">Dividend Yield %</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <SortButton field="frequency" label="Frequency" />
                </th>
                <th className="px-4 py-3 text-left">
                  <SortButton field="distributionStabilityIndex" label="DSI" />
                </th>
                <th className="px-4 py-3 text-left">
                  <SortButton field="engineEnergyCost" label="EEC" />
                </th>
                <th className="px-4 py-3 text-left">
                  <SortButton field="escapeRatio" label="ER" />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedEngines.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-cyan-300/60">
                    No ETFs found
                  </td>
                </tr>
              ) : (
                filteredAndSortedEngines.map((engine, index) => {
                  const monthlyIncome = engine.yearlyThrust / 12;
                  const dividendYield = engine.yearlyThrust;
                  const dividendYieldPercent = engine.currentValue > 0 
                    ? (engine.yearlyThrust / engine.currentValue) * 100 
                    : 0;
                  
                  return (
                  <tr
                    key={`${engine.ticker}-${index}`}
                    className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedEngine(engine)}
                          className="p-1.5 hover:bg-cyan-500/20 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4 text-cyan-400" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove ${engine.ticker} from portfolio?`)) {
                              // TODO: Implement remove functionality
                              console.log("Remove:", engine.ticker);
                            }
                          }}
                          className="p-1.5 hover:bg-red-500/20 rounded transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-mono font-bold text-cyan-400">{engine.ticker}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono uppercase">
                        {engine.engineType?.replace(" Propulsion", "") || engine.geqs}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-cyan-300/80 font-mono">
                      {engine.shares.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-cyan-300/80 font-mono">
                      {formatCurrencyTable(engine.currentValue)}
                    </td>
                    <td className="px-4 py-3 text-cyan-300/80 font-mono">
                      {formatCurrencyTable(monthlyIncome)}
                    </td>
                    <td className="px-4 py-3 text-cyan-300/80 font-mono">
                      {formatCurrencyTable(dividendYield)}
                    </td>
                    <td className="px-4 py-3 text-cyan-300/80 font-mono">
                      {dividendYieldPercent.toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-cyan-300/70 text-sm font-mono uppercase">
                      {engine.frequency}
                    </td>
                    <td className="px-4 py-3 text-cyan-300/70 text-sm">
                      {engine.distributionStabilityIndex}
                    </td>
                    <td className="px-4 py-3 text-cyan-300/70 text-sm">
                      {engine.engineEnergyCost}
                    </td>
                    <td className="px-4 py-3 text-cyan-300/70 text-sm font-mono">
                      {engine.escapeRatio}
                    </td>
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || selectedEngine) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 via-black to-slate-900 rounded-2xl border-2 border-cyan-500/40 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-cyan-400 uppercase">
                {selectedEngine ? "Edit ETF" : "Add New ETF"}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedEngine(null);
                }}
                className="text-cyan-300/60 hover:text-cyan-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-cyan-300/70 text-sm">
              <p className="mb-4">ETF management functionality will be implemented here.</p>
              <p className="text-xs text-cyan-300/50">
                This would include forms to add/edit ETF details and connect to your data source.
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedEngine(null);
                }}
                className="px-4 py-2 border border-cyan-500/30 rounded-lg text-cyan-300 hover:bg-cyan-500/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // TODO: Implement save functionality
                  setShowAddModal(false);
                  setSelectedEngine(null);
                }}
                className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-lg text-cyan-300 transition-colors"
              >
                {selectedEngine ? "Update" : "Add"} ETF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

