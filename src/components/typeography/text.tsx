"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { typeographyVariants, type TypeographyVariants } from "./typeography-variants"

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<TypeographyVariants> {
  asChild?: boolean
}

type AvailableComps = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5";
type SizeKeys = Exclude<TextProps["variant"], undefined | null>
const compMap: Record<SizeKeys, AvailableComps> = {
  default: "p",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  "screen-reader": "p",
  span: "span",
  p: "p",
  content: "p",
  label: "p",
  metric: "p",
  title: "p",
}

function getComp(variant: TextProps["variant"]): AvailableComps {
  if (!variant) {
    return "p"
  }

  return compMap[variant]
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, affects, tint, weight, override, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : getComp(variant)

    return (
      <Comp
        className={cn(typeographyVariants({ tint, affects, variant, weight, override, className }))}
        ref={ref}
        {...props}
      ></Comp>
    )
  }
)

Text.displayName = "Text"

export { Text }

