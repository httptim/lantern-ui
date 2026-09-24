"use client";

import * as React from "react";
import { SendIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/registry/lantern/ui/button";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import { ToggleGroup, ToggleGroupItem } from "@/registry/lantern/ui/toggle-group";
import { UsageMeter, UsageMeterGroup, UsageMeterGroupLabel } from "@/registry/lantern/ui/usage-meter";

import { useMockAiRun, type MockFlavor } from "./mock";
import { AiPanel } from "./panel";

const states = ["idle", "running", "result", "error"] as const;

/** A working demo of the AI panel against a mock backend. Import AiPanel from ./panel to wire your own. */
export default function AIPanel() {
  const [flavor, setFlavor] = React.useState<MockFlavor>("turtledeck");

  return (
    <div className="min-h-svh bg-background bg-grid px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto flex max-w-[440px] flex-col gap-4">
        <div className="flex flex-col gap-3">
          <Eyebrow>Preview</Eyebrow>
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            value={flavor}
            onValueChange={(v) => v && setFlavor(v as MockFlavor)}
            aria-label="App"
          >
            <ToggleGroupItem value="turtledeck">TurtleDeck</ToggleGroupItem>
            <ToggleGroupItem value="lantern">Lantern Hub</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <Demo key={flavor} flavor={flavor} />
      </div>
    </div>
  );
}

function Demo({ flavor }: { flavor: MockFlavor }) {
  const { panelProps, status, show } = useMockAiRun(flavor, () => toast.success("Applied to the editor"));

  return (
    <>
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        value={status}
        onValueChange={(v) => v && show(v as (typeof states)[number])}
        aria-label="Panel state"
        className="w-full"
      >
        {states.map((s) => (
          <ToggleGroupItem key={s} value={s} className="capitalize">
            {s}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <AiPanel
        {...panelProps}
        className="min-h-[640px] rounded-lg border shadow-block"
        resultActions={
          flavor === "turtledeck" ? (
            <Button size="sm" variant="secondary" onClick={() => toast.success("Sent to Testy")}>
              <SendIcon /> Send to Testy
            </Button>
          ) : undefined
        }
        allowance={
          <UsageMeterGroup aria-label="AI allowance" className="w-full justify-between border-0 px-0 py-0">
            <UsageMeterGroupLabel>AI allowance</UsageMeterGroupLabel>
            <UsageMeter size="compact" label="5-hour" value={32} />
            <UsageMeter size="compact" label="Week" value={18} />
          </UsageMeterGroup>
        }
      />
    </>
  );
}
