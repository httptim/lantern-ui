import { Input } from "@/registry/lantern/ui/input";
import { Label } from "@/registry/lantern/ui/label";

export default function LabelDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="label-demo">Display name</Label>
      <Input id="label-demo" placeholder="Passing traveler" />
    </div>
  );
}
