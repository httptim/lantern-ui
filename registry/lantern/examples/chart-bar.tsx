"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  { day: "Mon", stone: 1840, ore: 212 },
  { day: "Tue", stone: 2210, ore: 264 },
  { day: "Wed", stone: 1560, ore: 180 },
  { day: "Thu", stone: 2480, ore: 331 },
  { day: "Fri", stone: 1990, ore: 247 },
  { day: "Sat", stone: 2760, ore: 402 },
  { day: "Sun", stone: 1230, ore: 138 },
];

const chartConfig = {
  stone: { label: "Stone", color: "var(--chart-2)" },
  ore: { label: "Ore", color: "var(--chart-1)" },
} satisfies ChartConfig;

export default function ChartBar() {
  return (
    <Card className="w-full max-w-xl gap-4">
      <CardHeader>
        <CardTitle>Blocks mined per day</CardTitle>
        <CardDescription>All turtles on Deepstone, last seven days.</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[240px] w-full">
          <BarChart data={data} margin={{ left: 8, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="stone" fill="var(--color-stone)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="ore" fill="var(--color-ore)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
