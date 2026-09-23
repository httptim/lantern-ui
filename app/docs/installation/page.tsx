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
        Set up a React project with Tailwind CSS v4, add the Lantern theme, then add components one at a time.
      </DocsHeader>

      <H2>Next.js</H2>
      <Steps>
        <Step title="Create a project">
          <P className="my-0">
            Start from a new Next.js app, or skip this step if you already have one with Tailwind CSS v4.
          </P>
          <CommandTabs args="init --base radix" />
          <P className="my-0">
            <code>shadcn init</code> can scaffold a new Next.js app for you, and adds <code>components.json</code>,{" "}
            <code>lib/utils.ts</code> and the CSS variables your components read. Pass <code>--base radix</code>:
            Lantern UI is built on Radix, and the CLI&apos;s default Base UI setup rewrites Radix props in ways that
            break some components. Pick any preset when it asks.
          </P>
        </Step>
        <Step title="Add the Lantern theme">
          <CommandTabs args={`add ${itemRef("lantern-theme")}`} />
          <P className="my-0">
            This writes the Lantern colors, radius, block shadows, the <code>bg-grid</code> utility and the pulse and
            blink animations into your global CSS. Components also pull it in on their own, so this step is optional
            but tidy.
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
          <CommandTabs args={`add ${itemRef("button")}`} />
          <P className="my-0">Then import it from your components folder.</P>
          <CodeBlock code={`import { Button } from "@/components/ui/button";\n\nexport default function Page() {\n  return <Button>Make yourself at home</Button>;\n}`} />
        </Step>
      </Steps>

      <H2>Other ways to add</H2>
      <P>
        The short <code>httptim/lantern-ui/button</code> address reads from the GitHub repo. You can also use the full
        URL, <code>{registryUrl("button")}</code>, or register Lantern UI as a namespace in <code>components.json</code>{" "}
        and add components by name.
      </P>
      <CodeBlock title="components.json" lang="json" code={namespace} className="max-w-3xl" />
      <div className="mt-3 max-w-3xl">
        <CommandTabs args="add @lantern/button @lantern/card @lantern/terminal" />
      </div>

      <H2>Other frameworks</H2>
      <P>
        Any React setup that shadcn/ui supports works here too: Vite, React Router, Astro, TanStack Start and Laravel.
        Run <code>shadcn init</code> in that project, then use the same <code>add</code> commands. Outside Next.js,
        load the two fonts with a Google Fonts link; the theme falls back to the font names directly.
      </P>

      <H2>Existing projects</H2>
      <P>
        Check <code>components.json</code>. If <code>style</code> starts with <code>radix-</code>, or is{" "}
        <code>new-york</code> or <code>default</code>, you are set. If you already have shadcn/ui components with the
        same names, add <code>--overwrite</code> to replace them with the Lantern versions.
      </P>
      <Pager href="/docs/installation" />
    </article>
  );
}
