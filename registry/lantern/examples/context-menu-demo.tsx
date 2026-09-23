"use client";

import * as React from "react";
import { CopyIcon, FolderInputIcon, MousePointerClickIcon, PencilIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/lantern/ui/context-menu";

export default function ContextMenuDemo() {
  const [showHidden, setShowHidden] = React.useState(false);
  const [showSizes, setShowSizes] = React.useState(true);
  const [sort, setSort] = React.useState("name");

  return (
    <ContextMenu>
      <ContextMenuTrigger tabIndex={0} className="flex h-44 w-full max-w-sm flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-accent bg-grid text-muted-foreground transition-colors outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/25 data-[state=open]:border-primary data-[state=open]:text-foreground">
        <MousePointerClickIcon className="size-6 text-[#b7ca9e]" strokeWidth={1.5} />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Right-click here</span>
        <span className="text-xs text-muted-foreground/70">Long-press on touch screens</span>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-60">
        <ContextMenuLabel>/disk/programs</ContextMenuLabel>
        <ContextMenuItem>
          <PencilIcon />
          Rename
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <CopyIcon />
          Copy path
          <ContextMenuShortcut>Ctrl C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <FolderInputIcon />
            Move to
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem>/disk/archive</ContextMenuItem>
            <ContextMenuItem>/disk2/backup</ContextMenuItem>
            <ContextMenuItem>/rom/programs</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>
          <RefreshCwIcon />
          Refresh
          <ContextMenuShortcut>Ctrl R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={showHidden} onCheckedChange={setShowHidden}>
          Show hidden files
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={showSizes} onCheckedChange={setShowSizes}>
          Show file sizes
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel inset>Sort by</ContextMenuLabel>
        <ContextMenuRadioGroup value={sort} onValueChange={setSort}>
          <ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
          <ContextMenuRadioItem value="size">Size</ContextMenuRadioItem>
          <ContextMenuRadioItem value="modified">Last modified</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2Icon />
          Delete
          <ContextMenuShortcut>Del</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
