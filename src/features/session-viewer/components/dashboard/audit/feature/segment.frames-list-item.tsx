"use client"

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { Tooltip } from "@/components/primitives/tooltip";
import { Anchor } from "@/components/typeography/anchor";
import { Separator } from "@/components/ui/separator";
import { useAuditIdPathParam, useSessionAndAuditParams } from "@/features/session-viewer/hooks/audit/use-audit-path-params";
import { useAuditFrameQueryParams } from "@/features/session-viewer/hooks/use-audit-frame-query-params";
import { INTERNAL__FRAME_URL_PARAM_DELIMITER } from "@/lib/audit-utils";
import { shortDateFormatter } from "@/lib/formatters/date-value-formatter";
import { decimalFormatter, numberToMilesFormatter } from "@/lib/formatters/number-value-formatter";
import { minDelay } from "@/lib/timing";
import { cn } from "@/lib/utils";
import { type AuditImageContextOption } from "@/server/api/trpc";
import { type AuditSeverity } from "@/types/map/feature";
import type { TODO } from "@/types/utility";
import { useState } from "react";
import { SharedImageDisplay } from "./shared.image-display";

export function INTERNAL__frameLineScoreToSeverity(score: number): AuditSeverity {
  if (score < 25) {
    return 'level low'
  }

  if (score >= 25 && score < 75) {
    return 'level medium'
  }

  return 'level high'
}

export function INTERNAL__frameLineToOverallSeverity(scoreLeft: number, scoreRight: number): AuditSeverity {
  const severityLeft = INTERNAL__frameLineScoreToSeverity(scoreLeft)
  const severityRight = INTERNAL__frameLineScoreToSeverity(scoreRight)

  if (severityLeft === 'level low' || severityRight === 'level low') {
    return 'level low'
  }

  if (severityLeft === 'level medium' || severityRight === 'level medium') {
    return 'level medium'
  }

  return 'level high'
}

export function SegmentFramesListItem({
  line_score_left,
  line_score_right,
  frame,
  audit,
  lrs,
  time,
  url
}: AuditImageContextOption & { audit: string, index: number }) {
  const { set } = useAuditFrameQueryParams()
  const params = useSessionAndAuditParams()
  const severity = INTERNAL__frameLineToOverallSeverity(line_score_left, line_score_right)

  return (
    <>
      <Card
        id={frame}
        className={cn(
          "relative grid grid-cols-1 p-1 md:grid-cols-[max-content_10px_1fr] scroll-m-8",
          severity === 'level low'
            ? "border-red-300 border-dashed"
            : severity === 'level medium'
              ? "border-amber-300 border-dashed"
              : ""
        )}>
        <div className="flex flex-row">
          <CardHeader>
            <button
              onClick={() => {
                void set(frame)
              }}
            >
              <SharedImageDisplay
                isLoading={false}
                src={url}
                height={84}
                width={84}
                className="size-24 aspect-video"
              />
            </button>
          </CardHeader>


          <span className="m-6 mb-auto ml-auto flex items-center gap-1 md:hidden">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Icons.actions.more className="h-3.5 w-3.5" />
              <span className="sr-only">More</span>
            </Button>
          </span>
        </div>
        <div className="hidden h-full py-4 md:block">
          <Separator orientation="vertical" />
        </div>
        <CardContent className="relative flex md:flex-row flex-wrap md:p-6">

          <CardHeader>
            <CardTitle>LRS</CardTitle>
            <CardDescription>
              {numberToMilesFormatter(lrs)}
            </CardDescription>
          </CardHeader>{" "}
          <CardHeader>
            <CardTitle>Captured at</CardTitle>
            <CardDescription>
              {shortDateFormatter(time)}
            </CardDescription>
          </CardHeader>
          <CardHeader>
            <CardTitle>Left score</CardTitle>
            <CardDescription>
              {decimalFormatter(line_score_left)}
            </CardDescription>
          </CardHeader>
          <CardHeader>
            <CardTitle>Right score</CardTitle>
            <CardDescription>
              {decimalFormatter(line_score_right)}
            </CardDescription>
          </CardHeader>
          <div className="ml-auto hidden items-center gap-1 md:flex">
            <CopyFrameToClipBoardButton
              index={time}
              line_score_left={line_score_left}
              line_score_right={line_score_right}
              time={shortDateFormatter(time)}
              lrs={numberToMilesFormatter(lrs)}
            />

            <Anchor href={`/api/frames/${frame}${INTERNAL__FRAME_URL_PARAM_DELIMITER}${audit}${INTERNAL__FRAME_URL_PARAM_DELIMITER}${params.session}`} download={`${frame}-data.json`} target="_blank">
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
        </CardContent>
      </Card>
    </>
  );
}

function CopyFrameToClipBoardButton({
  index,
  line_score_left,
  line_score_right,
  time,
  lrs,
}: TODO) {
  const [open, setOpen] = useState(false)
  const segment = useAuditIdPathParam()
  const [download] = useState(
    `segment: ${segment}, frame: ${index}, lrs: ${lrs}, time: ${time}, score_left: ${line_score_left}, score_right: ${line_score_right}`
  )

  return (
    <Tooltip
      open={open}
      content={"Copied!"}
      asChild
    >
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={async () => {
            setOpen(true)
            await minDelay(
              navigator.clipboard.writeText(download),
              1000
            );
            setOpen(false)
          }}
        >
          <Icons.actions.copy className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="sr-only">Copy</span>
        </Button>
    </Tooltip>
  )
}

