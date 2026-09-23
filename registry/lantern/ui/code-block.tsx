"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

function CodeBlockCopyButton({
  value,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "value" | "onClick"> & { value: string | (() => string) }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(typeof value === "function" ? value() : value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can be blocked; leave the button in its idle state.
    }
  }

  return (
    <button
      type="button"
      data-slot="code-block-copy"
      data-copied={copied || undefined}
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={copy}
      className={cn(
        "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border bg-background/80 text-muted-foreground transition-colors outline-none hover:border-input hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-terminal [&_svg]:size-3.5",
        className,
      )}
      {...props}
    >
      {copied ? <Check className="text-success" /> : <Copy />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}

type CodeBlockProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Plain source text. Rendered line by line with the default Lantern text color. */
  code?: string;
  /** Filename or label shown in the title bar. */
  title?: React.ReactNode;
  /** Language badge in the title bar, e.g. "lua". */
  language?: string;
  /** Show line numbers. Applies to `code`. */
  showLineNumbers?: boolean;
  /** 1-based line numbers to mark with an orange bar and tint. Applies to `code`. */
  highlightLines?: number[];
  /** Max height of the scroll area, e.g. 320 or "20rem". */
  maxHeight?: number | string;
  /** Text copied by the copy button. Defaults to `code`, or the rendered text of `children`. */
  copyValue?: string;
  /** Hide the copy button. */
  copyable?: boolean;
};

/**
 * A code panel without a highlighter dependency. Pass `code` for plain text, or `children`
 * for content you highlighted yourself (for example shiki HTML).
 */
function CodeBlock({
  code,
  title,
  language,
  showLineNumbers = false,
  highlightLines,
  maxHeight,
  copyValue,
  copyable = true,
  className,
  children,
  ...props
}: CodeBlockProps) {
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const hasHeader = title != null || language != null;
  const highlighted = React.useMemo(() => new Set(highlightLines ?? []), [highlightLines]);
  const lines = React.useMemo(() => (code === undefined ? null : code.replace(/\n$/, "").split("\n")), [code]);

  const getCopyValue = () => copyValue ?? code ?? bodyRef.current?.innerText ?? "";

  const copyButton = copyable ? <CodeBlockCopyButton value={getCopyValue} /> : null;

  return (
    <div
      data-slot="code-block"
      className={cn("relative min-w-0 overflow-hidden rounded-lg border bg-terminal text-terminal-foreground", className)}
      {...props}
    >
      {hasHeader && (
        <div
          data-slot="code-block-header"
          className="flex min-h-11 items-center justify-between gap-3 border-b bg-[#16211c] py-2 pr-2 pl-4"
        >
          <span className="min-w-0 truncate font-mono text-[11px] text-[#a8b89b]">{title}</span>
          <span className="flex shrink-0 items-center gap-2">
            {language && (
              <span
                data-slot="code-block-language"
                className="rounded-sm border border-border px-1.5 py-1 font-mono text-[9px] leading-none tracking-[0.16em] text-muted-foreground uppercase"
              >
                {language}
              </span>
            )}
            {copyButton}
          </span>
        </div>
      )}
      {!hasHeader && copyButton && <div className="absolute top-2 right-2 z-10">{copyButton}</div>}
      <div
        ref={bodyRef}
        data-slot="code-block-body"
        role="region"
        aria-label={typeof title === "string" ? title : "Code"}
        tabIndex={0}
        style={maxHeight !== undefined ? { maxHeight } : undefined}
        className={cn(
          "overflow-auto font-mono text-[13px] leading-[1.7] outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset",
          "[scrollbar-color:var(--color-input)_transparent] [scrollbar-width:thin]",
          "[&_pre]:m-0 [&_pre]:bg-transparent! [&_pre]:font-mono",
        )}
      >
        {lines ? (
          <pre className="py-4">
            <code className="grid w-max min-w-full">
              {lines.map((line, i) => {
                const n = i + 1;
                const isHighlighted = highlighted.has(n);
                return (
                  <span
                    key={i}
                    data-line={n}
                    data-highlighted={isHighlighted || undefined}
                    className={cn(
                      "flex border-l-2 border-transparent pr-12 pl-[14px]",
                      isHighlighted && "border-primary bg-primary/10",
                    )}
                  >
                    {showLineNumbers && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mr-4 inline-block w-[3ch] shrink-0 text-right text-[#5f6f5a] select-none",
                          isHighlighted && "text-primary",
                        )}
                      >
                        {n}
                      </span>
                    )}
                    <span className="whitespace-pre">{line || " "}</span>
                  </span>
                );
              })}
            </code>
          </pre>
        ) : (
          <div className="[&_pre]:p-4">{children}</div>
        )}
      </div>
    </div>
  );
}

export { CodeBlock, CodeBlockCopyButton };
