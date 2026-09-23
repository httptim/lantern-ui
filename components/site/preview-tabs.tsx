"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

export function PreviewTabs({ preview, code, align = "center" }: { preview: React.ReactNode; code: React.ReactNode; align?: "center" | "start" }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  return (
    <div className="min-w-0">
      <div role="tablist" className="mb-3 flex gap-1 border-b">
        {(["preview", "code"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px cursor-pointer border-b px-3 py-2.5 font-mono text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors focus-visible:text-foreground focus-visible:outline-none",
              tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <div role="tabpanel" hidden={tab !== "preview"}>
        <div
          className={cn(
            "flex min-h-[320px] w-full overflow-x-auto rounded-lg border bg-grid p-6 sm:p-10",
            align === "center" ? "items-center justify-center" : "items-start justify-center",
          )}
        >
          {preview}
        </div>
      </div>
      <div role="tabpanel" hidden={tab !== "code"}>
        {code}
      </div>
    </div>
  );
}
