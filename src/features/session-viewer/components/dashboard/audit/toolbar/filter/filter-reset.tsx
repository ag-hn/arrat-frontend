"use client";

import { Button } from "@/components/primitives/button";
import { useFeatureFilter } from "@/features/session-viewer/hooks/filters/use-filter-query-params";
import { useSummaryScoreFeatureFilterQueryParams } from "@/features/session-viewer/hooks/filters/use-summary-score-filter-query-params";
import { cn } from "@/lib/utils";
import { INTERNAL__scoreIsNotDefaultAndWithinRange } from "./filter-scores-selects";

export function FilterReset() {
  const { reset, value } = useFeatureFilter();
  const { reset: resetScoresValue, value: scoresValue } = useSummaryScoreFeatureFilterQueryParams();

  return (
    <>
      <Button
        size={"sm"}
        variant={"ghost"}
        className={cn(
          "hidden",
          value.segment.length > 0 ||
            value.type.length > 0 ||
            INTERNAL__scoreIsNotDefaultAndWithinRange(scoresValue.signOverall) ||
            INTERNAL__scoreIsNotDefaultAndWithinRange(scoresValue.signUnderstandability) ||
            INTERNAL__scoreIsNotDefaultAndWithinRange(scoresValue.signLegibility) ||
            INTERNAL__scoreIsNotDefaultAndWithinRange(scoresValue.signConspicuity) ||
            INTERNAL__scoreIsNotDefaultAndWithinRange(scoresValue.lanelineCombined) ||
            INTERNAL__scoreIsNotDefaultAndWithinRange(scoresValue.lanelineConsistency) ||
            INTERNAL__scoreIsNotDefaultAndWithinRange(scoresValue.lanelineVisibility) ||
            INTERNAL__scoreIsNotDefaultAndWithinRange(scoresValue.lanelineDetection) ||
            INTERNAL__scoreIsNotDefaultAndWithinRange(scoresValue.lanelineCurvature)
            ? "flex flex-row gap-1"
            : "",
        )}
        onClick={() => {
          void reset().then(() => {
            void resetScoresValue()
          })
        }}
      >
        <span className="hidden sm:block">Reset</span>
        <span>x</span>
      </Button>
    </>
  );
}
