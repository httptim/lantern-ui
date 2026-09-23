"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

const trackSizes = {
  sm: "h-0.5",
  default: "h-1",
  lg: "h-1.5",
} as const;

/** A thin orange bar on a dark track, like a turtle's fuel gauge. */
function Progress({
  className,
  value,
  size = "default",
  indicatorClassName,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  size?: keyof typeof trackSizes;
  indicatorClassName?: string;
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn("relative w-full overflow-hidden rounded-[1px] bg-[#2b352f]", trackSizes[size], className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn("h-full w-full flex-1 bg-primary transition-transform duration-300", indicatorClassName)}
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
