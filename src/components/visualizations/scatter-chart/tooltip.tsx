/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { type Color } from "@/types/colors";
import { type ScatterChartValueFormatter } from "./chart";
import { cn } from "@/lib/utils";
import { BaseColors, colorPalette, defaultValueFormatter, getColorClassNames } from "@/lib/visualizations";
import { ChartTooltipFrame, ChartTooltipRow } from "../shared/chart-tooltip";

export interface ScatterChartTooltipProps {
  label: string;
  categoryColors: Map<string, Color | string>;
  active: boolean | undefined;
  payload: any;
  valueFormatter: ScatterChartValueFormatter;
  axis: any;
  category?: string;
}

export const ScatterChartTooltip = ({
  label,
  active,
  payload,
  valueFormatter,
  axis,
  category,
  categoryColors,
}: ScatterChartTooltipProps) => {
  if (active && payload) {
    return (
      <ChartTooltipFrame>
        <div
          className={"flex items-center space-x-2 border-b px-4 py-2 border-border"}
        >
          <span
            className={cn(
              // common
              "shrink-0 rounded-full border-2 h-3 w-3",
              "border-background shadow-card",
              getColorClassNames(
                category
                  ? categoryColors.get(payload?.[0]?.payload[category]) ?? BaseColors.Blue
                  : BaseColors.Blue,
                colorPalette.background,
              ).bgColor,
            )}
          />
          <p
            className={"font-medium text-accent-foreground"}
          >
            {label}
          </p>
        </div>

        <div className={cn("px-4 py-2 space-y-1")}>
          {payload.map(({ value, name }: { value: number; name: string }, idx: number) => {
            const valueFormatterKey = Object.keys(axis).find((key) => axis[key] === name) ?? "";
            const valueFormatterFn =
              valueFormatter[valueFormatterKey as keyof ScatterChartValueFormatter] ??
              defaultValueFormatter;
            return (
              <ChartTooltipRow
                color="gray"
                key={`id-${idx}`}
                value={valueFormatter && valueFormatterFn ? valueFormatterFn(value) : `${value}`}
                name={name}
              />
            );
          })}
        </div>
      </ChartTooltipFrame>
    );
  }
  return null;
};
