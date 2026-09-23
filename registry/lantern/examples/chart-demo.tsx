"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/lantern/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/registry/lantern/ui/chart";

const data = [
  { time: "06:00", fuel: 18400 },
  { time: "08:00", fuel: 16900 },
  { time: "10:00", fuel: 14200 },
  { time: "12:00", fuel: 19600 },
  { time: "14:00", fuel: 17100 },
  { time: "16:00", fuel: 13800 },
  { time: "18:00", fuel: 11200 },
  { time: "20:00", fuel: 15400 },
];

const chartConfig = {
  fuel: { label: "Fuel", color: "var(--chart-1)" },
} satisfies ChartConfig;

export default function ChartDemo() {
  return (
    <Card className="w-full max-w-xl gap-4">
      <CardHeader>
        <CardTitle>Fuel over time</CardTitle>
        <CardDescription>Quarry-2, refueled from the coal chest at noon.</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full">
          <AreaChart data={data} margin={{ left: 0, right: 12, top: 8 }}>
            <defs>
              <linearGradient id="fillFuel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-fuel)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-fuel)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} minTickGap={16} />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              tickFormatter={(value: number) => `${value / 1000}k`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="fuel"
              type="stepAfter"
              fill="url(#fillFuel)"
              stroke="var(--color-fuel)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
