import React, { type ReactNode } from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import {
  CircleCheck as RiCheckboxCircleFill,
  CircleX as RiCloseCircleFill,
  CircleAlert as RiErrorWarningFill,
  Info as RiInformationFill,
  Loader as RiLoader2Fill,
} from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider
ToastProvider.displayName = "ToastProvider"

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, forwardedRef) => (
  <ToastPrimitives.Viewport
    ref={forwardedRef}
    className={cn(
      "fixed end-0 bottom-0 z-[9999] m-0 flex w-full max-w-[100vw] list-none flex-col gap-2 p-[var(--viewport-padding)] [--viewport-padding:_15px] sm:max-w-md sm:gap-4",
      className,
    )}
    {...props}
  />
))

ToastViewport.displayName = "ToastViewport"

interface ActionProps {
  label: string
  altText: string
  onClick: () => void | Promise<void>
}

interface ToastProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>, "title"> {
  variant?: "info" | "success" | "warning" | "error" | "loading"
  title?: ReactNode
  description?: ReactNode
  action?: ActionProps
  disableDismiss?: boolean
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(
  (
    {
      className,
      variant,
      title,
      description,
      action,
      disableDismiss = false,
      ...props
    }: ToastProps,
    forwardedRef,
  ) => {
    let Icon: React.ReactNode

    switch (variant) {
      case "success":
        Icon = (
          <RiCheckboxCircleFill
            className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-500"
            aria-hidden="true"
          />
        )
        break
      case "warning":
        Icon = (
          <RiErrorWarningFill
            className="mt-0.5 size-4 shrink-0 text-amber-500 dark:text-amber-500"
            aria-hidden="true"
          />
        )
        break
      case "error":
        Icon = (
          <RiCloseCircleFill
            className="mt-0.5 size-4 shrink-0 text-destructive"
            aria-hidden="true"
          />
        )
        break
      case "loading":
        Icon = (
          <RiLoader2Fill
            className="mt-0.5 size-4 shrink-0 animate-spin text-muted-foreground"
            aria-hidden="true"
          />
        )
        break
      default:
        Icon = (
          <RiInformationFill
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
        )
        break
    }

    return (
      <ToastPrimitives.Root
        ref={forwardedRef}
        className={cn(
          // base
          "flex h-fit min-h-16 w-full overflow-hidden rounded-md border shadow-lg shadow-black/5",
          // background color
          "bg-background",
          // border color
          "border-border",
          // swipe
          "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
          // transition
          "data-[state=open]:animate-slideLeftAndFade",
          "data-[state=closed]:animate-hide",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            // base
            "flex flex-1 items-start gap-3 p-4",
            // border
            !disableDismiss || action
              ? "border-r border-border"
              : "",
          )}
        >
          {Icon}
          <div className="flex flex-col gap-1">
            {title && (
              <ToastPrimitives.Title className="text-sm font-bold text-foreground">
                {title}
              </ToastPrimitives.Title>
            )}
            {description && (
              <ToastPrimitives.Description className="text-xs text-foreground">
                {description}
              </ToastPrimitives.Description>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          {action && (
            <>
              <ToastPrimitives.Action
                altText={action.altText}
                className={cn(
                  // base
                  "flex flex-1 items-center justify-center px-6 text-sm transition-colors",
                  // hover
                  "hover:bg-accent hover:text-foreground",
                  // text color
                  "text-muted-foreground",
                  // active
                  "active:bg-accent",
                  {
                    "text-destructive": variant === "error",
                  },
                )}
                onClick={async (event) => {
                  event.preventDefault()
                  await action.onClick()
                }}
                type="button"
              >
                {action.label}
              </ToastPrimitives.Action>
              <div className="h-px w-full bg-border" />
            </>
          )}
          {!disableDismiss && (
            <ToastPrimitives.Close
              className={cn(
                // base
                "flex flex-1 items-center justify-center px-6 text-sm transition-colors",
                // hover
                "hover:bg-accent hover:text-foreground",
                // text color
                "text-muted-foreground",
                // active
                "active:bg-accent",
                action ? "h-1/2" : "h-full",
              )}
              aria-label="Close"
            >
              Close
            </ToastPrimitives.Close>
          )}
        </div>
      </ToastPrimitives.Root>
    )
  },
)
Toast.displayName = "Toast"

type ToastActionElement = ActionProps

export {
  Toast,
  ToastProvider,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
}
