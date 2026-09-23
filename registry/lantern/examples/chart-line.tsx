"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/lantern/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/lantern/ui/chart";

const data = [
  { hour: "00", hearth: 4, copperline: 11 },
  { hour: "03", hearth: 2, copperline: 6 },
  { hour: "06", hearth: 5, copperline: 9 },
  { hour: "09", hearth: 12, copperline: 18 },
  { hour: "12", hearth: 19, copperline: 27 },
  { hour: "15", hearth: 16, copperline: 34 },
  { hour: "18", hearth: 24, copperline: 41 },
  { hour: "21", hearth: 14, copperline: 22 },
];

const chartConfig = {
  hearth: { label: "Hearth SMP", color: "var(--chart-1)" },
  copperline: { label: "Copperline", color: "var(--chart-3)" },
} satisfies ChartConfig;

export default function ChartLine() {
  return (
    <Card className="w-full max-w-xl gap-4">
      <CardHeader>
        <CardTitle>Players online</CardTitle>
        <CardDescription>Sampled every three hours by the hub computer.</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full">
          <LineChart data={data} margin={{ left: 0, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => `${value}:00`}
            />
            <YAxis tickLine={false} axisLine={false} width={28} />
            <ChartTooltip
              cursor
              content={<ChartTooltipContent labelFormatter={(label) => `${label}:00`} />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line dataKey="hearth" type="monotone" stroke="var(--color-hearth)" strokeWidth={2} dot={false} />
            <Line
              dataKey="copperline"
              type="monotone"
              stroke="var(--color-copperline)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
