import { StepList, StepListItem } from "@/registry/lantern/ui/step-list";

export default function StepListDemo() {
  return (
    <StepList className="w-full max-w-sm" aria-label="Build progress">
      <StepListItem state="done" time="0:21">
        Planned 3 pages and an app
      </StepListItem>
      <StepListItem state="done" time="0:48">
        Wrote index.json, about.json
      </StepListItem>
      <StepListItem state="done" time="1:12">
        Wrote app.lua
      </StepListItem>
      <StepListItem state="current" time="1:19">
        Testing requests 3 of 5
      </StepListItem>
      <StepListItem>Preview and publish</StepListItem>
    </StepList>
  );
}
