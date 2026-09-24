"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Progress } from "@/registry/lantern/ui/progress";

/** Formats seconds as m:ss, or h:mm:ss past an hour. */
function formatElapsed(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
}

/** Seconds since `startedAt` (a Date.now() timestamp), updated every second. Null when not started. */
function useElapsed(startedAt: number | null | undefined) {
  // Starts null so server and client render the same markup; the clock starts after mount.
  const [now, setNow] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (startedAt == null) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [startedAt]);
  return startedAt == null || now == null ? null : Math.max(0, (now - startedAt) / 1000);
}

/** The running task card: orange border and a warm block shadow. */
function JobCard({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="job-card"
      className={cn(
        "@container/job-card flex min-w-0 flex-col gap-2.5 rounded-lg border border-primary bg-card p-3.5 text-card-foreground shadow-[6px_6px_0_#3a2a1c]",
        className,
      )}
      {...props}
    />
  );
}

/** Eyebrow, title and timer. The title drops to its own line when the card is narrower than 28rem. */
function JobCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="job-card-header"
      className={cn("flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1", className)}
      {...props}
    />
  );
}

function JobCardEyebrow({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="job-card-eyebrow"
      className={cn("font-mono text-[10px] font-semibold tracking-[0.2em] text-success uppercase", className)}
      {...props}
    />
  );
}

function JobCardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="job-card-title"
      className={cn(
        "order-last w-full min-w-0 font-display text-[15px] leading-snug font-semibold tracking-tight @md/job-card:order-none @md/job-card:w-auto @md/job-card:flex-1 @md/job-card:truncate",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Elapsed time. Pass `startedAt` (ms timestamp) to tick every second, `seconds` for a fixed value,
 * or children for your own text.
 */
function JobCardTimer({
  className,
  startedAt,
  seconds,
  children,
  ...props
}: React.ComponentProps<"span"> & { startedAt?: number | null; seconds?: number }) {
  const live = useElapsed(startedAt);
  const value = live ?? seconds;
  return (
    <span
      data-slot="job-card-timer"
      className={cn("ml-auto font-mono text-xs text-muted-foreground tabular-nums @md/job-card:ml-0", className)}
      {...props}
    >
      {children ??
        (value != null ? (
          <>
            <span className="sr-only">Elapsed </span>
            {formatElapsed(value)}
          </>
        ) : null)}
    </span>
  );
}

function JobCardProgress({ className, ...props }: React.ComponentProps<typeof Progress>) {
  return <Progress data-slot="job-card-progress" size="lg" className={cn("h-1.5", className)} {...props} />;
}

/** Stats and actions. Stacks when the card is narrower than 28rem, with full-width buttons (44px tall on phones). */
function JobCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="job-card-footer"
      className={cn("flex flex-col gap-3 @md/job-card:flex-row @md/job-card:items-center @md/job-card:gap-4", className)}
      {...props}
    />
  );
}

function JobCardStats({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="job-card-stats"
      className={cn(
        "flex min-w-0 flex-1 flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase tabular-nums",
        className,
      )}
      {...props}
    />
  );
}

function JobCardActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="job-card-actions"
      className={cn(
        "flex gap-2 *:data-[slot=button]:flex-1 @md/job-card:shrink-0 @md/job-card:*:data-[slot=button]:flex-none max-sm:*:data-[slot=button]:h-11",
        className,
      )}
      {...props}
    />
  );
}

export {
  JobCard,
  JobCardHeader,
  JobCardEyebrow,
  JobCardTitle,
  JobCardTimer,
  JobCardProgress,
  JobCardFooter,
  JobCardStats,
  JobCardActions,
  formatElapsed,
  useElapsed,
};
