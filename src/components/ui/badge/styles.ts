export type BadgeProportionTypes = {
  paddingX: string;
  paddingY: string;
  fontSize: string;
};

export const badgeProportions = {
  xs: {
    paddingX: "px-2.5",
    paddingY: "py-0.5",
    fontSize: "text-xs",
  },
  sm: {
    paddingX: "px-3",
    paddingY: "py-0.5",
    fontSize: "text-sm",
  },
  md: {
    paddingX: "px-3.5",
    paddingY: "py-0.5",
    fontSize: "text-base",
  },
  lg: {
    paddingX: "px-4",
    paddingY: "py-1",
    fontSize: "text-lg",
  },
  xl: {
    paddingX: "px-5",
    paddingY: "py-2",
    fontSize: "text-xl",
  },
} as const satisfies Record<string, BadgeProportionTypes>;

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
} as const satisfies Record<string, {
    height: string;
    width: string;
  }>;