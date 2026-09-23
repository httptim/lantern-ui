"use client";

import { ChevronDownIcon, DownloadIcon, HardDriveIcon, PlayIcon, RefreshCwIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/registry/lantern/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/lantern/ui/dropdown-menu";

export default function ButtonGroupSplit() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <ButtonGroup>
        <Button>
          <PlayIcon />
          Run excavate
        </Button>
        <ButtonGroupSeparator />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" aria-label="More run options">
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Run on</DropdownMenuLabel>
            <DropdownMenuItem>turtle-07</DropdownMenuItem>
            <DropdownMenuItem>turtle-12</DropdownMenuItem>
            <DropdownMenuItem>All miners</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <RefreshCwIcon />
              Run on boot
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary">
          <DownloadIcon />
          Save
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" aria-label="More save options">
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <HardDriveIcon />
              Save to disk
            </DropdownMenuItem>
            <DropdownMenuItem>Save as...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  );
}
