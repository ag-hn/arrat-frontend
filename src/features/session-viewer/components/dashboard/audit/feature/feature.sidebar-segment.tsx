import { type AppSegmentFeature } from "@/server/zod/schema.audit";
import { FeatureDetailsSegment } from "./feature.details-segment";
import { SegmentInformation } from "./segment.information";
import { cn } from "@/lib/utils";

export function FeatureSidebarSegment({
  className,
  ...rest
}: { className?: string } & AppSegmentFeature) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <FeatureDetailsSegment {...rest.properties} />
      <SegmentInformation {...rest} />
    </div>
  )
}
