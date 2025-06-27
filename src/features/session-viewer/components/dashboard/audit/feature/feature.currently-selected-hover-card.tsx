"use client"

import { Icons } from "@/components/icons/icons"
import { Button, type ButtonProps } from "@/components/primitives/button"
import { useAuditIdPathParam, useSessionAndAuditParams } from "@/features/session-viewer/hooks/audit/use-audit-path-params"
import { generateSessionPath } from "@/features/session-viewer/hooks/use-session-and-audit-router.helpers"
import { useSelectedFeature } from "@/features/session-viewer/hooks/viewer/use-selected-feature"
import { isAppSegmentFeature, isAppSignFeatureV1, isAppSignFeatureV2 } from "@/lib/audit-utils"
import { percentageFormatterFromDecimal } from "@/lib/formatters/number-value-formatter"
import { stringToTitleCaseAndSpacingFormatter } from "@/lib/formatters/string-value-formatter"
import { cn } from "@/lib/utils"
import { type ComponentClassName } from "@/types/utility"
import { Cross2Icon } from "@radix-ui/react-icons"

export function FeatureCurrentlySelectedHoverCard() {
  const param = useAuditIdPathParam()
  const { data, isLoading } = useSelectedFeature()

  if (!param) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="fade-in pointer-events-auto drop-shadow-md flex flex-row items-end">
        <INTERNAL__Segment className="flex flex-row gap-3 items-center">
          Loading <span><Icons.loading className="size-4" /></span>
        </INTERNAL__Segment>
      </div>
    )
  }

  if (!data) {
    return null;
  }

  const { feature } = data;
  return (
    <div className="fade-in pointer-events-auto drop-shadow-md flex flex-row items-end">
      <INTERNAL__Segment className="flex flex-row gap-2 items-center">
        <span className="text-xs hidden md:inline">Selected:{" "}</span>
        {stringToTitleCaseAndSpacingFormatter(feature.properties.id)}
      </INTERNAL__Segment>

      <INTERNAL__Segment className="text-subtle-foreground">
        {isAppSegmentFeature(feature) ? "Segment" : "Sign"}
      </INTERNAL__Segment>

      {isAppSignFeatureV1(feature) && (
        <INTERNAL__Segment className="text-subtle-foreground hidden md:flex">
          {percentageFormatterFromDecimal(feature.properties.score)}
        </INTERNAL__Segment>
      )}

      {isAppSignFeatureV2(feature) && (
        <INTERNAL__Segment className="text-subtle-foreground hidden md:flex">
          {percentageFormatterFromDecimal(feature.properties.overall_score)}
        </INTERNAL__Segment>
      )}

      <INTERNAL__HardRefreshOnDashboard className="px-4" />
    </div>
  )
}

function INTERNAL__Segment({ className, children }: ComponentClassName) {
  return (
    <div className={cn("px-6 border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 h-10 rounded-none first:rounded-s-full last:rounded-e-full focus-visible:z-10  [&:not(:first-child)]:border-l-transparent", className)}
    >
      {children}
    </div>
  )
}

function INTERNAL__HardRefreshOnDashboard({ className, children, ...rest }: ButtonProps) {
  const key = useSessionAndAuditParams()
  return (
    <Button
      aria-label="Deselect current session."
      variant={"outline"}
      className={cn("h-full px-4 shadow-none first:!rounded-s-full last:!rounded-e-full focus-visible:z-10 [&:not(:first-child)]:border-l-transparent", className)}
      onClick={() => {
        window.location.href = generateSessionPath(key.session)
      }}
      {...rest}
    >
      <Cross2Icon className="size-3" />

      {children}
    </Button>
  )
}
