import { UsageMeter, UsageMeterGroup, UsageMeterGroupLabel } from "@/registry/lantern/ui/usage-meter";

export default function UsageMeterAllowance() {
  return (
    <UsageMeterGroup aria-label="AI allowance">
      <UsageMeterGroupLabel>AI allowance</UsageMeterGroupLabel>
      <UsageMeter size="compact" label="5-hour" value={32} />
      <UsageMeter size="compact" label="Week" value={18} />
    </UsageMeterGroup>
  );
}
