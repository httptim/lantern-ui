import type { Metadata } from "next";

import { CodeBlock } from "@/components/site/code-block";
import { CommandTabs } from "@/components/site/command-tabs";
import { DocsHeader, H2, P, Pager, Step, Steps } from "@/components/site/docs-ui";
import { itemRef, registryUrl } from "@/lib/docs";
import site from "@/lib/site.json";

export const metadata: Metadata = { title: "Installation" };

const fonts = `import { DM_Sans, Space_Grotesk } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${dmSans.variable} \${spaceGrotesk.variable}\`}>
      <body>{children}</body>
    </html>
  );
}`;

const namespace = `{
  "registries": {
    "@lantern": "${site.url}/r/{name}.json"
  }
}`;

export default function Installation() {
  return (
    <article>
      <DocsHeader eyebrow="Getting started" title="Installation">
        One command sets up your project. Another adds components.
      </DocsHeader>

      <H2>Quick start</H2>
      <Steps>
        <Step title="Set up the project">
          <P className="my-0">
            Run this in a new folder to create a Next.js app, or in an existing React project with Tailwind CSS v4.
          </P>
          <CommandTabs args="init" />
          <P className="my-0">
            This runs <code>shadcn init</code> with Radix, which Lantern UI is built on, then adds the Lantern theme:
            colors, radius, block shadows, the <code>bg-grid</code> utility and the pulse and blink animations. Pick
            any preset when it asks; the theme replaces its colors.
          </P>
        </Step>
        <Step title="Load the fonts">
          <P className="my-0">
            Lantern uses DM Sans for text and Space Grotesk for headings. The theme reads them from these two CSS
            variables.
          </P>
          <CodeBlock title="app/layout.tsx" code={fonts} />
        </Step>
        <Step title="Add components">
          <CommandTabs args="add button card terminal" />
          <P className="my-0">
            Use any names from the <a href="/docs/components">components</a> list, or <code>add all</code>. Then import
            them from your components folder.
          </P>
          <CodeBlock code={`import { Button } from "@/components/ui/button";\n\nexport default function Page() {\n  return <Button>Make yourself at home</Button>;\n}`} />
        </Step>
      </Steps>

      <H2>Commands</H2>
      <div className="max-w-3xl overflow-hidden rounded-lg border">
        {[
          ["lanternui init", "Set up shadcn with Radix and add the Lantern theme."],
          ["lanternui add <name...>", "Add one or more components and whatever they depend on."],
          ["lanternui add all", "Add every component."],
          ["lanternui list", "Print every component with a short description."],
        ].map(([cmd, desc]) => (
          <div key={cmd} className="grid gap-1 border-b px-4 py-3 last:border-b-0 sm:grid-cols-[220px_1fr] sm:gap-4">
            <code className="font-mono text-[13px] text-primary">{cmd}</code>
            <span className="text-[13.5px] text-muted-foreground">{desc}</span>
          </div>
        ))}
      </div>
      <P>
        Flags such as <code>--overwrite</code>, <code>--path</code> and <code>-y</code> pass straight through to the
        shadcn CLI. If you already have shadcn/ui components with the same names, add <code>--overwrite</code> to
        replace them with the Lantern versions.
      </P>

      <H2>Using the shadcn CLI directly</H2>
      <P>
        <code>lanternui</code> is a thin front for the shadcn CLI, so you can skip it. Start the project on Radix,
        since the default Base UI setup rewrites Radix props in ways that break some components:
      </P>
      <div className="grid max-w-3xl gap-3">
        <CommandTabs tool="shadcn" args="init --base radix" />
        <CommandTabs tool="shadcn" args={`add ${itemRef("button")}`} />
      </div>
      <P>
        The <code>httptim/lantern-ui/button</code> address reads from the GitHub repo. The full URL,{" "}
        <code>{registryUrl("button")}</code>, works too, or register a namespace in <code>components.json</code>:
      </P>
      <CodeBlock title="components.json" lang="json" code={namespace} className="max-w-3xl" />
      <div className="mt-3 max-w-3xl">
        <CommandTabs tool="shadcn" args="add @lantern/button @lantern/card" />
      </div>

      <H2>Other frameworks</H2>
      <P>
        Any React setup that shadcn/ui supports works here too: Vite, React Router, Astro, TanStack Start and Laravel.
        Outside Next.js, load the two fonts with a Google Fonts link; the theme falls back to the font names directly.
      </P>
      <Pager href="/docs/installation" />
    </article>
  );
}
