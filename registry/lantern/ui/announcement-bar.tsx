"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, X } from "lucide-react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const storagePrefix = "lantern-announcement:";
const changeEvent = "lantern-announcement-change";
// Fallback for when storage is blocked, so the bar still hides for this visit.
const memory = new Set<string>();

function readDismissed(id: string) {
  if (memory.has(id)) return true;
  try {
    return window.localStorage.getItem(storagePrefix + id) === "dismissed";
  } catch {
    return false;
  }
}

function writeDismissed(id: string, dismissed: boolean) {
  if (dismissed) memory.add(id);
  else memory.delete(id);
  try {
    if (dismissed) window.localStorage.setItem(storagePrefix + id, "dismissed");
    else window.localStorage.removeItem(storagePrefix + id);
  } catch {
    // Storage can be blocked (private mode, disabled site data).
  }
  window.dispatchEvent(new Event(changeEvent));
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(changeEvent, callback);
  };
}

/** Forget that an announcement was dismissed, so it shows again. */
function resetAnnouncementBar(id: string) {
  writeDismissed(id, false);
}

const announcementBarVariants = cva(
  "group/announcement relative flex min-h-10 w-full items-center justify-center py-2 pr-11 pl-4 text-[13px] leading-snug sm:pl-11",
  {
    variants: {
      variant: {
        default: "border-b bg-card text-card-foreground",
        primary: "bg-primary text-primary-foreground",
        subtle: "border-b border-dashed bg-background text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

type AnnouncementBarProps = React.ComponentProps<"div"> &
  VariantProps<typeof announcementBarVariants> & {
    /** Element id, also used to remember a dismissal in localStorage. Change it to show a new announcement. */
    id?: string;
    /** Show the dismiss button. */
    dismissible?: boolean;
    onDismiss?: () => void;
  };

/** A slim full-width bar for the top of a site. */
function AnnouncementBar({
  className,
  variant = "default",
  id,
  dismissible = true,
  onDismiss,
  children,
  ...props
}: AnnouncementBarProps) {
  const [localDismissed, setLocalDismissed] = React.useState(false);
  const storedDismissed = React.useSyncExternalStore(
    subscribe,
    () => (id ? readDismissed(id) : false),
    () => false,
  );

  if (localDismissed || storedDismissed) return null;

  return (
    <div
      data-slot="announcement-bar"
      id={id}
      data-variant={variant}
      role="region"
      aria-label="Announcement"
      className={cn(announcementBarVariants({ variant }), !dismissible && "pr-4 sm:pr-11", className)}
      {...props}
    >
      <div className="flex min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">{children}</div>
      {dismissible && (
        <button
          type="button"
          data-slot="announcement-bar-dismiss"
          aria-label="Dismiss announcement"
          onClick={() => {
            if (id) writeDismissed(id, true);
            else setLocalDismissed(true);
            onDismiss?.();
          }}
          className={cn(
            "absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md opacity-70 transition-[opacity,background-color] outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 [&_svg]:size-4",
            variant === "primary"
              ? "hover:bg-primary-foreground/10 focus-visible:ring-primary-foreground/60"
              : "hover:bg-secondary focus-visible:ring-ring",
          )}
        >
          <X />
        </button>
      )}
    </div>
  );
}

function AnnouncementBarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="announcement-bar-badge"
      className={cn(
        "inline-flex shrink-0 items-center rounded-sm bg-primary px-1.5 py-1 font-mono text-[10px] leading-none tracking-[0.12em] text-primary-foreground uppercase",
        "group-data-[variant=primary]/announcement:bg-primary-foreground group-data-[variant=primary]/announcement:text-primary",
        "group-data-[variant=subtle]/announcement:border group-data-[variant=subtle]/announcement:border-success/40 group-data-[variant=subtle]/announcement:bg-success/10 group-data-[variant=subtle]/announcement:text-success",
        className,
      )}
      {...props}
    />
  );
}

function AnnouncementBarMessage({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="announcement-bar-message" className={cn("min-w-0", className)} {...props} />;
}

function AnnouncementBarLink({
  className,
  children,
  asChild = false,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="announcement-bar-link"
      className={cn(
        "group/link inline-flex shrink-0 items-center gap-1.5 rounded-sm font-mono text-[11px] tracking-[0.12em] text-primary uppercase underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3.5 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5",
        "group-data-[variant=primary]/announcement:text-primary-foreground group-data-[variant=primary]/announcement:font-semibold group-data-[variant=primary]/announcement:focus-visible:ring-primary-foreground/60",
        className,
      )}
      {...props}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      <ArrowRight aria-hidden="true" />
    </Comp>
  );
}

export {
  AnnouncementBar,
  AnnouncementBarBadge,
  AnnouncementBarMessage,
  AnnouncementBarLink,
  announcementBarVariants,
  resetAnnouncementBar,
};
