"use client";

import { Rocket, FileText, Target } from "lucide-react";
import GooeyNav from "./GooeyNav";

type ControlTabType = "rocketship" | "flight-log" | "flight-path";

interface ControlCenterNavProps {
  activeTab: ControlTabType;
  onTabChange: (tab: ControlTabType) => void;
}

export function ControlCenterNav({ activeTab, onTabChange }: ControlCenterNavProps) {
  const tabs = [
    { id: "rocketship" as ControlTabType, label: "Control Center", icon: Rocket },
    { id: "flight-log" as ControlTabType, label: "Flight Log", icon: FileText },
    { id: "flight-path" as ControlTabType, label: "Flight Path Projection", icon: Target },
  ];

  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  const items = tabs.map(tab => ({
    label: tab.label,
    href: "#"
  }));

  const handleItemClick = (index: number) => {
    onTabChange(tabs[index].id);
  };

  return (
    <nav className="fixed top-24 md:top-28 left-0 right-0 z-40 bg-transparent">
      <div className="container mx-auto px-4 py-3">
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={activeIndex}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          onItemClick={handleItemClick}
        />
      </div>
    </nav>
  );
}
