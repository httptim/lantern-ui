import { StatusPill } from "@/registry/lantern/ui/status-pill";

export default function StatusPillDemo() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <StatusPill tone="online" />
      <StatusPill tone="offline" />
      <StatusPill tone="running" />
      <StatusPill tone="idle" />
    </div>
  );
}
