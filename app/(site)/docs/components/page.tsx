import type { Metadata } from "next";
import Link from "next/link";

import { DocsHeader, H2, Pager } from "@/components/site/docs-ui";
import { components, navGroups } from "@/lib/docs";

export const metadata: Metadata = { title: "Components" };

export default function ComponentsIndex() {
  return (
    <article>
      <DocsHeader eyebrow="Library" title="Components">
        {components.length} components, each with live examples and a one-line install.
      </DocsHeader>
      {navGroups().filter((g) => g.title !== "Blocks").map((g) => (
        <section key={g.title}>
          <H2>{g.title}</H2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {g.items.map((item) => {
              const meta = components.find((c) => `/docs/components/${c.name}` === item.href)!;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-lg border bg-card p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <div className="font-display text-lg tracking-[-0.02em] group-hover:text-primary">{item.title}</div>
                  <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{meta.description}</p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
      <Pager href="/docs/components" />
    </article>
  );
}
