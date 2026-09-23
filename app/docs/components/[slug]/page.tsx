import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CodeBlock } from "@/components/site/code-block";
import { CommandTabs } from "@/components/site/command-tabs";
import { ComponentPreview } from "@/components/site/component-preview";
import { DocsHeader, H2, H3, P, Pager, Step, Steps } from "@/components/site/docs-ui";
import { componentSource, components, getComponent, importLine, registryUrl } from "@/lib/docs";

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.name }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const meta = getComponent((await params).slug);
  return meta ? { title: meta.title, description: meta.description } : {};
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const meta = getComponent((await params).slug);
  if (!meta) notFound();
  const [first, ...rest] = meta.examples ?? [];
  const deps = meta.dependencies ?? [];
  const imports = importLine(meta);

  return (
    <article className="min-w-0">
      <DocsHeader eyebrow={meta.category} title={meta.title}>
        {meta.description}
      </DocsHeader>

      {first && <ComponentPreview name={first.name} />}

      <H2>Installation</H2>
      <H3>With the CLI</H3>
      <CommandTabs args={`add ${registryUrl(meta.name)}`} />
      <P>
        This also installs the Lantern theme and any Lantern UI components it depends on. See{" "}
        <a href="/docs/installation">Installation</a> if your project has not run <code>shadcn init</code> yet.
      </P>
      <H3>Manually</H3>
      <Steps>
        {deps.length > 0 && (
          <Step title="Install the dependencies">
            <CodeBlock lang="bash" code={`npm install ${deps.join(" ")}`} />
          </Step>
        )}
        <Step title="Copy the source into your project">
          {componentSource(meta).map((f) => (
            <CodeBlock key={f.path} title={f.path} code={f.code} maxHeight />
          ))}
        </Step>
        <Step title="Update the import paths to match your project">
          <P className="my-0">
            The source imports <code>cn</code> from <code>@/lib/utils</code>
            {meta.registryDependencies?.length ? (
              <>
                {" "}and uses {meta.registryDependencies.map((d, i) => (
                  <span key={d}>
                    {i > 0 && ", "}
                    <a href={`/docs/components/${d}`}>{d}</a>
                  </span>
                ))}
              </>
            ) : null}
            .
          </P>
        </Step>
      </Steps>

      {(meta.usage || imports) && (
        <>
          <H2>Usage</H2>
          <div className="grid max-w-3xl gap-3">
            {imports && <CodeBlock code={imports} />}
            {meta.usage && <CodeBlock code={meta.usage} />}
          </div>
        </>
      )}

      {meta.notes?.map((n) => (
        <P key={n}>{n}</P>
      ))}

      {rest.length > 0 && (
        <>
          <H2>Examples</H2>
          {rest.map((ex) => (
            <section key={ex.name}>
              <H3>{ex.title ?? ex.name}</H3>
              <ComponentPreview name={ex.name} />
            </section>
          ))}
        </>
      )}

      <Pager href={`/docs/components/${meta.name}`} />
    </article>
  );
}
