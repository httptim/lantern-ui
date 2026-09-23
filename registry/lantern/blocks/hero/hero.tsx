import { ArrowDown, ArrowUpRight } from "lucide-react";

import { Ambient } from "@/registry/lantern/ui/ambient";
import {
  AnnouncementBar,
  AnnouncementBarBadge,
  AnnouncementBarLink,
  AnnouncementBarMessage,
} from "@/registry/lantern/ui/announcement-bar";
import { Button } from "@/registry/lantern/ui/button";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import {
  Navbar,
  NavbarBrand,
  NavbarCta,
  NavbarLabel,
  NavbarLink,
  NavbarLinks,
  NavbarMark,
  NavbarMobile,
} from "@/registry/lantern/ui/navbar";
import { Orbit } from "@/registry/lantern/ui/orbit";
import { Stat, StatGroup, StatLabel, StatValue } from "@/registry/lantern/ui/stat";
import { StatusDot } from "@/registry/lantern/ui/status-dot";
import { Terminal, TerminalAddress, TerminalFooter, TerminalHeader } from "@/registry/lantern/ui/terminal";
import { TerminalTypewriter, type TypewriterLine } from "@/registry/lantern/ui/typewriter";

const links = [
  { href: "#directory", label: "Explore" },
  { href: "#start", label: "Get started" },
  { href: "#docs", label: "Docs" },
];

const session: TypewriterLine[] = [
  { prompt: true, text: "lantern open hub://your-little-world" },
  { text: "connected across worlds" },
  { prompt: true, text: "cat welcome.txt" },
  { text: "A place worth finding.\nA field guide. A build journal.\nA guestbook for passing travelers." },
  { prompt: true, text: "lantern publish ./site" },
  { text: "published 4 pages in 0.8s" },
];

const stats = [
  { value: "2,418", label: "Sites on the network" },
  { value: "37", label: "Servers connected this week" },
  { value: "51 × 19", label: "Characters per screen" },
];

export default function Hero() {
  return (
    <div className="relative min-h-svh overflow-x-clip bg-background">
      <AnnouncementBar>
        <AnnouncementBarBadge>New</AnnouncementBarBadge>
        <AnnouncementBarMessage>Guestbooks now sync across every server.</AnnouncementBarMessage>
        <AnnouncementBarLink href="#changelog">Read the notes</AnnouncementBarLink>
      </AnnouncementBar>

      <Navbar>
        <NavbarBrand href="#">
          <NavbarMark />
          lantern
          <NavbarLabel>Hub</NavbarLabel>
        </NavbarBrand>
        <NavbarLinks>
          {links.map((link) => (
            <NavbarLink key={link.label} href={link.href}>
              {link.label}
            </NavbarLink>
          ))}
          <NavbarCta href="#dashboard">Your dashboard</NavbarCta>
        </NavbarLinks>
        <NavbarMobile>
          {links.map((link) => (
            <NavbarLink key={link.label} href={link.href}>
              {link.label}
            </NavbarLink>
          ))}
          <NavbarCta href="#dashboard">Your dashboard</NavbarCta>
        </NavbarMobile>
      </Navbar>

      <Ambient position="top-right" className="top-24" />

      <section className="relative mx-auto grid max-w-[1280px] items-center gap-16 px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:px-12 lg:pt-24 lg:pb-20">
        <div className="min-w-0">
          <Eyebrow>
            <StatusDot /> The internet, a little more blocky
          </Eyebrow>
          <h1 className="my-6 font-display text-[44px] leading-[1.08] font-medium tracking-[-0.05em] sm:text-6xl lg:text-[clamp(52px,5vw,76px)]">
            Small computers.
            <br />
            Entire <span className="text-primary">worlds.</span>
          </h1>
          <p className="max-w-[46ch] text-[17px] leading-[1.8] text-foreground/85">
            Your builds have a home. Now your ideas do too. Create a site in Minecraft and share it with every server.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Button size="lg" asChild>
              <a href="#dashboard">
                Make yourself at home <ArrowUpRight />
              </a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="#directory">
                Explore the network <ArrowDown className="text-primary" />
              </a>
            </Button>
          </div>
          <p className="mt-6 text-[11px] text-[#7e8c7e]">Built for CC:Tweaked. Open by design. Yours to create.</p>
        </div>

        <div className="relative mx-auto w-full max-w-[460px] p-2 sm:p-4 lg:max-w-none">
          <Orbit size={450} className="-top-6" />
          <Ambient position="center" tone="amber" intensity="subtle" className="h-[420px] w-[420px]" />
          <Terminal tilt className="relative">
            <TerminalHeader>
              <NavbarMark className="size-3.5" /> LANTERN
            </TerminalHeader>
            <TerminalAddress>
              <span aria-hidden="true" className="mr-4 text-[#6f8064]">
                ‹ ›
              </span>
              hub://your-little-world/
            </TerminalAddress>
            <TerminalTypewriter
              lines={session}
              speed={40}
              pause={500}
              loop
              loopDelay={4000}
              bodyClassName="min-h-[300px] px-5 py-5 sm:px-7 sm:py-6"
              className="text-[12px] sm:text-[13px]"
            />
            <TerminalFooter>
              <span>HTTPS · Cloud hosted</span>
              <span>51 × 19</span>
            </TerminalFooter>
          </Terminal>
          <div className="absolute right-1 -bottom-5 flex rotate-2 items-center gap-2.5 rounded-md border border-[#4b5844] bg-[#20291e] px-4 py-3 text-[11px] text-[#bdc8ad] shadow-block-sm sm:right-2">
            <StatusDot /> Online when your world isn&apos;t.
          </div>
        </div>
      </section>

      <div className="relative mx-auto max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-12">
        <StatGroup>
          {stats.map((stat) => (
            <Stat key={stat.label}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </Stat>
          ))}
        </StatGroup>
      </div>
    </div>
  );
}
