import type { Metadata } from "next";
import Link from "next/link";

import { DocsHeader, Pager } from "@/components/site/docs-ui";
import { blockItems } from "@/lib/docs";

export const metadata: Metadata = { title: "Blocks" };

export default function BlocksIndex() {
  return (
    <article>
      <DocsHeader eyebrow="Library" title="Blocks">
        Whole sections and pages built from Lantern UI components. Add one and edit it like your own code.
      </DocsHeader>
      <div className="grid gap-6 xl:grid-cols-2">
        {blockItems.map((b) => (
          <Link
            key={b.name}
            href={`/docs/blocks/${b.name}`}
            className="group overflow-hidden rounded-lg border bg-card transition-[border-color,transform] hover:-translate-y-0.5 hover:border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <div className="pointer-events-none relative h-64 overflow-hidden border-b bg-background" aria-hidden="true">
              <iframe
                src={`/view/${b.name}`}
                title={b.title}
                loading="lazy"
                tabIndex={-1}
                className="absolute top-0 left-0 h-[250%] w-[250%] origin-top-left scale-40"
              />
            </div>
            <div className="p-5">
              <div className="font-display text-lg tracking-[-0.02em] group-hover:text-primary">{b.title}</div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{b.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <Pager href="/docs/blocks" />
    </article>
  );
}
