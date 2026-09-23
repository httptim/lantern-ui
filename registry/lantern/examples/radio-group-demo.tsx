import { Label } from "@/registry/lantern/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/lantern/ui/radio-group";

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="daily" aria-label="Backup schedule">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="hourly" id="rg-hourly" />
        <Label htmlFor="rg-hourly">Back up hourly</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="daily" id="rg-daily" />
        <Label htmlFor="rg-daily">Back up daily</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="never" id="rg-never" />
        <Label htmlFor="rg-never">Never</Label>
      </div>
    </RadioGroup>
  );
}
