"use client";

import * as React from "react";
import { CheckIcon, CopyIcon, EyeIcon, EyeOffIcon, TriangleAlertIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** TurtleDeck's show-once key box: a mono key in a panel with copy, optional masking and a warning line. */
function KeyReveal({
  className,
  value,
  label = "API key",
  masked = false,
  warning = "This key is shown once. Copy it now and store it somewhere safe.",
  onCopy,
  ...props
}: Omit<React.ComponentProps<"div">, "onCopy"> & {
  value: string;
  label?: React.ReactNode;
  /** Start hidden with a reveal toggle. */
  masked?: boolean;
  /** Set to null to hide the warning line. */
  warning?: React.ReactNode;
  onCopy?: (value: string) => void;
}) {
  const [revealed, setRevealed] = React.useState(!masked);
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const id = React.useId();

  React.useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    if (!(await writeClipboard(value))) return;
    onCopy?.(value);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  const shown = revealed ? value : "\u2022".repeat(Math.min(value.length, 32));

  return (
    <div
      data-slot="key-reveal"
      className={cn("flex w-full min-w-0 flex-col gap-2.5 rounded-lg border bg-card p-3 sm:p-4", className)}
      {...props}
    >
      <div
        id={`${id}-label`}
        className="font-mono text-[10px] font-semibold tracking-[0.2em] text-success uppercase"
      >
        {label}
      </div>
      <div className="flex min-w-0 items-stretch gap-1.5 rounded-md border border-input bg-background/60 p-1 pl-3">
        <code
          aria-labelledby={`${id}-label`}
          data-slot="key-reveal-value"
          className={cn(
            "min-w-0 flex-1 self-center py-1.5 font-mono text-[13px] break-all text-primary selection:bg-primary selection:text-primary-foreground",
            !revealed && "tracking-wider text-muted-foreground select-none",
          )}
        >
          {shown}
        </code>
        {masked && (
          <button
            type="button"
            onClick={() => setRevealed((r) => !r)}
            aria-label={revealed ? "Hide key" : "Reveal key"}
            aria-pressed={revealed}
            className={keyButton}
          >
            {revealed ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy key"}
          data-copied={copied || undefined}
          className={cn(keyButton, "data-[copied]:text-success")}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span className="hidden font-mono text-[10px] tracking-[0.16em] uppercase sm:inline">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Key copied to clipboard" : ""}
        </span>
      </div>
      {warning != null && (
        <p data-slot="key-reveal-warning" className="flex items-start gap-2 text-xs text-warning">
          <TriangleAlertIcon aria-hidden="true" className="mt-px size-3.5 shrink-0" />
          <span>{warning}</span>
        </p>
      )}
    </div>
  );
}

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers or frames without the async clipboard API.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

const keyButton =
  "inline-flex h-8 min-w-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 self-start rounded-sm px-2 text-muted-foreground outline-none transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 [&_svg]:size-4";

export { KeyReveal };
