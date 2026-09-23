import { DocsNav } from "@/components/site/docs-nav";
import { guides, navGroups } from "@/lib/docs";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const groups = [{ title: "Getting started", items: guides }, ...navGroups()];
  return (
    <div className="mx-auto flex max-w-[1400px] gap-10 px-4 sm:px-6 lg:px-10">
      <aside className="sticky top-16 hidden h-[calc(100svh-4rem)] w-56 shrink-0 overflow-y-auto border-r py-8 pr-4 lg:block">
        <DocsNav groups={groups} />
      </aside>
      <main className="min-w-0 flex-1 py-10 lg:py-12">{children}</main>
    </div>
  );
}
