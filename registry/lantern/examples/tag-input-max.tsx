"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/registry/lantern/ui/field";
import { TagInput, type TagRejectReason } from "@/registry/lantern/ui/tag-input";

const suggestions = ["mining", "relay", "farm", "shop", "archive"];
const MAX = 4;

const messages: Record<TagRejectReason, string> = {
  duplicate: "Already added.",
  invalid: "Tags use lowercase letters, numbers and dashes.",
  max: `Up to ${MAX} tags.`,
};

export default function TagInputMax() {
  const [tags, setTags] = React.useState<string[]>(["relay"]);
  const [error, setError] = React.useState<string | null>(null);

  const add = (tag: string) => {
    if (tags.includes(tag) || tags.length >= MAX) return;
    setTags([...tags, tag]);
    setError(null);
  };

  return (
    <Field className="w-full max-w-md" data-invalid={error ? true : undefined}>
      <div className="flex items-baseline justify-between gap-3">
        <FieldLabel htmlFor="server-tags">Server tags</FieldLabel>
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase" aria-live="polite">
          {tags.length} / {MAX}
        </span>
      </div>
      <TagInput
        id="server-tags"
        value={tags}
        onValueChange={(next) => {
          setTags(next);
          setError(null);
        }}
        max={MAX}
        validate={(tag) => /^[a-z0-9-]+$/.test(tag)}
        onReject={(_, reason) => setError(messages[reason])}
        placeholder="lowercase-tag"
        aria-invalid={error ? true : undefined}
        aria-describedby="server-tags-help"
      />
      {error ? <FieldError>{error}</FieldError> : null}
      <FieldDescription id="server-tags-help">Suggestions:</FieldDescription>
      <div className="flex flex-wrap gap-1.5">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => add(s)}
            disabled={tags.includes(s) || tags.length >= MAX}
            className="inline-flex h-6 cursor-pointer items-center gap-1 rounded-sm border border-dashed border-input px-1.5 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase outline-none hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-3"
          >
            <Plus aria-hidden="true" />
            {s}
          </button>
        ))}
      </div>
    </Field>
  );
}
