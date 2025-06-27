import {
  BaseColors,
  type DeltaType,
  DeltaTypes,
  colorPalette,
  getColorClassNames,
} from "@/lib/visualizations";
import type React from "react";
import { Icons } from "../../icons/icons";

export type BadgeProportionTypes = {
  paddingX: string;
  paddingY: string;
  fontSize: string;
};

export const badgeProportionsIconOnly: Record<string, BadgeProportionTypes> = {
  xs: {
    paddingX: "px-2",
    paddingY: "py-0.5",
    fontSize: "text-xs",
  },
  sm: {
    paddingX: "px-2.5",
    paddingY: "py-1",
    fontSize: "text-sm",
  },
  md: {
    paddingX: "px-3",
    paddingY: "py-1.5",
    fontSize: "text-md",
  },
  lg: {
    paddingX: "px-3.5",
    paddingY: "py-1.5",
    fontSize: "text-lg",
  },
  xl: {
    paddingX: "px-3.5",
    paddingY: "py-1.5",
    fontSize: "text-xl",
  },
};

export const badgeProportionsWithText: Record<string, BadgeProportionTypes> = {
  xs: {
    paddingX: "px-2",
    paddingY: "py-0.5",
    fontSize: "text-fluid-xs",
  },
  sm: {
    paddingX: "px-2.5",
    paddingY: "py-0.5",
    fontSize: "text-fluid-sm",
  },
  md: {
    paddingX: "px-3",
    paddingY: "py-0.5",
    fontSize: "text-fluid-base",
  },
  lg: {
    paddingX: "px-3.5",
    paddingY: "py-0.5",
    fontSize: "text-fluid-lg",
  },
  xl: {
    paddingX: "px-4",
    paddingY: "py-1",
    fontSize: "text-fluid-xl",
  },
};

export const iconSizes = {
  xs: {
    height: "h-4",
    width: "w-4",
  },
  sm: {
    height: "h-4",
    width: "w-4",
  },
  md: {
    height: "h-4",
    width: "w-4",
  },
  lg: {
    height: "h-5",
    width: "w-5",
  },
  xl: {
    height: "h-6",
    width: "w-6",
  },
} as const satisfies Record<
  string,
  {
    height: string;
    width: string;
  }
>;

export type ColorTypes = {
  bgColor: string;
  textColor: string;
  ringColor: string;
};

export const colors = {
  [DeltaTypes.Increase]: {
    bgColor: getColorClassNames(BaseColors.Emerald, colorPalette.background)
      .bgColor,
    textColor: getColorClassNames(BaseColors.Emerald, colorPalette.iconText)
      .textColor,
    ringColor: getColorClassNames(BaseColors.Emerald, colorPalette.iconRing)
      .ringColor,
  },
  [DeltaTypes.ModerateIncrease]: {
    bgColor: getColorClassNames(BaseColors.Emerald, colorPalette.background)
      .bgColor,
    textColor: getColorClassNames(BaseColors.Emerald, colorPalette.iconText)
      .textColor,
    ringColor: getColorClassNames(BaseColors.Emerald, colorPalette.iconRing)
      .ringColor,
  },
  [DeltaTypes.Decrease]: {
    bgColor: getColorClassNames(BaseColors.Red, colorPalette.background)
      .bgColor,
    textColor: getColorClassNames(BaseColors.Red, colorPalette.iconText)
      .textColor,
    ringColor: getColorClassNames(BaseColors.Red, colorPalette.iconRing)
      .ringColor,
  },
  [DeltaTypes.ModerateDecrease]: {
    bgColor: getColorClassNames(BaseColors.Red, colorPalette.background)
      .bgColor,
    textColor: getColorClassNames(BaseColors.Red, colorPalette.iconText)
      .textColor,
    ringColor: getColorClassNames(BaseColors.Red, colorPalette.iconRing)
      .ringColor,
  },
  [DeltaTypes.Unchanged]: {
    bgColor: getColorClassNames(BaseColors.Orange, colorPalette.background)
      .bgColor,
    textColor: getColorClassNames(BaseColors.Orange, colorPalette.iconText)
      .textColor,
    ringColor: getColorClassNames(BaseColors.Orange, colorPalette.iconRing)
      .ringColor,
  },
} as const satisfies Record<DeltaType, ColorTypes>;

export const deltaIcons = {
  [DeltaTypes.Increase]: Icons.delta.increase,
  [DeltaTypes.ModerateIncrease]: Icons.delta.moderateIncrease,
  [DeltaTypes.Decrease]: Icons.delta.decrease,
  [DeltaTypes.ModerateDecrease]: Icons.delta.moderateDecrease,
  [DeltaTypes.Unchanged]: Icons.delta.unchanged,
} as const satisfies Record<string, React.ElementType>;
