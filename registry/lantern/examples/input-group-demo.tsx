import { SearchIcon } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/registry/lantern/ui/input-group";

export default function InputGroupDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search the directory" aria-label="Search the directory" />
        <InputGroupAddon align="inline-end">
          <InputGroupText className="text-xs">128 sites</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>hub://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="my-base" aria-label="Site address" className="pl-0.5 font-mono text-[13px]" />
      </InputGroup>
    </div>
  );
}
