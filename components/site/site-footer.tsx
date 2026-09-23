import Link from "next/link";

import { LanternMark } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 py-7 text-[12.5px] text-muted-foreground sm:px-6 lg:px-10">
        <span className="flex items-center gap-2 font-display text-lg text-foreground">
          <LanternMark className="size-5 text-primary" /> lantern ui
        </span>
        <span>
          The Lantern design, from{" "}
          <a className="text-foreground underline-offset-4 hover:underline" href="https://lantern.thultz.dev">lantern.thultz.dev</a>. Built on{" "}
          <a className="text-foreground underline-offset-4 hover:underline" href="https://ui.shadcn.com">shadcn/ui</a> and Radix.
        </span>
        <span>
          By <a className="text-foreground underline-offset-4 hover:underline" href="https://thultz.dev">thultz</a>.{" "}
          <Link className="text-foreground underline-offset-4 hover:underline" href="/docs">Docs</Link>
        </span>
      </div>
    </footer>
  );
}
