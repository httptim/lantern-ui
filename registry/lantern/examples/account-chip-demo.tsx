import { CreditCardIcon, KeyRoundIcon, LogOutIcon, UserIcon } from "lucide-react";

import {
  AccountChip,
  AccountChipContent,
  AccountChipLabel,
  AccountChipTrigger,
} from "@/registry/lantern/ui/account-chip";
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@/registry/lantern/ui/dropdown-menu";
import { UsageMeter, UsageMeterGroup, UsageMeterGroupLabel } from "@/registry/lantern/ui/usage-meter";

export default function AccountChipDemo() {
  return (
    <div className="flex w-full max-w-2xl items-center justify-end rounded-lg border bg-card px-3 py-2.5">
      <AccountChip>
        <AccountChipTrigger name="Tim" plan="Pro" fallback="TH">
          <UsageMeterGroup aria-label="AI allowance">
            <UsageMeterGroupLabel>AI allowance</UsageMeterGroupLabel>
            <UsageMeter size="compact" label="5-hour" value={32} />
            <UsageMeter size="compact" label="Week" value={18} />
          </UsageMeterGroup>
        </AccountChipTrigger>
        <AccountChipContent>
          <AccountChipLabel name="Tim" email="tim@thultz.dev" plan="Pro">
            <UsageMeter label="5-hour" value={32} reset="Resets at 3:40 pm" />
            <UsageMeter label="Week" value={18} reset="Resets Monday" />
          </AccountChipLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <a href="#">
                <UserIcon /> Profile
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="#">
                <CreditCardIcon /> Plan and billing
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="#">
                <KeyRoundIcon /> Turtle keys
              </a>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOutIcon /> Sign out
          </DropdownMenuItem>
        </AccountChipContent>
      </AccountChip>
    </div>
  );
}
