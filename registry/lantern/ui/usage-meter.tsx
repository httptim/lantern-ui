"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Progress } from "@/registry/lantern/ui/progress";

type UsageMeterSize = "default" | "compact";

/** Bar color by how much is used: orange, yellow from `warnAt`, red from `dangerAt`. */
function toneClass(percent: number, warnAt: number, dangerAt: number) {
  if (percent >= dangerAt) return "bg-destructive";
  if (percent >= warnAt) return "bg-warning";
  return undefined;
}

/**
 * A labelled thin meter for quotas and allowances: label and percent on top, a bar,
 * and an optional reset time underneath.
 */
function UsageMeter({
  className,
  label,
  value,
  max = 100,
  reset,
  size = "default",
  warnAt = 75,
  dangerAt = 90,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  label: React.ReactNode;
  /** Amount used, from 0 to `max`. */
  value: number;
  max?: number;
  /** When the allowance refills, e.g. "resets 3:40 pm". Hidden in the compact size. */
  reset?: React.ReactNode;
  size?: UsageMeterSize;
  /** Percent at which the bar turns yellow. */
  warnAt?: number;
  /** Percent at which the bar turns red. */
  dangerAt?: number;
}) {
  const id = React.useId();
  const percent = Math.round(Math.min(100, Math.max(0, (value / max) * 100)));
  const compact = size === "compact";

  return (
    <div
      data-slot="usage-meter"
      data-size={size}
      className={cn("flex min-w-0 flex-col", compact ? "w-[5.5rem] gap-1" : "w-full gap-1.5", className)}
      {...props}
    >
      <div
        className={cn(
          "flex items-baseline justify-between gap-2 font-mono tabular-nums",
          compact ? "text-[10px] text-muted-foreground" : "text-[11px]",
        )}
      >
        <span id={id} className={cn("truncate", !compact && "tracking-[0.12em] text-muted-foreground uppercase")}>
          {label}
        </span>
        <span data-slot="usage-meter-value" className={compact ? undefined : "text-foreground"}>
          {percent}%
        </span>
      </div>
      <Progress
        value={percent}
        size="default"
        aria-labelledby={id}
        getValueLabel={() => `${percent}% used`}
        indicatorClassName={toneClass(percent, warnAt, dangerAt)}
      />
      {reset != null && !compact && (
        <span data-slot="usage-meter-reset" className="font-mono text-[10px] text-muted-foreground">
          {reset}
        </span>
      )}
    </div>
  );
}

/** The bordered "AI allowance" chip: a label and compact meters in a row. */
function UsageMeterGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="usage-meter-group"
      role="group"
      className={cn(
        "flex w-fit max-w-full flex-wrap items-center gap-x-3.5 gap-y-2 rounded-md border px-3 py-1.5",
        className,
      )}
      {...props}
    />
  );
}

function UsageMeterGroupLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="usage-meter-group-label"
      className={cn(
        "font-mono text-[10px] leading-tight tracking-[0.2em] whitespace-nowrap text-muted-foreground uppercase",
        className,
      )}
      {...props}
    />
  );
}

export { UsageMeter, UsageMeterGroup, UsageMeterGroupLabel };
