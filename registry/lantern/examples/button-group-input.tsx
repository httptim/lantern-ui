import { SendIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/registry/lantern/ui/button-group";
import { Input } from "@/registry/lantern/ui/input";
import { Label } from "@/registry/lantern/ui/label";

export default function ButtonGroupInput() {
  return (
    <div className="grid w-full max-w-sm gap-2.5">
      <Label htmlFor="rednet-message">Rednet broadcast</Label>
      <ButtonGroup className="w-full">
        <ButtonGroupText>ch 42</ButtonGroupText>
        <Input id="rednet-message" placeholder="Message to all turtles" />
        <Button variant="outline" size="icon" aria-label="Send">
          <SendIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
