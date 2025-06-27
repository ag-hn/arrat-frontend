"use client"

import { Text } from "@/components/typeography/text"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useScoreFilter } from "@/features/session-viewer/hooks/filters/use-filter-query-params"
import { useAllSubFramesSegment } from "@/features/session-viewer/hooks/frames/segment.use-all-sub-frames"
import { useScrollToFrame } from "@/features/session-viewer/hooks/use-scroll-to-frame"
import { cn } from "@/lib/utils"
import { type ComponentClassName } from "@/types/utility"
import { FeatureFilter } from "./segment.frames-list-filter"
import { SegmentFramesListItem } from "./segment.frames-list-item"
import { useSessionAndAuditParams } from "@/features/session-viewer/hooks/audit/use-audit-path-params"

/**
 * React component to show all frames underneath an audit segment
 */
export function SegmentFramesList({ className }: ComponentClassName) {
  return (
    <>
      <Text className="text-lg">Frames</Text>

      <FeatureFilter className="mt-4 max-w-sm" />

      <INTERNAL__SegmentFramesList className={className} />
    </>
  )
}

export function SegmentFramesListLoadingState() {
  return (
    <>
      <Text className="text-lg">Frames</Text>

      <FeatureFilter className="mt-4 max-w-sm" />

      <INTERNAL__SegmentFramesListLoadingState />
    </>
  )
}

function INTERNAL__SegmentFramesList(
  {
    className,
  }: { className?: string }
) {
  const params = useSessionAndAuditParams()
  const id = params.id?.param ?? ''
  const [value] = useScoreFilter();
  const { frames, res: { isLoading } } = useAllSubFramesSegment({ scores: value })
  const viewportRef = useScrollToFrame(id, frames)
  if (isLoading) {
    return <INTERNAL__SegmentFramesListLoadingState />
  }

  if ((!frames || frames.length <= 0) && value.length <= 0) {
    return (
      <div className="text-foreground text-fluid-lg mt-6 text-center">
        No frames associated to this segment.
      </div>
    )
  }

  return (
    <>
      {frames && frames.length > 0 ? (
        <ScrollArea viewportRef={viewportRef} className={cn("mt-2 h-[64rem] md:h-[44rem]", className)}>
          <div className="flex flex-col gap-4">
            {frames.map(
              (frame, i) => {
                return <SegmentFramesListItem
                  key={i}
                  index={i + 1}
                  {...frame}
                  audit={id}
                />;
              },
            )}
          </div>

          <ScrollBar />
        </ScrollArea>
      ) : (
        <div className="text-foreground text-fluid-lg mt-6 text-center">
          No frames found. Try updating the filters to find other frames.
        </div>
      )
      }
    </>
  );
}

function INTERNAL__SegmentFramesListLoadingState() {
  return (
    <div className="mt-2 flex flex-col gap-4">
      <INTERNAL__SegmentFramesListItemLoadingState />
      <INTERNAL__SegmentFramesListItemLoadingState />
      <INTERNAL__SegmentFramesListItemLoadingState />
      <INTERNAL__SegmentFramesListItemLoadingState />
      <INTERNAL__SegmentFramesListItemLoadingState />
    </div>

  )
}

function INTERNAL__SegmentFramesListItemLoadingState() {
  return (
    <Card className={cn(
      "relative grid grid-cols-1 p-1 md:grid-cols-[max-content_10px_1fr]",
    )}>
      <div className="flex flex-row">
        <CardHeader>
          <Skeleton className="size-24 aspect-square" />
        </CardHeader>
      </div>
      <div className="hidden h-full py-4 md:block">
        <Separator orientation="vertical" />
      </div>
      <CardContent className="relative flex md:flex-row flex-wrap md:p-6">

        <CardHeader>
          <CardTitle><Skeleton className="w-16 h-4" /></CardTitle>
          <div><Skeleton className="w-24 h-4" /></div>
        </CardHeader>{" "}
        <CardHeader>
          <CardTitle><Skeleton className="w-16 h-4" /></CardTitle>
          <div><Skeleton className="w-24 h-4" /></div>
        </CardHeader>{" "}
        <CardHeader>
          <CardTitle><Skeleton className="w-16 h-4" /></CardTitle>
          <div><Skeleton className="w-24 h-4" /></div>
        </CardHeader>
        <CardHeader>
          <CardTitle><Skeleton className="w-16 h-4" /></CardTitle>
          <div><Skeleton className="w-24 h-4" /></div>
        </CardHeader>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Skeleton className="size-6" />
          <Skeleton className="size-6" />
        </div>
      </CardContent>
    </Card>

  )
}
