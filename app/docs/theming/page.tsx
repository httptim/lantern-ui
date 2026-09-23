import type { Metadata } from "next";

import { CodeBlock } from "@/components/site/code-block";
import { DocsHeader, H2, P, Pager } from "@/components/site/docs-ui";
import theme from "@/registry/theme.json";

export const metadata: Metadata = { title: "Theming" };

const groups: { title: string; note: string; keys: string[] }[] = [
  { title: "Surfaces", note: "Page, panels and floating layers.", keys: ["background", "foreground", "card", "popover", "secondary", "muted", "muted-foreground", "accent"] },
  { title: "Accents and states", note: "One orange for action, green for eyebrows and good news.", keys: ["primary", "primary-foreground", "success", "warning", "info", "destructive", "ring"] },
  { title: "Lines", note: "Hairline dividers and control borders.", keys: ["border", "input", "grid-line"] },
  { title: "Terminal", note: "The in-game window and the block shadow behind it.", keys: ["terminal", "terminal-bar", "terminal-border", "terminal-foreground", "block-shadow"] },
];

const utilities = [
  ["bg-grid", "The faint 20px grid behind card art and previews."],
  ["shadow-block", "A hard 12px by 14px offset shadow, no blur."],
  ["shadow-block-sm", "A smaller offset shadow for menus and popovers."],
  ["animate-lantern-pulse", "The slow fade used by status dots."],
  ["animate-lantern-blink", "The terminal cursor blink."],
  ["font-display", "Space Grotesk, for headings and numbers."],
];

const override = `:root {
  --primary: #9bba86;      /* swap the orange for green */
  --radius: 0.5rem;        /* rounder corners */
}`;

export default function Theming() {
  const t = theme as Record<string, string>;
  return (
    <article>
      <DocsHeader eyebrow="Getting started" title="Theming">
        Every color, radius and shadow is a CSS variable. Components only use the variables, so changing one changes
        everything that uses it.
      </DocsHeader>
      <P>
        Lantern is dark by design. The theme sets the same values for light and dark mode, so it looks the same
        either way. The variable names follow shadcn/ui, with a few additions for Lantern.
      </P>

      {groups.map((g) => (
        <section key={g.title}>
          <H2>{g.title}</H2>
          <P className="mt-0">{g.note}</P>
          <div className="grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {g.keys.map((k) => (
              <div key={k} className="overflow-hidden rounded-lg border bg-card">
                <div className="h-16 border-b" style={{ background: t[k] }} />
                <div className="p-3">
                  <div className="font-mono text-[11px] text-foreground">--{k}</div>
                  <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">{t[k]}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <H2>Typography</H2>
      <div className="grid max-w-4xl gap-3 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-5">
          <div className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">Display</div>
          <div className="mt-3 font-display text-4xl font-medium tracking-[-0.06em]">Aa</div>
          <div className="mt-2 text-[13px] text-muted-foreground">Space Grotesk, tight tracking</div>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <div className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">Body</div>
          <div className="mt-3 text-4xl">Aa</div>
          <div className="mt-2 text-[13px] text-muted-foreground">DM Sans</div>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <div className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">Mono</div>
          <div className="mt-3 font-mono text-4xl">Aa</div>
          <div className="mt-2 text-[13px] text-muted-foreground">System mono, for labels and code</div>
        </div>
      </div>

      <H2>Utilities</H2>
      <div className="max-w-3xl overflow-hidden rounded-lg border">
        {utilities.map(([name, desc]) => (
          <div key={name} className="grid gap-1 border-b px-4 py-3 last:border-b-0 sm:grid-cols-[220px_1fr] sm:gap-4">
            <code className="font-mono text-[13px] text-primary">{name}</code>
            <span className="text-[13.5px] text-muted-foreground">{desc}</span>
          </div>
        ))}
      </div>

      <H2>Customizing</H2>
      <P>Override variables after the theme in your global CSS.</P>
      <CodeBlock title="app/globals.css" lang="css" code={override} className="max-w-3xl" />
      <Pager href="/docs/theming" />
    </article>
  );
}
