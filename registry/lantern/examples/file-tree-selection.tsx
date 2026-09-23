"use client";

import * as React from "react";

import { FileTree, type FileTreeItem } from "@/registry/lantern/ui/file-tree";

const disk: FileTreeItem[] = [
  { id: "startup.lua", name: "startup.lua" },
  {
    id: "programs",
    name: "programs",
    children: [
      { id: "programs/miner.lua", name: "miner.lua", badge: "M", badgeTone: "warning", badgeLabel: "Modified" },
      { id: "programs/farm.lua", name: "farm.lua" },
      { id: "programs/old", name: "old", children: [{ id: "programs/old/tunnel.lua", name: "tunnel.lua", badge: "D", badgeTone: "destructive", badgeLabel: "Deleted" }] },
    ],
  },
  { id: "logs", name: "logs", children: [{ id: "logs/run.log", name: "run.log" }] },
];

function pathOf(id: string) {
  return "/" + id;
}

export default function FileTreeSelection() {
  const [selected, setSelected] = React.useState<FileTreeItem | null>(null);
  const [expanded, setExpanded] = React.useState<string[]>(["programs"]);

  return (
    <div className="grid w-full max-w-xs gap-3">
      <div className="rounded-lg border bg-card">
        <FileTree
          items={disk}
          expanded={expanded}
          onExpandedChange={setExpanded}
          selectedId={selected?.id ?? null}
          onSelect={setSelected}
          aria-label="Turtle disk"
        />
      </div>
      <div aria-live="polite" className="grid gap-1 rounded-md border bg-background/40 px-3 py-2.5 font-mono text-[12px]">
        <span className="text-[9px] tracking-[0.2em] text-success uppercase">Selected</span>
        <span className="truncate">
          {selected ? (
            <>
              {pathOf(selected.id)}
              <span className="text-muted-foreground">{selected.children ? "  folder" : "  file"}</span>
            </>
          ) : (
            <span className="text-muted-foreground">nothing yet</span>
          )}
        </span>
        <span className="text-muted-foreground">{expanded.length} open</span>
      </div>
    </div>
  );
}
