"use client";

import { Info } from "lucide-react";

interface InfoTooltipProps {
  metricKey: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function InfoTooltip({ metricKey, isOpen, onToggle }: InfoTooltipProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="text-cyan-400/60 hover:text-cyan-300 transition-all ml-2 hover:scale-110"
      aria-label="Show metric information"
    >
      <Info className="w-4 h-4 drop-shadow-[0_0_4px_rgba(6,182,212,0.5)]" />
    </button>
  );
}

