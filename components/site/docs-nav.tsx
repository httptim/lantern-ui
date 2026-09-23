"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export type NavGroup = { title: string; items: { title: string; href: string }[] };

export function DocsNav({ groups, onNavigate }: { groups: NavGroup[]; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation" className="grid gap-7">
      {groups.map((g) => (
        <div key={g.title}>
          <div className="mb-2 px-3 font-mono text-[10px] font-semibold tracking-[0.2em] text-success uppercase">{g.title}</div>
          <ul className="grid gap-px">
            {g.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-r-md border-l px-3 py-1.5 text-[13.5px] transition-colors focus-visible:bg-secondary focus-visible:outline-none",
                      active
                        ? "border-primary bg-card text-foreground"
                        : "border-transparent text-muted-foreground hover:border-input hover:text-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
