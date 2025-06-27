import { useQueryStates, type UseQueryStatesKeysMap, type UseQueryStatesReturn } from "nuqs";
import { parseAsArrayOf, parseAsInteger } from 'nuqs/server'
import { useMemo } from "react";

export const SUMMARY_SCORE_FILTER_MAX_VALUE = 100
export const SUMMARY_SCORE_FILTER_MIN_VALUE = 0
export const SUMMARY_SCORE_FILTER_DEFAULT_VALUE: [number, number] = [SUMMARY_SCORE_FILTER_MIN_VALUE, SUMMARY_SCORE_FILTER_MAX_VALUE]

type LanelineFilterOption = "lanelineVisibility" | "lanelineConsistency" | "lanelineDetection" | "lanelineCurvature" | "lanelineCombined"
type SignFilterOption = "signOverall" | "signConspicuity" | "signLegibility" | "signUnderstandability"
type FilterOptions = LanelineFilterOption | SignFilterOption
const separator = ","
const parser = parseAsArrayOf(parseAsInteger, separator)
  .withDefault(SUMMARY_SCORE_FILTER_DEFAULT_VALUE)
  .withOptions({
    throttleMs: 5000,
    scroll: false,
    clearOnDefault: true,
  })

export type SummaryScoresFilter = Record<FeatureFilters, number[]>
export type SummaryLanelineScoresFilter = Pick<SummaryScoresFilter, LanelineFilterOption>
export type SummarySignScoresFilter = Pick<SummaryScoresFilter, SignFilterOption>

const FEATURE_FILTERS = {
  lanelineVisibility: parser,
  lanelineCombined: parser,
  lanelineConsistency: parser,
  lanelineCurvature: parser,
  lanelineDetection: parser,
  signOverall: parser,
  signConspicuity: parser,
  signLegibility: parser,
  signUnderstandability: parser,
} satisfies UseQueryStatesKeysMap<SummaryScoresFilter>

type FeatureFilterValues = UseQueryStatesReturn<typeof FEATURE_FILTERS>[0]

type FeatureFilters = FilterOptions
export function useSummaryScoreFeatureFilterQueryParams<
  TOption extends FeatureFilters | undefined = undefined,
  TValue = TOption extends undefined ? FeatureFilterValues : number[]
>(option?: TOption): {
  setFor: (option: FeatureFilters, values: number[]) => Promise<URLSearchParams>,
  setSigns: (values: SummarySignScoresFilter) => Promise<URLSearchParams>,
  setLaneline: (values: SummaryLanelineScoresFilter) => Promise<URLSearchParams>,
  set: (values: number[]) => Promise<URLSearchParams>,
  reset: () => Promise<URLSearchParams>,
  value: TValue,
  pendingValues: TValue,
} {
  const [filter, setFilters] = useQueryStates(FEATURE_FILTERS)

  return useMemo(() => ({
    setFor: (option: FeatureFilters, values: number[]) => setFilters((p) => {
      if (!option) {
        return p;
      }

      p[option] = values
      return p
    }),
    setLaneline: (values: SummaryLanelineScoresFilter) => setFilters((p) => {
      p.lanelineCombined = values.lanelineCombined;
      p.lanelineCurvature = values.lanelineCurvature;
      p.lanelineConsistency = values.lanelineConsistency;
      p.lanelineDetection = values.lanelineDetection;
      p.lanelineVisibility = values.lanelineVisibility;
      return p
    }),
    setSigns: (values: SummarySignScoresFilter) => setFilters((p) => {
      p.signOverall = values.signOverall;
      p.signConspicuity = values.signConspicuity;
      p.signLegibility = values.signLegibility;
      p.signUnderstandability = values.signUnderstandability;
      return p
    }),
    set: (values: number[]) => setFilters((p) => {
      if (!option) {
        return p;
      }

      p[option] = values
      return p
    }),
    reset: () => setFilters(null),
    value: (!option ? filter : filter[option]) as TValue,
    pendingValues: (!option ? INTERNAL__generateQuickCopy(filter) : INTERNAL__generateQuickCopy(filter[option])) as TValue,
  }), [filter, option, setFilters]);
}

function INTERNAL__generateQuickCopy<T>(given: T): T {
  return JSON.parse(JSON.stringify(given)) as T
}

