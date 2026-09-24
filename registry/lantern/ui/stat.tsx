import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The bordered numbers strip from the Lantern site. Columns stack on small screens.
 * `variant="tiles"` draws small bordered tiles instead, for inspectors and result cards.
 */
function StatGroup({
  className,
  variant = "strip",
  ...props
}: React.ComponentProps<"dl"> & { variant?: "strip" | "tiles" }) {
  return (
    <dl
      data-slot="stat-group"
      data-variant={variant}
      className={cn(
        "group/stat-group",
        variant === "strip" &&
          "grid grid-cols-1 divide-y divide-border rounded-lg border bg-card sm:auto-cols-fr sm:grid-flow-col sm:grid-cols-none sm:divide-x sm:divide-y-0",
        variant === "tiles" && "grid grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] gap-1.5",
        className,
      )}
      {...props}
    />
  );
}

function Stat({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat"
      className={cn(
        "flex flex-col-reverse gap-1.5 px-6 py-5",
        "group-data-[variant=tiles]/stat-group:min-w-0 group-data-[variant=tiles]/stat-group:gap-0.5 group-data-[variant=tiles]/stat-group:rounded-md group-data-[variant=tiles]/stat-group:border group-data-[variant=tiles]/stat-group:px-2.5 group-data-[variant=tiles]/stat-group:py-2",
        className,
      )}
      {...props}
    />
  );
}

function StatValue({ className, ...props }: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="stat-value"
      className={cn(
        "font-display text-4xl leading-none font-medium tracking-tight text-primary tabular-nums",
        "group-data-[variant=tiles]/stat-group:truncate group-data-[variant=tiles]/stat-group:text-lg group-data-[variant=tiles]/stat-group:leading-tight group-data-[variant=tiles]/stat-group:font-semibold group-data-[variant=tiles]/stat-group:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function StatLabel({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="stat-label"
      className={cn(
        "text-sm text-muted-foreground",
        "group-data-[variant=tiles]/stat-group:truncate group-data-[variant=tiles]/stat-group:font-mono group-data-[variant=tiles]/stat-group:text-[9px] group-data-[variant=tiles]/stat-group:tracking-[0.14em] group-data-[variant=tiles]/stat-group:uppercase",
        className,
      )}
      {...props}
    />
  );
}

export { StatGroup, Stat, StatValue, StatLabel };
