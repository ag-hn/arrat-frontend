import { type MultiSelectPropsOption } from "@/components/ui/multi-select";
import { useScoreFilter } from "./use-filter-query-params";

export type FrameScoreOptionValue = (typeof FRAME_SCORE_OPTIONS)[number]['value']

export const FRAME_SCORE_OPTIONS = [
  {
    label: "< 25",
    value: "0",
  },
  {
    label: ">= 25, < 75",
    value: "1",
  },
  {
    label: ">= 75, < 100",
    value: "2",
  },
  {
    label: ">= 100, < 200",
    value: "3",
  },
  {
    label: ">= 200",
    value: "4",
  },
] as const satisfies MultiSelectPropsOption[]

const INTERNAL__FRAME_SCORE_OPTION_TO_VALUE_CHECK: Record<string, (value: number) => boolean> = {
  "0": (v) => v < 25,
  "1": (v) => v >= 25 && v < 75,
  "2": (v) => v >= 75 && v < 100,
  "3": (v) => v >= 100 && v < 200,
  "4": (v) => v >= 200,
} as const satisfies Record<FrameScoreOptionValue, (value: number) => boolean>

export function useFrameScoreFilter() {
  const [value, set] = useScoreFilter();

  return {
    set: (values: string[]) => set(values),
    value: value,
  }
}

export function getFrameScoreValueCheck(value: string) {
  const potential = INTERNAL__FRAME_SCORE_OPTION_TO_VALUE_CHECK[value]
  if (!potential) {
    return () => true;
  }

  return potential
}
