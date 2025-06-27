import { type Link as NextLink } from '../next-view-transitions'
import React, { Suspense } from 'react'
import { type IconProps, type IconRefProps } from '@/components/primitives/button'
import { Slottable } from '@radix-ui/react-slot';
import { NavigationLinkClient, type NavigationLinkProps } from './navigation.link-client';

export type NavigationLinkIconProps = IconProps | IconRefProps;

export const NavigationLink = React.forwardRef<
  React.ComponentRef<typeof NextLink>,
  NavigationLinkProps & NavigationLinkIconProps
>(
  (
    {
      variant = "ghost",
      size = "md",
      Icon,
      iconPlacement,
      children,
      ...props
    },
    ref
  ) => {

    return (
      <Suspense>
        <NavigationLinkClient
          ref={ref}
          variant={variant}
          size={size}
          {...props}
        >
          {Icon && iconPlacement === "left" && (
            <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-100 group-hover:pr-2 group-hover:opacity-100">
              <Icon />
            </div>
          )}
          <Slottable>{children}</Slottable>
          {Icon && iconPlacement === "right" && (
            <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
              <Icon />
            </div>
          )}
        </NavigationLinkClient>
      </Suspense>
    )
  });
NavigationLink.displayName = "NavigationLink";

