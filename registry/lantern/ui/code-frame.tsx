import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Editor chrome: a file bar with a toolbar, a line-numbered code area and an optional status bar.
 * The body renders static code for docs and previews; mount a real editor as its children instead.
 */
function CodeFrame({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-frame"
      className={cn("flex min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border bg-[#0e1311]", className)}
      {...props}
    />
  );
}

/** The file bar. Wraps the toolbar onto its own line when space runs out. */
function CodeFrameHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-frame-header"
      className={cn(
        "flex min-h-12 shrink-0 flex-wrap items-center gap-x-2.5 gap-y-2 border-b bg-card px-3 py-2 sm:px-4",
        className,
      )}
      {...props}
    />
  );
}

function CodeFrameTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="code-frame-title"
      className={cn("min-w-0 truncate font-mono text-[13px] text-foreground", className)}
      {...props}
    />
  );
}

const codeFrameTagVariants = cva("shrink-0 font-mono text-[10px] leading-none tracking-[0.14em] uppercase", {
  variants: {
    tone: {
      warning: "text-warning",
      primary: "text-primary",
      success: "text-success",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: { tone: "warning" },
});

/** A mono status word next to the file name, such as Unsaved or New. */
function CodeFrameTag({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof codeFrameTagVariants>) {
  return <span data-slot="code-frame-tag" className={cn(codeFrameTagVariants({ tone }), className)} {...props} />;
}

/** Buttons on the right of the file bar. */
function CodeFrameToolbar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-frame-toolbar"
      role="toolbar"
      className={cn("ml-auto flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
}

const commentPattern = /^\s*(--|\/\/|#)/;

/**
 * The code area. Pass `code` for static, line-numbered text (comment lines are dimmed), or
 * children to mount your own editor so it fills the frame.
 */
function CodeFrameBody({
  className,
  code,
  highlightLines,
  startLine = 1,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  code?: string;
  /** 1-based line numbers to mark with an orange bar. */
  highlightLines?: number[];
  startLine?: number;
}) {
  const lines = code?.replace(/\n$/, "").split("\n");
  const marked = new Set(highlightLines ?? []);
  return (
    <div
      data-slot="code-frame-body"
      tabIndex={lines ? 0 : undefined}
      className={cn(
        "relative min-h-0 flex-1 overflow-auto font-mono text-[13px] leading-[1.75] outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset",
        lines && "py-3.5",
        className,
      )}
      {...props}
    >
      {lines ? (
        <pre className="m-0 min-w-fit font-[inherit]">
          <code className="grid">
            {lines.map((line, i) => {
              const n = i + startLine;
              return (
                <span
                  key={i}
                  data-highlighted={marked.has(n) || undefined}
                  className="flex border-l-2 border-transparent pr-4 data-[highlighted]:border-primary data-[highlighted]:bg-primary/8"
                >
                  <span
                    aria-hidden="true"
                    className="w-12 shrink-0 pr-4 text-right text-input select-none sm:w-14"
                  >
                    {n}
                  </span>
                  <span className={cn("whitespace-pre", commentPattern.test(line) ? "text-muted-foreground" : "text-foreground")}>
                    {line || " "}
                  </span>
                </span>
              );
            })}
          </code>
        </pre>
      ) : (
        children
      )}
    </div>
  );
}

/** Optional status bar under the code. */
function CodeFrameFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-frame-footer"
      className={cn(
        "flex min-h-9 shrink-0 items-center gap-3 border-t bg-card px-3 font-mono text-[11px] text-muted-foreground sm:px-4",
        className,
      )}
      {...props}
    />
  );
}

export {
  CodeFrame,
  CodeFrameHeader,
  CodeFrameTitle,
  CodeFrameTag,
  CodeFrameToolbar,
  CodeFrameBody,
  CodeFrameFooter,
  codeFrameTagVariants,
};
