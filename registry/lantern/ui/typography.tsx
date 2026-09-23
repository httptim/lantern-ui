import * as React from "react";

import { cn } from "@/lib/utils";

function TypographyH1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="typography-h1"
      className={cn("scroll-m-20 font-display text-4xl leading-[1.08] font-medium tracking-[-0.05em] text-balance sm:text-5xl", className)}
      {...props}
    />
  );
}

function TypographyH2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="typography-h2"
      className={cn(
        "mt-10 scroll-m-20 border-b pb-2 font-display text-3xl leading-tight font-medium tracking-[-0.04em] first:mt-0",
        className,
      )}
      {...props}
    />
  );
}

function TypographyH3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="typography-h3"
      className={cn("mt-8 scroll-m-20 font-display text-2xl leading-snug font-medium tracking-tight", className)}
      {...props}
    />
  );
}

function TypographyH4({ className, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4
      data-slot="typography-h4"
      className={cn("mt-6 scroll-m-20 font-display text-lg leading-snug font-medium tracking-tight", className)}
      {...props}
    />
  );
}

function TypographyP({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="typography-p"
      className={cn("leading-[1.8] text-foreground/85 [&:not(:first-child)]:mt-5", className)}
      {...props}
    />
  );
}

function TypographyBlockquote({ className, ...props }: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      data-slot="typography-blockquote"
      className={cn("mt-6 border-l-2 border-primary bg-card/60 py-2 pr-4 pl-5 text-foreground/90 italic", className)}
      {...props}
    />
  );
}

function TypographyList({
  className,
  ordered = false,
  ...props
}: React.HTMLAttributes<HTMLElement> & { ordered?: boolean }) {
  const Comp: React.ElementType = ordered ? "ol" : "ul";
  return (
    <Comp
      data-slot="typography-list"
      className={cn(
        "my-5 ml-6 space-y-2 leading-[1.7] text-foreground/85 [&>li]:pl-1.5 [&>li]:marker:font-mono [&>li]:marker:text-[0.8em] [&>li]:marker:text-success",
        ordered ? "list-decimal" : "list-[square]",
        className,
      )}
      {...props}
    />
  );
}

function TypographyInlineCode({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      data-slot="typography-inline-code"
      className={cn(
        "rounded-sm border border-terminal-border/60 bg-terminal px-[0.35em] py-[0.1em] font-mono text-[0.85em] text-terminal-foreground",
        className,
      )}
      {...props}
    />
  );
}

