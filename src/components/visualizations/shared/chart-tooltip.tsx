/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import React from "react";
import {
  BaseColors,
  getColorClassNames,
  type ValueFormatter,
  colorPalette,
} from "@/lib/visualizations";
import { cn } from "@/lib/utils";
import { type Color } from "@/types/colors";

export const ChartTooltipFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    className={"rounded-md text-default border bg-background shadow-md border-border"}
  >
    {children}
  </div>
);

export interface ChartTooltipRowProps {
  value: string;
  name: string;
  color: Color | string;
}

export const ChartTooltipRow = ({ value, name, color }: ChartTooltipRowProps) => (
  <div className="flex items-center justify-between space-x-8">
    <div className="flex items-center space-x-2">
      <span
        className={cn(
          // common
          "shrink-0 rounded-full border-2 h-3 w-3",
          "border-background shadow-card",
          getColorClassNames(color, colorPalette.background).bgColor,
        )}
      />
      <p
        className={cn(
          // commmon
          "text-right whitespace-nowrap",
          "text-foreground",
        )}
      >
        {name}
      </p>
    </div>
    <p
      className={cn(
        // common
        "font-medium tabular-nums text-right whitespace-nowrap",
        "text-accent-foreground",
      )}
    >
      {value}
    </p>
  </div>
);

export interface ChartTooltipProps {
  active: boolean | undefined;
  payload: any;
  label: string;
  categoryColors: Map<string, Color | string>;
  valueFormatter: ValueFormatter;
}

const ChartTooltip = ({
  active,
  payload,
  label,
  categoryColors,
  valueFormatter,
}: ChartTooltipProps) => {
  if (active && payload) {
    const filteredPayload = payload.filter((item: any) => item.type !== "none");

    return (
      <ChartTooltipFrame>
        <div
          className={"border-border border-b px-4 py-2"}
        >
          <p
            className={cn(
              // common
              "font-medium",
              "text-accent-foreground",
            )}
          >
            {label}
          </p>
        </div>

        <div className={cn("px-4 py-2 space-y-1")}>
          {filteredPayload.map(({ value, name }: { value: number; name: string }, idx: number) => (
            <ChartTooltipRow
              key={`id-${idx}`}
              value={valueFormatter(value)}
              name={name}
              color={categoryColors.get(name) ?? BaseColors.Blue}
            />
          ))}
        </div>
      </ChartTooltipFrame>
    );
  }
  return null;
};

export default ChartTooltip;