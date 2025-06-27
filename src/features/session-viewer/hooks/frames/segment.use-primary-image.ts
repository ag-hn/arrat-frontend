import { INTERNAL__getUnitImageUrlGivenBase } from "@/server/aws/shared";
import { type AppFeatureOption } from "@/server/zod/schema.audit";
import { useMemo } from "react";
import { useSessionAndAuditParams } from "../audit/use-audit-path-params";
import { useCurrentSessionDetails } from "../viewer/use-session-list";
import { useAllFramesRecord } from "./use-all-frames-record";
import { useConstants } from "./use-constants";
import { useLocalConfiguration } from "./use-local-configuration";

export function usePrimaryImageSegment(feature: AppFeatureOption, fallback?: string) {
  const params = useSessionAndAuditParams()
  const unit = feature.properties.unit ?? params.unit
  const { data: constants } = useConstants()
  const { data: localConfig } = useLocalConfiguration()
  const { data: sessionDetails } = useCurrentSessionDetails()
  const res = useAllFramesRecord(feature.properties.unit)
  const { data } = res
  return useMemo(() => {
    if (!localConfig) {
      return {
        url: '',
        res: res,
      }
    }

    if (!feature || !data) {
      return {
        url: localConfig.configuration.local_fallback_image_path,
        res: res,
      }
    }

    if (!unit || !constants || !sessionDetails?.files) {
      return {
        url: localConfig.configuration.local_fallback_image_path,
        res: res,
      }
    }

    const frame = data?.[0]
    if (!frame) {
      return {
        url: fallback
          ? INTERNAL__getUnitImageUrlGivenBase(constants.serverImagesUrl, sessionDetails.files, params.session, unit, fallback)
          : localConfig.configuration.local_fallback_image_path,
        res: res,
      }
    }

    return {
      url: INTERNAL__getUnitImageUrlGivenBase(constants.serverImagesUrl, sessionDetails.files, params.session, unit, frame.time),
      res: res,
    }

  }, [constants, data, fallback, feature, localConfig, params.session, res, sessionDetails?.files, unit])
}
