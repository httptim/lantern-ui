import { BookOpen, Cloud, KeyRound, Layers, type LucideIcon, Radio, Terminal as TerminalIcon, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/lantern/ui/badge";
import { Card } from "@/registry/lantern/ui/card";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import {
  Terminal,
  TerminalBody,
  TerminalCursor,
  TerminalHeader,
  TerminalLine,
  TerminalOutput,
} from "@/registry/lantern/ui/terminal";

type Feature = { icon: LucideIcon; title: string; text: string; className?: string };

const features: Feature[] = [
  {
    icon: Cloud,
    title: "Online when you are not",
    text: "Sites live in the cloud, so visitors can drop by after your server goes to sleep.",
  },
  {
    icon: KeyRound,
    title: "One key per site",
    text: "Upload drafts with a site key. Rotate it in a click if a turtle ever leaks it.",
  },
  {
    icon: Users,
    title: "Guestbooks built in",
    text: "Let passing travelers leave a note. Moderate from your dashboard.",
  },
  {
    icon: Radio,
    title: "Works on every server",
    text: "Any world with an HTTP-enabled computer can open hub:// addresses.",
  },
  {
    icon: BookOpen,
    title: "A proper field guide",
    text: "Commands, page components and Lua functions, all in one place.",
    // Fills the last row on two-column tablets.
    className: "md:col-span-2 lg:col-span-1",
  },
];

function FeatureIcon({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-md border bg-accent bg-grid text-[#b7ca9e]",
        className,
      )}
    >
      <Icon className="size-5 stroke-[1.5]" />
    </span>
  );
}

export default function FeatureGrid() {
  return (
    <section className="relative bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
        <div className="max-w-2xl">
          <Eyebrow>Everything in the box</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] font-medium tracking-[-0.045em] text-balance sm:text-5xl">
            A little world needs a few good tools<span className="text-primary">.</span>
          </h2>
          <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.8] text-muted-foreground sm:text-base">
            Lantern handles the hosting, the keys and the guestbooks. You bring the pages and a little Lua.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <Card className="gap-0 border-primary/40 py-0 shadow-block-sm md:col-span-2 lg:row-span-2">
            <div className="flex h-full flex-col gap-8 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <FeatureIcon icon={TerminalIcon} className="border-primary/40 text-primary" />
                <Badge variant="outline">Lua powered</Badge>
              </div>
              <div>
                <h3 className="font-display text-2xl leading-tight font-medium tracking-tight">
                  Publish from inside the game<span className="text-primary">.</span>
                </h3>
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                  Write pages on an in-game computer, then push them live with one command. No browser, no copy and
                  paste.
                </p>
              </div>
              <Terminal className="mt-auto shadow-block-sm">
                <TerminalHeader>
                  <Layers /> startup.lua
                </TerminalHeader>
                <TerminalBody className="px-4 py-4 text-[12px] sm:px-6 sm:text-[13px]">
                  <TerminalLine>lantern init my-hub</TerminalLine>
                  <TerminalOutput>created ./site with 3 pages</TerminalOutput>
                  <TerminalLine>lantern publish ./site</TerminalLine>
                  <TerminalOutput className="mb-0">live at hub://my-hub/</TerminalOutput>
                  <TerminalLine className="mt-3">
                    <TerminalCursor />
                  </TerminalLine>
                </TerminalBody>
              </Terminal>
            </div>
          </Card>

          {features.map((feature) => (
            <Card key={feature.title} className={cn("gap-0 p-6 transition-colors hover:border-input", feature.className)}>
              <FeatureIcon icon={feature.icon} />
              <h3 className="mt-6 font-display text-lg leading-snug font-medium tracking-tight">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
