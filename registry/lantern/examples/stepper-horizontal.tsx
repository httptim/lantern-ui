"use client";

import * as React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import { Stepper, StepperDescription, StepperItem, StepperTitle } from "@/registry/lantern/ui/stepper";

const steps = [
  { title: "Fuel", description: "Load coal into slot 16." },
  { title: "Route", description: "Set the mining depth." },
  { title: "Deploy", description: "Send the turtle out." },
];

export default function StepperHorizontal() {
  const [current, setCurrent] = React.useState(1);
  const done = current >= steps.length;

  return (
    <div className="grid w-full max-w-2xl gap-6">
      <Stepper orientation="horizontal" aria-label="Deploy a mining turtle">
        {steps.map((step, i) => (
          <StepperItem key={step.title} state={i < current ? "complete" : i === current ? "current" : "upcoming"}>
            <StepperTitle>{step.title}</StepperTitle>
            <StepperDescription>{step.description}</StepperDescription>
          </StepperItem>
        ))}
      </Stepper>
      <div className="flex items-center justify-between gap-3 border-t pt-4">
        <span aria-live="polite" className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          {done ? "All steps done" : `Step ${current + 1} of ${steps.length}`}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
            <ArrowLeftIcon aria-hidden="true" /> Back
          </Button>
          <Button size="sm" disabled={done} onClick={() => setCurrent((c) => c + 1)}>
            {current === steps.length - 1 ? "Finish" : "Next"} <ArrowRightIcon aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
