"use client";

import * as React from "react";

import { ControlPad } from "@/registry/lantern/ui/control-pad";

const calls: Record<string, string> = {
  forward: "turtle.forward()",
  back: "turtle.back()",
  up: "turtle.up()",
  down: "turtle.down()",
  turnLeft: "turtle.turnLeft()",
  turnRight: "turtle.turnRight()",
  left: "turtle.turnLeft() turtle.forward()",
  right: "turtle.turnRight() turtle.forward()",
};

export default function ControlPadDemo() {
  const [last, setLast] = React.useState<string | null>(null);
  const [count, setCount] = React.useState(0);

  return (
    <div className="grid w-full max-w-xs gap-4">
      <ControlPad
        keyboard="page"
        onAction={(id) => {
          setLast(id);
          setCount((c) => c + 1);
        }}
      />
      <div
        aria-live="polite"
        className="flex items-center gap-3 rounded-md border bg-background/40 px-3 py-2.5 font-mono text-[12px]"
      >
        <span className="text-[9px] tracking-[0.2em] text-success uppercase">Last</span>
        <span className="min-w-0 flex-1 truncate">
          {last ? <span className="text-[#d9b774]">{calls[last] ?? last}</span> : <span className="text-muted-foreground">press W A S D</span>}
        </span>
        <span className="text-muted-foreground tabular-nums">{String(count).padStart(3, "0")}</span>
      </div>
    </div>
  );
}
