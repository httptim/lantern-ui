import { AtSignIcon, CheckIcon, GlobeIcon } from "lucide-react";

import { Label } from "@/registry/lantern/ui/label";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/registry/lantern/ui/input-group";

export default function InputGroupAffixes() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <div className="grid gap-2">
        <Label htmlFor="ig-address">Address</Label>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>hub://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput id="ig-address" defaultValue="ember-library" className="pl-0.5 font-mono text-[13px]" />
          <InputGroupAddon align="inline-end">
            <CheckIcon className="text-success" aria-label="Available" />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ig-domain">Page path</Label>
        <InputGroup>
          <InputGroupAddon>
            <GlobeIcon />
          </InputGroupAddon>
          <InputGroupInput id="ig-domain" placeholder="guestbook" className="font-mono text-[13px]" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>.lua</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ig-handle">Player name</Label>
        <InputGroup>
          <InputGroupAddon>
            <AtSignIcon />
          </InputGroupAddon>
          <InputGroupInput id="ig-handle" aria-invalid defaultValue="steve the builder" />
        </InputGroup>
        <p className="text-xs text-destructive">No spaces allowed.</p>
      </div>
    </div>
  );
}
