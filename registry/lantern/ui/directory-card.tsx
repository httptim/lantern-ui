import * as React from "react";
import { Slot } from "radix-ui";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { CardArt } from "@/registry/lantern/ui/card";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import { StatusDot } from "@/registry/lantern/ui/status-dot";

/** A Lantern directory listing. Use asChild to render it as a link. */
function DirectoryCard({ className, asChild = false, ...props }: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      data-slot="directory-card"
      className={cn(
        "group/directory-card relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground transition-[transform,border-color,box-shadow] outline-none",
        "[a&]:hover:-translate-y-1 [a&]:hover:border-input [a&]:hover:shadow-block-sm",
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    />
  );
}

/** Grid banner with a large icon and a mono hub address in the corner. */
function DirectoryCardArt({
  className,
  address,
  children,
  ...props
}: React.ComponentProps<"div"> & { address?: React.ReactNode }) {
  return (
    <CardArt data-slot="directory-card-art" className={cn("mt-0 h-36 sm:h-40", className)} {...props}>
      {children}
      {address != null && (
        <span className="absolute bottom-3 left-4 max-w-[calc(100%-2rem)] truncate font-mono text-[9px] tracking-[0.15em] uppercase">
          {address}
        </span>
      )}
    </CardArt>
  );
}

function DirectoryCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="directory-card-header" className={cn("flex flex-1 flex-col gap-1.5 px-5 pt-5 pb-5", className)} {...props} />;
}

function DirectoryCardCategory({ className, ...props }: React.ComponentProps<"div">) {
  return <Eyebrow data-slot="directory-card-category" className={className} {...props} />;
}

/** Card title with a trailing arrow that nudges on hover. */
function DirectoryCardTitle({
  className,
  children,
  arrow = true,
  ...props
}: React.ComponentProps<"div"> & { arrow?: boolean }) {
  return (
    <div
      data-slot="directory-card-title"
      className={cn("flex items-start justify-between gap-3 font-display text-xl leading-tight font-medium tracking-tight", className)}
      {...props}
    >
      <span className="min-w-0">{children}</span>
      {arrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-primary transition-transform group-hover/directory-card:translate-x-0.5 group-hover/directory-card:-translate-y-0.5"
        />
      )}
    </div>
  );
}

function DirectoryCardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="directory-card-description" className={cn("text-sm leading-relaxed text-muted-foreground", className)} {...props} />;
}

function DirectoryCardTags({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="directory-card-tags" className={cn("mt-2 flex flex-wrap gap-1.5", className)} {...props} />;
}

/** Bottom row with a status dot and host details. */
function DirectoryCardFooter({
  className,
  status,
  children,
  ...props
}: React.ComponentProps<"div"> & { status?: "online" | "busy" | "offline" | "error" }) {
  return (
    <div
      data-slot="directory-card-footer"
      className={cn(
        "mt-auto flex min-h-11 items-center gap-2.5 border-t px-5 py-3 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase",
        className,
      )}
      {...props}
    >
      {status && <StatusDot tone={status} pulse={status === "online"} />}
      {children}
    </div>
  );
}

export {
  DirectoryCard,
  DirectoryCardArt,
  DirectoryCardHeader,
  DirectoryCardCategory,
  DirectoryCardTitle,
  DirectoryCardDescription,
  DirectoryCardTags,
  DirectoryCardFooter,
};
