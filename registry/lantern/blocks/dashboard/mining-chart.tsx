"use client";

import * as React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/lantern/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/lantern/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/registry/lantern/ui/tabs";

const data = [
  { day: "Mon", stone: 9200, ore: 1400 },
  { day: "Tue", stone: 11800, ore: 1900 },
  { day: "Wed", stone: 10400, ore: 1250 },
  { day: "Thu", stone: 13900, ore: 2300 },
  { day: "Fri", stone: 12600, ore: 2050 },
  { day: "Sat", stone: 15960, ore: 2600 },
  { day: "Sun", stone: 18204, ore: 3100 },
];

const chartConfig = {
  stone: { label: "Stone", color: "var(--chart-1)" },
  ore: { label: "Ore", color: "var(--chart-2)" },
} satisfies ChartConfig;

const formatK = (value: number) => (value >= 1000 ? `${value / 1000}k` : String(value));

export function MiningChart() {
  const [view, setView] = React.useState("area");

  return (
    <Card className="min-w-0 gap-4">
      <CardHeader>
        <CardTitle>Blocks mined</CardTitle>
        <CardDescription>All turtles, last 7 days.</CardDescription>
        <CardAction>
          <Tabs value={view} onValueChange={setView} variant="boxed">
            <TabsList aria-label="Chart type">
              <TabsTrigger value="area">Area</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[240px] w-full">
          {view === "area" ? (
            <AreaChart data={data} margin={{ left: 0, right: 12, top: 8 }}>
              <defs>
                <linearGradient id="dash-fill-stone" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-stone)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--color-stone)" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="dash-fill-ore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-ore)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--color-ore)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} width={36} tickFormatter={formatK} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Area dataKey="stone" type="monotone" fill="url(#dash-fill-stone)" stroke="var(--color-stone)" strokeWidth={2} />
              <Area dataKey="ore" type="monotone" fill="url(#dash-fill-ore)" stroke="var(--color-ore)" strokeWidth={2} />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ left: 0, right: 12, top: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} width={36} tickFormatter={formatK} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="stone" fill="var(--color-stone)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="ore" fill="var(--color-ore)" radius={[2, 2, 0, 0]} />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
