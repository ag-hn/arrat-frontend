"use client"
import type { ComponentClassName } from "@/types/utility";
import { useSelectedFeature } from "@/features/session-viewer/hooks/viewer/use-selected-feature";
import { FeatureDetailsSignV1 } from "./feature.details-sign-v1";
import { FeatureDetailsSegment } from "./feature.details-segment";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/primitives/card";
import { Separator } from "@/components/ui/separator";
import { FeatureDetailsSign } from "./feature.details-sign";

export function FeatureDetails({ className }: ComponentClassName) {
  const { isLoading, error, data } = useSelectedFeature()

  if (isLoading || !!error || !data) {
    return <INTERNAL__LoadingState />
  }

  if (data.__tag === '__feature_sign_v2') {
    return <FeatureDetailsSign className={className} {...data.feature.properties} />
  }

  if (data.__tag === '__feature_sign_v1') {
    return <FeatureDetailsSignV1 className={className} {...data.feature.properties} />
  }

  if (data.__tag === '__feature_segment') {
    return <FeatureDetailsSegment className={className} {...data.feature.properties} />
  }

  return null
}

function INTERNAL__LoadingState() {
  return (
    <Card className={("overflow-hidden")}>
      <CardHeader className="flex flex-row items-start">
        <div className="grid gap-4">
          <CardTitle className="group flex items-center gap-2 text-lg">
            <Skeleton className="w-24 h-6" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="w-32 h-4" />
          </CardDescription>
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
