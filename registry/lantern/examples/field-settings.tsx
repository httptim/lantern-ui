"use client";

import * as React from "react";

import { Button } from "@/registry/lantern/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/registry/lantern/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/lantern/ui/select";
import { Slider } from "@/registry/lantern/ui/slider";
import { Switch } from "@/registry/lantern/ui/switch";

const toggles = [
  { id: "online", label: "Keep site online", description: "Serve a cached copy from the Hub while your computer is off.", on: true },
  { id: "guestbook", label: "Open guestbook", description: "Visitors can leave short messages.", on: true },
  { id: "analytics", label: "Visit counter", description: "Count page views without storing player names.", on: false },
];

export default function FieldSettings() {
  const [interval, setInterval] = React.useState([15]);

  return (
    <form className="w-full max-w-lg rounded-lg border bg-card p-5 sm:p-7" onSubmit={(e) => e.preventDefault()}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Site settings</FieldLegend>
          <FieldDescription>Changes sync to your computer the next time it boots.</FieldDescription>
          <FieldGroup className="gap-5">
            {toggles.map((t) => (
              <Field key={t.id} orientation="horizontal">
                <FieldContent>
                  <FieldLabel htmlFor={`fs-${t.id}`}>{t.label}</FieldLabel>
                  <FieldDescription id={`fs-${t.id}-desc`}>{t.description}</FieldDescription>
                </FieldContent>
                <Switch id={`fs-${t.id}`} defaultChecked={t.on} aria-describedby={`fs-${t.id}-desc`} />
              </Field>
            ))}
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend variant="label">Sync</FieldLegend>
          <FieldGroup>
            <Field>
              <div className="flex items-center justify-between gap-3">
                <FieldLabel id="fs-interval-label">Sync interval</FieldLabel>
                <span className="font-mono text-xs text-primary">every {interval[0]} min</span>
              </div>
              <Slider
                value={interval}
                onValueChange={setInterval}
                min={5}
                max={60}
                step={5}
                aria-labelledby="fs-interval-label"
                aria-describedby="fs-interval-desc"
              />
              <FieldDescription id="fs-interval-desc">Shorter intervals use more of your modem's range.</FieldDescription>
            </Field>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel htmlFor="fs-conflict">On conflict</FieldLabel>
                <FieldDescription>When the Hub copy and your computer disagree.</FieldDescription>
              </FieldContent>
              <Select defaultValue="computer">
                <SelectTrigger id="fs-conflict" className="w-full @md/field-group:w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer">Computer wins</SelectItem>
                  <SelectItem value="hub">Hub wins</SelectItem>
                  <SelectItem value="ask">Ask me</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field orientation="horizontal" className="justify-end">
          <Button type="button" variant="ghost">
            Reset
          </Button>
          <Button type="submit">Save settings</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
