import {
  BookOpenIcon,
  BotIcon,
  CpuIcon,
  GlobeIcon,
  RadioTowerIcon,
  SettingsIcon,
  TerminalIcon,
  UserIcon,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/lantern/ui/command";

export default function CommandDemo() {
  return (
    <Command className="w-full max-w-md border shadow-block-sm">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Jump to">
          <CommandItem>
            <GlobeIcon />
            quarry.hub
          </CommandItem>
          <CommandItem>
            <BookOpenIcon />
            Guestbook
          </CommandItem>
          <CommandItem>
            <RadioTowerIcon />
            Rednet relay
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Computers">
          <CommandItem>
            <BotIcon />
            Wake turtle 07
            <CommandShortcut>Ctrl W</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <TerminalIcon />
            Open shell on server-02
            <CommandShortcut>Ctrl T</CommandShortcut>
          </CommandItem>
          <CommandItem disabled>
            <CpuIcon />
            Reboot mainframe
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Account">
          <CommandItem>
            <UserIcon />
            Profile
            <CommandShortcut>Shift P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            Settings
            <CommandShortcut>Ctrl ,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
