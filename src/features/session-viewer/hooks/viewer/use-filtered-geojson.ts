import { INTERNAL__defaultTrpcClientSideParameters } from "@/lib/trpc";
import { api } from "@/trpc/react";
import { useSessionAndAuditParams } from "../audit/use-audit-path-params";
import { useFeatureFilter } from "../filters/use-filter-query-params";
import { useSummaryScoreFeatureFilterQueryParams } from "../filters/use-summary-score-filter-query-params";

export function useFilteredSessionGeojson() {
  const params = useSessionAndAuditParams()
  const selectedAuditName = params.id?.param;
  const { value } = useFeatureFilter()
  const { value: summaryFilterValue } = useSummaryScoreFeatureFilterQueryParams()

  const ret = api.session.geojson.useQuery(
    {
      session: params.session,
      selected: selectedAuditName,
      filter: {
        unit: value.segment,
        type: value.type,

        summaryFilter: summaryFilterValue,
      }
    }, INTERNAL__defaultTrpcClientSideParameters)

  return ret
}

export function useUnfilteredSessionGeojson() {
  const params = useSessionAndAuditParams()
  const ret = api.session.geojson.useQuery(
    {
      session: params.session,
    }
    , INTERNAL__defaultTrpcClientSideParameters)

  return ret
}
