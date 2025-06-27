/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import {
  type DeltaType,
  DeltaTypes,
  type Size,
  Sizes,
  makeClassName,
  mapInputsToDeltaType,
} from "@/lib/visualizations";
import React from "react";
import {
  badgeProportionsIconOnly,
  badgeProportionsWithText,
  colors,
  deltaIcons,
  iconSizes,
} from "./styles";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";

const makeBadgeDeltaClassName = makeClassName("BadgeDelta");

interface BadgeDeltaProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: DeltaType;
  isIncreasePositive?: boolean;
  size?: Size;
  tooltip?: string;
}

const BadgeDelta = React.forwardRef<HTMLSpanElement, BadgeDeltaProps>(
  (props, ref) => {
    return <ContentWrapper {...props} ref={ref} />;
  },
);

BadgeDelta.displayName = "BadgeDelta";

const ContentWrapper = React.forwardRef<HTMLSpanElement, BadgeDeltaProps>(
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

ContentWrapper.displayName = "BadgeDeltaContentWrapper";

const InternalContent = React.forwardRef<
  HTMLSpanElement,
  Omit<BadgeDeltaProps, "tooltip">
>(
  (
    {
      variant = DeltaTypes.Increase,
      isIncreasePositive = true,
      size = Sizes.SM,
      children,
      className,
      ...other
    },
    ref,
  ) => {
    const Icon = deltaIcons[variant];
    const mappedDeltaType = mapInputsToDeltaType(variant, isIncreasePositive);
    const badgeProportions = children
      ? badgeProportionsWithText
      : badgeProportionsIconOnly;

    return (
      <span
        ref={ref}
        className={cn(
          makeBadgeDeltaClassName("root"),
          // common
          "inline-flex w-max shrink-0 cursor-default items-center justify-center rounded-lg ring-1 ring-inset",
          colors[mappedDeltaType]?.bgColor,
          colors[mappedDeltaType]?.textColor,
          colors[mappedDeltaType]?.ringColor,
          badgeProportions[size]?.paddingX,
          badgeProportions[size]?.paddingY,
          badgeProportions[size]?.fontSize,
          // light
          "bg-opacity-10 ring-opacity-20",
          // dark
          "dark:bg-opacity-5 dark:ring-opacity-60",
          className,
        )}
        {...other}
      >
        <Icon
          className={cn(
            makeBadgeDeltaClassName("icon"),
            "shrink-0",
            children ? cn("-ml-1 mr-1.5") : iconSizes[size].height,
            iconSizes[size].width,
          )}
        />
        {children ? (
          <span
            className={cn(makeBadgeDeltaClassName("text"), "whitespace-nowrap")}
          >
            {children}
          </span>
        ) : null}
      </span>
    );
  },
);
InternalContent.displayName = "BadgeDeltaInternalContent";

export { BadgeDelta, type BadgeDeltaProps };
