"use client";

import * as React from "react";
import { TerminalSquareIcon } from "lucide-react";

import { Console, ConsoleHeader, ConsoleInput, ConsoleLine, ConsoleLines } from "@/registry/lantern/ui/console";
import { StatusDot } from "@/registry/lantern/ui/status-dot";

type Level = "info" | "system" | "error" | "input";
type Entry = { id: number; level: Level; time: string; text: string };

const replies: Record<string, { level: Level; text: string }[]> = {
  help: [
    { level: "system", text: "Commands: fuel, pos, inv, dig, home, clear, help" },
  ],
  fuel: [{ level: "info", text: "Fuel: 812 / 20000" }],
  pos: [{ level: "info", text: "Position: -142, 38, 207 facing north" }],
  inv: [{ level: "info", text: "Inventory: 41 cobblestone, 12 coal, 3 iron ore (7 of 16 slots)" }],
  dig: [
    { level: "info", text: "Dug stone at -142, 38, 206" },
    { level: "info", text: "Moved forward" },
  ],
  home: [
    { level: "system", text: "Pathing to home at 0, 64, 0" },
    { level: "error", text: "Blocked at -140, 38, 206: bedrock" },
  ],
};

function stamp(offset = 0) {
  const d = new Date(Date.UTC(2026, 0, 1, 14, 2, 10 + offset));
  return d.toISOString().slice(11, 19);
}

const initial: Entry[] = [
  { id: 1, level: "system", time: stamp(0), text: "Connected to quarry-2 (id 14)" },
  { id: 2, level: "info", time: stamp(1), text: "Mining layer 38, 212 blocks left" },
  { id: 3, level: "info", time: stamp(4), text: "Deposited 64 cobblestone into chest" },
  { id: 4, level: "error", time: stamp(9), text: "Lava found at -141, 37, 208. Skipping block." },
  { id: 5, level: "system", time: stamp(12), text: "Type help for commands" },
];

export default function ConsoleDemo() {
  const [lines, setLines] = React.useState<Entry[]>(initial);
  const nextId = React.useRef(initial.length + 1);
  const tick = React.useRef(20);

  function run(command: string) {
    const name = command.toLowerCase().split(/\s+/)[0];
    if (name === "clear") {
      setLines([]);
      return;
    }
    const out = replies[name] ?? [{ level: "error" as const, text: `Unknown command: ${name}. Try help.` }];
    const t = tick.current++;
    const add = [{ level: "input" as const, text: command }, ...out].map((line) => ({
      ...line,
      id: nextId.current++,
      time: stamp(t),
    }));
    setLines((prev) => [...prev, ...add]);
  }

  return (
    <Console className="h-80 w-full max-w-xl">
      <ConsoleHeader>
        <span className="flex items-center gap-2">
          <TerminalSquareIcon />
          quarry-2 / console
        </span>
        <span className="flex items-center gap-2">
          <StatusDot />
          Live
        </span>
      </ConsoleHeader>
      <ConsoleLines>
        {lines.map((line) => (
          <ConsoleLine key={line.id} level={line.level} time={line.time}>
            {line.text}
          </ConsoleLine>
        ))}
      </ConsoleLines>
      <ConsoleInput placeholder="Type a command, e.g. fuel" onCommand={run} />
    </Console>
  );
}
