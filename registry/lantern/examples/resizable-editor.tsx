import { FileIcon } from "lucide-react";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/registry/lantern/ui/resizable";

const files = ["startup.lua", "hub.lua", "guestbook.lua", "mine.lua"];

const code = [
  ["local", " modem = peripheral.find(\"modem\")"],
  ["local", " hub = require(\"hub\")"],
  ["", ""],
  ["while", " true do"],
  ["", "  local id, msg = rednet.receive(\"lantern\")"],
  ["", "  hub.handle(id, msg)"],
  ["end", ""],
];

export default function ResizableEditor() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="max-w-2xl rounded-lg border bg-card font-mono text-xs"
      style={{ height: 340 }}
    >
      <ResizablePanel defaultSize="26%" minSize="18%" collapsible collapsedSize="0%">
        <div className="flex h-full flex-col">
          <div className="border-b px-3 py-2 text-[10px] font-semibold tracking-[0.2em] text-success uppercase">Files</div>
          <ul className="grid gap-px p-1.5">
            {files.map((f) => (
              <li
                key={f}
                className={
                  f === "hub.lua"
                    ? "flex items-center gap-2 truncate rounded-r-sm border-l border-primary bg-secondary px-2 py-1 text-foreground"
                    : "flex items-center gap-2 truncate border-l border-transparent px-2 py-1 text-muted-foreground"
                }
              >
                <FileIcon className="size-3 shrink-0" />
                <span className="truncate">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="74%" minSize="40%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="68%" minSize="25%">
            <div className="flex h-full flex-col">
              <div className="border-b px-3 py-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">hub.lua</div>
              <pre className="flex-1 overflow-auto p-3 leading-relaxed">
                {code.map(([kw, rest], i) => (
                  <div key={i}>
                    <span className="mr-4 inline-block w-4 text-right text-muted-foreground/60 select-none">{i + 1}</span>
                    <span className="text-primary">{kw}</span>
                    <span className="text-foreground">{rest}</span>
                  </div>
                ))}
              </pre>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="32%" minSize="15%">
            <div className="flex h-full flex-col bg-terminal">
              <div className="border-b px-3 py-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Console</div>
              <div className="flex-1 overflow-auto p-3 leading-relaxed text-terminal-foreground">
                <div>
                  <span className="text-primary">$</span> hub
                </div>
                <div className="text-[#d9b774]">Listening on lantern-main</div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
