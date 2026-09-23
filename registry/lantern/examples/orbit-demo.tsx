import { Diamond } from "lucide-react";

import { Orbit } from "@/registry/lantern/ui/orbit";
import {
  Terminal,
  TerminalAddress,
  TerminalBody,
  TerminalCursor,
  TerminalFooter,
  TerminalHeader,
  TerminalLine,
  TerminalOutput,
} from "@/registry/lantern/ui/terminal";

export default function OrbitDemo() {
  return (
    <div className="relative mx-auto w-full max-w-[420px] px-2 py-24">
      <Orbit size={380} />
      <Terminal tilt>
        <TerminalHeader>
          <Diamond /> LANTERN
        </TerminalHeader>
        <TerminalAddress>hub://your-little-world/</TerminalAddress>
        <TerminalBody>
          <TerminalLine>lantern publish ./site</TerminalLine>
          <TerminalOutput>published hub://your-little-world/</TerminalOutput>
          <TerminalLine>
            <TerminalCursor />
          </TerminalLine>
        </TerminalBody>
        <TerminalFooter>
          <span>Connected</span>
          <span>3 sites</span>
        </TerminalFooter>
      </Terminal>
    </div>
  );
}
