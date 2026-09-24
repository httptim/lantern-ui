"use client";

import * as React from "react";
import { ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/lantern/ui/collapsible";

/** 950 -> "950", 2300 -> "2.3K", 21400 -> "21.4K". */
function formatCount(n: number) {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 100_000 ? 1 : 0).replace(/\.0$/, "")}K`;
  return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
}

/**
 * A collapsible box for streamed model output (thinking, code being written, logs).
 * It follows the end of the text as it grows, until the reader scrolls up.
 */
function StreamBox({
  className,
  title,
  text = "",
  meta,
  streaming = false,
  showCount = true,
  open,
  defaultOpen = true,
  onOpenChange,
  maxHeight = 160,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Collapsible>, "title"> & {
  title: React.ReactNode;
  /** The streamed text so far. */
  text?: string;
  /** Extra text on the right of the header, e.g. "whole request 2:16". */
  meta?: React.ReactNode;
  /** Shows a pulsing dot and keeps following new text. */
  streaming?: boolean;
  /** Show the character count after the title. */
  showCount?: boolean;
  /** Height of the scroll area, e.g. 160 or "12rem". */
  maxHeight?: number | string;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const stick = React.useRef(true);

  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
  }

  React.useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el && stick.current) el.scrollTop = el.scrollHeight;
  }, [text, children]);

  return (
    <Collapsible
      data-slot="stream-box"
      data-streaming={streaming || undefined}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next) => {
        if (next) stick.current = true;
        onOpenChange?.(next);
      }}
      className={cn("group/stream min-w-0 rounded-md border bg-background", className)}
      {...props}
    >
      <CollapsibleTrigger
        data-slot="stream-box-trigger"
        className={cn(
          "flex w-full min-w-0 cursor-pointer items-center gap-2 px-2.5 py-2 text-left font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase outline-none",
          "rounded-md hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
        )}
      >
        <ChevronRightIcon
          aria-hidden="true"
          className="size-3 shrink-0 transition-transform group-data-[state=open]/stream:rotate-90"
        />
        {streaming && (
          <span aria-hidden="true" className="size-1.5 shrink-0 animate-lantern-pulse rounded-full bg-primary [animation-duration:1.2s]" />
        )}
        <span className="min-w-0 truncate">
          {title}
          {showCount && text.length > 0 && (
            <span data-slot="stream-box-count" className="tabular-nums">
              {"  /  "}
              {formatCount(text.length)} chars
            </span>
          )}
        </span>
        {meta != null && (
          <span data-slot="stream-box-meta" className="ml-auto shrink-0 tabular-nums max-sm:hidden">
            {meta}
          </span>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          ref={scrollRef}
          data-slot="stream-box-content"
          onScroll={onScroll}
          aria-busy={streaming}
          tabIndex={0}
          className="overflow-y-auto overscroll-contain border-t px-2.5 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset"
          style={{ maxHeight }}
        >
          {children ?? (
            <pre className="m-0 font-mono text-[11px] leading-relaxed break-words whitespace-pre-wrap text-muted-foreground">
              {text}
              {streaming && (
                <span aria-hidden="true" className="ml-px inline-block h-3 w-1.5 translate-y-0.5 animate-lantern-blink bg-primary/80" />
              )}
            </pre>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export { StreamBox, formatCount };
