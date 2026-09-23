import * as React from "react";

import { cn } from "@/lib/utils";

/** The small mono uppercase label that sits above Lantern headings. */
function Eyebrow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="eyebrow"
      className={cn(
        "flex items-center gap-2.5 font-mono text-[10px] leading-loose font-semibold tracking-[0.2em] text-success uppercase",
        className,
      )}
      {...props}
    />
  );
}

export { Eyebrow };
