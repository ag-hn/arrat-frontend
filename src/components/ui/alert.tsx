import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border shadow-sm p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: [
          // text color
          "text-blue-900 dark:text-blue-400 [&>svg]:text-blue-900 dark:[&>svg]:text-blue-400",
          // fill color
          "fill-blue-900 dark:fill-blue-400",
          // border color
          "border-blue-100 dark:border-blue-900/70 ",
          // background color
          "bg-blue-50/25 dark:bg-blue-950/70 ",
        ],
        success: [
          // text color
          "text-emerald-900 dark:text-emerald-500 [&>svg]:text-emerald-900 dark:[&>svg]:text-emerald-500",
          // fill color
          "fill-emerald-900 dark:fill-emerald-500",
          // border color
          "border-emerald-100/70 dark:border-emerald-900/70 ",
          // background color
          "bg-emerald-50/25 dark:bg-emerald-950/45 ",
        ],
        error: [
          // text color
          "text-red-900 dark:text-red-500 [&>svg]:text-red-900 dark:[&>svg]:text-red-500",
          // fill color
          "fill-red-900 dark:fill-red-500",
          // border color
          "border-red-100 dark:border-red-900/70",
          // background color
          "bg-red-50/70 dark:bg-red-950/70",
        ],
        warning: [
          // text color
          " text-yellow-800 dark:text-yellow-500 [&>svg]:text-yellow-800 dark:[&>svg]:text-yellow-500",
          // fill color
          " fill-yellow-800 dark:fill-yellow-500",
          // border color
          "border-yellow-100 dark:border-yellow-900/70",
          // background color
          "bg-yellow-50/25 dark:bg-yellow-950/70",
        ],
        neutral: [
          // text color
          "text-gray-900 dark:text-gray-400 [&>svg]:text-gray-900 dark:[&>svg]:text-gray-400",
          // fill color
          "fill-gray-900 dark:fill-gray-400",
          // border color
          "border-gray-100 dark:border-gray-800/70",
          // background color
          "bg-muted/50",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);


const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
