import { extractUnit } from "@/lib/audit-utils";
import { INTERNAL__defaultTrpcClientSideParameters } from "@/lib/trpc";
import { type AuditImageContext, type AuditImageContextExtended, type AuditImageContextOption } from "@/server/api/trpc";
import { INTERNAL__getUnitImageUrlGivenBase } from "@/server/aws/shared";
import { type AppFeatureOption, type AppLanelineFrame, type AppLanelineFrameSign } from "@/server/zod/schema.audit";
import type { AppAwsSessionsFilesSchema } from "@/server/zod/schema.sessions";
import { api } from "@/trpc/react";
import { useSessionAndAuditParams } from "../audit/use-audit-path-params";

export function useAllFramesRecord(unit?: string) {
  const params = useSessionAndAuditParams()
  return api.viewer.unitFrames.useQuery(
    {
      session: params.session,
      unit: unit ?? params.unit,
    },
    INTERNAL__defaultTrpcClientSideParameters,
  );
}

export function INTERNAL__getAssociatedFrameRecords(baseUrl: string, configuration: AppAwsSessionsFilesSchema, session: string, feature: AppFeatureOption, frames: (AppLanelineFrame | AppLanelineFrameSign)[]) {
  const context: AuditImageContextOption[] = []
  return frames.reduce((total, current) => {
    const unit = extractUnit(feature.properties.id) ?? ""
    const url = INTERNAL__getUnitImageUrlGivenBase(baseUrl, configuration, session, unit, current.time)
    const transformed = isAppLanelineFrame(current)
      ? INTERNAL__transformFrameForSegment(current, url)
      : INTERNAL__transformFrameForSign(current, unit, url)

    total.push(transformed)
    return total
  }, context)
}

function INTERNAL__transformFrameForSegment(row: AppLanelineFrame, url: string): AuditImageContext {
  const frame = row.time
  const lat = row.latitude
  const lng = row.longitude

  return {
    frame,
    lat,
    lng,
    url,
    ...row,
  } satisfies AuditImageContext
}

function INTERNAL__transformFrameForSign(row: AppLanelineFrameSign, unit: string, url: string): AuditImageContextExtended {
  const frame = row.time
  const lat = row.latitude
  const lng = row.longitude

  return {
    frame,
    lat,
    lng,
    time: frame,
    lrs: row.lrs,
    heading: row.heading,
    speed: row.speed,
    line_score_left: 0,
    line_score_right: 0,
    unit,
    url,
  } satisfies AuditImageContextExtended
}

/**
  * Lightweight schema match between AppLanelineFrame && AppLanelineFrameSign
  */
function isAppLanelineFrame(row: AppLanelineFrame | AppLanelineFrameSign): row is AppLanelineFrame {
  return "curvature_fine_left" in row && "curvature_coarse_left" in row && "curvature_coarse_right" in row && "visual_state_left" in row && "visual_state_right" in row && "geom_state_right" in row && "geom_state_right" in row && "overall_state_left" in row && "overall_state_right" in row
}
