import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const statusPillVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-[7px] font-mono text-[10px] leading-none font-semibold tracking-[0.15em] whitespace-nowrap uppercase",
  {
    variants: {
      tone: {
        online: "text-success",
        offline: "text-destructive",
        running: "text-primary",
        idle: "text-muted-foreground",
      },
    },
    defaultVariants: { tone: "idle" },
  },
);

const dotTones = {
  online: "bg-success shadow-[0_0_10px_#9bba8660]",
  offline: "bg-destructive",
  running: "animate-lantern-pulse bg-primary shadow-[0_0_10px_#f5a66560] [animation-duration:1.2s]",
  idle: "bg-input",
} as const;

/** The TurtleDeck status pill: a dot and a mono uppercase label. */
function StatusPill({
  className,
  tone,
  children,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof statusPillVariants>) {
  const t = tone ?? "idle";
  return (
    <span data-slot="status-pill" data-tone={t} className={cn(statusPillVariants({ tone: t }), className)} {...props}>
      <span aria-hidden="true" data-slot="status-pill-dot" className={cn("size-1.5 shrink-0 rounded-full", dotTones[t])} />
      {children ?? t}
    </span>
  );
}

export { StatusPill, statusPillVariants };
