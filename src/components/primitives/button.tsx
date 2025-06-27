"use client"

import { Slot, Slottable } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"
import React, { forwardRef }  from "react"
import { cn } from "@/lib/utils"
import type { ComponentWithClassNameAndChildren } from "@/types/utils"
import { buttonVariants } from "@/components/primitives/button.variants"
import LoadingCircle from "../icons/loading.circle"

export interface IconProps {
  Icon: React.ElementType;
  iconPlacement: "left" | "right";
}

export interface IconRefProps {
  Icon?: never;
  iconPlacement?: undefined;
}

export type ButtonIconProps = IconProps | IconRefProps;

export type ButtonProps =
  React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> &
  ComponentWithClassNameAndChildren<{
    asChild?: boolean
    isLoading?: boolean
    loadingText?: string
    loadingIcon?: React.ReactNode
  }>

const Button = forwardRef<HTMLButtonElement, ButtonProps & ButtonIconProps>(
  (
    {
      asChild,
      isLoading = false,
      Icon,
      iconPlacement,
      loadingText,
      loadingIcon = (
            <LoadingCircle
              className="size-4 shrink-0 animate-spin"
              aria-hidden="true"
            />

      ),
      className,
      disabled,
      size,
      animation,
      variant,
      children,
      ...props
    }: ButtonProps & ButtonIconProps,
    ref: React.Ref<HTMLButtonElement> 
  ) => {
    const Component = asChild ? Slot : "button"
    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, animation, size }), className)}
        disabled={disabled ?? isLoading}
        {...props}
      >
        {Icon && iconPlacement === "left" && (
          <div className="w-0 -translate-x-[100%] pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pr-2 group-hover:opacity-100">
            <Icon className="size-4" />
          </div>
        )}

        <Slottable>
          {isLoading ? (
            <span className="pointer-events-none flex shrink-0 items-center justify-center gap-1.5">
              {loadingIcon}
              <span className="sr-only">
                {loadingText ?? "Loading"}
              </span>
              {loadingText ?? children}
            </span>
          ) : (
            children
          )}
        </Slottable>

        {Icon && iconPlacement === "right" && (
          <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
            <Icon className="size-4" />
          </div>
        )}
      </Component>
    )
  }
)
Button.displayName = "Button"

export { Button }


