"use client";

import * as React from "react";

import { Badge } from "@/registry/lantern/ui/badge";
import {
  DataTable,
  DataTableColumnHeader,
  createDataTableColumnHelper,
} from "@/registry/lantern/ui/data-table";
import { Progress } from "@/registry/lantern/ui/progress";

type Turtle = {
  id: string;
  name: string;
  status: "mining" | "idle" | "returning" | "offline";
  fuel: number;
  x: number;
  y: number;
  z: number;
};

const names = [
  "Digger", "Quarry-2", "Branch", "Tunnel", "Farmhand", "Lumber", "Sifter", "Scout", "Bridge", "Cobble",
  "Strip-7", "Deepslate", "Porter", "Sorter", "Wheat", "Ferry", "Beacon", "Pit", "Ladder", "Glass",
  "Ore-9", "Drain", "Shaft", "Kelp", "Rail",
];
const statuses: Turtle["status"][] = ["mining", "idle", "returning", "mining", "offline", "mining", "idle"];

const turtles: Turtle[] = names.map((name, i) => ({
  id: `t-${String(i + 1).padStart(2, "0")}`,
  name,
  status: statuses[i % statuses.length],
  fuel: (i * 37 + 11) % 101,
  x: ((i * 73) % 400) - 200,
  y: 12 + ((i * 17) % 60),
  z: ((i * 131) % 500) - 250,
}));

const statusBadge = {
  mining: <Badge variant="success">Mining</Badge>,
  idle: <Badge variant="secondary">Idle</Badge>,
  returning: <Badge variant="warning">Returning</Badge>,
  offline: <Badge variant="outline">Offline</Badge>,
};

const helper = createDataTableColumnHelper<Turtle>();

const columns = helper.columns([
  helper.accessor("name", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Turtle" />,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{row.original.name}</span>
        <span className="font-mono text-[11px] text-muted-foreground">{row.original.id}</span>
      </div>
    ),
    meta: { title: "Turtle" },
  }),
  helper.accessor("status", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ getValue }) => statusBadge[getValue()],
    meta: { title: "Status" },
  }),
  helper.accessor("fuel", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fuel" />,
    cell: ({ getValue }) => {
      const fuel = getValue();
      return (
        <div className="flex w-28 items-center gap-2">
          <Progress
            value={fuel}
            aria-label="Fuel"
            indicatorClassName={fuel < 20 ? "bg-destructive" : undefined}
          />
          <span className="w-9 text-right font-mono text-xs tabular-nums text-muted-foreground">{fuel}%</span>
        </div>
      );
    },
    enableGlobalFilter: false,
    meta: { title: "Fuel" },
  }),
  helper.accessor((row) => `${row.x} ${row.y} ${row.z}`, {
    id: "position",
    header: "Position",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground tabular-nums">
        {row.original.x}, {row.original.y}, {row.original.z}
      </span>
    ),
    enableSorting: false,
    meta: { title: "Position" },
  }),
]);

export default function DataTableDemo() {
  const [data] = React.useState(turtles);
  return (
    <DataTable
      columns={columns}
      data={data}
      getRowId={(row) => row.id}
      selectable
      pageSize={5}
      filterPlaceholder="Filter turtles..."
    />
  );
}
