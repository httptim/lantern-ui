import { ArrowLeftIcon, SearchIcon } from "lucide-react";

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

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh items-center overflow-hidden bg-background bg-grid">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_75%)]" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-10">
        <div>
          <Eyebrow>
            <StatusDot tone="error" /> Error 404
          </Eyebrow>
          <h1 className="mt-4 text-[clamp(96px,22vw,200px)] leading-[0.9] font-medium tracking-[-0.08em]">
            4<span className="text-primary">0</span>4<span className="text-primary">.</span>
          </h1>
          <h2 className="mt-6 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">This page wandered off.</h2>
          <p className="mt-3 max-w-[42ch] text-muted-foreground">
            The address might be old, or the hub that hosted it went offline. Head back to the start or search the
            network.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="/">
                <ArrowLeftIcon /> Back home
              </a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="#">
                <SearchIcon /> Search the network
              </a>
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[480px] p-2 sm:p-4" aria-hidden="true">
          <Terminal tilt>
            <TerminalHeader>COMPUTER 17</TerminalHeader>
            <TerminalAddress>hub://page-not-found/</TerminalAddress>
            <TerminalBody className="min-h-[240px] px-5 text-[12px] sm:px-7 sm:text-[13px]">
              <div className="mb-4 text-[8px] tracking-[0.2em] text-[#738a69]">RESOLVING</div>
              <TerminalLine className="break-all">open hub://page-not-found/</TerminalLine>
              <TerminalOutput>{"Asking relay... ok\nLooking up page..."}</TerminalOutput>
              <TerminalOutput className="text-destructive">{"error 404: no page at this address"}</TerminalOutput>
              <TerminalLine>
                <TerminalCursor />
              </TerminalLine>
            </TerminalBody>
            <TerminalFooter>
              <span>relay ok</span>
              <span>page missing</span>
            </TerminalFooter>
          </Terminal>
        </div>
      </div>
    </main>
  );
}
