"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type TocItem = { id: string; title: string; depth?: 2 | 3 };

/** "On this page" links. Highlights the heading nearest the top of the viewport. */
export function Toc({ items, className }: { items: TocItem[]; className?: string }) {
  const [current, setCurrent] = React.useState(items[0]?.id);
  const ids = items.map((item) => item.id).join(",");

  React.useEffect(() => {
    const headings = ids
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-72px 0px -65% 0px" },
    );
    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <nav aria-label="On this page" className={cn("text-[13px]", className)}>
      <div className="mb-3 font-mono text-[10px] font-semibold tracking-[0.2em] text-success uppercase">On this page</div>
      <ul className="grid gap-2 border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={current === item.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-0.5 transition-colors outline-none focus-visible:text-foreground",
                item.depth === 3 ? "pl-6" : "pl-3",
                current === item.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
