import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Vertical workspace navigation: icon over a mono label, the active item marked with an
 * orange left border. Put the main items in AppRailContent and pinned items in AppRailFooter.
 * Pair it with BottomTabBar on phones.
 */
function AppRail({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="app-rail"
      className={cn("flex h-full w-[4.5rem] shrink-0 flex-col border-r bg-card py-2", className)}
      {...props}
    />
  );
}

function AppRailContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="app-rail-content"
      className={cn("flex min-h-0 flex-1 flex-col items-stretch gap-0.5 overflow-y-auto [scrollbar-width:none]", className)}
      {...props}
    />
  );
}

function AppRailFooter({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="app-rail-footer"
      className={cn("mt-auto flex flex-col items-stretch gap-0.5 pt-2", className)}
      {...props}
    />
  );
}

/**
 * One rail link. Renders a button, or pass asChild to render your own link.
 * Put an icon and a short label inside.
 */
function AppRailItem({
  className,
  isActive = false,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<"button"> & { isActive?: boolean; asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <li className="flex">
      <Comp
        data-slot="app-rail-item"
        type={asChild ? type : (type ?? "button")}
        data-active={isActive || undefined}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "relative flex w-full cursor-pointer flex-col items-center gap-1 border-l-2 border-transparent px-1 py-2.5 text-muted-foreground transition-colors outline-none",
          "hover:bg-secondary/60 hover:text-foreground focus-visible:bg-secondary focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset",
          "data-[active]:border-primary data-[active]:bg-secondary data-[active]:text-primary",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
          "[&>span]:max-w-full [&>span]:truncate [&>span]:font-mono [&>span]:text-[9px] [&>span]:leading-none [&>span]:tracking-[0.08em] [&>span]:uppercase",
          className,
        )}
        {...props}
      />
    </li>
  );
}

export { AppRail, AppRailContent, AppRailFooter, AppRailItem };
