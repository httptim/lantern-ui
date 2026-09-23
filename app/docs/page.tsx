import type { Metadata } from "next";
import Link from "next/link";

import { DocsHeader, H2, P, Pager } from "@/components/site/docs-ui";
import { components } from "@/lib/docs";

export const metadata: Metadata = { title: "Introduction" };

const principles = [
  ["You own the code", "Components are copied into your project, not installed from a package. Change anything."],
  ["Built on shadcn/ui", "Same file layout, same CLI, same APIs. If you know shadcn, you already know Lantern UI."],
  ["Radix underneath", "Menus, dialogs, selects and tabs get keyboard support and screen reader semantics from Radix."],
  ["One look", "Dark green panels, one orange accent, mono labels and hard offset shadows, taken from Lantern."],
];

export default function Introduction() {
  return (
    <article>
      <DocsHeader eyebrow="Getting started" title="Introduction">
        Lantern UI is the design from lantern.thultz.dev, turned into a component library you can drop into any React
        project.
      </DocsHeader>
      <P>
        It works the way <a href="https://ui.shadcn.com">shadcn/ui</a> does. There is no package to install. You run the
        shadcn CLI against this site&apos;s registry, and the component source lands in your <code>components/ui</code>{" "}
        folder, ready to edit. Every component is written in TypeScript and styled with Tailwind CSS v4.
      </P>
      <P>
        There are {components.length} components: the usual form controls, overlays and navigation, plus pieces that
        are specific to Lantern, like the terminal window, eyebrow labels, status dots and the numbers strip.
      </P>

      <H2>Principles</H2>
      <div className="grid max-w-3xl gap-3 sm:grid-cols-2">
        {principles.map(([title, body]) => (
          <div key={title} className="rounded-lg border bg-card p-5">
            <div className="font-display text-lg tracking-[-0.02em]">{title}</div>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>

      <H2>Where to next</H2>
      <P>
        Start with <Link href="/docs/installation">Installation</Link> to set up a project, read{" "}
        <Link href="/docs/theming">Theming</Link> to see the tokens, or browse the{" "}
        <Link href="/docs/components">components</Link>.
      </P>
      <Pager href="/docs" />
    </article>
  );
}
