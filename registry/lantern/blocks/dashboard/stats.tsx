import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Progress } from "@/registry/lantern/ui/progress";

const stats = [
  { label: "Turtles online", value: "9 / 12", note: "3 parked at base", delta: "+2", up: true, meter: 75 },
  { label: "Blocks mined today", value: "18,204", note: "vs 15,960 yesterday", delta: "+14%", up: true, meter: 62 },
  { label: "Fuel in reserve", value: "41,300", note: "about 3 days of mining", delta: "-8%", up: false, meter: 41 },
  { label: "Hub visitors", value: "312", note: "27 guestbook entries", delta: "+31", up: true, meter: 88 },
];

export function Stats() {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-3 rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between gap-2">
            <dt className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">{stat.label}</dt>
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-mono text-[11px] tabular-nums",
                stat.up ? "text-success" : "text-destructive",
              )}
            >
              {stat.up ? <ArrowUpRightIcon className="size-3.5" /> : <ArrowDownRightIcon className="size-3.5" />}
              {stat.delta}
            </span>
          </div>
          <dd className="font-display text-3xl leading-none font-medium tracking-tight text-primary tabular-nums">{stat.value}</dd>
          <Progress value={stat.meter} size="sm" aria-label={`${stat.label} meter`} />
          <p className="text-xs text-muted-foreground">{stat.note}</p>
        </div>
      ))}
    </dl>
  );
}
