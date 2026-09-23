"use client";

import * as React from "react";
import { MenuIcon, Search } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/registry/lantern/ui/input-group";
import { Kbd } from "@/registry/lantern/ui/kbd";
import { NavbarLabel, NavbarMark } from "@/registry/lantern/ui/navbar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/lantern/ui/sheet";

import { DocsNav } from "./docs-nav";

const links = [
  { title: "Docs", href: "#introduction", active: true },
  { title: "Components", href: "#components" },
  { title: "Changelog", href: "#changelog" },
];

function DocsSearch({ className, hint = true }: { className?: string; hint?: boolean }) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <InputGroup className={className}>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput ref={inputRef} type="search" placeholder="Search the docs" aria-label="Search the docs" />
      {hint && (
        <InputGroupAddon align="inline-end">
          <Kbd>Ctrl K</Kbd>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}

/** Sticky docs header. Below lg the sidebar moves into a Sheet opened from the menu button. */
export function DocsHeader({ active, onNavigate }: { active?: string; onNavigate?: (href: string) => void }) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-10">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon-sm" aria-label="Open navigation" className="lg:hidden">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85%] max-w-xs">
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center gap-2 font-display text-xl font-semibold tracking-[-0.04em]">
                <NavbarMark className="size-6" /> lantern
              </SheetTitle>
              <SheetDescription className="sr-only">Documentation navigation</SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 overflow-y-auto px-3 pb-8">
              <DocsSearch hint={false} className="sm:hidden" />
              <DocsNav
                active={active}
                onNavigate={(href) => {
                  onNavigate?.(href);
                  setOpen(false);
                }}
              />
            </div>
          </SheetContent>
        </Sheet>

        <a
          href="#"
          className="flex min-w-0 items-center gap-2 rounded-sm font-display text-xl font-semibold tracking-[-0.04em] outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-2xl"
        >
          <NavbarMark className="size-6 sm:size-7" />
          lantern
          <NavbarLabel>Docs</NavbarLabel>
        </a>

        <nav aria-label="Main" className="ml-6 hidden items-center gap-6 text-[13px] lg:flex">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className="rounded-sm transition-colors outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:text-primary"
            >
              {link.title}
            </a>
          ))}
        </nav>

        <DocsSearch className="ml-auto hidden w-full max-w-64 sm:flex" />
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Search the docs"
          className="ml-auto sm:hidden"
          onClick={() => setOpen(true)}
        >
          <Search />
        </Button>
      </div>
    </header>
  );
}
