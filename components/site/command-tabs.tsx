"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { CopyButton } from "./copy-button";

const runners = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
} as const;

type Runner = keyof typeof runners;

export function CommandTabs({ args, tool = "lanternui" }: { args: string; tool?: "lanternui" | "shadcn" }) {
  const [runner, setRunner] = useState<Runner>("npm");
  const command = `${runners[runner]} ${tool === "shadcn" ? "shadcn@latest" : "lanternui"} ${args}`;
  return (
    <div className="overflow-hidden rounded-lg border bg-terminal">
      <div className="flex items-center justify-between gap-2 border-b bg-[#16211c] pr-2 pl-1">
        <div role="tablist" className="flex">
          {(Object.keys(runners) as Runner[]).map((r) => (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={runner === r}
              onClick={() => setRunner(r)}
              className={cn(
                "-mb-px cursor-pointer border-b px-3 py-2.5 font-mono text-[11px] transition-colors focus-visible:outline-none focus-visible:text-foreground",
                runner === r ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {r}
            </button>
          ))}
        </div>
        <CopyButton value={command} className="size-7" />
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] text-terminal-foreground">
        <span className="mr-2 text-primary select-none">$</span>
        {command}
      </pre>
    </div>
  );
}
