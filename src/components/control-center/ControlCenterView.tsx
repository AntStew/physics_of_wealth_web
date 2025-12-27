"use client";

import { memo } from "react";
import { ETFEngine } from "@/lib/types";
import { RocketshipView } from "./RocketshipView";
import { FlightLogView } from "./FlightLogView";
import { FlightPathView } from "./FlightPathView";

type ControlTabType = "rocketship" | "flight-log" | "flight-path";

interface ControlCenterViewProps {
  engines: ETFEngine[];
  activeTab: ControlTabType;
}

function ControlCenterViewComponent({ engines, activeTab }: ControlCenterViewProps) {
  return (
    <div className="w-full">
      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === "rocketship" && <RocketshipView engines={engines} />}
        {activeTab === "flight-log" && <FlightLogView engines={engines} />}
        {activeTab === "flight-path" && <FlightPathView engines={engines} />}
      </div>
    </div>
  );
}

export const ControlCenterView = memo(ControlCenterViewComponent);

