"use client";

import * as React from "react";
import { ChevronsUpDownIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/lantern/ui/collapsible";

function Row({ name, status }: { name: string; status: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border bg-card px-4 py-2.5">
      <span className="font-mono text-sm">{name}</span>
      <span className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">{status}</span>
    </div>
  );
}

export default function CollapsibleDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="flex w-full max-w-[340px] flex-col gap-2">
      <div className="flex items-center justify-between gap-4 px-1">
        <h4 className="font-display text-sm font-medium">miner-02 is watching 4 servers</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label={open ? "Show fewer servers" : "Show 3 more servers"}>
            <ChevronsUpDownIcon />
          </Button>
        </CollapsibleTrigger>
      </div>
      <Row name="computer-42" status="Online" />
      <CollapsibleContent className="flex flex-col gap-2">
        <Row name="computer-17" status="Online" />
        <Row name="computer-33" status="Idle" />
        <Row name="computer-58" status="Online" />
      </CollapsibleContent>
      {!open && (
        <CollapsibleTrigger className="cursor-pointer px-1 text-left font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase outline-none hover:text-primary focus-visible:text-primary">
          + 3 more servers
        </CollapsibleTrigger>
      )}
    </Collapsible>
  );
}
