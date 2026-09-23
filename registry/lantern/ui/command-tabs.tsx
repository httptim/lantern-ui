"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

const packageManagers = ["npm", "pnpm", "yarn", "bun"] as const;

type PackageManager = (typeof packageManagers)[number];

const runners: Record<"dlx" | "install", Record<PackageManager, string>> = {
  dlx: { npm: "npx", pnpm: "pnpm dlx", yarn: "yarn dlx", bun: "bunx --bun" },
  install: { npm: "npm install", pnpm: "pnpm add", yarn: "yarn add", bun: "bun add" },
};

const STORAGE_KEY = "lantern-package-manager";
const CHANGE_EVENT = "lantern-package-manager-change";

function isPackageManager(value: unknown): value is PackageManager {
  return typeof value === "string" && (packageManagers as readonly string[]).includes(value);
}

// The choice lives in localStorage when available, with an in-memory fallback so
// every instance on the page stays in sync even when storage is blocked.
let memoryChoice: PackageManager | null = null;

function readChoice(): PackageManager {
  if (memoryChoice) return memoryChoice;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isPackageManager(stored)) return stored;
  } catch {
    // Storage unavailable.
  }
  return "npm";
}

function writeChoice(value: PackageManager) {
  memoryChoice = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage unavailable; the in-memory choice still syncs this page.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    memoryChoice = null;
    callback();
  };
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

/** The package manager last picked in any CommandTabs, shared across the page and tabs. */
function usePackageManager() {
  const value = React.useSyncExternalStore(subscribe, readChoice, () => "npm" as PackageManager);
  return [value, writeChoice] as const;
}

function CommandTabsCopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can be blocked.
    }
  }

  return (
    <button
      type="button"
      data-slot="command-tabs-copy"
      aria-label={copied ? "Copied" : "Copy command"}
      onClick={copy}
      className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border bg-background/80 text-muted-foreground transition-colors outline-none hover:border-input hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-terminal [&_svg]:size-3.5"
    >
      {copied ? <Check className="text-success" /> : <Copy />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}

type CommandTabsProps = Omit<
  React.ComponentProps<typeof TabsPrimitive.Root>,
  "children" | "value" | "defaultValue" | "onValueChange"
> & {
  /** The command after the runner, e.g. "lanterncn add button" or "radix-ui lucide-react". */
  command?: string;
  /** "dlx" runs a package (npx, pnpm dlx...). "install" adds packages (npm install, pnpm add...). */
  type?: "dlx" | "install";
  /** Full command per manager. Overrides `command` and `type` for the managers it lists. */
  commands?: Partial<Record<PackageManager, string>>;
};

/** Package manager switcher: the same command for npm, pnpm, yarn and bun. */
function CommandTabs({ command = "", type = "dlx", commands, className, ...props }: CommandTabsProps) {
  const [manager, setManager] = usePackageManager();

  const managers = commands && !command ? packageManagers.filter((m) => commands[m]) : packageManagers;
  const active = managers.includes(manager) ? manager : managers[0];
  const resolve = (m: PackageManager) => commands?.[m] ?? `${runners[type][m]} ${command}`.trim();

  return (
    <TabsPrimitive.Root
      data-slot="command-tabs"
      value={active}
      onValueChange={(value) => isPackageManager(value) && setManager(value)}
      className={cn("min-w-0 overflow-hidden rounded-lg border bg-terminal text-terminal-foreground", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-2 border-b bg-[#16211c] pr-2 pl-1">
        <TabsPrimitive.List
          aria-label="Package manager"
          className="flex min-w-0 overflow-x-auto [scrollbar-width:none]"
        >
          {managers.map((m) => (
            <TabsPrimitive.Trigger
              key={m}
              value={m}
              className="-mb-px shrink-0 cursor-pointer border-b-2 border-transparent px-3 py-2.5 font-mono text-[11px] tracking-[0.08em] text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:bg-secondary focus-visible:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              {m}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
        <CommandTabsCopyButton value={resolve(active)} />
      </div>
      {managers.map((m) => (
        <TabsPrimitive.Content
          key={m}
          value={m}
          className="outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset"
        >
          <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-relaxed [scrollbar-width:thin]">
            <span aria-hidden="true" className="mr-2 text-primary select-none">
              $
            </span>
            {resolve(m)}
          </pre>
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}

export { CommandTabs, usePackageManager, type PackageManager };
