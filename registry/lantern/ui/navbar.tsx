"use client";

import * as React from "react";
import { Slot } from "radix-ui";
import { ArrowUpRightIcon, MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/lantern/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/lantern/ui/sheet";

/** The sticky Lantern site header. Put NavbarBrand, NavbarLinks, NavbarCta and NavbarMobile inside. */
function Navbar({ className, children, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="navbar"
      className={cn("sticky top-0 z-40 w-full border-b bg-background/85 backdrop-blur-md", className)}
      {...props}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-10">{children}</div>
    </header>
  );
}

/** The Lantern diamond mark. */
function NavbarMark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="navbar-mark"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-7 shrink-0 text-primary", className)}
      {...props}
    >
      <path d="m12 2 10 10-10 10L2 12ZM12 7l5 5-5 5-5-5Z" />
    </svg>
  );
}

function NavbarBrand({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="navbar-brand"
      className={cn(
        "mr-auto flex min-w-0 items-center gap-2 rounded-sm font-display text-2xl font-semibold tracking-[-0.04em] text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}

/** The square outlined mono tag next to the brand name, like "HUB". */
function NavbarLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="navbar-label"
      className={cn(
        "ml-1 border border-[#647160] px-1.5 py-1 font-mono text-[9px] leading-none font-normal tracking-[0.2em] text-[#b8c2b2] uppercase",
        className,
      )}
      {...props}
    />
  );
}

function NavbarLinks({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar-links"
      aria-label="Main"
      className={cn("hidden items-center gap-7 text-[13px] md:flex", className)}
      {...props}
    />
  );
}

function NavbarLink({
  className,
  active,
  asChild = false,
  ...props
}: React.ComponentProps<"a"> & { active?: boolean; asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="navbar-link"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-sm text-foreground transition-colors outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring data-[active]:text-primary",
        className,
      )}
      {...props}
    />
  );
}

function NavbarCta({
  className,
  children,
  asChild = false,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="navbar-cta"
      className={cn(
        "hidden items-center justify-between gap-3 rounded-md border border-[#566151] px-3.5 py-2.5 text-[13px] text-foreground transition-colors outline-none hover:border-muted-foreground hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:inline-flex [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-primary",
        className,
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {children}
          <ArrowUpRightIcon aria-hidden="true" />
        </>
      )}
    </Comp>
  );
}

/**
 * Menu button shown below the md breakpoint. Opens a Sheet with the children, which are usually
 * the same NavbarLink and NavbarCta elements used in the desktop bar. Following a link closes it.
 */
function NavbarMobile({
  className,
  children,
  title = "Menu",
  description,
  side = "right",
  ...props
}: Omit<React.ComponentProps<typeof SheetContent>, "title"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open menu" data-slot="navbar-mobile-trigger" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className={cn("w-[85%] max-w-xs", className)} {...props}>
        <SheetHeader className="border-b">
          <SheetTitle className="font-mono text-[10px] font-semibold tracking-[0.2em] text-success uppercase">{title}</SheetTitle>
          {description ? (
            <SheetDescription>{description}</SheetDescription>
          ) : (
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
          )}
        </SheetHeader>
        <nav
          data-slot="navbar-mobile"
          aria-label="Mobile"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setOpen(false);
          }}
          className={cn(
            "flex flex-col gap-1 px-3 pb-5",
            "[&_[data-slot=navbar-link]]:flex [&_[data-slot=navbar-link]]:rounded-md [&_[data-slot=navbar-link]]:px-2 [&_[data-slot=navbar-link]]:py-2.5 [&_[data-slot=navbar-link]]:text-[15px] [&_[data-slot=navbar-link]]:hover:bg-secondary",
            "[&_[data-slot=navbar-cta]]:mt-3 [&_[data-slot=navbar-cta]]:flex",
          )}
        >
          {children}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export { Navbar, NavbarBrand, NavbarCta, NavbarLabel, NavbarLink, NavbarLinks, NavbarMark, NavbarMobile };
