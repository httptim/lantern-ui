import { Label } from "@/registry/lantern/ui/label";
import { NativeSelect, NativeSelectOption } from "@/registry/lantern/ui/native-select";

export default function NativeSelectDemo() {
  return (
    <div className="grid w-full max-w-xs gap-2.5">
      <Label htmlFor="ns-world">World</Label>
      <NativeSelect id="ns-world" defaultValue="" className="w-full">
        <NativeSelectOption value="" disabled>
          Pick a world
        </NativeSelectOption>
        <NativeSelectOption value="overworld">Overworld</NativeSelectOption>
        <NativeSelectOption value="deepstone">Deepstone</NativeSelectOption>
        <NativeSelectOption value="skylands">Skylands</NativeSelectOption>
      </NativeSelect>
    </div>
  );
}
