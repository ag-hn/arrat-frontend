"use client"
import { Skeleton } from "@/components/ui/skeleton";
import { useSelectedFeature } from "@/features/session-viewer/hooks/viewer/use-selected-feature";
import { type ComponentClassName } from "@/types/utility";
import { FeatureContentSegment, FeatureContentSegmentLoadingState } from "./feature.content-segment";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/primitives/card";
import { useAuditIdPathParam } from "@/features/session-viewer/hooks/audit/use-audit-path-params";

export function FeatureContent({ className }: ComponentClassName) {
  const { isLoading, error, data } = useSelectedFeature()

  if (isLoading || !!error || !data) {
    return <INTERNAL__LoadingState />
  }

  if (data.__tag === '__feature_segment') {
    return <FeatureContentSegment className={className} {...data.feature} />
  }

  return null
}

function INTERNAL__LoadingState() {
  const id = useAuditIdPathParam();
  if (id.includes('sign')) {
    return (
      <Card>
        <CardHeader><Skeleton className="w-3/5 h-6" /></CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[44rem]" />
        </CardContent>
        <CardFooter><Skeleton className="w-3/6 h-6" /></CardFooter>
      </Card>
    )
  }

  return (
    <FeatureContentSegmentLoadingState />
  )
}
