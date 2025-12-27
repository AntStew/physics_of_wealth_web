"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { ETFEngine, EngineType } from "@/lib/types";
import { FlightPathSidebar, ProjectionMetrics, useFlightPathProjection } from "./flight-path";

// Lazy load Recharts component to reduce initial bundle size
const ProjectionChart = dynamic(
  () => import("./flight-path/components/ProjectionChart").then(mod => ({ default: mod.ProjectionChart })),
  {
    loading: () => (
      <div className="relative bg-black/40 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm flex flex-col h-full">
        <div className="animate-pulse">
          <div className="h-96 bg-zinc-800/50 rounded"></div>
        </div>
      </div>
    ),
    ssr: false,
  }
);

interface FlightPathViewProps {
  engines: ETFEngine[];
}

export function FlightPathView({ engines }: FlightPathViewProps) {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [engineType, setEngineType] = useState<EngineType>(EngineType.ELITE);
  const [desiredGoal, setDesiredGoal] = useState(100000);

  const { projection, chartData } = useFlightPathProjection({
    initialInvestment,
    monthlyInvestment,
    engineType,
    desiredGoal,
  });

  return (
    <div className="w-full px-2 md:px-4 space-y-8">
      {/* Title */}
      <div className="text-center mb-6 md:ml-80">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400/70 uppercase tracking-widest mb-2">
          FLIGHT PATH PROJECTION
        </h1>
        <p className="text-sm text-cyan-300/60 mt-2 mb-3">
          Projected growth with engine volatility modeling and goal timeline estimation
        </p>
        <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
      </div>

      {/* Mobile Sidebar - appears between title and graph */}
      <div className="md:hidden mb-6">
        <FlightPathSidebar
          initialInvestment={initialInvestment}
          monthlyInvestment={monthlyInvestment}
          engineType={engineType}
          desiredGoal={desiredGoal}
          onInitialInvestmentChange={setInitialInvestment}
          onMonthlyInvestmentChange={setMonthlyInvestment}
          onEngineTypeChange={setEngineType}
          onDesiredGoalChange={setDesiredGoal}
        />
      </div>

      {/* Main Content */}
      <div className="relative min-h-[600px]">
        {/* Fixed Sidebar - Desktop only */}
        <div className="hidden md:block fixed left-0 top-24 md:top-28 bottom-0 w-80 z-10 pt-4 pl-4 overflow-hidden">
          <FlightPathSidebar
            initialInvestment={initialInvestment}
            monthlyInvestment={monthlyInvestment}
            engineType={engineType}
            desiredGoal={desiredGoal}
            onInitialInvestmentChange={setInitialInvestment}
            onMonthlyInvestmentChange={setMonthlyInvestment}
            onEngineTypeChange={setEngineType}
            onDesiredGoalChange={setDesiredGoal}
          />
        </div>

        {/* Graph Area with margin for fixed sidebar on desktop */}
        <div className="md:ml-80 min-h-[600px]">
          <ProjectionMetrics projection={projection} />
          <div className="h-[600px] mt-4">
            <Suspense fallback={
              <div className="relative bg-black/40 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm flex flex-col h-full">
                <div className="animate-pulse">
                  <div className="h-96 bg-zinc-800/50 rounded"></div>
                </div>
              </div>
            }>
              <ProjectionChart chartData={chartData} engineType={engineType} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
