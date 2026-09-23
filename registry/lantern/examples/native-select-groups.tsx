import { Label } from "@/registry/lantern/ui/label";
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/registry/lantern/ui/native-select";

export default function NativeSelectGroups() {
  return (
    <div className="grid w-full max-w-xs gap-2.5">
      <Label htmlFor="ns-computer">Computer</Label>
      <NativeSelect id="ns-computer" defaultValue="turtle-03">
        <NativeSelectOptGroup label="Turtles">
          <NativeSelectOption value="turtle-01">Turtle T-01</NativeSelectOption>
          <NativeSelectOption value="turtle-02">Turtle T-02</NativeSelectOption>
          <NativeSelectOption value="turtle-03">Turtle T-03</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Terminals">
          <NativeSelectOption value="hub">Hub terminal</NativeSelectOption>
          <NativeSelectOption value="farm">Farm monitor</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  );
}
