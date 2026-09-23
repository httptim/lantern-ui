"use client";

import * as React from "react";
import { TerminalSquareIcon } from "lucide-react";

import { Console, ConsoleHeader, ConsoleInput, ConsoleLine, ConsoleLines } from "@/registry/lantern/ui/console";
import { StatusDot } from "@/registry/lantern/ui/status-dot";

type Line = { id: number; level: "info" | "system" | "error" | "input"; time: string; text: string };

const initial: Line[] = [
  { id: 1, level: "system", time: "14:02:10", text: "Connected to quarry-2" },
  { id: 2, level: "info", time: "14:02:12", text: "Digging layer 11, 48 blocks left" },
  { id: 3, level: "info", time: "14:02:16", text: "Inventory 12 / 16 slots" },
  { id: 4, level: "error", time: "14:02:19", text: "Lava found at -142, 11, 87. Skipping." },
  { id: 5, level: "system", time: "14:02:24", text: "farmer-07 harvested 64 wheat" },
];

const replies: Record<string, string> = {
  help: "Commands: fuel, pos, inv, home, clear",
  fuel: "Fuel 82% (4,120 moves)",
  pos: "Position -138, 11, 90 facing north",
  inv: "Cobblestone x384, Coal x41, Iron ore x17",
  home: "Returning to base. ETA 40s.",
};

function now() {
  return new Date().toTimeString().slice(0, 8);
}

export function FleetConsole() {
  const [lines, setLines] = React.useState(initial);
  const next = React.useRef(initial.length + 1);

  function run(command: string) {
    const cmd = command.toLowerCase();
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const time = now();
    const reply = replies[cmd];
    setLines((prev) => [
      ...prev,
      { id: next.current++, level: "input", time, text: command },
      reply
        ? { id: next.current++, level: "info", time, text: reply }
        : { id: next.current++, level: "error", time, text: `Unknown command "${command}". Try help.` },
    ]);
  }

  return (
    <Console className="h-[340px]">
      <ConsoleHeader>
        <span className="flex items-center gap-2">
          <TerminalSquareIcon /> quarry-2
        </span>
        <span className="flex items-center gap-2">
          <StatusDot /> live
        </span>
      </ConsoleHeader>
      <ConsoleLines>
        {lines.map((line) => (
          <ConsoleLine key={line.id} level={line.level} time={line.time}>
            {line.text}
          </ConsoleLine>
        ))}
      </ConsoleLines>
      <ConsoleInput placeholder="Type help" aria-label="Command for quarry-2" onCommand={run} />
    </Console>
  );
}
