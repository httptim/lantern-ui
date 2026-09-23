"use client";

import * as React from "react";
import { CloudIcon, UploadIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import { Checkbox } from "@/registry/lantern/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/registry/lantern/ui/field";
import { Input } from "@/registry/lantern/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/registry/lantern/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/registry/lantern/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/lantern/ui/select";
import { Textarea } from "@/registry/lantern/ui/textarea";

export default function FieldDemo() {
  const [published, setPublished] = React.useState(false);

  return (
    <form
      className="w-full max-w-lg rounded-lg border bg-card p-5 sm:p-7"
      onSubmit={(e) => {
        e.preventDefault();
        setPublished(true);
      }}
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Publish a site</FieldLegend>
          <FieldDescription>Claim an address and put your computer on the network.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="pub-name">Site name</FieldLabel>
              <Input id="pub-name" placeholder="Ember Library" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="pub-address">Address</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>hub://</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="pub-address"
                  placeholder="ember-library"
                  className="pl-0.5 font-mono text-[13px]"
                  aria-describedby="pub-address-desc"
                  required
                />
              </InputGroup>
              <FieldDescription id="pub-address-desc">Lowercase letters, numbers and dashes.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="pub-desc">Description</FieldLabel>
              <Textarea id="pub-desc" placeholder="A reading room for books copied off the server." className="min-h-24" />
            </Field>
            <Field>
              <FieldLabel htmlFor="pub-category">Category</FieldLabel>
              <Select defaultValue="library">
                <SelectTrigger id="pub-category" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="library">Library</SelectItem>
                  <SelectItem value="shop">Shop</SelectItem>
                  <SelectItem value="guestbook">Guestbook</SelectItem>
                  <SelectItem value="tools">Tools and scripts</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend variant="label">Visibility</FieldLegend>
          <RadioGroup defaultValue="listed" className="gap-3">
            <FieldLabel htmlFor="pub-listed">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Listed</FieldTitle>
                  <FieldDescription>Shows up in the directory and search.</FieldDescription>
                </FieldContent>
                <RadioGroupItem value="listed" id="pub-listed" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="pub-unlisted">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Unlisted</FieldTitle>
                  <FieldDescription>Only people with the address can visit.</FieldDescription>
                </FieldContent>
                <RadioGroupItem value="unlisted" id="pub-unlisted" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal">
          <Checkbox id="pub-rules" required />
          <FieldContent>
            <FieldLabel htmlFor="pub-rules">I agree to the hub rules</FieldLabel>
            <FieldDescription>No griefing links, no pages that pretend to be someone else.</FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal" className="flex-wrap">
          <Button type="submit">
            {published ? <CloudIcon /> : <UploadIcon />}
            {published ? "Published" : "Publish site"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => setPublished(false)}>
            Cancel
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
