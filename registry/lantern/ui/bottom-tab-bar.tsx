import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * The phone version of AppRail: equal-width icon tabs along the bottom of the screen,
 * with room for the home indicator. Position it yourself, e.g. `fixed inset-x-0 bottom-0 md:hidden`.
 */
function BottomTabBar({ className, children, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="bottom-tab-bar"
      className={cn("border-t bg-card pb-[max(env(safe-area-inset-bottom),0.5rem)]", className)}
      {...props}
    >
      <ul className="flex">{children}</ul>
    </nav>
  );
}

/** One tab. Renders a button, or pass asChild for a link. Put an icon and a short label inside. */
function BottomTabBarItem({
  className,
  isActive = false,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<"button"> & { isActive?: boolean; asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <li className="flex min-w-0 flex-1">
      <Comp
        data-slot="bottom-tab-bar-item"
        type={asChild ? type : (type ?? "button")}
        data-active={isActive || undefined}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "relative flex min-h-12 w-full min-w-0 cursor-pointer flex-col items-center justify-center gap-1 px-1 pt-2.5 pb-1 text-muted-foreground transition-colors outline-none",
          "before:absolute before:inset-x-3 before:top-0 before:h-0.5 before:bg-transparent data-[active]:text-primary data-[active]:before:bg-primary",
          "hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
          "[&>span]:max-w-full [&>span]:truncate [&>span]:font-mono [&>span]:text-[9px] [&>span]:leading-none [&>span]:tracking-[0.08em] [&>span]:uppercase",
          className,
        )}
        {...props}
      />
    </li>
  );
}

export { BottomTabBar, BottomTabBarItem };
