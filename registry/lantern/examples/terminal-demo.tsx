import { Diamond } from "lucide-react";

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

export default function TerminalDemo() {
  return (
    <Terminal tilt className="w-full max-w-md">
      <TerminalHeader>
        <Diamond /> LANTERN
      </TerminalHeader>
      <TerminalAddress>hub://your-little-world/</TerminalAddress>
      <TerminalBody>
        <TerminalLine>lantern seed lantern.seed</TerminalLine>
        <TerminalOutput>seed saved to /.lantern</TerminalOutput>
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
  );
}
