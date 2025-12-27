"use client";

import { memo } from "react";
import { ETFEngine } from "@/lib/types";
import { TopEnginesByTypeSection } from "./TopEnginesByTypeSection";
import { EngineTypesSection } from "./EngineTypesSection";
import { EngineDatabase } from "./EngineDatabase";
import { TopMoversSection } from "./TopMoversSection";

interface HomeViewProps {
  engines: ETFEngine[];
}

function HomeViewComponent({ engines }: HomeViewProps) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Definition of each Engine Types */}
      <div id="definitions" className="scroll-mt-32">
        <EngineTypesSection />
      </div>

      {/* Top ETF Engines by Type and Classification - Side by Side */}
      <div id="top-performers" className="scroll-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <TopEnginesByTypeSection engines={engines} />
          <TopMoversSection engines={engines} />
        </div>
      </div>

      {/* List of ETF Engines Database and Characteristics */}
      <div id="database" className="scroll-mt-32">
        <EngineDatabase engines={engines} />
      </div>
    </div>
  );
}

export const HomeView = memo(HomeViewComponent);