function TypographyLead({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="typography-lead" className={cn("text-lg leading-[1.7] text-muted-foreground sm:text-xl", className)} {...props} />;
}

function TypographyLarge({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="typography-large" className={cn("font-display text-lg font-medium tracking-tight", className)} {...props} />;
}

function TypographySmall({ className, ...props }: React.ComponentProps<"small">) {
  return (
    <small
      data-slot="typography-small"
      className={cn("font-mono text-[10px] leading-none tracking-[0.2em] text-success uppercase", className)}
      {...props}
    />
  );
}

function TypographyMuted({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="typography-muted" className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function TypographyTable({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="typography-table" className="my-6 w-full overflow-x-auto rounded-lg border">
      <table
        className={cn(
          "w-full border-collapse text-sm",
          "[&_th]:border-b [&_th]:bg-secondary/60 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-mono [&_th]:text-[10px] [&_th]:font-normal [&_th]:tracking-[0.2em] [&_th]:text-muted-foreground [&_th]:uppercase",
          "[&_td]:border-b [&_td]:px-4 [&_td]:py-2.5 [&_tr:last-child>td]:border-b-0 [&_tbody_tr:nth-child(even)]:bg-card/50",
          className,
        )}
        {...props}
      />
    </div>
  );
}

/**
 * Styles raw HTML or rendered markdown children (h1 to h4, paragraphs, links, lists, blockquotes,
 * code, rules and tables) without @tailwindcss/typography. Content inside a .not-prose element is left alone.
 */
function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prose"
      className={cn(
        "max-w-[68ch] text-[15px] leading-[1.8] text-foreground/85",
        // Headings
        "[&_:is(h1,h2,h3,h4):not(:where(.not-prose,.not-prose_*))]:scroll-m-20 [&_:is(h1,h2,h3,h4):not(:where(.not-prose,.not-prose_*))]:font-display [&_:is(h1,h2,h3,h4):not(:where(.not-prose,.not-prose_*))]:font-medium [&_:is(h1,h2,h3,h4):not(:where(.not-prose,.not-prose_*))]:text-foreground",
        "[&_h1:not(:where(.not-prose_*))]:mb-6 [&_h1:not(:where(.not-prose_*))]:text-4xl [&_h1:not(:where(.not-prose_*))]:leading-[1.08] [&_h1:not(:where(.not-prose_*))]:tracking-[-0.05em] sm:[&_h1:not(:where(.not-prose_*))]:text-5xl",
        "[&_h2:not(:where(.not-prose_*))]:mt-12 [&_h2:not(:where(.not-prose_*))]:mb-4 [&_h2:not(:where(.not-prose_*))]:border-b [&_h2:not(:where(.not-prose_*))]:pb-2 [&_h2:not(:where(.not-prose_*))]:text-[1.75rem] [&_h2:not(:where(.not-prose_*))]:leading-tight [&_h2:not(:where(.not-prose_*))]:tracking-[-0.04em]",
        "[&_h3:not(:where(.not-prose_*))]:mt-9 [&_h3:not(:where(.not-prose_*))]:mb-3 [&_h3:not(:where(.not-prose_*))]:text-xl [&_h3:not(:where(.not-prose_*))]:tracking-tight",
        "[&_h4:not(:where(.not-prose_*))]:mt-7 [&_h4:not(:where(.not-prose_*))]:mb-2 [&_h4:not(:where(.not-prose_*))]:text-base [&_h4:not(:where(.not-prose_*))]:tracking-tight",
        "[&>:first-child]:mt-0",
        // Text
        "[&_p:not(:where(.not-prose_*))]:my-5",
        "[&_a:not(:where(.not-prose_*))]:text-primary [&_a:not(:where(.not-prose_*))]:underline [&_a:not(:where(.not-prose_*))]:decoration-primary/40 [&_a:not(:where(.not-prose_*))]:underline-offset-4 [&_a:not(:where(.not-prose_*))]:hover:decoration-primary",
        "[&_strong:not(:where(.not-prose_*))]:font-semibold [&_strong:not(:where(.not-prose_*))]:text-foreground",
        // Lists
        "[&_:is(ul,ol):not(:where(.not-prose_*))]:my-5 [&_:is(ul,ol):not(:where(.not-prose_*))]:ml-6 [&_:is(ul,ol):not(:where(.not-prose_*))]:space-y-2",
        "[&_ul:not(:where(.not-prose_*))]:list-[square] [&_ol:not(:where(.not-prose_*))]:list-decimal",
        "[&_li:not(:where(.not-prose_*))]:pl-1.5 [&_li:not(:where(.not-prose_*))]:marker:font-mono [&_li:not(:where(.not-prose_*))]:marker:text-[0.8em] [&_li:not(:where(.not-prose_*))]:marker:text-success",
        "[&_li_:is(ul,ol)]:my-2",
        // Quotes and rules
        "[&_blockquote:not(:where(.not-prose_*))]:my-6 [&_blockquote:not(:where(.not-prose_*))]:border-l-2 [&_blockquote:not(:where(.not-prose_*))]:border-primary [&_blockquote:not(:where(.not-prose_*))]:bg-card/60 [&_blockquote:not(:where(.not-prose_*))]:py-1 [&_blockquote:not(:where(.not-prose_*))]:pr-4 [&_blockquote:not(:where(.not-prose_*))]:pl-5 [&_blockquote:not(:where(.not-prose_*))]:text-foreground/90 [&_blockquote:not(:where(.not-prose_*))]:italic",
        "[&_blockquote_p]:my-3",
        "[&_hr:not(:where(.not-prose_*))]:my-10 [&_hr:not(:where(.not-prose_*))]:border-t [&_hr:not(:where(.not-prose_*))]:border-dashed [&_hr:not(:where(.not-prose_*))]:border-input",
        // Code
        "[&_code:not(:where(.not-prose_*))]:font-mono [&_code:not(:where(.not-prose_*))]:text-[0.85em] [&_code:not(:where(.not-prose_*))]:text-terminal-foreground",
        "[&_:not(pre)>code:not(:where(.not-prose_*))]:rounded-sm [&_:not(pre)>code:not(:where(.not-prose_*))]:border [&_:not(pre)>code:not(:where(.not-prose_*))]:border-terminal-border/60 [&_:not(pre)>code:not(:where(.not-prose_*))]:bg-terminal [&_:not(pre)>code:not(:where(.not-prose_*))]:px-[0.35em] [&_:not(pre)>code:not(:where(.not-prose_*))]:py-[0.1em]",
        "[&_pre:not(:where(.not-prose_*))]:my-6 [&_pre:not(:where(.not-prose_*))]:overflow-x-auto [&_pre:not(:where(.not-prose_*))]:rounded-lg [&_pre:not(:where(.not-prose_*))]:border [&_pre:not(:where(.not-prose_*))]:border-terminal-border [&_pre:not(:where(.not-prose_*))]:bg-terminal [&_pre:not(:where(.not-prose_*))]:px-5 [&_pre:not(:where(.not-prose_*))]:py-4 [&_pre:not(:where(.not-prose_*))]:text-[13px] [&_pre:not(:where(.not-prose_*))]:leading-[1.7] [&_pre:not(:where(.not-prose_*))]:text-terminal-foreground [&_pre:not(:where(.not-prose_*))]:shadow-block-sm",
        "[&_pre_code]:text-[1em]",
        // Tables
        "[&_table:not(:where(.not-prose_*))]:my-6 [&_table:not(:where(.not-prose_*))]:w-full [&_table:not(:where(.not-prose_*))]:border-collapse [&_table:not(:where(.not-prose_*))]:text-sm",
        "[&_th:not(:where(.not-prose_*))]:border-b [&_th:not(:where(.not-prose_*))]:border-input [&_th:not(:where(.not-prose_*))]:px-3 [&_th:not(:where(.not-prose_*))]:py-2 [&_th:not(:where(.not-prose_*))]:text-left [&_th:not(:where(.not-prose_*))]:font-mono [&_th:not(:where(.not-prose_*))]:text-[10px] [&_th:not(:where(.not-prose_*))]:font-normal [&_th:not(:where(.not-prose_*))]:tracking-[0.2em] [&_th:not(:where(.not-prose_*))]:text-muted-foreground [&_th:not(:where(.not-prose_*))]:uppercase",
        "[&_td:not(:where(.not-prose_*))]:border-b [&_td:not(:where(.not-prose_*))]:px-3 [&_td:not(:where(.not-prose_*))]:py-2 [&_td:not(:where(.not-prose_*))]:align-top [&_td:not(:where(.not-prose_*))]:break-words",
        // Media
        "[&_img:not(:where(.not-prose_*))]:my-6 [&_img:not(:where(.not-prose_*))]:rounded-lg [&_img:not(:where(.not-prose_*))]:border",
        className,
      )}
      {...props}
    />
  );
}

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyList,
  TypographyInlineCode,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyTable,
  Prose,
};
