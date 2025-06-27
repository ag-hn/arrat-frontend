import React from "react"
import * as AccordionPrimitives from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils"
import { AccordionOpenIcon } from "@/components/icons/icons"
import { focusHasVisibleRing, focusRing } from "@/lib/styles"

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitives.Root
      ref={ref}
      className={cn(
        "flex flex-col gap-1",
        className
      )}
      {...props}
    />
  )
})
Accordion.displayName = "Accordion"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Trigger>
>(({ className, children, ...props }, forwardedRef) => (
  <AccordionPrimitives.Header className="flex">
    <AccordionPrimitives.Trigger
      className={cn(
        focusRing,
        // from origin.ui
        "rounded-md leading-6 font-semibold transition-all outline-none [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0",
        // base
        "group flex flex-1 cursor-pointer items-center justify-between py-2 text-left text-sm leading-none font-medium",
        // text color
        "text-foreground",
        // disabled
        "data-disabled:cursor-default data-disabled:text-gray-400 dark:data-disabled:text-gray-600",
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <span>
        <AccordionOpenIcon
          className={cn(
            // base
            "pointer-events-none size-3 shrink-0 transition-transform duration-150 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:-rotate-45",
            // text color
            "text-muted-foreground",
            // disabled
            "group-data-disabled:text-gray-300 dark:group-data-disabled:text-gray-700",
          )}
          aria-hidden="true"
          focusable="false"
        />
      </span>
    </AccordionPrimitives.Trigger>
  </AccordionPrimitives.Header>
))

AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Content>
>(({ className, children, ...props }, forwardedRef) => (
  <AccordionPrimitives.Content
    ref={forwardedRef}
    className={cn(
      "data-[state=closed]:animate-accordion-close data-[state=open]:animate-accordion-open transform-gpu",
    )}
    {...props}
  >
    <div
      className={cn(
        // base
        "overflow-hidden pb-4 text-sm",
        // text color
        "text-accent-foreground",
        className,
      )}
    >
      {children}
    </div>
  </AccordionPrimitives.Content>
))

AccordionContent.displayName = "AccordionContent"

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Item>
>(({ className, ...props }, forwardedRef) => (
  <AccordionPrimitives.Item
    ref={forwardedRef}
    className={cn(
      focusHasVisibleRing,
      "bg-background rounded-md border px-4 py-1 outline-none last:border-b",
      // base
      "overflow-hidden border-b first:mt-0",
      // border color
      "border-border",
      className,
    )}
    {...props}
  />
))

AccordionItem.displayName = "AccordionItem"

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
