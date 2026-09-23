"use client";

import { cn } from "@/lib/utils";

export type DocsNavGroup = { title: string; items: { title: string; href: string }[] };

export const docsNavGroups: DocsNavGroup[] = [
  {
    title: "Getting started",
    items: [
      { title: "Introduction", href: "#introduction" },
      { title: "Installation", href: "#installation" },
      { title: "Your first hub", href: "#first-hub" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Publishing a site", href: "#publishing" },
      { title: "Site keys", href: "#site-keys" },
      { title: "Guestbooks", href: "#guestbooks" },
      { title: "Turtle relays", href: "#relays" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "lantern CLI", href: "#cli" },
      { title: "Lua API", href: "#lua-api" },
      { title: "Page components", href: "#components" },
      { title: "Status codes", href: "#status-codes" },
    ],
  },
];

/** Grouped docs links. The active item gets the orange left border. */
export function DocsNav({
  groups = docsNavGroups,
  active,
  onNavigate,
  className,
}: {
  groups?: DocsNavGroup[];
  active?: string;
  onNavigate?: (href: string) => void;
  className?: string;
}) {
  return (
    <nav aria-label="Documentation" className={cn("grid gap-7", className)}>
      {groups.map((group) => (
        <div key={group.title}>
          <div className="mb-2 px-3 font-mono text-[10px] font-semibold tracking-[0.2em] text-success uppercase">
            {group.title}
          </div>
          <ul className="grid gap-px">
            {group.items.map((item) => {
              const isActive = item.href === active;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => onNavigate?.(item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block rounded-r-md border-l px-3 py-1.5 text-[13.5px] transition-colors outline-none focus-visible:bg-secondary",
                      isActive
                        ? "border-primary bg-card text-foreground"
                        : "border-transparent text-muted-foreground hover:border-input hover:text-foreground",
                    )}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
