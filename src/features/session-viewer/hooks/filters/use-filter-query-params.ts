import { useQueryState, useQueryStates, type UseQueryStatesKeysMap, type UseQueryStatesReturn } from "nuqs";
import { parseAsArrayOf, parseAsString } from 'nuqs/server'

type FilterOptions = "segment" | "score" | "type"
const separator = "-"
const parser = parseAsArrayOf(parseAsString, separator)
  .withDefault([])
  .withOptions({
    throttleMs: 500,
    scroll: false,
  })

const FEATURE_FILTERS = {
  segment: parser,
  type: parser,
} satisfies UseQueryStatesKeysMap<Record<FeatureFilters, string[]>>

type FeatureFilterValues = UseQueryStatesReturn<typeof FEATURE_FILTERS>[0]

export function useScoreFilter() {
  return useQueryState('score', parser);
}

type FeatureFilters = Exclude<FilterOptions, "score">
export function useFeatureFilter<
  TOption extends FeatureFilters | undefined = undefined,
  TValue = TOption extends undefined ? FeatureFilterValues : string[]
>(option?: TOption): {
  set: (values: string[]) => Promise<URLSearchParams>,
  reset: () => Promise<URLSearchParams>,
  value: TValue
} {
  const [filter, setFilters] = useQueryStates(FEATURE_FILTERS)

  return {
    set: (values: string[]) => setFilters((p) => {
      if (!option) {
        return p;
      }

      p[option] = values
      return p
    }),
    reset: () => setFilters(null),
    value: (!option ? filter : filter[option]) as TValue
  };
}

