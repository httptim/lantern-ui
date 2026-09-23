import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { pageOrder } from "@/lib/docs";
import { cn } from "@/lib/utils";

export function DocsHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="mb-10 max-w-3xl">
      <div className="font-mono text-[10px] font-semibold tracking-[0.2em] text-success uppercase">{eyebrow}</div>
      <h1 className="mt-3 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
        {title}
        <span className="text-primary">.</span>
      </h1>
      {children && <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{children}</p>}
    </header>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function H2({ children, className }: { children: string; className?: string }) {
  const id = slug(children);
  return (
    <h2 id={id} className={cn("group mt-14 mb-4 scroll-mt-24 text-2xl font-medium tracking-[-0.04em]", className)}>
      <a href={`#${id}`} className="focus-visible:text-primary focus-visible:outline-none">
        {children}
        <span className="ml-2 text-input opacity-0 transition-opacity group-hover:opacity-100">#</span>
      </a>
    </h2>
  );
}

export function H3({ children }: { children: string }) {
  const id = slug(children);
  return (
    <h3 id={id} className="mt-10 mb-3 scroll-mt-24 text-lg font-medium tracking-[-0.02em]">
      {children}
    </h3>
  );
}

export function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("my-4 max-w-3xl leading-7 text-muted-foreground [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline [&_code]:rounded-sm [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-foreground", className)}>{children}</p>;
}

export function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="relative my-6 ml-3 grid max-w-3xl gap-10 border-l pl-8 [counter-reset:step]">{children}</ol>;
}

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="relative [counter-increment:step] before:absolute before:top-0 before:-left-[45px] before:flex before:size-7 before:items-center before:justify-center before:rounded-md before:border before:border-input before:bg-background before:font-mono before:text-[11px] before:text-primary before:content-[counter(step,decimal-leading-zero)]">
      <h3 className="mb-3 text-lg font-medium tracking-[-0.02em]">{title}</h3>
      <div className="grid gap-3">{children}</div>
    </li>
  );
}

export function Pager({ href }: { href: string }) {
  const pages = pageOrder();
  const i = pages.findIndex((p) => p.href === href);
  const prev = pages[i - 1];
  const next = pages[i + 1];
  const cls =
    "group flex min-w-0 flex-1 flex-col gap-1 rounded-lg border p-4 transition-colors hover:border-input hover:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";
  return (
    <nav aria-label="Pages" className="mt-16 flex max-w-3xl flex-col gap-3 border-t pt-8 sm:flex-row">
      {prev ? (
        <Link href={prev.href} className={cls}>
          <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            <ArrowLeft className="size-3" /> Previous
          </span>
          <span className="truncate font-display text-lg">{prev.title}</span>
        </Link>
      ) : (
        <span className="hidden flex-1 sm:block" />
      )}
      {next && (
        <Link href={next.href} className={cn(cls, "sm:items-end sm:text-right")}>
          <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Next <ArrowRight className="size-3" />
          </span>
          <span className="truncate font-display text-lg">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
