"use client"
import { Link as NextLink } from '../next-view-transitions'
import React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { buttonVariants } from '@/components/primitives/button.variants'
import { cn } from '@/lib/utils';
import { focusInput } from '@/lib/styles';
import { Slottable } from '@radix-ui/react-slot';
import { useSearchParams } from 'next/navigation'
import { type Url } from 'next/dist/shared/lib/router/router'

interface INTERNAL__NavigationLinkProps
  extends Omit<React.ComponentProps<typeof NextLink>, "href">,
  VariantProps<typeof buttonVariants> {
}

interface INTERNAL__WithHref {
  href: Url,
  preserveQueryParams?: undefined
}

interface INTERNAL__WithCustomHref {
  href: string,
  preserveQueryParams?: boolean
}

type INTERNAL__HrefOption = INTERNAL__WithHref | INTERNAL__WithCustomHref

export type NavigationLinkProps = INTERNAL__NavigationLinkProps & INTERNAL__HrefOption

export const NavigationLinkClient = React.forwardRef<
  React.ComponentRef<typeof NextLink>,
  NavigationLinkProps
>(
  (
    {
      className,
      variant = "ghost",
      size = "sm",
      href,
      preserveQueryParams,
      children,
      ...props
    },
    ref
  ) => {
    const params = useSearchParams()

    const current = new URLSearchParams(Array.from(params.entries()));
    const search = current.toString();
    const query = search ? `?${search}` : "";

    const computed = preserveQueryParams && typeof href === "string" ? `${href}${query}` : href

    return (
      <NextLink
        className={cn(focusInput, buttonVariants({ variant, size, className }))}
        href={computed}
        ref={ref}
        {...props}
      >
        <Slottable>{children}</Slottable>
      </NextLink>
    )
  });
NavigationLinkClient.displayName = "NavigationLinkClient";


