import { useSessionAndAuditParams } from "../audit/use-audit-path-params";
import { useUnfilteredSessionGeojson } from "../viewer/use-filtered-geojson";
import { useSessionStatistics } from "../viewer/use-session-statistics";

export function useIsValidSession() {
  const params = useSessionAndAuditParams()
  const { isLoading: geojsonLoading, error: geojsonError, data: geojson } = useUnfilteredSessionGeojson()
  const { isLoading: statisticsLoading, error: statisticsError, data: statistics } = useSessionStatistics()
  const errors = []
  !!geojsonError && errors.push(geojsonError)
  !!statisticsError && errors.push(statisticsError)

  return {
    isLoading: geojsonLoading || statisticsLoading,
    errors: errors,
    isValid: !geojsonLoading && !statisticsLoading && !!geojson && !!statistics && geojson.geojson.features.length > 1,
    session: params.session,
  }
}
