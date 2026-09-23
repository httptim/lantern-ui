"use client";

import * as React from "react";
import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/lantern/ui/accordion";
import { Badge } from "@/registry/lantern/ui/badge";
import { Button } from "@/registry/lantern/ui/button";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import { ToggleGroup, ToggleGroupItem } from "@/registry/lantern/ui/toggle-group";

type Billing = "monthly" | "yearly";

const plans = [
  {
    name: "Free",
    blurb: "One hub site and a couple of turtles.",
    monthly: 0,
    yearly: 0,
    cta: "Start free",
    features: ["1 hub site", "2 turtles", "Guestbook with 50 entries", "Community relay"],
  },
  {
    name: "Hub",
    blurb: "For builders running a real base.",
    monthly: 6,
    yearly: 60,
    cta: "Get Hub",
    featured: true,
    features: ["3 hub sites", "16 turtles", "Unlimited guestbook", "Live console and map", "Custom address on example.net"],
  },
  {
    name: "Server",
    blurb: "For whole servers and their players.",
    monthly: 18,
    yearly: 180,
    cta: "Talk to us",
    features: ["Unlimited hub sites", "Unlimited turtles", "Player accounts", "Private relay", "Priority support"],
  },
];

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yes. Upgrades apply right away and downgrades apply at the end of the billing period. Your hub sites and turtles stay put.",
  },
  {
    q: "What counts as a turtle?",
    a: "Any in-game turtle that has run the Lantern agent and reported to your hub in the last 30 days.",
  },
  {
    q: "Do I need my own server?",
    a: "No. The Free and Hub plans use the shared community relay. The Server plan adds a private relay for your world.",
  },
  {
    q: "What happens if I stop paying?",
    a: "Your account moves to Free. Extra hub sites go read-only and extra turtles stop reporting until you upgrade again.",
  },
];

export default function Pricing() {
  const [billing, setBilling] = React.useState<Billing>("monthly");

  return (
    <div className="relative min-h-svh overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="mt-3 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
            Pick a plan. Keep <span className="text-primary">building.</span>
          </h1>
          <p className="mt-4 max-w-[48ch] text-muted-foreground">
            Start free with one hub site. Upgrade when the fleet grows.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <ToggleGroup
              type="single"
              variant="outline"
              value={billing}
              onValueChange={(value) => value && setBilling(value as Billing)}
              aria-label="Billing period"
            >
              <ToggleGroupItem value="monthly" className="px-4">
                Monthly
              </ToggleGroupItem>
              <ToggleGroupItem value="yearly" className="px-4">
                Yearly
              </ToggleGroupItem>
            </ToggleGroup>
            <Badge variant="success">2 months free</Badge>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
          {plans.map((plan) => {
            const price = billing === "monthly" ? plan.monthly : plan.yearly;
            return (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-lg border bg-card p-6",
                  plan.featured && "border-primary shadow-block md:-translate-y-3",
                )}
              >
                {plan.featured && <Badge className="absolute -top-2.5 left-6">Most picked</Badge>}
                <h2 className="text-xl font-medium tracking-tight">{plan.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground md:min-h-15 lg:min-h-10">{plan.blurb}</p>
                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className={cn("font-display text-5xl font-medium tracking-tight tabular-nums", plan.featured && "text-primary")}>
                    ${price}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    {price === 0 ? "forever" : billing === "monthly" ? "/ month" : "/ year"}
                  </span>
                </div>
                <Button className="mt-6 w-full" variant={plan.featured ? "default" : "secondary"}>
                  {plan.cta}
                  <ArrowRightIcon />
                </Button>
                <div className="mt-6 border-t pt-6">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">Includes</div>
                  <ul className="mt-4 grid gap-3 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-24 max-w-3xl">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-2 text-3xl font-medium tracking-[-0.05em]">
            Before you <span className="text-primary">upgrade.</span>
          </h2>
          <Accordion type="single" collapsible defaultValue="item-0" className="mt-6 border-t">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
