"use client";

import * as React from "react";
import { RotateCcwIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import { StreamBox } from "@/registry/lantern/ui/stream-box";

const THINKING = `The player wants a strip mine at y=-59. Diamonds are most common between -64 and -54, so -59 is a good middle.
Three branches of 32 blocks, spaced 3 apart so no ore is skipped between them.
Torches every 8 blocks keep mobs from spawning in the tunnels.
td.mine.stairs can walk down first. Then td.run wraps the loop so a full inventory triggers the trip home and unload.
Each step: check(), dig and move forward, clear the block above for a 2-high tunnel.
After a branch, turn right, move 3 over, turn right again for the next branch.
Fuel: about 3 fuel per block with the stairs, so roughly 480 for the whole job. Testy has 3,602.`;

export default function StreamBoxDemo() {
  const [length, setLength] = React.useState(0);
  const streaming = length < THINKING.length;

  React.useEffect(() => {
    if (!streaming) return;
    const id = setTimeout(() => setLength((n) => Math.min(THINKING.length, n + 6)), 40);
    return () => clearTimeout(id);
  }, [length, streaming]);

  return (
    <div className="grid w-full max-w-md gap-3">
      <StreamBox title={streaming ? "Thinking" : "Thought for 0:18"} text={THINKING.slice(0, length)} streaming={streaming} />
      <Button size="sm" variant="ghost" className="justify-self-start" onClick={() => setLength(0)} disabled={streaming}>
        <RotateCcwIcon /> Stream again
      </Button>
    </div>
  );
}
