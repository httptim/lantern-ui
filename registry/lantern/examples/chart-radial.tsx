"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/lantern/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/registry/lantern/ui/chart";

const data = [
  { server: "copperline", uptime: 99, fill: "var(--color-copperline)" },
  { server: "hearth", uptime: 94, fill: "var(--color-hearth)" },
  { server: "deepstone", uptime: 81, fill: "var(--color-deepstone)" },
  { server: "mossgate", uptime: 62, fill: "var(--color-mossgate)" },
];

const chartConfig = {
  uptime: { label: "Uptime %" },
  copperline: { label: "Copperline", color: "var(--chart-2)" },
  hearth: { label: "Hearth SMP", color: "var(--chart-1)" },
  deepstone: { label: "Deepstone", color: "var(--chart-3)" },
  mossgate: { label: "Mossgate", color: "var(--chart-5)" },
} satisfies ChartConfig;

export default function ChartRadial() {
  return (
    <Card className="w-full max-w-sm gap-2">
      <CardHeader>
        <CardTitle>Server uptime</CardTitle>
        <CardDescription>Share of the last 30 days each hub answered pings.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[260px]">
          <RadialBarChart data={data} innerRadius="28%" outerRadius="100%" startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
            <ChartTooltip cursor={false} shared={false} content={<ChartTooltipContent nameKey="server" hideLabel />} />
            <RadialBar dataKey="uptime" background cornerRadius={2} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
