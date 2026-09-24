"use client";

import * as React from "react";
import {
  BoxIcon,
  CodeIcon,
  Grid3x3Icon,
  HammerIcon,
  HouseIcon,
  ListChecksIcon,
  LogOutIcon,
  MapIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  SettingsIcon,
  SquareTerminalIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";

import { AccountChip, AccountChipContent, AccountChipLabel, AccountChipTrigger } from "@/registry/lantern/ui/account-chip";
import { Button } from "@/registry/lantern/ui/button";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/registry/lantern/ui/dropdown-menu";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import {
  JobCard,
  JobCardActions,
  JobCardEyebrow,
  JobCardFooter,
  JobCardHeader,
  JobCardProgress,
  JobCardStats,
  JobCardTimer,
  JobCardTitle,
} from "@/registry/lantern/ui/job-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/lantern/ui/select";
import { StatusDot } from "@/registry/lantern/ui/status-dot";
import { StatusPill } from "@/registry/lantern/ui/status-pill";
import { UsageMeter, UsageMeterGroup, UsageMeterGroupLabel } from "@/registry/lantern/ui/usage-meter";

import { turtles } from "./data";
import { Fleet } from "./fleet";
import { Inspector } from "./inspector";
import { AppShell as Shell, type AppShellNavItem } from "./shell";

const nav: AppShellNavItem[] = [
  { id: "map", label: "Map", icon: MapIcon },
  { id: "programs", label: "Programs", icon: CodeIcon },
  { id: "jobs", label: "Jobs", icon: ListChecksIcon },
  { id: "build", label: "Build", icon: HammerIcon },
  { id: "storage", label: "Storage", icon: BoxIcon },
  { id: "craft", label: "Craft", icon: Grid3x3Icon },
  { id: "swarm", label: "Swarm", icon: UsersIcon },
  { id: "console", label: "Console", icon: SquareTerminalIcon },
];
const pinned: AppShellNavItem[] = [{ id: "settings", label: "Settings", icon: SettingsIcon }];

