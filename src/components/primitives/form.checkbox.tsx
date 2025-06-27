"use client"

import * as CheckboxPrimitives from "@radix-ui/react-checkbox"
import React from "react"
import { cn } from "@/lib/utils"
import { CheckboxCheckIcon, CheckboxIndeterminateIcon } from "@/components/icons/icons"
import { dataDisabled, focusRing } from "@/lib/styles"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitives.Root>
>(({ className, checked, ...props }, forwardedRef) => {
  return (
    <CheckboxPrimitives.Root
      ref={forwardedRef}
      {...props}
      checked={checked}
      className={cn(
        // focus
        focusRing,
        // base
        "relative inline-flex size-4 shrink-0 appearance-none items-center justify-center rounded border shadow-sm outline-none transition duration-100 enabled:cursor-pointer",
        // text color
        "text-foreground",
        // background color
        "bg-blue",
        // border color
        "border-border",
        // disabled
        dataDisabled,
        // checked and enabled
        "enabled:data-[state=checked]:border-0 enabled:data-[state=checked]:border-transparent enabled:data-[state=checked]:bg-primary enabled:data-[state=checked]:text-primary-foreground",
        // indeterminate
        "enabled:data-[state=indeterminate]:border-0 enabled:data-[state=indeterminate]:border-transparent enabled:data-[state=indeterminate]:bg-primary enabled:data-[state=indeterminate]:text-primary-foreground",
        className,
      )}
    >
      <CheckboxPrimitives.Indicator className="flex size-full items-center justify-center">
        {checked === "indeterminate" ? (
          <CheckboxIndeterminateIcon aria-hidden className="size-3" />
        ) : (
          <CheckboxCheckIcon aria-hidden className="size-3" />
        )}
      </CheckboxPrimitives.Indicator>
    </CheckboxPrimitives.Root>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
