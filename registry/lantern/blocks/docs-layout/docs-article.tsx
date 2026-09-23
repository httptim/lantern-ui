import { ArrowLeft, ArrowRight, Info } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/registry/lantern/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/lantern/ui/breadcrumb";
import { CodeBlock } from "@/registry/lantern/ui/code-block";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import { Prose } from "@/registry/lantern/ui/typography";

import type { TocItem } from "./toc";

export const articleToc: TocItem[] = [
  { id: "before-you-start", title: "Before you start" },
  { id: "write-a-page", title: "Write a page" },
  { id: "publish", title: "Publish it" },
  { id: "publish-flags", title: "Useful flags", depth: 3 },
  { id: "next-steps", title: "Next steps" },
];

const startup = `-- site/index.lua: the first page visitors see
local page = lantern.page("Welcome home")

page:heading("A place worth finding.")
page:text("A field guide. A build journal.")
page:guestbook({ max = 50 })

return page`;

/** A sample docs article. Swap it for your own MDX or CMS content. */
export function DocsArticle() {
  return (
    <article className="min-w-0">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Guides</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Publishing a site</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Eyebrow>Guide</Eyebrow>
      <Prose className="mt-3 max-w-none">
        <h1>
          Publishing a site<span className="text-primary">.</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Take a folder of pages from an in-game computer and put it on the network, where anyone on any server can
          visit.
        </p>

        <h2 id="before-you-start">Before you start</h2>
        <p>
          You need an advanced computer with a wired or wireless modem, and HTTP enabled in the server config. Run{" "}
          <code>lantern version</code> to check the program is installed.
        </p>
        <ul>
          <li>
            A site key from your <a href="#dashboard">dashboard</a>.
          </li>
          <li>A folder with at least an <code>index.lua</code> page.</li>
          <li>About two minutes.</li>
        </ul>

        <h2 id="write-a-page">Write a page</h2>
        <p>
          Pages are small Lua files that return a page object. Start with a heading, a line of text and a guestbook so
          visitors can say hello.
        </p>
        <div className="not-prose my-6">
          <CodeBlock title="site/index.lua" language="lua" code={startup} showLineNumbers highlightLines={[6]} />
        </div>

        <h2 id="publish">Publish it</h2>
        <p>
          From the folder above <code>site</code>, run the publish command with your key. Lantern uploads every page,
          checks it, and prints the address when it is live.
        </p>
        <div className="not-prose my-6">
          <CodeBlock code={"lantern publish ./site --key $SITE_KEY"} />
        </div>
        <div className="not-prose my-6">
          <Alert>
            <Info />
            <AlertTitle>Keep your key out of your pages</AlertTitle>
            <AlertDescription>
              <p>Anyone with the key can overwrite your site. Store it in a settings file, not in index.lua.</p>
            </AlertDescription>
          </Alert>
        </div>

        <h3 id="publish-flags">Useful flags</h3>
        <ol>
          <li>
            <code>--draft</code> uploads without making the site public.
          </li>
          <li>
            <code>--watch</code> republishes whenever a file changes.
          </li>
          <li>
            <code>--quiet</code> prints only the final address.
          </li>
        </ol>

        <h2 id="next-steps">Next steps</h2>
        <p>
          Your site is live. Add a <a href="#guestbooks">guestbook</a>, set up a{" "}
          <a href="#relays">turtle relay</a> for servers without HTTP, or read the <a href="#lua-api">Lua API</a> to
          build something stranger.
        </p>
      </Prose>

      <div className="mt-14 grid gap-3 border-t pt-8 sm:grid-cols-2">
        <a
          href="#first-hub"
          className="group rounded-lg border bg-card p-4 transition-colors outline-none hover:border-input focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            <ArrowLeft className="size-3.5 text-primary" /> Previous
          </span>
          <span className="mt-1.5 block font-display text-lg tracking-tight group-hover:text-primary">
            Your first hub
          </span>
        </a>
        <a
          href="#site-keys"
          className="group rounded-lg border bg-card p-4 text-right transition-colors outline-none hover:border-input focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex items-center justify-end gap-1.5 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Next <ArrowRight className="size-3.5 text-primary" />
          </span>
          <span className="mt-1.5 block font-display text-lg tracking-tight group-hover:text-primary">Site keys</span>
        </a>
      </div>
    </article>
  );
}
