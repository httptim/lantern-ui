import { ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";

import { Showcase } from "@/components/site/showcase";
import { components, registryUrl } from "@/lib/docs";
import { Button } from "@/registry/lantern/ui/button";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import { StatusDot } from "@/registry/lantern/ui/status-dot";
import {
  Terminal,
  TerminalAddress,
  TerminalBody,
  TerminalCursor,
  TerminalFooter,
  TerminalHeader,
  TerminalLine,
  TerminalOutput,
} from "@/registry/lantern/ui/terminal";
import { LanternMark } from "@/components/site/logo";

export default function Home() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute top-24 right-0 h-[700px] w-[600px] max-w-full bg-[radial-gradient(#71703922,transparent_65%)]" />
      <section className="relative mx-auto grid max-w-[1400px] items-center gap-14 overflow-clip px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-10 lg:pt-24 lg:pb-24">
        <div>
          <Eyebrow>
            <StatusDot /> A component library, a little more blocky
          </Eyebrow>
          <h1 className="mt-6 text-[clamp(42px,6vw,80px)] leading-[1.06] font-medium tracking-[-0.06em]">
            Small components.
            <br />
            Entire <em className="text-primary not-italic">interfaces.</em>
          </h1>
          <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.8] text-muted-foreground">
            The Lantern design as {components.length} copy-paste React components. Add them with the shadcn CLI, then
            make them yours.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/docs/installation">
                Get started <ArrowUpRight />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/docs/components">
                Browse components <BookOpen />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-[11px] text-[#7e8c7e]">Built on shadcn/ui and Radix. Tailwind CSS v4. Yours to edit.</p>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] p-4" aria-hidden="true">
          <div className="pointer-events-none absolute -top-4 left-0 size-[450px] max-w-full -rotate-20 rounded-full border border-dashed border-[#5a633b60]" />
          <div className="pointer-events-none absolute -top-8 left-12 h-[500px] w-[350px] max-w-full -rotate-20 rounded-full border border-dashed border-[#5a633b60]" />
          <Terminal tilt>
            <TerminalHeader>
              <LanternMark className="size-3.5" /> LANTERN UI
            </TerminalHeader>
            <TerminalAddress>~/my-little-world</TerminalAddress>
            <TerminalBody className="min-h-[282px] text-[12px] sm:text-[13px]">
              <div className="mb-4 text-[8px] tracking-[0.2em] text-[#738a69]">ADDING COMPONENTS</div>
              <TerminalLine className="break-all">npx shadcn add @lantern/terminal</TerminalLine>
              <TerminalOutput>
                {"Checking registry... done\nInstalling dependencies... done\nCreated 1 file:\n  components/ui/terminal.tsx"}
              </TerminalOutput>
              <TerminalLine>
                <TerminalCursor />
              </TerminalLine>
            </TerminalBody>
            <TerminalFooter>
              <span>{components.length} components</span>
              <span>Radix</span>
              <span>Tailwind v4</span>
            </TerminalFooter>
          </Terminal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] border-t px-4 py-16 sm:px-6 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow>Live components</Eyebrow>
            <h2 className="mt-2 text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
              Everything here <span className="text-primary">is real.</span>
            </h2>
          </div>
          <p className="max-w-[44ch] text-sm text-muted-foreground">
            Click, type and tab through it. Each piece is a component from the library, installed with one command.
          </p>
        </div>
        <Showcase />
      </section>

      <section className="border-t">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-10">
          <Eyebrow>
            <StatusDot /> One command away
          </Eyebrow>
          <h2 className="mt-3 text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
            Start with a <span className="text-primary">button.</span>
          </h2>
          <code className="mt-6 max-w-full overflow-x-auto rounded-md border bg-terminal px-4 py-3 font-mono text-[12px] whitespace-nowrap text-terminal-foreground sm:text-[13px]">
            <span className="mr-2 text-primary">$</span>npx shadcn@latest add {registryUrl("button")}
          </code>
          <Button className="mt-6" variant="secondary" asChild>
            <Link href="/docs">
              Read the docs <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
