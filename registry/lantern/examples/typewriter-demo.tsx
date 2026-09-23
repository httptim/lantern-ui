import { Diamond } from "lucide-react";

import { Terminal, TerminalAddress, TerminalFooter, TerminalHeader } from "@/registry/lantern/ui/terminal";
import { TerminalTypewriter } from "@/registry/lantern/ui/typewriter";

const session = [
  { prompt: true, text: "npx lanterncn add terminal" },
  { text: "Checking registry... done", delay: 500 },
  { text: "Installing dependencies... done", delay: 700 },
  { text: "Created 1 file:\n  components/ui/terminal.tsx", delay: 400 },
  { prompt: true, text: "lantern publish ./site", delay: 900 },
  { text: "published hub://your-little-world/", delay: 800 },
];

export default function TypewriterDemo() {
  return (
    <Terminal tilt className="w-full max-w-md">
      <TerminalHeader>
        <Diamond /> LANTERN
      </TerminalHeader>
      <TerminalAddress>~/my-little-world</TerminalAddress>
      <TerminalTypewriter lines={session} loop bodyClassName="min-h-[260px] text-[12px] sm:text-[13px]" />
      <TerminalFooter>
        <span>Connected</span>
        <span>Loops</span>
      </TerminalFooter>
    </Terminal>
  );
}
