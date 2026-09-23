import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlockPreview } from "@/components/site/block-preview";
import { CodeBlock } from "@/components/site/code-block";
import { CommandTabs } from "@/components/site/command-tabs";
import { DocsHeader, H2, P, Pager } from "@/components/site/docs-ui";
import { blockItems, componentSource, getBlock, itemRef } from "@/lib/docs";

export function generateStaticParams() {
  return blockItems.map((b) => ({ slug: b.name }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const meta = getBlock((await params).slug);
  return meta ? { title: `${meta.title} block`, description: meta.description } : {};
}

export default async function BlockPage({ params }: { params: Promise<{ slug: string }> }) {
  const meta = getBlock((await params).slug);
  if (!meta) notFound();
  const files = componentSource(meta);
  const main = files[0].path.replace(/\.tsx$/, "");
  const exportName = meta.title.replace(/[^a-zA-Z0-9]/g, "");

  return (
    <article className="min-w-0">
      <DocsHeader eyebrow="Block" title={meta.title}>
        {meta.description}
      </DocsHeader>

      <BlockPreview
        name={meta.name}
        code={
          <div className="grid gap-3">
            {files.map((f) => (
              <CodeBlock key={f.path} title={f.path} code={f.code} maxHeight />
            ))}
          </div>
        }
      />

      <H2>Installation</H2>
      <CommandTabs args={`add ${meta.name}`} />
      <P>
        This copies {files.length === 1 ? "the file" : `all ${files.length} files`} into{" "}
        <code>{files[0].path.split("/").slice(0, -1).join("/")}</code> and installs every component it uses. With the
        shadcn CLI: <code>npx shadcn@latest add {itemRef(meta.name)}</code>.
      </P>

      <H2>Usage</H2>
      <P>Render it from any page.</P>
      <CodeBlock
        className="max-w-3xl"
        code={`import ${exportName} from "@/${main}";\n\nexport default function Page() {\n  return <${exportName} />;\n}`}
      />
      {meta.notes?.map((n) => <P key={n}>{n}</P>)}

      <Pager href={`/docs/blocks/${meta.name}`} />
    </article>
  );
}
