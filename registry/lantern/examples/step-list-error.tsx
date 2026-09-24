import { StepList, StepListItem } from "@/registry/lantern/ui/step-list";

export default function StepListError() {
  return (
    <StepList className="w-full max-w-sm" aria-label="Deploy progress">
      <StepListItem state="done" time="0:04">
        Uploaded 6 files to north hub
      </StepListItem>
      <StepListItem state="error" time="0:09">
        <span>Reboot failed</span>
        <span className="block text-xs text-muted-foreground">startup.lua:12: attempt to index nil value</span>
      </StepListItem>
      <StepListItem>Announce on the network</StepListItem>
    </StepList>
  );
}
