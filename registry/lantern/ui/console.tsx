"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** TurtleDeck's log console: a panel of timestamped lines over a command prompt. */
function Console({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="console"
      className={cn(
        "flex min-h-0 flex-col overflow-hidden rounded-lg border bg-[#0c110f] font-mono text-[12px] leading-relaxed text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function ConsoleHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="console-header"
      className={cn(
        "flex items-center justify-between gap-3 border-b bg-card px-3 py-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase [&_svg]:size-3.5 [&_svg]:text-primary",
        className,
      )}
      {...props}
    />
  );
}

/**
 * The scrolling log region. Sticks to the bottom as lines arrive unless the reader has scrolled up.
 */
function ConsoleLines({
  className,
  children,
  autoScroll = true,
  ...props
}: React.ComponentProps<"div"> & { autoScroll?: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const pinned = React.useRef(true);

  const onScroll = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    pinned.current = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
  }, []);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !autoScroll) return;
    const scroll = () => {
      if (pinned.current) el.scrollTop = el.scrollHeight;
    };
    scroll();
    const observer = new MutationObserver(scroll);
    observer.observe(el, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [autoScroll]);

  return (
    <div
      ref={ref}
      role="log"
      aria-live="polite"
      tabIndex={0}
      data-slot="console-lines"
      onScroll={onScroll}
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:ring-inset",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

const consoleLineVariants = cva("flex gap-3 py-px break-words whitespace-pre-wrap", {
  variants: {
    level: {
      info: "text-foreground",
      system: "text-muted-foreground",
      error: "text-destructive",
      input: "text-success",
    },
  },
  defaultVariants: { level: "info" },
});

function ConsoleLine({
  className,
  level = "info",
  time,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof consoleLineVariants> & { time?: React.ReactNode }) {
  return (
    <div data-slot="console-line" data-level={level} className={cn(consoleLineVariants({ level }), className)} {...props}>
      {time != null && (
        <time className="shrink-0 text-muted-foreground/55 tabular-nums select-none">{time}</time>
      )}
      <span className="min-w-0 flex-1">
        {level === "input" && (
          <span aria-hidden="true" className="mr-1.5 text-primary select-none">
            &gt;
          </span>
        )}
        {children}
      </span>
    </div>
  );
}

/** Command row with an orange prompt glyph. Submitting calls onCommand and clears the field. */
function ConsoleInput({
  className,
  prompt = ">",
  onCommand,
  onKeyDown,
  "aria-label": ariaLabel = "Command",
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "defaultValue"> & {
  prompt?: React.ReactNode;
  onCommand?: (command: string) => void;
}) {
  const [value, setValue] = React.useState("");
  const history = React.useRef<string[]>([]);
  const cursor = React.useRef(-1);

  return (
    <form
      data-slot="console-input"
      className={cn(
        "flex items-center gap-2 border-t bg-card px-3 focus-within:bg-secondary/60 transition-colors",
        className,
      )}
      onSubmit={(event) => {
        event.preventDefault();
        const command = value.trim();
        if (!command) return;
        history.current.push(command);
        cursor.current = -1;
        onCommand?.(command);
        setValue("");
      }}
    >
      <span aria-hidden="true" className="font-semibold text-primary select-none">
        {prompt}
      </span>
      <input
        type="text"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          const past = history.current;
          if (event.key === "ArrowUp" && past.length) {
            event.preventDefault();
            cursor.current = cursor.current < 0 ? past.length - 1 : Math.max(0, cursor.current - 1);
            setValue(past[cursor.current]);
          } else if (event.key === "ArrowDown" && cursor.current >= 0) {
            event.preventDefault();
            cursor.current += 1;
            if (cursor.current >= past.length) {
              cursor.current = -1;
              setValue("");
            } else {
              setValue(past[cursor.current]);
            }
          }
        }}
        className="h-10 min-w-0 flex-1 bg-transparent font-mono text-[12px] text-foreground caret-primary outline-none placeholder:text-muted-foreground/60"
        {...props}
      />
    </form>
  );
}

export { Console, ConsoleHeader, ConsoleLines, ConsoleLine, ConsoleInput, consoleLineVariants };
