import { Label } from "@/registry/lantern/ui/label";
import { Switch } from "@/registry/lantern/ui/switch";

export default function SwitchDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch id="sw-online" defaultChecked />
        <Label htmlFor="sw-online">Keep site online</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="sw-disabled" disabled />
        <Label htmlFor="sw-disabled">Beta renderer</Label>
      </div>
    </div>
  );
}
