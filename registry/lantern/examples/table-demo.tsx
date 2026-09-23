import { Badge } from "@/registry/lantern/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/lantern/ui/table";

const sites = [
  { name: "turtle.farm", owner: "Mika", server: "Hearth SMP", status: "online" },
  { name: "guestbook.hub", owner: "Oren", server: "Hearth SMP", status: "online" },
  { name: "mine.logs", owner: "Juno", server: "Deepstone", status: "busy" },
  { name: "rail.map", owner: "Pip", server: "Deepstone", status: "offline" },
] as const;

const statusBadge = {
  online: <Badge variant="success">Online</Badge>,
  busy: <Badge variant="warning">Busy</Badge>,
  offline: <Badge variant="outline">Offline</Badge>,
};

export default function TableDemo() {
  return (
    <Table>
      <TableCaption>Sites listed on the Lantern directory</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Site</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Server</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sites.map((site) => (
          <TableRow key={site.name}>
            <TableCell className="font-mono text-[13px] text-primary">{site.name}</TableCell>
            <TableCell>{site.owner}</TableCell>
            <TableCell className="text-muted-foreground">{site.server}</TableCell>
            <TableCell className="text-right">{statusBadge[site.status]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
