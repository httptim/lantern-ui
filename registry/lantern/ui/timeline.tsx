import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type TimelineState = "done" | "current" | "planned";

const stateLabels: Record<TimelineState, string> = {
  done: "Done",
  current: "In progress",
  planned: "Planned",
};

const timelineVariants = cva("group/timeline flex flex-col", {
  variants: {
    size: {
      default: "",
      compact: "",
    },
  },
  defaultVariants: { size: "default" },
});

/** A vertical changelog or roadmap. Renders an ordered list. */
function Timeline({ className, size = "default", ...props }: React.ComponentProps<"ol"> & VariantProps<typeof timelineVariants>) {
  return <ol data-slot="timeline" data-size={size} className={cn(timelineVariants({ size }), className)} {...props} />;
}

/**
 * One entry. The marker sits in a fixed column; the connecting line runs to the next item
 * and turns dashed ahead of planned work.
 */
function TimelineItem({
  className,
  state = "done",
  icon,
  children,
  ...props
}: React.ComponentProps<"li"> & { state?: TimelineState; icon?: React.ReactNode }) {
  return (
    <li
      data-slot="timeline-item"
      data-state={state}
      aria-current={state === "current" ? "step" : undefined}
      className={cn(
        "group/item relative grid grid-cols-[1.5rem_1fr] gap-x-4 pb-8 last:pb-0",
        "group-data-[size=compact]/timeline:grid-cols-[1.25rem_1fr] group-data-[size=compact]/timeline:gap-x-3 group-data-[size=compact]/timeline:pb-4 group-data-[size=compact]/timeline:last:pb-0",
        // Connecting line, centered under the marker.
        "before:absolute before:top-7 before:bottom-1 before:left-3 before:-translate-x-1/2 before:border-l last:before:hidden",
        "group-data-[size=compact]/timeline:before:top-6 group-data-[size=compact]/timeline:before:bottom-0.5 group-data-[size=compact]/timeline:before:left-2.5",
        "data-[state=done]:before:border-success/45 data-[state=current]:before:border-dashed data-[state=current]:before:border-input data-[state=planned]:before:border-dashed data-[state=planned]:before:border-input",
        className,
      )}
      {...props}
    >
      <TimelineMarker state={state} icon={icon} />
      <div data-slot="timeline-content" className="min-w-0">
        <span className="sr-only">{stateLabels[state]}: </span>
        {children}
      </div>
    </li>
  );
}

const markerVariants = cva(
  "relative flex size-6 items-center justify-center group-data-[size=compact]/timeline:size-5 [&_svg]:size-3.5 group-data-[size=compact]/timeline:[&_svg]:size-3",
  {
    variants: {
      state: {
        done: "text-success",
        current: "text-primary",
        planned: "text-muted-foreground",
      },
      boxed: { true: "rounded-md border bg-card", false: "" },
    },
    compoundVariants: [
      { boxed: true, state: "done", className: "border-success/45 bg-success/10" },
      { boxed: true, state: "current", className: "border-primary bg-primary/12 shadow-[0_0_14px_#f5a66533]" },
      { boxed: true, state: "planned", className: "border-dashed border-input bg-background" },
    ],
  },
);

const dotVariants = cva(
  "block size-2.5 rounded-full group-data-[size=compact]/timeline:size-2",
  {
    variants: {
      state: {
        done: "bg-success",
        current: "bg-primary shadow-[0_0_0_4px_#f5a66526,0_0_12px_#f5a66580]",
        planned: "border border-dashed border-muted-foreground bg-background",
      },
    },
  },
);

function TimelineMarker({ state, icon }: { state: TimelineState; icon?: React.ReactNode }) {
  return (
    <span
      data-slot="timeline-marker"
      aria-hidden="true"
      className={cn(markerVariants({ state, boxed: Boolean(icon) }), "mt-px")}
    >
      {icon ?? <span className={dotVariants({ state })} />}
    </span>
  );
}

/** Mono date or version label. */
function TimelineLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-label"
      className={cn(
        "flex min-h-6 items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase",
        "group-data-[state=current]/item:text-primary group-data-[state=done]/item:text-success/90",
        "group-data-[size=compact]/timeline:min-h-5",
        className,
      )}
      {...props}
    />
  );
}

function TimelineTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-title"
      className={cn(
        "mt-1 flex flex-wrap items-center gap-2 font-display text-lg leading-snug font-medium tracking-tight",
        "group-data-[state=planned]/item:text-foreground/80",
        "group-data-[size=compact]/timeline:mt-0.5 group-data-[size=compact]/timeline:text-sm",
        className,
      )}
      {...props}
    />
  );
}

function TimelineDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-description"
      className={cn(
        "mt-1.5 max-w-prose text-sm leading-relaxed text-muted-foreground group-data-[size=compact]/timeline:mt-0.5 group-data-[size=compact]/timeline:text-[13px]",
        className,
      )}
      {...props}
    />
  );
}

export { Timeline, TimelineItem, TimelineLabel, TimelineTitle, TimelineDescription, timelineVariants, type TimelineState };
