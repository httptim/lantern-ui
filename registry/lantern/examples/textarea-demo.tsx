import { Label } from "@/registry/lantern/ui/label";
import { Textarea } from "@/registry/lantern/ui/textarea";

export default function TextareaDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="ta-guestbook">Sign the guestbook</Label>
      <Textarea id="ta-guestbook" placeholder="Left a turtle mining at spawn. Say hi." />
      <p className="text-xs text-muted-foreground">Shown on the site's guestbook page.</p>
    </div>
  );
}
