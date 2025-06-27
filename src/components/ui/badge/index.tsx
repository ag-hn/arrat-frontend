/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import {
  type Size,
  Sizes,
  makeClassName,
  getColorClassNames,
  colorPalette,
} from "@/lib/visualizations";
import React from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { badgeProportions, iconSizes } from "./styles";
import type { Color } from "@/types/colors";

const makeBadgeClassName = makeClassName("Badge");

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Color;
  size?: Size;
  icon?: React.ElementType;
  tooltip?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  return <ContentWrapper {...props} ref={ref} />;
});

Badge.displayName = "Badge";

const ContentWrapper = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tooltip, ...rest }, ref) => {
    if (!tooltip) {
      return <InternalContent ref={ref} {...rest} />;
    }

    return (
      <Tooltip>
        <TooltipContent>{tooltip}</TooltipContent>
        <TooltipTrigger asChild>
          <InternalContent ref={ref} {...rest} />
        </TooltipTrigger>
      </Tooltip>
    );
  },
);

ContentWrapper.displayName = "BadgeContentWrapper";

const InternalContent = React.forwardRef<
  HTMLSpanElement,
  Omit<BadgeProps, "tooltip">
>(
  (
    { variant, icon, size = Sizes.XS, className, children, ...other },
    ref,
  ) => {
    const Icon = icon ? icon : null;

    return (
      <span
        ref={ref}
        className={cn(
          makeBadgeClassName("root"),
          // common
          "rounded-lg inline-flex w-max shrink-0 cursor-default items-center justify-center ring-1 ring-inset",
          variant
            ? cn(
              getColorClassNames(variant, colorPalette.background).bgColor,
              getColorClassNames(variant, colorPalette.iconText).textColor,
              getColorClassNames(variant, colorPalette.iconRing).ringColor,
              // light
              "bg-opacity-10 ring-opacity-20",
              // dark
              "dark:bg-opacity-60 dark:ring-opacity-60",
            )
            : "bg-background text-foreground ring-ring/10",
          badgeProportions[size].paddingX,
          badgeProportions[size].paddingY,
          badgeProportions[size].fontSize,
          className,
        )}
        {...other}
      >
        {Icon ? (
          <Icon
            className={cn(
              makeBadgeClassName("icon"),
              "-ml-1 mr-1.5 shrink-0",
              iconSizes[size].height,
              iconSizes[size].width,
            )}
          />
        ) : null}
        <span className={cn(makeBadgeClassName("text"), "whitespace-nowrap")}>
          {children}
        </span>
      </span>
    );
  },
);
InternalContent.displayName = "BadgeInternalContent";

export { Badge, type BadgeProps };
