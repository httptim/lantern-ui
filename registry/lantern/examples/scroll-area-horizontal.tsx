import { CpuIcon, HardDriveIcon, MonitorIcon, RadioTowerIcon, ServerIcon, TerminalSquareIcon } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/registry/lantern/ui/scroll-area";

const hubs = [
  { name: "North hub", owner: "miner-02", icon: ServerIcon },
  { name: "Relay tower", owner: "computer 17", icon: RadioTowerIcon },
  { name: "Turtle yard", owner: "farmer-07", icon: CpuIcon },
  { name: "Archive", owner: "computer 58", icon: HardDriveIcon },
  { name: "Arcade", owner: "computer 9", icon: MonitorIcon },
  { name: "Shell club", owner: "computer 33", icon: TerminalSquareIcon },
];

export default function ScrollAreaHorizontal() {
  return (
    <ScrollArea className="w-full max-w-md rounded-lg border bg-card whitespace-nowrap">
      <div className="flex w-max gap-4 p-4">
        {hubs.map((hub) => (
          <figure key={hub.name} className="w-40 shrink-0">
            <div className="flex h-28 items-center justify-center rounded-md border bg-accent bg-grid text-[#b7ca9e]">
              <hub.icon className="size-9 stroke-[1.25]" />
            </div>
            <figcaption className="mt-2">
              <div className="font-display text-sm font-medium">{hub.name}</div>
              <div className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">{hub.owner}</div>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
