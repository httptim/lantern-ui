import {
  BookOpenIcon,
  ChevronDownIcon,
  GlobeIcon,
  LogOutIcon,
  MailIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/lantern/ui/dropdown-menu";

export default function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          turtlewright
          <ChevronDownIcon className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon />
            Profile
            <DropdownMenuShortcut>Shift P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpenIcon />
            Guestbook
            <DropdownMenuShortcut>G</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Settings
            <DropdownMenuShortcut>Ctrl ,</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Hubs</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PlusIcon />
            New hub
            <DropdownMenuShortcut>Ctrl N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <GlobeIcon />
              Switch hub
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>quarry.hub</DropdownMenuItem>
              <DropdownMenuItem>turtlewright.hub</DropdownMenuItem>
              <DropdownMenuItem>east-market.hub</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem disabled>
            <MailIcon />
            Invite a builder
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
