"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/lantern/ui/avatar";
import { Button } from "@/registry/lantern/ui/button";
import { Label } from "@/registry/lantern/ui/label";
import { Textarea } from "@/registry/lantern/ui/textarea";

function initialsOf(name: string) {
  const words = name.trim().split(/[\s_-]+/).filter(Boolean);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  return (words[0] ?? "?").slice(0, 2).toUpperCase();
}

function formatRelative(date: Date, now: number) {
  const seconds = Math.round((now - date.getTime()) / 1000);
  if (seconds < 45) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/** Re-renders every minute so relative times stay fresh. */
function useNow(interval = 60_000) {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), interval);
    return () => clearInterval(id);
  }, [interval]);
  return now;
}

function Guestbook({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="guestbook"
      className={cn("flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground", className)}
      {...props}
    />
  );
}

function GuestbookHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="guestbook-header"
      className={cn(
        "flex items-center justify-between gap-3 border-b px-4 py-3 font-mono text-[10px] font-semibold tracking-[0.2em] text-success uppercase sm:px-5",
        className,
      )}
      {...props}
    />
  );
}

function GuestbookList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="guestbook-list"
      aria-live="polite"
      className={cn("flex flex-col divide-y divide-border", className)}
      {...props}
    />
  );
}

type GuestbookEntryProps = Omit<React.ComponentProps<"li">, "children"> & {
  name: string;
  /** A Date, timestamp or ISO string. Shown as relative time. Pass a string that is not a date to show it as is. */
  time: Date | number | string;
  message: React.ReactNode;
  avatarSrc?: string;
  initials?: string;
};

function GuestbookEntry({ name, time, message, avatarSrc, initials, className, ...props }: GuestbookEntryProps) {
  const now = useNow();
  const date = new Date(time);
  const valid = !Number.isNaN(date.getTime());
  const label = valid ? formatRelative(date, now) : String(time);

  return (
    <li data-slot="guestbook-entry" className={cn("flex gap-3 px-4 py-4 sm:px-5", className)} {...props}>
      <Avatar className="size-8">
        {avatarSrc && <AvatarImage src={avatarSrc} alt="" />}
        <AvatarFallback className="text-[10px]">{initials ?? initialsOf(name)}</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <span className="truncate text-sm font-semibold text-foreground">{name}</span>
          {valid ? (
            <time
              dateTime={date.toISOString()}
              title={date.toLocaleString()}
              suppressHydrationWarning
              className="shrink-0 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase"
            >
              {label}
            </time>
          ) : (
            <span className="shrink-0 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">{label}</span>
          )}
        </div>
        <p className="text-sm leading-relaxed break-words whitespace-pre-line text-[#cfd5c6]">{message}</p>
      </div>
    </li>
  );
}

type GuestbookComposerProps = Omit<React.ComponentProps<"form">, "onSubmit"> & {
  /** Called with the trimmed message. Clear happens automatically. */
  onSign?: (message: string) => void;
  maxLength?: number;
  placeholder?: string;
  label?: string;
  submitLabel?: string;
  disabled?: boolean;
};

function GuestbookComposer({
  onSign,
  maxLength = 280,
  placeholder = "Say hello to the next traveler...",
  label = "Your message",
  submitLabel = "Sign the guestbook",
  disabled = false,
  className,
  ...props
}: GuestbookComposerProps) {
  const id = React.useId();
  const [message, setMessage] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const length = message.length;
  const trimmed = message.trim();
  const over = length > maxLength;
  const canSubmit = !disabled && trimmed.length > 0 && !over;

  function submit() {
    if (!canSubmit) return;
    onSign?.(trimmed);
    setMessage("");
    textareaRef.current?.focus();
  }

  return (
    <form
      data-slot="guestbook-composer"
      className={cn("flex flex-col gap-3 border-b bg-secondary/40 px-4 py-4 sm:px-5", className)}
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      {...props}
    >
      <Label htmlFor={`${id}-message`} className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </Label>
      <Textarea
        ref={textareaRef}
        id={`${id}-message`}
        value={message}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={over || undefined}
        aria-describedby={`${id}-count`}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            submit();
          }
        }}
        className="min-h-24 resize-none"
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          id={`${id}-count`}
          className={cn(
            "font-mono text-[10px] tracking-[0.14em] text-muted-foreground tabular-nums",
            length > maxLength * 0.9 && "text-warning",
            over && "text-destructive",
          )}
        >
          {length}/{maxLength}
        </span>
        <Button type="submit" size="sm" disabled={!canSubmit}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

function GuestbookEmpty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="guestbook-empty"
      className={cn("px-5 py-10 text-center font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase", className)}
      {...props}
    />
  );
}

export { Guestbook, GuestbookHeader, GuestbookList, GuestbookEntry, GuestbookComposer, GuestbookEmpty };
