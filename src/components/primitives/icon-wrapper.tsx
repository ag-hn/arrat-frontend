"use client"

import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { iconWrapperVariants } from "./icon-wrapper.variants";

export interface IconWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof iconWrapperVariants> {
  children?: ReactNode,
  className?: string,
}

export function IconWrapper({
  children,
  className,
  variant,
  size
}: IconWrapperProps) {

  return (

    <div className={cn(
      iconWrapperVariants({
        variant,
        size,
        className,
      })
    )}>
      {children}
    </div>
  )
}

