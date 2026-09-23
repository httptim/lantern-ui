import { Ambient } from "@/registry/lantern/ui/ambient";

const panels = [
  { position: "top-left", tone: "olive", intensity: "strong" },
  { position: "center", tone: "amber", intensity: "default" },
  { position: "bottom-right", tone: "amber", intensity: "strong" },
] as const;

export default function AmbientPositions() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
      {panels.map((p) => (
        <div key={p.position} className="relative h-44 overflow-hidden rounded-lg border bg-background p-4">
          <Ambient position={p.position} tone={p.tone} intensity={p.intensity} className="size-52" />
          <div className="relative font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            {p.position}
            <br />
            {p.tone} / {p.intensity}
          </div>
        </div>
      ))}
    </div>
  );
}
