import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { guides, navGroups } from "@/lib/docs";

import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  const groups = [{ title: "Getting started", items: guides }, ...navGroups()];
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-7 text-[13px] lg:flex">
          <Link className="transition-colors hover:text-primary" href="/docs">Docs</Link>
          <Link className="transition-colors hover:text-primary" href="/docs/components">Components</Link>
          <Link className="transition-colors hover:text-primary" href="/docs/theming">Theming</Link>
          <Link
            className="inline-flex items-center gap-3 rounded-md border border-[#566151] px-3.5 py-2.5 transition-colors hover:border-muted-foreground hover:bg-secondary"
            href="/docs/installation"
          >
            Get started <ArrowUpRight className="size-4 text-primary" />
          </Link>
        </nav>
        <MobileNav groups={groups} />
      </div>
    </header>
  );
}
