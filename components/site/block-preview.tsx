"use client";

import { ArrowUpRight, Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const sizes = [
  { key: "desktop", label: "Desktop", icon: Monitor, width: "100%" },
  { key: "tablet", label: "Tablet", icon: Tablet, width: "768px" },
  { key: "mobile", label: "Phone", icon: Smartphone, width: "375px" },
] as const;

export function BlockPreview({ name, code, height = 760 }: { name: string; code: React.ReactNode; height?: number }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [size, setSize] = useState<(typeof sizes)[number]["key"]>("desktop");
  const tabCls = (on: boolean) =>
    cn(
      "-mb-px cursor-pointer border-b px-3 py-2.5 font-mono text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors focus-visible:text-foreground focus-visible:outline-none",
      on ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground",
    );
  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-center justify-between gap-3 border-b">
        <div role="tablist" className="flex gap-1">
          <button type="button" role="tab" aria-selected={tab === "preview"} onClick={() => setTab("preview")} className={tabCls(tab === "preview")}>
            Preview
          </button>
          <button type="button" role="tab" aria-selected={tab === "code"} onClick={() => setTab("code")} className={tabCls(tab === "code")}>
            Code
          </button>
        </div>
        <div className="flex items-center gap-1 pb-1.5">
          {tab === "preview" && (
            <div className="hidden items-center gap-0.5 rounded-md border p-0.5 md:flex" role="group" aria-label="Preview width">
              {sizes.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  aria-label={s.label}
                  aria-pressed={size === s.key}
                  onClick={() => setSize(s.key)}
                  className={cn(
                    "inline-flex size-7 cursor-pointer items-center justify-center rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    size === s.key ? "bg-secondary text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <s.icon className="size-3.5" />
                </button>
              ))}
            </div>
          )}
          <a
            href={`/view/${name}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open in a new tab"
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
      <div role="tabpanel" hidden={tab !== "preview"}>
        <div className="overflow-hidden rounded-lg border bg-grid">
          <iframe
            src={`/view/${name}`}
            title={`${name} preview`}
            loading="lazy"
            className="mx-auto block border-x bg-background transition-[width] duration-300 first:border-x-0"
            style={{ width: sizes.find((s) => s.key === size)!.width, height, maxWidth: "100%" }}
          />
        </div>
      </div>
      <div role="tabpanel" hidden={tab !== "code"}>
        {code}
      </div>
    </div>
  );
}
