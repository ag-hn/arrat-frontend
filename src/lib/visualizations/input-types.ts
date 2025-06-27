import { colorsConfig } from "@/config/colors";
import type { Color } from "@/types/colors";

/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
export type ValueFormatter = (value: number) => string;

export type CurveType = "linear" | "natural" | "monotone" | "step";

export type Interval = "preserveStartEnd" | "equidistantPreserveStart";

export type IntervalType = "preserveStartEnd" | Interval;

export const iconVariantValues = ["simple", "light", "shadow", "solid", "outlined"] as const;

export type IconVariant = (typeof iconVariantValues)[number];

export type HorizontalPosition = "left" | "right";

export type VerticalPosition = "top" | "bottom";

export type ButtonVariant = "primary" | "secondary" | "light";

export const deltaTypeValues = [
  "increase",
  "moderateIncrease",
  "decrease",
  "moderateDecrease",
  "unchanged",
] as const;

export type DeltaType = (typeof deltaTypeValues)[number];

export const sizeValues = ["xs", "sm", "md", "lg", "xl"] as const;

export type Size = (typeof sizeValues)[number];

export type CustomColor = Color | string;
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
export const getIsBaseColor = (color: Color | string) => colorsConfig.chart.themeColorRange.includes(color as any);

export const justifyContentValues = ["start", "end", "center", "between", "around", "evenly"] as const;
export type JustifyContent = (typeof justifyContentValues)[number];

export const alignItemsValues = ["start", "end", "center", "baseline", "stretch"] as const;
export type AlignItems = (typeof alignItemsValues)[number];

export type FlexDirection = "row" | "col" | "row-reverse" | "col-reverse";