import { Badge } from "@/registry/lantern/ui/badge";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>New</Badge>
      <Badge variant="outline">Hub</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="success">Online</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Offline</Badge>
    </div>
  );
}
