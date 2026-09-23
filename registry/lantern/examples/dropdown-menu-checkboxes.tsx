"use client";

import * as React from "react";
import { ListFilterIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/lantern/ui/dropdown-menu";

export default function DropdownMenuCheckboxes() {
  const [online, setOnline] = React.useState(true);
  const [guestbook, setGuestbook] = React.useState(false);
  const [turtles, setTurtles] = React.useState(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ListFilterIcon />
          Filter hubs
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Show</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={online} onCheckedChange={setOnline}>
          Online only
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={guestbook} onCheckedChange={setGuestbook}>
          Has a guestbook
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={turtles} onCheckedChange={setTurtles}>
          Turtle programs
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem disabled>Verified builders</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
