import { Input } from "@/registry/lantern/ui/input";
import { Label } from "@/registry/lantern/ui/label";

export default function InputTypes() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <div className="grid gap-2">
        <Label htmlFor="in-email">Email</Label>
        <Input id="in-email" type="email" placeholder="you@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="in-pass">Password</Label>
        <Input id="in-pass" type="password" defaultValue="lantern" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="in-file">Site bundle</Label>
        <Input id="in-file" type="file" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="in-invalid">Site name</Label>
        <Input id="in-invalid" aria-invalid defaultValue="my site!" />
        <p className="text-xs text-destructive">Use lowercase letters, numbers and dashes.</p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="in-disabled">Computer ID</Label>
        <Input id="in-disabled" disabled defaultValue="81" />
      </div>
    </div>
  );
}
