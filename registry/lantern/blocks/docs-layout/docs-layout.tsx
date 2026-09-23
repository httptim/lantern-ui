"use client";

import * as React from "react";

import { ScrollArea } from "@/registry/lantern/ui/scroll-area";

import { articleToc, DocsArticle } from "./docs-article";
import { DocsHeader } from "./docs-header";
import { DocsNav } from "./docs-nav";
import { Toc } from "./toc";

export default function DocsLayout() {
  const [active, setActive] = React.useState("#publishing");

  return (
    <div className="min-h-svh bg-background">
      <DocsHeader active={active} onNavigate={setActive} />
      <div className="mx-auto flex max-w-[1400px] gap-10 px-4 sm:px-6 lg:px-10">
        <aside className="sticky top-16 hidden h-[calc(100svh-4rem)] w-56 shrink-0 border-r lg:block">
          <ScrollArea className="h-full">
            <DocsNav active={active} onNavigate={setActive} className="py-8 pr-4" />
          </ScrollArea>
        </aside>
        <main className="min-w-0 flex-1 py-10 lg:py-12">
          <DocsArticle />
        </main>
        <aside className="sticky top-16 hidden h-[calc(100svh-4rem)] w-52 shrink-0 py-12 xl:block">
          <Toc items={articleToc} />
        </aside>
      </div>
    </div>
  );
}
