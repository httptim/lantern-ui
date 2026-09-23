import { Checkbox } from "@/registry/lantern/ui/checkbox";
import { Label } from "@/registry/lantern/ui/label";

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Checkbox id="cb-terms" />
        <Label htmlFor="cb-terms">Accept the hub rules</Label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="cb-listed" defaultChecked />
        <div className="grid gap-1.5">
          <Label htmlFor="cb-listed">List in the directory</Label>
          <p className="max-w-xs text-[13px] text-muted-foreground">
            Other players can find your site from the Lantern Hub front page.
          </p>
        </div>
      </div>
    </div>
  );
}
