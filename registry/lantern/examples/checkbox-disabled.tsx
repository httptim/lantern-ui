import { Checkbox } from "@/registry/lantern/ui/checkbox";
import { Label } from "@/registry/lantern/ui/label";

export default function CheckboxDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Checkbox id="cb-dis-1" disabled />
        <Label htmlFor="cb-dis-1">Mirror to a second server</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="cb-dis-2" disabled defaultChecked />
        <Label htmlFor="cb-dis-2">Keep the site online (required)</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="cb-ind" checked="indeterminate" />
        <Label htmlFor="cb-ind">Some pages selected</Label>
      </div>
    </div>
  );
}
