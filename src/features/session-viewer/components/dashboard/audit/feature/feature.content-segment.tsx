/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { cn } from "@/lib/utils";
import { type AppSegmentFeature } from "@/server/zod/schema.audit";
import { SegmentFramesList, SegmentFramesListLoadingState } from "./segment.frames-list";
import { type ComponentClassName } from "@/types/utility";

type FeatureContentSegmentProps = {
  className?: string,
} & AppSegmentFeature

export function FeatureContentSegment({ className }: FeatureContentSegmentProps) {
  return (
    <INTERNAL__ContentWrapper className={className}>
      <div className="grid w-full auto-rows-min grid-cols-1 items-start gap-6">
        <div>
          <SegmentFramesList />
        </div>
      </div>
    </INTERNAL__ContentWrapper>
  );
}

function INTERNAL__ContentWrapper({ className, children }: ComponentClassName) {
  return (
    <div
      className={cn(
        "flex min-h-24 w-full items-center justify-center",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function FeatureContentSegmentLoadingState() {
  return (
    <INTERNAL__ContentWrapper>
      <div className="grid w-full auto-rows-min grid-cols-1 items-start gap-6">
        <div>
          <SegmentFramesListLoadingState />
        </div>
      </div>
    </INTERNAL__ContentWrapper>
  )

}
