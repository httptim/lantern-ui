import * as React from "react";
import { CheckIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type StepListState = "done" | "current" | "todo" | "error";

const stateLabel: Record<StepListState, string> = {
  done: "Done",
  current: "In progress",
  todo: "Not started",
  error: "Failed",
};

/** A compact progress list for background work: one line per step with a mark and a time. */
function StepList({ className, ...props }: React.ComponentProps<"ol">) {
  return <ol data-slot="step-list" className={cn("flex flex-col gap-2.5", className)} {...props} />;
}

function StepListItem({
  className,
  state = "todo",
  time,
  children,
  ...props
}: React.ComponentProps<"li"> & {
  state?: StepListState;
  /** Time the step finished or has been running, e.g. "0:48". */
  time?: React.ReactNode;
}) {
  return (
    <li
      data-slot="step-list-item"
      data-state={state}
      aria-current={state === "current" ? "step" : undefined}
      className={cn(
        "flex min-w-0 items-start gap-2.5 text-[13px] leading-5",
        state === "todo" ? "text-muted-foreground" : "text-foreground",
        className,
      )}
      {...props}
    >
      <span data-slot="step-list-mark" aria-hidden="true" className="flex h-5 w-4 shrink-0 items-center justify-center">
        {state === "done" && <CheckIcon className="size-3.5 text-success" />}
        {state === "error" && <XIcon className="size-3.5 text-destructive" />}
        {state === "current" && (
          <span className="size-2.5 animate-lantern-pulse rounded-full border-2 border-primary [animation-duration:1.4s]" />
        )}
        {state === "todo" && <span className="size-2.5 rounded-full border border-input" />}
      </span>
      <span className="sr-only">{stateLabel[state]}: </span>
      <span data-slot="step-list-label" className="min-w-0 flex-1">
        {children}
      </span>
      {time != null && (
        <span
          data-slot="step-list-time"
          className="shrink-0 font-mono text-[11px] leading-5 text-muted-foreground tabular-nums"
        >
          {time}
        </span>
      )}
    </li>
  );
}

export { StepList, StepListItem, type StepListState };
