import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import { StatusDot } from "@/registry/lantern/ui/status-dot";

export default function EyebrowDemo() {
  return (
    <div className="max-w-md">
      <Eyebrow>
        <StatusDot /> The internet, a little more blocky
      </Eyebrow>
      <h2 className="mt-4 text-4xl leading-[1.08] font-medium tracking-[-0.06em]">
        Small computers.
        <br />
        Entire <span className="text-primary">worlds.</span>
      </h2>
    </div>
  );
}
