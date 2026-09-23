"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import { Input } from "@/registry/lantern/ui/input";
import { NavbarLabel, NavbarMark } from "@/registry/lantern/ui/navbar";
import { Separator } from "@/registry/lantern/ui/separator";
import { StatusDot } from "@/registry/lantern/ui/status-dot";

const columns = [
  {
    title: "Network",
    links: ["Explore sites", "Guestbooks", "Templates", "Status"],
  },
  {
    title: "Build",
    links: ["Get started", "Documentation", "Lua API", "Changelog"],
  },
  {
    title: "Community",
    links: ["Discord", "GitHub", "Showcase", "Contact"],
  },
];

export default function Footer() {
  const [subscribed, setSubscribed] = React.useState(false);
  const emailId = React.useId();

  return (
    <footer className="relative border-t bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-12 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.1fr_1.6fr_1.1fr] lg:gap-10">
          <div className="max-w-xs">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-sm font-display text-2xl font-semibold tracking-[-0.04em] text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <NavbarMark />
              lantern
              <NavbarLabel>Hub</NavbarLabel>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A web between worlds. Publish a little corner of the in-game internet.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:col-span-2 md:row-start-2 lg:col-span-1 lg:row-start-auto"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="font-mono text-[10px] font-semibold tracking-[0.2em] text-success uppercase">
                  {column.title}
                </h2>
                <ul className="mt-4 grid gap-2.5 text-sm">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="rounded-sm text-muted-foreground transition-colors outline-none hover:text-primary focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div>
            <label
              htmlFor={emailId}
              className="font-mono text-[10px] font-semibold tracking-[0.2em] text-success uppercase"
            >
              Field notes
            </label>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              One short letter a month. New sites, new tools, no noise.
            </p>
            {subscribed ? (
              <p role="status" className="mt-4 flex items-center gap-2 text-sm text-success">
                <Check className="size-4" /> You are on the list.
              </p>
            ) : (
              <form
                className="mt-4 flex gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubscribed(true);
                }}
              >
                <Input id={emailId} type="email" required placeholder="you@example.com" autoComplete="email" />
                <Button type="submit" size="icon" aria-label="Subscribe">
                  <ArrowRight />
                </Button>
              </form>
            )}
          </div>
        </div>

        <Separator className="mt-14 mb-6" />

        <div className="flex flex-col gap-4 text-[12.5px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Lantern Hub. Made for CC:Tweaked.
          </p>
          <a
            href="#status"
            className="inline-flex items-center gap-2.5 rounded-sm font-mono text-[10px] tracking-[0.2em] uppercase outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <StatusDot /> All systems normal
          </a>
        </div>
      </div>
    </footer>
  );
}
