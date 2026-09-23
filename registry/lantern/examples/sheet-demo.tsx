import { Button } from "@/registry/lantern/ui/button";
import { Input } from "@/registry/lantern/ui/input";
import { Label } from "@/registry/lantern/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/lantern/ui/sheet";

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Server settings</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="border-b">
          <SheetTitle>Server settings</SheetTitle>
          <SheetDescription>Where your hub is hosted and how it reaches the relay.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-5">
          <div className="grid gap-2">
            <Label htmlFor="sheet-computer">Computer ID</Label>
            <Input id="sheet-computer" defaultValue="42" inputMode="numeric" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sheet-relay">Relay channel</Label>
            <Input id="sheet-relay" defaultValue="lantern-main" />
          </div>
        </div>
        <SheetFooter className="border-t">
          <SheetClose asChild>
            <Button>Save settings</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="secondary">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
