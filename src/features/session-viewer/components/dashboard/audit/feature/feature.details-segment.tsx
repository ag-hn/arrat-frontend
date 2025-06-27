"use client"

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { Anchor } from "@/components/typeography/anchor";
import { List, ListItem } from "@/components/ui/list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useSessionAndAuditParams } from "@/features/session-viewer/hooks/audit/use-audit-path-params";
import { INTERNAL__FRAME_URL_PARAM_DELIMITER } from "@/lib/audit-utils";
import { latitudeLongitudeFormatter, numberToMilesFormatter } from '@/lib/formatters/number-value-formatter';
import { stringToTitleCaseAndSpacingFormatter } from "@/lib/formatters/string-value-formatter";
import { cn } from "@/lib/utils";
import { type AppSegmentFeatureProps } from "@/server/zod/schema.audit";

export function FeatureDetailsSegment({
  segment_index,
  type: _,
  id,
  unit,
  color: __,
  total_frames,
  lrs_span,
  start,
  end,
  className,
}: { className?: string } & AppSegmentFeatureProps) {
  const params = useSessionAndAuditParams()

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-start">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {stringToTitleCaseAndSpacingFormatter(id)}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => navigator.clipboard.writeText(id)}
            >
              <Icons.actions.copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>Show information recorded during session.</CardDescription>
        </div>
        <div className="flex items-center gap-1 absolute top-8 right-6">
          <Anchor
            href={`/api/segments/${id}${INTERNAL__FRAME_URL_PARAM_DELIMITER}${params.session}`} download={`${id}-data.json`} target="_blank">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
            >
              <Icons.actions.download className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="sr-only">Download</span>
            </Button>
          </Anchor>
        </div>
      </CardHeader>

      <CardContent className="p-6 text-sm">
        <ScrollArea>
          <div className="grid gap-3">
            <div className="font-semibold">Audit Details</div>
            <List variant={"simple"}>
              <ListItem>
                <span className="text-muted-foreground">Unit #</span>
                <span>{stringToTitleCaseAndSpacingFormatter(unit)}</span>
              </ListItem>
              <ListItem>
                <span className="text-muted-foreground">Segment #</span>
                <span>{segment_index + 1}</span>
              </ListItem>
            </List>

            {/* <Separator className="my-2" /> */}
            {/**/}
            {/* <List variant={"simple"}> */}
            {/*   <ListItem className="hidden items-center justify-between sm:flex"> */}
            {/*     <span className="text-muted-foreground">Visibility Score</span> */}
            {/*     <span>{}</span> */}
            {/*   </ListItem> */}
            {/*   <ListItem className="hidden items-center justify-between sm:flex"> */}
            {/*     <span className="text-muted-foreground">Consistency Score</span> */}
            {/*     <span>{line_consistency_score}</span> */}
            {/*   </ListItem> */}
            {/*   <ListItem className="hidden items-center justify-between sm:flex"> */}
            {/*     <span className="text-muted-foreground">Curvature Score</span> */}
            {/*     <span>{line_curvature_score}</span> */}
            {/*   </ListItem> */}
            {/*   <ListItem className="hidden items-center justify-between sm:flex"> */}
            {/*     <span className="text-muted-foreground">Combined Score</span> */}
            {/*     <span>{line_combined_score}</span> */}
            {/*   </ListItem> */}
            {/*   <ListItem className="flex items-center justify-between font-semibold"> */}
            {/*     <span className="text-muted-foreground">Overall Score</span> */}
            {/*     <span>{combined_score}</span> */}
            {/*   </ListItem> */}
            {/* </List> */}
          </div>

          <Separator className="my-4" />

          <div className="gap-3">
            <div className="font-semibold">Frames Details</div>
            <List variant={"simple"}>
              <ListItem>
                <span className="text-muted-foreground">Count</span>
                <span>
                  {total_frames}
                  <span className="ml-1 text-fluid-xs">frames</span>{" "}
                </span>
              </ListItem>
              <ListItem>
                <span className="text-muted-foreground">Start</span>
                <span>
                  {latitudeLongitudeFormatter(start)}
                </span>
              </ListItem>
              <ListItem>
                <span className="text-muted-foreground">End</span>
                <span>
                  {latitudeLongitudeFormatter(end)}
                </span>
              </ListItem>
              <ListItem>
                <span className="text-muted-foreground">Span (LRS)</span>
                <span>
                  {numberToMilesFormatter(lrs_span)}
                </span>
              </ListItem>
            </List>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

