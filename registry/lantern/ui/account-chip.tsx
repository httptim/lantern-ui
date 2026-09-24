"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/lantern/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/registry/lantern/ui/dropdown-menu";

/** The account menu root. A DropdownMenu under another name. */
function AccountChip(props: React.ComponentProps<typeof DropdownMenu>) {
  return <DropdownMenu {...props} />;
}

/**
 * The top bar chip: optional allowance meters, then avatar, name and plan tag.
 * Children (usually a UsageMeterGroup) sit before the avatar and hide below the md breakpoint.
 */
function AccountChipTrigger({
  className,
  name,
  plan,
  avatarSrc,
  fallback,
  children,
  ...props
}: Omit<React.ComponentProps<typeof DropdownMenuTrigger>, "asChild"> & {
  name: string;
  plan?: React.ReactNode;
  avatarSrc?: string;
  /** Initials shown when there is no image. Defaults to the first two letters of name. */
  fallback?: string;
}) {
  return (
    <div data-slot="account-chip" className={cn("flex min-w-0 items-center gap-3", className)}>
      {children && (
        <div data-slot="account-chip-meters" className="hidden md:block">
          {children}
        </div>
      )}
      <DropdownMenuTrigger
        data-slot="account-chip-trigger"
        aria-label={`Account menu for ${name}`}
        className={cn(
          "group/account flex min-w-0 cursor-pointer items-center gap-2 rounded-md py-1 pr-1.5 pl-1 text-left outline-none transition-colors",
          "hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=open]:bg-secondary",
        )}
        {...props}
      >
        <Avatar className="size-8">
          {avatarSrc && <AvatarImage src={avatarSrc} alt="" />}
          <AvatarFallback className="bg-terminal-bar font-display text-xs text-foreground">
            {fallback ?? name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <span className="hidden min-w-0 flex-col leading-tight sm:flex">
          <span className="truncate text-xs font-semibold">{name}</span>
          {plan && (
            <span data-slot="account-chip-plan" className="font-mono text-[10px] tracking-[0.12em] text-primary uppercase">
              {plan}
            </span>
          )}
        </span>
        <ChevronDownIcon
          aria-hidden="true"
          className="size-3.5 text-muted-foreground transition-transform group-data-[state=open]/account:rotate-180"
        />
      </DropdownMenuTrigger>
    </div>
  );
}

function AccountChipContent({
  className,
  align = "end",
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return <DropdownMenuContent align={align} className={cn("w-64", className)} {...props} />;
}

/** Name, email and plan at the top of the menu. Children (e.g. meters) render below them. */
function AccountChipLabel({
  className,
  name,
  email,
  plan,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuLabel> & {
  name: string;
  email?: string;
  plan?: React.ReactNode;
}) {
  return (
    <DropdownMenuLabel
      data-slot="account-chip-label"
      className={cn(
        "flex flex-col gap-3 px-2 py-2 font-sans text-sm font-normal tracking-normal text-foreground normal-case",
        className,
      )}
      {...props}
    >
      <span className="flex items-start justify-between gap-2">
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold text-foreground">{name}</span>
          {email && <span className="truncate text-xs text-muted-foreground">{email}</span>}
        </span>
        {plan && (
          <span className="rounded-sm border border-primary/40 px-1.5 py-1 font-mono text-[9px] leading-none tracking-[0.16em] text-primary uppercase">
            {plan}
          </span>
        )}
      </span>
      {children}
    </DropdownMenuLabel>
  );
}

export { AccountChip, AccountChipTrigger, AccountChipContent, AccountChipLabel };
