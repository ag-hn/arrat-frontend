import * as React from "react"
import type { VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils";
import { type TypeographyVariants, typeographyVariants } from "./typeography-variants";
import { focusRing } from "@/lib/styles";

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
  VariantProps<TypeographyVariants> {
  asChild?: boolean
}

const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ className, variant, affects, tint, override, weight, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"

    return (
      <Comp
        className={cn(
          "underline underline-offset-4",
          focusRing,
          typeographyVariants({ affects, tint, variant, weight, override, className })
        )}
        ref={ref}
        {...props}
      ></Comp>
    )
  }
)

Anchor.displayName = "Anchor"

export { Anchor }
