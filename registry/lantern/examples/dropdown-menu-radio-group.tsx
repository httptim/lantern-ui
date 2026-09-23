"use client";

import * as React from "react";
import { ArrowDownUpIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/lantern/ui/dropdown-menu";

const orders = [
  { value: "recent", label: "Recently updated" },
  { value: "visits", label: "Most visited" },
  { value: "signatures", label: "Most signatures" },
  { value: "name", label: "Name, A to Z" },
];

export default function DropdownMenuRadioGroupDemo() {
  const [order, setOrder] = React.useState("recent");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ArrowDownUpIcon />
          {orders.find((item) => item.value === order)?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Sort directory</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={order} onValueChange={setOrder}>
          {orders.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={item.value}>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
