import { Label } from "@/registry/lantern/ui/label";
import { Textarea } from "@/registry/lantern/ui/textarea";

export default function TextareaStates() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <div className="grid gap-2">
        <Label htmlFor="ta-invalid">Startup script</Label>
        <Textarea id="ta-invalid" aria-invalid defaultValue={'shell.run("hub serve"'} className="font-mono text-[13px]" />
        <p className="text-xs text-destructive">Line 1: missing closing parenthesis.</p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ta-disabled">Server notes</Label>
        <Textarea id="ta-disabled" disabled defaultValue="Read only while the server is syncing." />
      </div>
    </div>
  );
}
