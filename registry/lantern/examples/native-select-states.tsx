import { Label } from "@/registry/lantern/ui/label";
import { NativeSelect, NativeSelectOption } from "@/registry/lantern/ui/native-select";

export default function NativeSelectStates() {
  return (
    <div className="grid w-full max-w-xs gap-6">
      <div className="grid gap-2.5">
        <Label htmlFor="ns-invalid" className="text-destructive">
          Region
        </Label>
        <NativeSelect id="ns-invalid" aria-invalid="true" aria-describedby="ns-invalid-error" defaultValue="" className="w-full">
          <NativeSelectOption value="">Pick a region</NativeSelectOption>
          <NativeSelectOption value="north">North shelf</NativeSelectOption>
          <NativeSelectOption value="south">South marsh</NativeSelectOption>
        </NativeSelect>
        <p id="ns-invalid-error" className="text-[13px] text-destructive">
          Choose a region before publishing.
        </p>
      </div>
      <div className="grid gap-2.5">
        <Label htmlFor="ns-disabled">Server</Label>
        <NativeSelect id="ns-disabled" disabled defaultValue="deepstone" className="w-full">
          <NativeSelectOption value="deepstone">Deepstone</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="grid gap-2.5">
        <Label htmlFor="ns-small">Sort by</Label>
        <NativeSelect id="ns-small" size="sm" defaultValue="recent">
          <NativeSelectOption value="recent">Most recent</NativeSelectOption>
          <NativeSelectOption value="visits">Most visited</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  );
}
