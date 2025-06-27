import * as React from "react"
import type { VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils";
import { type TypeographyVariants, typeographyVariants } from "./typeography-variants";

export interface SpanProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<TypeographyVariants> {
  asChild?: boolean
}

const Span = React.forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, variant, affects, tint, weight, override, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span"
    
    return (
      <Comp
        className={cn(typeographyVariants({ tint, affects, variant, weight, override, className }))}
        ref={ref}
        {...props}
      ></Comp>
    )
  }
)

Span.displayName = "Span"

export { Span }