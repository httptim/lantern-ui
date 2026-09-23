"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

const DEFAULT_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

/** Maps each series key to a label, an optional icon and a color. Colors default to var(--chart-1..5). */
type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  }
>;

type ChartContextProps = { config: ChartConfig };

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = { width: 320, height: 200 },
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  initialDimension?: { width: number; height: number };
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center font-mono text-[10px] tracking-wider",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-axis-line]:stroke-border",
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/70 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-input",
          "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted",
          "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-secondary/60 [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border",
          "[&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-sector[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer initialDimension={initialDimension}>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

/** Writes a --color-<key> variable for every series so charts can use fill="var(--color-fuel)". */
function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const entries = Object.entries(config);
  if (!entries.length) return null;
  const vars = entries
    .map(([key, item], index) => {
      const color = item.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
      return `  --color-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}: ${color};`;
    })
    .join("\n");
  return <style dangerouslySetInnerHTML={{ __html: `[data-chart=${id}] {\n${vars}\n}` }} />;
}

const ChartTooltip = RechartsPrimitive.Tooltip;

type TooltipPayload = ReadonlyArray<RechartsPrimitive.TooltipPayloadEntry>;

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: Omit<React.ComponentProps<"div">, "children"> &
  Pick<
    Partial<RechartsPrimitive.TooltipContentProps<RechartsPrimitive.TooltipValueType, string | number>>,
    "active" | "payload" | "label" | "labelFormatter" | "formatter"
  > & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    labelClassName?: string;
    nameKey?: string;
    labelKey?: string;
    color?: string;
  }) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? (config[label]?.label ?? label) : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase", labelClassName)}>
          {labelFormatter(value, payload as TooltipPayload)}
        </div>
      );
    }
    if (!value) return null;
    return (
      <div className={cn("font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase", labelClassName)}>
        {value}
      </div>
    );
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) return null;

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      data-slot="chart-tooltip"
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-md border bg-popover px-3 py-2 font-sans text-xs text-popover-foreground normal-case shadow-block-sm tracking-normal",
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload?.fill || item.color;

            return (
              <div
                key={`${item.dataKey ?? index}`}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, payload as TooltipPayload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", {
                            "size-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          })}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between gap-4 leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                      </div>
                      {item.value !== undefined && (
                        <span className="font-mono font-medium text-foreground tabular-nums">
                          {typeof item.value === "number" ? item.value.toLocaleString() : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

/** Recharts Legend that keeps series in the order they are drawn instead of sorting by name. */
function ChartLegend({ itemSorter = null, ...props }: React.ComponentProps<typeof RechartsPrimitive.Legend>) {
  return <RechartsPrimitive.Legend itemSorter={itemSorter} {...props} />;
}

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  payload?: ReadonlyArray<RechartsPrimitive.LegendPayload>;
  verticalAlign?: "top" | "bottom" | "middle";
  hideIcon?: boolean;
  nameKey?: string;
}) {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div
      data-slot="chart-legend"
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          return (
            <div
              key={String(item.value ?? key)}
              className="flex items-center gap-1.5 [&>svg]:size-3 [&>svg]:text-muted-foreground"
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div className="size-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />
              )}
              {itemConfig?.label ?? item.value}
            </div>
          );
        })}
    </div>
  );
}

/** Finds the config entry for a tooltip or legend item, checking the item and its data row for the key. */
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) return undefined;

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? (payload.payload as Record<string, unknown>)
      : undefined;
  const record = payload as Record<string, unknown>;

  let configLabelKey: string = key;
  if (typeof record[key] === "string") {
    configLabelKey = record[key] as string;
  } else if (payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle, useChart, type ChartConfig };
