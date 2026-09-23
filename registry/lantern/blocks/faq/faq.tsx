import { ArrowUpRightIcon, MailIcon } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/lantern/ui/accordion";
import { Button } from "@/registry/lantern/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/lantern/ui/card";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import { StatusDot } from "@/registry/lantern/ui/status-dot";

const faqs = [
  {
    q: "What is a hub site?",
    a: "A small website that lives on the Lantern network. In-game computers load it by address, and you edit it from the web.",
  },
  {
    q: "Do I need to install anything in my world?",
    a: "Run one command on any in-game computer to install the Lantern agent. It works on single player and on servers.",
  },
  {
    q: "How do turtles report back?",
    a: "Each turtle runs the agent and sends its fuel, position and inventory to your hub every few seconds through the relay.",
  },
  {
    q: "Can visitors sign my guestbook in-game?",
    a: "Yes. Any computer that opens your hub site can leave a note. You can hide or pin entries from the web.",
  },
  {
    q: "What happens when my server goes offline?",
    a: "Your hub site stays up and shows the server as offline. Turtles queue their reports and send them once it is back.",
  },
  {
    q: "Is there a limit on pages?",
    a: "No page limit on any plan. Free hub sites are capped at 2 MB of content, which is a lot of text.",
  },
];

export default function Faq() {
  return (
    <section className="relative min-h-svh overflow-hidden bg-background">
      <div className="pointer-events-none absolute top-0 left-0 h-[480px] w-full bg-grid [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-8 lg:sticky lg:top-10 lg:self-start">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
              Questions, <span className="text-primary">answered.</span>
            </h2>
            <p className="mt-4 max-w-[42ch] text-muted-foreground">
              The short version of how hub sites, turtles and servers fit together. Still stuck? Ask a person.
            </p>
          </div>
          <Card className="gap-4 shadow-block-sm">
            <CardHeader>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-success uppercase">
                <StatusDot /> Help desk open
              </div>
              <CardTitle className="mt-1">Talk to the hub team</CardTitle>
              <CardDescription>We reply within a day, usually from inside a quarry.</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:help@example.com"
                className="inline-flex items-center gap-2 rounded-sm font-mono text-[13px] text-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <MailIcon className="size-4 text-primary" /> help@example.com
              </a>
            </CardContent>
            <CardFooter className="flex-col gap-2 sm:flex-row">
              <Button className="w-full sm:w-auto" asChild>
                <a href="mailto:help@example.com">
                  Email us <ArrowUpRightIcon />
                </a>
              </Button>
              <Button variant="secondary" className="w-full sm:w-auto" asChild>
                <a href="#">Read the docs</a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Accordion type="single" collapsible defaultValue="item-0" className="border-t lg:border-t-0">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`item-${i}`}>
              <AccordionTrigger className="py-5 text-lg">
                <span className="flex gap-4">
                  <span className="mt-1 font-mono text-[11px] tracking-[0.1em] text-muted-foreground tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {faq.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-9 text-[15px]">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
