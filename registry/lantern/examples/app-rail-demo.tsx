"use client";

import * as React from "react";
import {
  BoxIcon,
  CodeIcon,
  GridIcon,
  HammerIcon,
  ListChecksIcon,
  MapIcon,
  SettingsIcon,
  SquareTerminalIcon,
} from "lucide-react";

import { AppRail, AppRailContent, AppRailFooter, AppRailItem } from "@/registry/lantern/ui/app-rail";

const items = [
  { label: "Map", icon: MapIcon },
  { label: "Programs", icon: CodeIcon },
  { label: "Jobs", icon: ListChecksIcon },
  { label: "Build", icon: HammerIcon },
  { label: "Storage", icon: BoxIcon },
  { label: "Craft", icon: GridIcon },
  { label: "Console", icon: SquareTerminalIcon },
];

export default function AppRailDemo() {
  const [active, setActive] = React.useState("Map");

  return (
    <div className="flex h-[520px] w-full max-w-md overflow-hidden rounded-lg border bg-background">
      <AppRail aria-label="Workspaces">
        <AppRailContent>
          {items.map((item) => (
            <AppRailItem key={item.label} isActive={active === item.label} onClick={() => setActive(item.label)}>
              <item.icon />
              <span>{item.label}</span>
            </AppRailItem>
          ))}
        </AppRailContent>
        <AppRailFooter>
          <AppRailItem isActive={active === "Settings"} onClick={() => setActive("Settings")}>
            <SettingsIcon />
            <span>Settings</span>
          </AppRailItem>
        </AppRailFooter>
      </AppRail>
      <div className="flex flex-1 flex-col gap-2 bg-grid p-5">
        <span className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">Workspace</span>
        <span className="font-display text-2xl font-medium tracking-tight">
          {active}
          <span className="text-primary">.</span>
        </span>
      </div>
    </div>
  );
}