/** TurtleDeck's dashboard built on the AppShell layout from ./shell. */
export default function AppShell() {
  const [active, setActive] = React.useState("map");
  const [selected, setSelected] = React.useState("testy");
  const turtle = turtles.find((t) => t.id === selected) ?? turtles[0];

  return (
    <Shell
      logo={<Logo />}
      context={
        <>
          <Select defaultValue="smp">
            <SelectTrigger size="sm" aria-label="World" className="hidden max-w-44 sm:flex">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="smp">Survival SMP</SelectItem>
              <SelectItem value="creative">Creative test</SelectItem>
            </SelectContent>
          </Select>
          <StatusPill tone="online" className="hidden rounded-md border px-2.5 py-1.5 xl:inline-flex">
            Relay online
          </StatusPill>
        </>
      }
      actions={
        <>
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger size="sm" aria-label="Turtle" className="border-primary font-display font-semibold md:hidden">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {turtles.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <AccountChip>
            <AccountChipTrigger name="Tim" plan="Pro" fallback="TH">
              <UsageMeterGroup aria-label="AI allowance" className="hidden xl:flex">
                <UsageMeterGroupLabel>AI allowance</UsageMeterGroupLabel>
                <UsageMeter size="compact" label="5-hour" value={32} />
                <UsageMeter size="compact" label="Week" value={18} />
              </UsageMeterGroup>
            </AccountChipTrigger>
            <AccountChipContent>
              <AccountChipLabel name="Tim" email="tim@thultz.dev" plan="Pro">
                <UsageMeter label="5-hour" value={32} reset="Resets at 3:40 pm" />
                <UsageMeter label="Week" value={18} reset="Resets Monday" />
              </AccountChipLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon /> Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOutIcon /> Sign out
              </DropdownMenuItem>
            </AccountChipContent>
          </AccountChip>
          <Button size="sm" className="hidden lg:inline-flex">
            <PlusIcon /> Link a turtle
          </Button>
        </>
      }
      nav={nav}
      pinnedNav={pinned}
      active={active}
      onNavigate={setActive}
      list={<Fleet selected={selected} onSelect={setSelected} />}
      listLabel="Fleet"
      inspector={<Inspector turtle={turtle} />}
      inspectorLabel={`${turtle.name} controls`}
    >
      {active === "map" ? (
        <MapView turtle={turtle} />
      ) : (
        <div className="flex flex-1 flex-col gap-2 bg-grid p-6">
          <Eyebrow>Workspace</Eyebrow>
          <h1 className="text-3xl font-medium tracking-tight">
            {[...nav, ...pinned].find((n) => n.id === active)?.label}
            <span className="text-primary">.</span>
          </h1>
          <p className="text-sm text-muted-foreground">Nothing here in the demo. Try the map.</p>
        </div>
      )}
    </Shell>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-1.5 font-display text-lg font-bold tracking-tight">
      turtle
      <span className="rounded-sm border border-primary px-1.5 py-0.5 font-mono text-[10px] tracking-[0.15em] text-primary">
        DECK
      </span>
    </span>
  );
}

function MapView({ turtle }: { turtle: (typeof turtles)[number] }) {
  const [paused, setPaused] = React.useState(false);
  const [startedAt] = React.useState(() => Date.now() - 252_000);

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative flex flex-1 flex-col">
        <div className="relative h-[300px] shrink-0 bg-[#0e1311] bg-grid md:h-auto md:min-h-[480px] md:flex-1">
          <TunnelMap />
          <div className="absolute top-3 left-3 flex flex-col gap-1 rounded-md border bg-card px-3 py-2 shadow-block-sm sm:top-4 sm:left-4">
            <div className="flex items-center gap-2">
              <StatusDot tone={turtle.status} />
              <span className="font-display text-[15px] font-bold">{turtle.name}</span>
              <span className="font-mono text-[10px] tracking-[0.12em] text-success uppercase">
                {turtle.status === "offline" ? "Last known" : "Live"}
              </span>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
              X {turtle.pos[0]} Y {turtle.pos[1]} Z {turtle.pos[2]} <span className="max-sm:hidden">Facing {turtle.facing}</span>
            </span>
          </div>
          <div className="absolute top-4 right-4 hidden gap-2 lg:flex">
            <Button size="sm" variant="outline">
              Ores only
            </Button>
            <Button size="sm" variant="secondary">
              Follow turtle
            </Button>
          </div>
        </div>
        <JobCard
          aria-label="Current job"
          className="m-3 sm:m-4 md:absolute md:bottom-4 md:left-1/2 md:z-10 md:m-0 md:w-[min(520px,calc(100%-2rem))] md:-translate-x-1/2"
        >
          <JobCardHeader>
            <JobCardEyebrow>{paused ? "Paused" : "Running job"}</JobCardEyebrow>
            <JobCardTitle>Strip mine, 3 branches of 32</JobCardTitle>
            <JobCardTimer startedAt={paused ? null : startedAt} seconds={252} />
          </JobCardHeader>
          <JobCardProgress value={64} aria-label="Job progress" />
          <JobCardFooter>
            <JobCardStats>
              <span>41/64 blocks</span>
              <span>Ores 7</span>
              <span>Fuel used 118</span>
            </JobCardStats>
            <JobCardActions>
              <Button size="sm" variant="secondary" onClick={() => setPaused((p) => !p)}>
                {paused ? <PlayIcon /> : <PauseIcon />}
                {paused ? "Resume" : "Pause"}
              </Button>
              <Button size="sm" variant="destructive">
                <HouseIcon /> Stop and come home
              </Button>
            </JobCardActions>
          </JobCardFooter>
        </JobCard>
      </div>
      <div className="flex h-11 shrink-0 items-center gap-3 border-t bg-card px-4">
        <Eyebrow>Console</Eyebrow>
        <span className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
          [14:02:11] Mined iron ore at 121 12 -352. Following the vein (2 blocks).
        </span>
      </div>
    </div>
  );
}

/** A top-down sketch of the tunnel: mapped blocks, the path so far and the turtle. */
function TunnelMap() {
  const cells: { x: number; y: number; fill: string }[] = [];
  for (let x = 0; x < 16; x++) {
    for (let y = 0; y < 9; y++) {
      if (y === 4 && x <= 10) continue;
      const ore = (x * 7 + y * 3) % 23 === 0 ? "#c9a98d" : (x * 5 + y * 11) % 31 === 0 ? "#8fd6cf" : null;
      cells.push({ x, y, fill: ore ?? ((x + y) % 3 ? "#2a322d" : "#323b35") });
    }
  }
  return (
    <svg
      viewBox="0 0 320 180"
      role="img"
      aria-label="Map of the tunnel, the turtle and mapped blocks"
      className="absolute inset-0 m-auto h-full max-h-[420px] w-full max-w-[760px] p-6 md:pb-40"
    >
      {cells.map((c) => (
        <rect key={`${c.x}-${c.y}`} x={c.x * 20 + 1} y={c.y * 20 + 1} width={18} height={18} rx={1} fill={c.fill} />
      ))}
      <path d="M10 90 H210" stroke="#f5a665" strokeWidth="2" />
      <path d="M210 90 H310" stroke="#f5a665" strokeWidth="2" strokeDasharray="5 6" opacity="0.6" />
      <rect x={202} y={82} width={16} height={16} rx={2} fill="#f5a665" stroke="#3a2a1c" strokeWidth="2" />
    </svg>
  );
}
