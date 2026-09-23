"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type StepperOrientation = "vertical" | "horizontal";
type StepState = "complete" | "current" | "upcoming";

const StepperContext = React.createContext<StepperOrientation>("vertical");

/**
 * Numbered steps. Horizontal steppers fall back to vertical when their container
 * is narrower than 36rem.
 */
function Stepper({
  className,
  orientation = "vertical",
  children,
  ...props
}: React.ComponentProps<"ol"> & { orientation?: StepperOrientation }) {
  const list = (
    <ol
      data-slot="stepper"
      data-orientation={orientation}
      className={cn("flex flex-col [counter-reset:step]", orientation === "horizontal" && "@xl:flex-row @xl:gap-4", className)}
      {...props}
    >
      {children}
    </ol>
  );
  return (
    <StepperContext.Provider value={orientation}>
      {orientation === "horizontal" ? <div className="@container w-full">{list}</div> : list}
    </StepperContext.Provider>
  );
}

const stateLabel: Record<StepState, string> = { complete: "Completed", current: "Current step", upcoming: "Not started" };

function StepperItem({
  className,
  state = "upcoming",
  children,
  ...props
}: React.ComponentProps<"li"> & { state?: StepState }) {
  const horizontal = React.useContext(StepperContext) === "horizontal";
  return (
    <li
      data-slot="stepper-item"
      data-state={state}
      aria-current={state === "current" ? "step" : undefined}
      className={cn(
        "group/step relative flex gap-4 pb-8 [counter-increment:step] last:pb-0",
        horizontal && "@xl:flex-1 @xl:flex-col @xl:gap-3 @xl:pb-0",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        data-slot="stepper-line"
        className={cn(
          "absolute top-9 bottom-1 left-[13.5px] w-px bg-border group-last/step:hidden group-data-[state=complete]/step:bg-success/50",
          horizontal && "@xl:top-3.5 @xl:right-2 @xl:bottom-auto @xl:left-10 @xl:h-px @xl:w-auto",
        )}
      />
      <span
        data-slot="stepper-indicator"
        className={cn(
          "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-md border border-input bg-background font-mono text-[11px] text-muted-foreground",
          "before:content-[counter(step,decimal-leading-zero)]",
          "group-data-[state=current]/step:border-primary group-data-[state=current]/step:bg-primary/10 group-data-[state=current]/step:text-primary group-data-[state=current]/step:shadow-[3px_3px_0_var(--block-shadow)]",
          "group-data-[state=complete]/step:border-success/60 group-data-[state=complete]/step:bg-success/10 group-data-[state=complete]/step:text-success group-data-[state=complete]/step:before:hidden",
        )}
      >
        {state === "complete" && <CheckIcon className="size-3.5" aria-hidden="true" />}
      </span>
      <span className="sr-only">{stateLabel[state]}: </span>
      <div data-slot="stepper-content" className="grid min-w-0 flex-1 content-start gap-1 pt-0.5">
        {children}
      </div>
    </li>
  );
}

function StepperTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stepper-title"
      className={cn(
        "font-display text-base leading-snug font-medium tracking-tight group-data-[state=upcoming]/step:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function StepperDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="stepper-description" className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export { Stepper, StepperItem, StepperTitle, StepperDescription, type StepState };
