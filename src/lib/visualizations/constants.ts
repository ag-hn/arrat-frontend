import type { Color } from "@/types/colors";
import type { DeltaType, HorizontalPosition, Size, VerticalPosition } from "./input-types";

export const DeltaTypes = {
  Increase: "increase",
  ModerateIncrease: "moderateIncrease",
  Decrease: "decrease",
  ModerateDecrease: "moderateDecrease",
  Unchanged: "unchanged",
} as const satisfies Record<string, DeltaType>;

export const BaseColors = {
  Slate: "slate",
  Gray: "gray",
  Zinc: "zinc",
  Neutral: "neutral",
  Stone: "stone",
  Red: "red",
  Orange: "orange",
  Amber: "amber",
  Yellow: "yellow",
  Lime: "lime",
  Green: "green",
  Emerald: "emerald",
  Teal: "teal",
  Cyan: "cyan",
  Sky: "sky",
  Blue: "blue",
  Indigo: "indigo",
  Violet: "violet",
  Fuchsia: "fuchsia",
  Pink: "pink",
  Rose: "rose",
} as const satisfies Record<string, Color>;

export const Sizes = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
} as const satisfies Record<string, Size>;

export const HorizontalPositions: Record<string, HorizontalPosition> = {
  Left: "left",
  Right: "right",
};

export const VerticalPositions: Record<string, VerticalPosition> = {
  Top: "top",
  Bottom: "bottom",
};