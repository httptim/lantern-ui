"use client";

import * as React from "react";
import { EllipsisIcon, PanelLeftIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { AppRail, AppRailContent, AppRailFooter, AppRailItem } from "@/registry/lantern/ui/app-rail";
import { BottomTabBar, BottomTabBarItem } from "@/registry/lantern/ui/bottom-tab-bar";
import { Button } from "@/registry/lantern/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/registry/lantern/ui/sheet";

export type AppShellNavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type AppShellProps = {
  /** Brand mark on the left of the top bar. */
  logo: React.ReactNode;
  /** Context pickers after the logo, e.g. a world Select and a relay status pill. */
  context?: React.ReactNode;
  /** Right side of the top bar, usually an AccountChip and a primary action. */
  actions?: React.ReactNode;
  nav: AppShellNavItem[];
  /** Items pinned to the bottom of the rail, e.g. Settings. */
  pinnedNav?: AppShellNavItem[];
  active: string;
  onNavigate: (id: string) => void;
  /** Optional list column (a fleet, sites, scripts). A column from 1024px, a sheet below that. */
  list?: React.ReactNode;
  listLabel?: string;
  /** Optional inspector. A right column from 1280px; below that it stacks under the main content. */
  inspector?: React.ReactNode;
  inspectorLabel?: string;
  children: React.ReactNode;
  className?: string;
};

function useMinWidth(px: number) {
  return React.useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(`(min-width: ${px}px)`);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(`(min-width: ${px}px)`).matches,
    // Server render stacks the inspector; wide screens move it into its column after hydration.
    () => false,
  );
}

/**
 * A full-height app layout: top bar, workspace rail, optional list column, main area and optional
 * inspector. On phones it becomes top bar, main and a bottom tab bar.
 */
export function AppShell({
  logo,
  context,
  actions,
  nav,
  pinnedNav = [],
  active,
  onNavigate,
  list,
  listLabel = "List",
  inspector,
  inspectorLabel = "Inspector",
  children,
  className,
}: AppShellProps) {
  const wide = useMinWidth(1280);
  const [listOpen, setListOpen] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);

  // Phones get four tabs and a More sheet when there are more than five destinations.
  const all = [...nav, ...pinnedNav];
  const tabs = all.length > 5 ? all.slice(0, 4) : all;
  const overflow = all.length > 5 ? all.slice(4) : [];
  const overflowActive = overflow.some((i) => i.id === active);

  const go = (id: string) => {
    onNavigate(id);
    setMoreOpen(false);
  };

  return (
    <div data-slot="app-shell" className={cn("flex h-svh min-h-0 flex-col bg-background", className)}>
      <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-card px-3 sm:gap-4 sm:px-4 lg:h-15">
        {list && (
          <Sheet open={listOpen} onOpenChange={setListOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label={`Open ${listLabel.toLowerCase()}`}>
                <PanelLeftIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-[300px] gap-0 p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle>{listLabel}</SheetTitle>
                <SheetDescription className="sr-only">Pick an item to show it in the main view.</SheetDescription>
              </SheetHeader>
              <div className="min-h-0 flex-1 overflow-y-auto">{list}</div>
            </SheetContent>
          </Sheet>
        )}
        <div className="shrink-0">{logo}</div>
        {context && <div className="flex min-w-0 items-center gap-3">{context}</div>}
        <div className="ml-auto flex min-w-0 items-center gap-3">{actions}</div>
      </header>

      <div className="flex min-h-0 flex-1">
        <AppRail aria-label="Workspaces" className="hidden md:flex">
          <AppRailContent>
            {nav.map((item) => (
              <AppRailItem key={item.id} isActive={item.id === active} onClick={() => onNavigate(item.id)}>
                <item.icon />
                <span>{item.label}</span>
              </AppRailItem>
            ))}
          </AppRailContent>
          {pinnedNav.length > 0 && (
            <AppRailFooter>
              {pinnedNav.map((item) => (
                <AppRailItem key={item.id} isActive={item.id === active} onClick={() => onNavigate(item.id)}>
                  <item.icon />
                  <span>{item.label}</span>
                </AppRailItem>
              ))}
            </AppRailFooter>
          )}
        </AppRail>

        {list && (
          <aside aria-label={listLabel} className="hidden w-[268px] shrink-0 flex-col overflow-y-auto border-r lg:flex">
            {list}
          </aside>
        )}

        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          {children}
          {inspector && !wide && (
            <section aria-label={inspectorLabel} className="border-t bg-card">
              {inspector}
            </section>
          )}
        </main>

        {inspector && wide && (
          <aside aria-label={inspectorLabel} className="w-[332px] shrink-0 overflow-y-auto border-l bg-card">
            {inspector}
          </aside>
        )}
      </div>

      <BottomTabBar aria-label="Sections" className="shrink-0 md:hidden">
        {tabs.map((item) => (
          <BottomTabBarItem key={item.id} isActive={item.id === active} onClick={() => go(item.id)}>
            <item.icon />
            <span>{item.label}</span>
          </BottomTabBarItem>
        ))}
        {overflow.length > 0 && (
          <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
            <SheetTrigger asChild>
              <BottomTabBarItem isActive={overflowActive}>
                <EllipsisIcon />
                <span>More</span>
              </BottomTabBarItem>
            </SheetTrigger>
            <SheetContent side="bottom" className="gap-0 pb-[max(env(safe-area-inset-bottom),1rem)]">
              <SheetHeader className="p-4">
                <SheetTitle>More</SheetTitle>
                <SheetDescription className="sr-only">Other workspaces</SheetDescription>
              </SheetHeader>
              <nav aria-label="More workspaces" className="grid grid-cols-3 gap-2 px-4">
                {overflow.map((item) => (
                  <Button
                    key={item.id}
                    variant={item.id === active ? "secondary" : "outline"}
                    aria-current={item.id === active ? "page" : undefined}
                    className={cn("h-16 flex-col gap-1.5", item.id === active && "border-primary text-primary")}
                    onClick={() => go(item.id)}
                  >
                    <item.icon />
                    <span className="font-mono text-[10px] tracking-[0.08em] uppercase">{item.label}</span>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        )}
      </BottomTabBar>
    </div>
  );
}
