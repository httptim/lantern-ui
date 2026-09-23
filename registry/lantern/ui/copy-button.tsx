"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { CheckIcon, CopyIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/lantern/ui/button";

type CopyState = "idle" | "copied" | "error";

async function writeClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Permission denied or unfocused document: try the legacy path below.
    }
  }
  // Fallback for insecure origins, embedded frames and older browsers.
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(area);
  if (!ok) throw new Error("Copy command failed");
}

/** An icon button that copies `value` and flashes a green check. */
function CopyButton({
  className,
  value,
  variant = "ghost",
  size = "icon-sm",
  label = "Copy",
  timeout = 1500,
  onCopy,
  onCopyError,
  onClick,
  children,
  ...props
}: Omit<React.ComponentProps<"button">, "value"> &
  VariantProps<typeof buttonVariants> & {
    value: string;
    /** Accessible name before copying. */
    label?: string;
    /** How long the copied state lasts, in ms. */
    timeout?: number;
    onCopy?: (value: string) => void;
    onCopyError?: (error: unknown) => void;
  }) {
  const [state, setState] = React.useState<CopyState>("idle");
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    try {
      await writeClipboard(value);
      setState("copied");
      onCopy?.(value);
    } catch (error) {
      setState("error");
      onCopyError?.(error);
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), timeout);
  }

  const Icon = state === "copied" ? CheckIcon : state === "error" ? XIcon : CopyIcon;
  const status = state === "copied" ? "Copied" : state === "error" ? "Copy failed" : "";

  return (
    <button
      type="button"
      data-slot="copy-button"
      data-state={state}
      aria-label={children ? undefined : state === "idle" ? label : status}
      className={cn(
        buttonVariants({ variant, size }),
        "data-[state=copied]:text-success data-[state=error]:text-destructive",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <Icon key={state} aria-hidden="true" className={cn(state !== "idle" && "animate-in zoom-in-50 fade-in-0 duration-150")} />
      {children}
      <span role="status" aria-live="polite" className="sr-only">
        {status}
      </span>
    </button>
  );
}

export { CopyButton };
