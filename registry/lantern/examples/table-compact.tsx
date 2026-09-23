import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/lantern/ui/table";

const turtles = [
  { id: "T-01", job: "Strip mine", blocks: 4120, fuel: 812 },
  { id: "T-02", job: "Tree farm", blocks: 1386, fuel: 240 },
  { id: "T-03", job: "Wheat harvest", blocks: 962, fuel: 95 },
  { id: "T-04", job: "Tunnel", blocks: 2048, fuel: 1530 },
];

const total = turtles.reduce((sum, t) => sum + t.blocks, 0);

export default function TableCompact() {
  return (
    <Table className="text-[13px]">
      <TableHeader>
        <TableRow>
          <TableHead className="h-8 px-2">Turtle</TableHead>
          <TableHead className="h-8 px-2">Job</TableHead>
          <TableHead className="h-8 px-2 text-right">Blocks</TableHead>
          <TableHead className="h-8 px-2 text-right">Fuel</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {turtles.map((t) => (
          <TableRow key={t.id}>
            <TableCell className="px-2 py-1.5 font-mono">{t.id}</TableCell>
            <TableCell className="px-2 py-1.5">{t.job}</TableCell>
            <TableCell className="px-2 py-1.5 text-right font-mono tabular-nums">{t.blocks.toLocaleString("en-US")}</TableCell>
            <TableCell className="px-2 py-1.5 text-right font-mono tabular-nums text-muted-foreground">{t.fuel}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2} className="px-2 py-2 font-mono text-[10px] tracking-[0.2em] uppercase">
            Total
          </TableCell>
          <TableCell className="px-2 py-2 text-right font-mono text-primary tabular-nums">{total.toLocaleString("en-US")}</TableCell>
          <TableCell className="px-2 py-2" />
        </TableRow>
      </TableFooter>
    </Table>
  );
}
