"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type TagRejectReason = "duplicate" | "invalid" | "max";

type TagInputProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "size"> & {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (tags: string[]) => void;
  /** Most tags allowed. */
  max?: number;
  /** Return false to reject a tag. Runs on the trimmed text. */
  validate?: (tag: string, tags: string[]) => boolean;
  /** Called when a tag is not added, with the reason. */
  onReject?: (tag: string, reason: TagRejectReason) => void;
  /** Treat "Hub" and "hub" as the same tag. */
  caseSensitive?: boolean;
  /** Add the typed text when the field loses focus. */
  addOnBlur?: boolean;
  /** Classes for the outer field. className goes to the text input. */
  containerClassName?: string;
};

/** A field that turns typed text into removable tags. Enter or comma adds, Backspace on empty removes the last. */
function TagInput({
  value: valueProp,
  defaultValue,
  onValueChange,
  max,
  validate,
  onReject,
  caseSensitive = false,
  addOnBlur = true,
  disabled,
  placeholder,
  className,
  containerClassName,
  onKeyDown,
  onPaste,
  onBlur,
  "aria-invalid": ariaInvalid,
  ...props
}: TagInputProps) {
  const [uncontrolled, setUncontrolled] = React.useState<string[]>(defaultValue ?? []);
  const tags = valueProp ?? uncontrolled;
  const [draft, setDraft] = React.useState("");
  const [announcement, setAnnouncement] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const atMax = max !== undefined && tags.length >= max;

  const setTags = (next: string[]) => {
    if (valueProp === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };

  const norm = (t: string) => (caseSensitive ? t : t.toLowerCase());

  /** Adds each candidate that passes the checks; returns true if every one was added. */
  const addTags = (candidates: string[]) => {
    const next = [...tags];
    const added: string[] = [];
    let allAdded = true;
    for (const raw of candidates) {
      const tag = raw.trim();
      if (!tag) continue;
      let reason: TagRejectReason | null = null;
      if (next.some((t) => norm(t) === norm(tag))) reason = "duplicate";
      else if (max !== undefined && next.length >= max) reason = "max";
      else if (validate && !validate(tag, next)) reason = "invalid";
      if (reason) {
        allAdded = false;
        onReject?.(tag, reason);
        continue;
      }
      next.push(tag);
      added.push(tag);
    }
    if (added.length) {
      setTags(next);
      setAnnouncement(`Added ${added.join(", ")}.`);
    }
    return allAdded;
  };

  const removeTag = (index: number) => {
    const removed = tags[index];
    setTags(tags.filter((_, i) => i !== index));
    setAnnouncement(`Removed ${removed}.`);
  };

  const commitDraft = () => {
    if (!draft.trim()) return;
    // Keep the text when it was rejected so it can be fixed; clear duplicates and successes.
    const tag = draft.trim();
    const isDuplicate = tags.some((t) => norm(t) === norm(tag));
    if (addTags([draft]) || isDuplicate) setDraft("");
  };

  return (
    <div
      data-slot="tag-input"
      data-disabled={disabled ? "" : undefined}
      aria-invalid={ariaInvalid}
      onMouseDown={(e) => {
        // Clicking the empty part of the field focuses the text input.
        if (e.target === e.currentTarget) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }}
      className={cn(
        "flex min-h-10 w-full min-w-0 cursor-text flex-wrap items-center gap-1.5 rounded-md border border-input bg-background/40 px-2 py-1.5 text-sm transition-[border-color,box-shadow]",
        "hover:border-muted-foreground/60 has-[input:focus-visible]:border-primary has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring/25",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        containerClassName,
      )}
    >
      {tags.map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          data-slot="tag-input-tag"
          className="inline-flex h-6 max-w-full items-center gap-1 border border-[#647160] pr-0.5 pl-1.5 font-mono text-[10px] leading-none tracking-[0.12em] text-[#b8c2b2] uppercase"
        >
          <span className="truncate">{tag}</span>
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            disabled={disabled}
            onClick={() => {
              removeTag(i);
              inputRef.current?.focus();
            }}
            className="inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm text-muted-foreground outline-none hover:bg-secondary hover:text-foreground focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:size-3"
          >
            <X />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        data-slot="tag-input-input"
        type="text"
        value={draft}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        placeholder={atMax ? undefined : placeholder}
        enterKeyHint="enter"
        autoComplete="off"
        onChange={(e) => {
          const text = e.target.value;
          // Mobile keyboards do not always fire a comma keydown, so split on input too.
          if (text.includes(",")) {
            const parts = text.split(",");
            const rest = parts.pop() ?? "";
            addTags(parts);
            setDraft(rest);
          } else {
            setDraft(text);
          }
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented || e.nativeEvent.isComposing) return;
          if (e.key === "Enter" || e.key === ",") {
            if (e.key === "Enter" && !draft.trim()) return; // Let an empty Enter submit the form.
            e.preventDefault();
            commitDraft();
          } else if (e.key === "Backspace" && draft === "" && tags.length > 0) {
            e.preventDefault();
            removeTag(tags.length - 1);
          }
        }}
        onPaste={(e) => {
          onPaste?.(e);
          if (e.defaultPrevented) return;
          const text = e.clipboardData.getData("text");
          if (/[,\n]/.test(text)) {
            e.preventDefault();
            addTags(text.split(/[,\n]/));
          }
        }}
        onBlur={(e) => {
          onBlur?.(e);
          if (addOnBlur) commitDraft();
        }}
        className={cn(
          "h-6 min-w-[8ch] flex-1 bg-transparent px-1 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
      <span className="sr-only" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}

export { TagInput, type TagRejectReason };
