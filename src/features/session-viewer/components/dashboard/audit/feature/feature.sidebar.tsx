
"use client"
import { Card, CardContent, CardHeader } from "@/components/primitives/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelectedFeature } from "@/features/session-viewer/hooks/viewer/use-selected-feature";
import type { ComponentClassName } from "@/types/utility";
import { FeatureSidebarSegment } from "./feature.sidebar-segment";
import { FeatureSidebarSign } from "./feature.sidebar-sign";
import { FeatureSidebarSignV1 } from "./feature.sidebar-sign-v1";

export function FeatureSidebar({ className }: ComponentClassName) {
  const { isLoading, error, data } = useSelectedFeature()

  if (isLoading || !!error || !data) {
    return <INTERNAL__LoadingState />
  }

  if (data.__tag === '__feature_sign_v2') {
    return <FeatureSidebarSign className={className} {...data.feature} />
  }

  if (data.__tag === '__feature_sign_v1') {
    return <FeatureSidebarSignV1 className={className} {...data.feature} />
  }

  if (data.__tag === '__feature_segment') {
    return <FeatureSidebarSegment className={className} {...data.feature} />
  }

  return null
}

function INTERNAL__LoadingState() {
  return (
    <Card className={("overflow-hidden")}>
      <CardHeader className="flex flex-row items-start">
        <div className="grid gap-4">
          <div className="group flex items-center gap-2 text-lg">
            <Skeleton className="w-24 h-6" />
          </div>

          <Skeleton className="w-32 h-4" />
        </div>
        <div className="flex items-center gap-1 absolute top-8 right-6">
          <Skeleton className="size-4" />
        </div>
      </CardHeader>

      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <Skeleton className="w-full h-32" />
        </div>

        <Separator className="my-4" />

        <div className="gap-3">
          <Skeleton className="w-full h-44" />
        </div>
      </CardContent>
    </Card>
  )
}
