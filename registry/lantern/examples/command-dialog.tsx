"use client";

import * as React from "react";
import { BookOpenIcon, BotIcon, GlobeIcon, SearchIcon, SettingsIcon, TerminalIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/lantern/ui/command";
import { Kbd, KbdGroup } from "@/registry/lantern/ui/kbd";

export default function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = () => setOpen(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="secondary" onClick={() => setOpen(true)} className="w-64 justify-between text-muted-foreground">
        <span className="flex items-center gap-2">
          <SearchIcon />
          Search the hub...
        </span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        Or press Cmd K / Ctrl K
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, turtles, servers..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={run}>
              <GlobeIcon />
              Directory
            </CommandItem>
            <CommandItem onSelect={run}>
              <BookOpenIcon />
              Guestbook
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={run}>
              <BotIcon />
              Send turtle home
              <CommandShortcut>Ctrl H</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={run}>
              <TerminalIcon />
              Open terminal
              <CommandShortcut>Ctrl T</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={run}>
              <SettingsIcon />
              Hub settings
              <CommandShortcut>Ctrl ,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
