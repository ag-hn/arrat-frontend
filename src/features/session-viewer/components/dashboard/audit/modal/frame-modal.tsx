"use client"

import Link from "next/link";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAuditFrameQueryParams } from "@/features/session-viewer/hooks/use-audit-frame-query-params";

import { Text } from "@/components/typeography/text";
import { useAuditIdPathParam, useSessionAndAuditParams } from "@/features/session-viewer/hooks/audit/use-audit-path-params";
import { useConstants } from "@/features/session-viewer/hooks/frames/use-constants";
import { extractUnit } from "@/lib/audit-utils";
import { longDateFormatter } from "@/lib/formatters/date-value-formatter";
import { INTERNAL__getUnitImageUrlGivenBase } from "@/server/aws/shared";
import { SharedImageDisplay } from "../feature/shared.image-display";
import { useCurrentSessionDetails } from "@/features/session-viewer/hooks/viewer/use-session-list";

export function FrameModal({ }) {
  const selectedAudit = useAuditIdPathParam()
  const params = useSessionAndAuditParams()
  const { clear, frame: selectedFrameName } = useAuditFrameQueryParams()
  if (!params) {
    return;
  }

  if (typeof selectedFrameName !== 'string') {
    return;
  }

  return (
    <Dialog
      open={true}
      onOpenChange={clear}
    >
      <DialogContent className="sm:max-w-[65%]">
        <DialogTitle>
          {longDateFormatter(selectedFrameName)}
        </DialogTitle>

        <FrameModalInternal frame={selectedFrameName} audit={selectedAudit} session={params.session} />
      </DialogContent>
    </Dialog>
  )
}

export function FrameModalInternal(props: { frame: string, audit: string, session: string }) {
  const { data: constants } = useConstants()
  const { isLoading, error, data: details } = useCurrentSessionDetails()

  if (isLoading) {
    return (
      <SharedImageDisplay
        isLoading={true}
        priority={true}
        height="800"
        width="1000"
      />
    )
  }

  if (!constants || !details?.files || !props.audit || !props.frame) {
    return <Text variant={"h2"}>Could not load image.</Text>
  }

  const unit = extractUnit(props.audit)
  if (!unit) {
    return <Text variant={"h2"}>Could not load image.</Text>
  }

  const url = INTERNAL__getUnitImageUrlGivenBase(constants.serverImagesUrl, details.files, props.session, unit, props.frame)

  return (
    <Link
      href={url}
      target="_blank"
      className={"rounded-md object-contain aspect-video overflow-hidden"}
    >
      <SharedImageDisplay
        isLoading={isLoading}
        error={error}
        alt={`Sub frame captured during session audit ${props.audit}`}
        src={url}
        priority={true}
        height="800"
        width="1000"
      />
    </Link>
  )
}
