"use client";

import * as React from "react";

import {
  DataTable,
  DataTableColumnHeader,
  createDataTableColumnHelper,
} from "@/registry/lantern/ui/data-table";

type Server = { name: string; players: number; uptime: number };

const servers: Server[] = [
  { name: "Hearth SMP", players: 24, uptime: 99.2 },
  { name: "Deepstone", players: 9, uptime: 97.8 },
  { name: "Copperline", players: 41, uptime: 99.9 },
  { name: "Mossgate", players: 3, uptime: 88.4 },
  { name: "Lanternfall", players: 17, uptime: 98.6 },
];

const helper = createDataTableColumnHelper<Server>();

const columns = helper.columns([
  helper.accessor("name", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Server" />,
    cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
    enableHiding: false,
  }),
  helper.accessor("players", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Players" />,
    cell: ({ getValue }) => <span className="font-mono tabular-nums">{getValue()}</span>,
    enableHiding: false,
  }),
  helper.accessor("uptime", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Uptime" />,
    cell: ({ getValue }) => <span className="font-mono text-muted-foreground tabular-nums">{getValue()}%</span>,
    enableHiding: false,
  }),
]);

export default function DataTableMinimal() {
  const [data] = React.useState(servers);
  return <DataTable columns={columns} data={data} filterable={false} columnToggle={false} pagination={false} />;
}
