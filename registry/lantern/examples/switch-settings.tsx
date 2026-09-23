import { Label } from "@/registry/lantern/ui/label";
import { Switch } from "@/registry/lantern/ui/switch";

const settings = [
  { id: "sync", title: "Sync on boot", description: "Push local changes when the computer starts.", on: true },
  { id: "guestbook", title: "Open guestbook", description: "Let visitors leave a message on your site.", on: true },
  { id: "listed", title: "Directory listing", description: "Show the site on the Hub front page.", on: false },
  { id: "alerts", title: "Offline alerts", description: "Ping your chat box when the host goes down.", on: false },
];

export default function SwitchSettings() {
  return (
    <div className="w-full max-w-md divide-y rounded-lg border bg-card">
      {settings.map((s) => (
        <div key={s.id} className="flex items-center justify-between gap-4 p-4">
          <div className="grid gap-1">
            <Label htmlFor={`set-${s.id}`}>{s.title}</Label>
            <p id={`set-${s.id}-desc`} className="text-[13px] text-muted-foreground">
              {s.description}
            </p>
          </div>
          <Switch id={`set-${s.id}`} defaultChecked={s.on} aria-describedby={`set-${s.id}-desc`} />
        </div>
      ))}
    </div>
  );
}
