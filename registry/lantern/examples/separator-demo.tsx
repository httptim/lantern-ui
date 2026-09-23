import { Separator } from "@/registry/lantern/ui/separator";

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-1">
        <h4 className="font-display text-base font-medium tracking-tight">Lantern network</h4>
        <p className="text-sm text-muted-foreground">Hub sites served from in-game computers.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
        <span>Sites</span>
        <Separator orientation="vertical" />
        <span>Servers</span>
        <Separator orientation="vertical" />
        <span>Guestbook</span>
      </div>
    </div>
  );
}
