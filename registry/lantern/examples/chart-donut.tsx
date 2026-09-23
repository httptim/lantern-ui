"use client";

import { Label, Pie, PieChart } from "recharts";

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
  { job: "mining", turtles: 11, fill: "var(--color-mining)" },
  { job: "farming", turtles: 6, fill: "var(--color-farming)" },
  { job: "building", turtles: 4, fill: "var(--color-building)" },
  { job: "idle", turtles: 3, fill: "var(--color-idle)" },
];

const chartConfig = {
  turtles: { label: "Turtles" },
  mining: { label: "Mining", color: "var(--chart-1)" },
  farming: { label: "Farming", color: "var(--chart-2)" },
  building: { label: "Building", color: "var(--chart-3)" },
  idle: { label: "Idle", color: "var(--chart-4)" },
} satisfies ChartConfig;

const total = data.reduce((sum, item) => sum + item.turtles, 0);

export default function ChartDonut() {
  return (
    <Card className="w-full max-w-sm gap-2">
      <CardHeader>
        <CardTitle>Fleet by job</CardTitle>
        <CardDescription>What each turtle is running right now.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[280px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="job" hideLabel />} />
            <Pie
              data={data}
              dataKey="turtles"
              nameKey="job"
              innerRadius="58%"
              outerRadius="80%"
              paddingAngle={2}
              stroke="var(--card)"
              strokeWidth={2}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox)) return null;
                  const { cx, cy } = viewBox;
                  return (
                    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan
                        x={cx}
                        y={(cy ?? 0) - 6}
                        className="fill-foreground font-display text-3xl font-medium tracking-tight"
                      >
                        {total}
                      </tspan>
                      <tspan x={cx} y={(cy ?? 0) + 18} className="fill-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase">
                        Turtles
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="job" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
