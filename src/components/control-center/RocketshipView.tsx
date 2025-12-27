"use client";

import { useState } from "react";
import { ETFEngine } from "@/lib/types";
import { useRocketshipMetrics } from "./rocketship/hooks/useRocketshipMetrics";
import { HUDWidget } from "./rocketship/HUDWidget";
import { ETFManagementSection } from "./rocketship/components/ETFManagementSection";

interface RocketshipViewProps {
  engines: ETFEngine[];
}

export function RocketshipView({ engines }: RocketshipViewProps) {
  const {
    portfolio,
    engineIntegrity,
    avgEngineLevel,
    thrustReliability,
    avgEEC,
    incomePerMonth,
  } = useRocketshipMetrics(engines);

  const [openTooltip, setOpenTooltip] = useState<string | null>(null);

  const handleTooltipToggle = (key: string) => {
    setOpenTooltip(openTooltip === key ? null : key);
  };

  return (
    <div className="w-full px-2 md:px-4">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400/70 uppercase tracking-widest mb-2">
          GAVEL'S CONTROL CENTER
        </h1>
        <p className="text-sm text-cyan-300/60 mt-2 mb-3">
          Real-time portfolio monitoring and engine performance analytics
        </p>
        <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
      </div>

      {/* Unified HUD Widget */}
      <HUDWidget
        engines={engines}
        overallHealth={portfolio.overallHealth}
        engineIntegrity={engineIntegrity}
        incomePerMonth={incomePerMonth}
        totalYearlyThrust={portfolio.totalYearlyThrust}
        totalValue={portfolio.totalValue}
        avgEngineLevel={avgEngineLevel}
        thrustReliability={thrustReliability}
        avgEEC={avgEEC}
        openTooltip={openTooltip}
        onTooltipToggle={handleTooltipToggle}
      />

      {/* ETF Management Section */}
      <ETFManagementSection engines={engines} />
    </div>
  );
}
