import { StatusDot } from "@/registry/lantern/ui/status-dot";

export default function StatusDotDemo() {
  return (
    <div className="grid gap-3 font-mono text-[11px] tracking-[0.15em] uppercase">
      <span className="flex items-center gap-2.5 text-success">
        <StatusDot tone="online" /> Online
      </span>
      <span className="flex items-center gap-2.5 text-primary">
        <StatusDot tone="busy" /> Running
      </span>
      <span className="flex items-center gap-2.5 text-destructive">
        <StatusDot tone="error" pulse={false} /> Error
      </span>
      <span className="flex items-center gap-2.5 text-muted-foreground">
        <StatusDot tone="offline" pulse={false} /> Offline
      </span>
    </div>
  );
}
