"use client";

import * as React from "react";

import { Button } from "@/registry/lantern/ui/button";
import { Combobox } from "@/registry/lantern/ui/combobox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/registry/lantern/ui/field";
import { Input } from "@/registry/lantern/ui/input";

const programs = [
  { value: "excavate", label: "excavate", keywords: ["dig", "mine"] },
  { value: "tunnel", label: "tunnel", keywords: ["dig"] },
  { value: "farm", label: "farm", keywords: ["wheat", "crops"] },
  { value: "refuel", label: "refuel", keywords: ["coal", "fuel"] },
  { value: "go-home", label: "go-home", keywords: ["return"] },
];

export default function ComboboxForm() {
  const [program, setProgram] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const invalid = submitted && !program;

  return (
    <form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="turtle-label">Turtle</FieldLabel>
          <Input id="turtle-label" defaultValue="turtle-07" />
        </Field>
        <Field data-invalid={invalid}>
          <FieldLabel id="startup-label">Startup program</FieldLabel>
          <Combobox
            aria-labelledby="startup-label"
            aria-describedby="startup-help"
            aria-invalid={invalid}
            options={programs}
            value={program}
            onChange={setProgram}
            placeholder="Choose a program"
            searchPlaceholder="Search programs..."
            empty="No program found."
          />
          {invalid ? (
            <FieldError>Pick a program to run on boot.</FieldError>
          ) : (
            <FieldDescription id="startup-help">Runs every time the turtle boots.</FieldDescription>
          )}
        </Field>
        <Field orientation="horizontal">
          <Button type="submit">Save turtle</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
