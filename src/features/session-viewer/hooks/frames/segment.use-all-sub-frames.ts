import { getFrameScoreValueCheck } from "@/features/session-viewer/hooks/filters/use-frame-score-filter";
import { type AuditImageContext, type AuditImageContextExtended } from "@/server/api/trpc";
import { useMemo } from "react";
import { useSessionAndAuditParams } from "../audit/use-audit-path-params";
import { useSelectedFeature } from "../viewer/use-selected-feature";
import { INTERNAL__getAssociatedFrameRecords, useAllFramesRecord } from "./use-all-frames-record";
import { useConstants } from "./use-constants";
import { useCurrentSessionDetails } from "../viewer/use-session-list";

type INTERNAL__Filter = {
  scores: string[]
}

export function useAllSubFramesSegment(
  filter?: INTERNAL__Filter
) {
  const params = useSessionAndAuditParams()
  const { data: constants } = useConstants()
  const { data: feature } = useSelectedFeature()
  const { data: sessionDetails } = useCurrentSessionDetails()
  const res = useAllFramesRecord()
  const { data } = res
  return useMemo(() => {
    if (!data || !feature || !constants?.serverImagesUrl || !sessionDetails?.files) {
      return {
        res: res,
        frames: []
      };
    }

    const expected = INTERNAL__getAssociatedFrameRecords(constants.serverImagesUrl, sessionDetails.files, params.session, feature.feature, data)
    if (!expected) {
      return {
        res: res,
        frames: []
      };
    }

    return {
      res: res,
      frames: filterFrames({ frames: expected, filter: filter })
    };
  }, [constants?.serverImagesUrl, data, feature, filter, params.session, res, sessionDetails?.files])
}

function filterFrames({ frames, filter }: { filter?: INTERNAL__Filter, frames: (AuditImageContext | AuditImageContextExtended)[] }) {
  if (!filter?.scores) {
    return frames;
  }

  const { scores } = filter;

  if (scores.length <= 0) {
    return frames;
  }

  const checks = scores.map(getFrameScoreValueCheck)

  return frames.filter((f) => {
    const check = checks.find((c) => c(f.line_score_left) || c(f.line_score_right))
    return !!check
  })
}

