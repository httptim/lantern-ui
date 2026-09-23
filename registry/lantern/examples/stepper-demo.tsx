import { Stepper, StepperDescription, StepperItem, StepperTitle } from "@/registry/lantern/ui/stepper";

export default function StepperDemo() {
  return (
    <Stepper className="w-full max-w-md">
      <StepperItem state="complete">
        <StepperTitle>Place a computer</StepperTitle>
        <StepperDescription>Any advanced computer with a wired or wireless modem attached.</StepperDescription>
      </StepperItem>
      <StepperItem state="current">
        <StepperTitle>Run the installer</StepperTitle>
        <StepperDescription>
          Type <code className="rounded-sm bg-secondary px-1 py-0.5 font-mono text-[12px] text-foreground">pastebin run Xk2p9</code> at the shell.
        </StepperDescription>
      </StepperItem>
      <StepperItem>
        <StepperTitle>Claim a hub address</StepperTitle>
        <StepperDescription>Pick a name so other players can find your site.</StepperDescription>
      </StepperItem>
      <StepperItem>
        <StepperTitle>Publish</StepperTitle>
        <StepperDescription>Edit index.lua and reboot to go live.</StepperDescription>
      </StepperItem>
    </Stepper>
  );
}
