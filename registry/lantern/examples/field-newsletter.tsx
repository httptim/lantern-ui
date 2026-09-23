"use client";

import * as React from "react";
import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/registry/lantern/ui/field";
import { Input } from "@/registry/lantern/ui/input";

export default function FieldNewsletter() {
  const [joined, setJoined] = React.useState(false);

  return (
    <form
      className="w-full max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        setJoined(true);
      }}
    >
      <Field>
        <FieldLabel htmlFor="nl-email" className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">
          Network dispatch
        </FieldLabel>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="nl-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-describedby="nl-desc"
            required
            className="flex-1"
          />
          <Button type="submit" className="shrink-0">
            {joined ? <CheckIcon /> : null}
            {joined ? "Subscribed" : "Subscribe"}
            {joined ? null : <ArrowRightIcon />}
          </Button>
        </div>
        <FieldDescription id="nl-desc" role="status">
          {joined ? "You are on the list. See you next month." : "New sites and server news, once a month. No spam."}
        </FieldDescription>
      </Field>
    </form>
  );
}
