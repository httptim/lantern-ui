import * as React from "react";

import { ScrollArea } from "@/registry/lantern/ui/scroll-area";
import { Separator } from "@/registry/lantern/ui/separator";

const tags = Array.from({ length: 40 }, (_, i) => `v1.${40 - i}.0`);

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-lg border bg-card">
      <div className="p-4">
        <h4 className="mb-4 font-mono text-[10px] font-semibold tracking-[0.2em] text-success uppercase">Firmware tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="font-mono text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
