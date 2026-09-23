"use client";

import * as React from "react";
import { SendIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/registry/lantern/ui/field";
import { Input } from "@/registry/lantern/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/lantern/ui/select";
import { Textarea } from "@/registry/lantern/ui/textarea";

export default function FieldContact() {
  const [message, setMessage] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const max = 500;

  return (
    <form
      className="w-full max-w-lg rounded-lg border bg-card p-5 sm:p-7"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <FieldSet>
        <FieldLegend>Message the site owner</FieldLegend>
        <FieldDescription>Delivered to their in-game inbox the next time they log on.</FieldDescription>
        <FieldGroup>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="ct-name">Your name</FieldLabel>
              <Input id="ct-name" placeholder="Alex" autoComplete="name" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="ct-email">Reply to</FieldLabel>
              <Input id="ct-email" type="email" placeholder="you@example.com" autoComplete="email" />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="ct-topic">Topic</FieldLabel>
            <Select defaultValue="trade">
              <SelectTrigger id="ct-topic" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trade">Trade request</SelectItem>
                <SelectItem value="bug">Something is broken</SelectItem>
                <SelectItem value="hello">Just saying hello</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="ct-message">Message</FieldLabel>
            <Textarea
              id="ct-message"
              value={message}
              maxLength={max}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="I have 3 stacks of cobblestone for your diamond pickaxe."
              className="min-h-28"
              aria-describedby="ct-count"
              required
            />
            <FieldDescription id="ct-count" className="text-right font-mono text-[11px]">
              {message.length}/{max}
            </FieldDescription>
          </Field>
          <Field orientation="horizontal" className="flex-wrap justify-between">
            <FieldDescription role="status" className={sent ? "text-success" : undefined}>
              {sent ? "Sent. It will arrive when they log on." : "Owner last seen 2 hours ago."}
            </FieldDescription>
            <Button type="submit">
              <SendIcon />
              Send message
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
