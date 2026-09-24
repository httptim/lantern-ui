import { UsageMeter } from "@/registry/lantern/ui/usage-meter";

export default function UsageMeterDemo() {
  return (
    <div className="grid w-full max-w-xs gap-5">
      <UsageMeter label="5-hour window" value={32} reset="Resets at 3:40 pm" />
      <UsageMeter label="This week" value={78} reset="Resets Monday" />
      <UsageMeter label="Relay bandwidth" value={46} max={50} reset="46 of 50 GB" />
    </div>
  );
}
