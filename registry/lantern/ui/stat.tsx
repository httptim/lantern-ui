import * as React from "react";

import { cn } from "@/lib/utils";

/** The bordered numbers strip from the Lantern site. Columns stack on small screens. */
function StatGroup({ className, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="stat-group"
      className={cn(
        "grid grid-cols-1 divide-y divide-border rounded-lg border bg-card sm:auto-cols-fr sm:grid-flow-col sm:grid-cols-none sm:divide-x sm:divide-y-0",
        className,
      )}
      {...props}
    />
  );
}

function Stat({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="stat" className={cn("flex flex-col-reverse gap-1.5 px-6 py-5", className)} {...props} />
  );
}

function StatValue({ className, ...props }: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="stat-value"
      className={cn("font-display text-4xl leading-none font-medium tracking-tight text-primary tabular-nums", className)}
      {...props}
    />
  );
}

function StatLabel({ className, ...props }: React.ComponentProps<"dt">) {
  return <dt data-slot="stat-label" className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export { StatGroup, Stat, StatValue, StatLabel };
