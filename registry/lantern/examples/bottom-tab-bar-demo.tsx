"use client";

import * as React from "react";
import { CodeIcon, EllipsisIcon, ListChecksIcon, MapIcon, SparklesIcon } from "lucide-react";

import { BottomTabBar, BottomTabBarItem } from "@/registry/lantern/ui/bottom-tab-bar";

const tabs = [
  { label: "Map", icon: MapIcon },
  { label: "Programs", icon: CodeIcon },
  { label: "Jobs", icon: ListChecksIcon },
  { label: "AI", icon: SparklesIcon },
  { label: "More", icon: EllipsisIcon },
];

export default function BottomTabBarDemo() {
  const [active, setActive] = React.useState("Map");

  return (
    <div className="flex h-[440px] w-full max-w-[375px] flex-col overflow-hidden rounded-lg border bg-background">
      <div className="flex flex-1 flex-col gap-2 bg-grid p-5">
        <span className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">Testy</span>
        <span className="font-display text-2xl font-medium tracking-tight">
          {active}
          <span className="text-primary">.</span>
        </span>
      </div>
      <BottomTabBar aria-label="Sections">
        {tabs.map((tab) => (
          <BottomTabBarItem key={tab.label} isActive={active === tab.label} onClick={() => setActive(tab.label)}>
            <tab.icon />
            <span>{tab.label}</span>
          </BottomTabBarItem>
        ))}
      </BottomTabBar>
    </div>
  );
}
