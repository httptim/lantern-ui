"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";
import { Progress } from "@/registry/lantern/ui/progress";

/** A vertical stack of EntityCards. */
function EntityCardList({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="entity-card-list" className={cn("flex flex-col gap-2.5", className)} {...props} />;
}

/**
 * A selectable list card for turtles, sites or scripts. Renders a button (with aria-pressed
 * when `selected` is set), or pass asChild to render a link (aria-current when selected).
 */
function EntityCard({
  className,
  selected,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<"button"> & { selected?: boolean; asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="entity-card"
      data-selected={selected || undefined}
      type={asChild ? type : (type ?? "button")}
      aria-pressed={asChild ? undefined : selected}
      aria-current={asChild && selected ? "true" : undefined}
      className={cn(
        "flex w-full min-w-0 cursor-pointer flex-col gap-2 rounded-md border bg-card p-3 text-left text-foreground transition-[background-color,border-color,box-shadow] outline-none",
        "hover:border-input hover:bg-secondary/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-[selected]:border-primary data-[selected]:bg-secondary data-[selected]:shadow-[4px_4px_0_#3a2a1c]",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

/** Top row: put a StatusDot, an EntityCardTitle and an EntityCardTag in it. */
function EntityCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="entity-card-header" className={cn("flex min-w-0 items-center gap-2", className)} {...props} />;
}

function EntityCardTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="entity-card-title"
      className={cn("min-w-0 truncate font-display text-[15px] leading-tight font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

/** Mono uppercase text pushed to the right of the header. */
function EntityCardTag({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="entity-card-tag"
      className={cn(
        "ml-auto shrink-0 font-mono text-[10px] tracking-[0.12em] whitespace-nowrap text-muted-foreground uppercase",
        className,
      )}
      {...props}
    />
  );
}

function EntityCardDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="entity-card-description"
      className={cn("truncate text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

/** Mono meta line. The last child is pushed to the right. */
function EntityCardMeta({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="entity-card-meta"
      className={cn(
        "flex min-w-0 items-center gap-2 font-mono text-[10px] tracking-[0.06em] text-muted-foreground uppercase tabular-nums *:truncate [&>*:last-child:not(:first-child)]:ml-auto [&>*:last-child:not(:first-child)]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

/** A thin green bar for fuel or storage. Turns red at or below `lowAt`. */
function EntityCardBar({
  value,
  lowAt = 20,
  className,
  indicatorClassName,
  ...props
}: React.ComponentProps<typeof Progress> & { value: number; lowAt?: number }) {
  return (
    <Progress
      data-slot="entity-card-bar"
      value={value}
      size="sm"
      className={cn("h-[3px]", className)}
      indicatorClassName={cn(value <= lowAt ? "bg-destructive" : "bg-success", indicatorClassName)}
      {...props}
    />
  );
}

export {
  EntityCardList,
  EntityCard,
  EntityCardHeader,
  EntityCardTitle,
  EntityCardTag,
  EntityCardDescription,
  EntityCardMeta,
  EntityCardBar,
};
