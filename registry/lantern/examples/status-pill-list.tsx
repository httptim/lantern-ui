import { BotIcon } from "lucide-react";

import { StatusPill } from "@/registry/lantern/ui/status-pill";

const turtles = [
  { name: "Miner 01", job: "Strip mine y=-54", tone: "running" as const, label: "Running" },
  { name: "Farmer", job: "Wheat field", tone: "online" as const, label: "Online" },
  { name: "Builder", job: "No job", tone: "idle" as const, label: "Idle" },
  { name: "Scout", job: "Last seen 2h ago", tone: "offline" as const, label: "Offline" },
];

export default function StatusPillList() {
  return (
    <ul className="w-full max-w-md divide-y divide-border rounded-lg border bg-card">
      {turtles.map((t) => (
        <li key={t.name} className="flex items-center gap-3 px-4 py-3">
          <BotIcon className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{t.name}</div>
            <div className="truncate font-mono text-[11px] text-muted-foreground">{t.job}</div>
          </div>
          <StatusPill tone={t.tone} className="ml-auto">
            {t.label}
          </StatusPill>
        </li>
      ))}
    </ul>
  );
}
