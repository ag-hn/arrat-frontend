import * as React from "react"

import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

interface SurfaceProps extends React.ComponentPropsWithoutRef<"div"> {
  asChild?: boolean
}

const Surface = React.forwardRef<
  HTMLDivElement,
  SurfaceProps
>(({ className, asChild, ...props }, ref) => {
  const Component = asChild ? Slot : "div"
  return (
    <Component
      ref={ref}
      className={cn(
        "relative w-full p-6 rounded-xl inset-0 border bg-surface text-surface-foreground border-surface-border",
        className
      )}
      {...props}
    />
  )
})
Surface.displayName = "Surface"

const SurfaceHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
SurfaceHeader.displayName = "SurfaceHeader"

const SurfaceTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
SurfaceTitle.displayName = "SurfaceTitle"

const SurfaceDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SurfaceDescription.displayName = "SurfaceDescription"

const SurfaceContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
SurfaceContent.displayName = "SurfaceContent"

const SurfaceFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
SurfaceFooter.displayName = "SurfaceFooter"

export { Surface, SurfaceHeader, SurfaceFooter, SurfaceTitle, SurfaceDescription, SurfaceContent }

