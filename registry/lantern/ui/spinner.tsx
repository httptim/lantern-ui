import * as React from "react";
import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin text-primary", className)}
      {...props}
    />
  );
}

/** A terminal-style spinner: three blocks lighting up in turn. */
function BlockSpinner({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="block-spinner"
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center gap-[3px] text-primary", className)}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <i
          key={i}
          aria-hidden="true"
          className="block size-1.5 animate-lantern-pulse bg-current"
          style={{ animationDuration: "0.9s", animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

export { Spinner, BlockSpinner };
