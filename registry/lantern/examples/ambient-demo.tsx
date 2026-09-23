import { Ambient } from "@/registry/lantern/ui/ambient";
import { Button } from "@/registry/lantern/ui/button";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";

export default function AmbientDemo() {
  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border bg-background px-6 py-14 sm:px-10">
      <Ambient position="top-right" intensity="strong" className="h-[420px] w-[420px]" />
      <div className="relative">
        <Eyebrow>Hub network</Eyebrow>
        <h2 className="mt-4 font-display text-4xl leading-[1.06] font-medium tracking-[-0.05em] sm:text-5xl">
          A small world, <em className="text-primary not-italic">lit up.</em>
        </h2>
        <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
          Publish a site from any in-game computer and it shows up in the directory.
        </p>
        <Button className="mt-6">Open the directory</Button>
      </div>
    </div>
  );
}
