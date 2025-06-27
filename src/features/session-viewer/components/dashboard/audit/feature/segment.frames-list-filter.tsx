"use client"

import { MultiSelect } from "@/components/ui/multi-select";
import { FRAME_SCORE_OPTIONS, useFrameScoreFilter } from "@/features/session-viewer/hooks/filters/use-frame-score-filter";
import { type ComponentClassName } from "@/types/utility";

export function FeatureFilter({ className }: ComponentClassName) {
  const { value, set } = useFrameScoreFilter();

  return (
    <MultiSelect
      title="Scores"
      selectedOptions={value}
      className={className}
      onSelectionChanged={(value: string[]) => set(value)}
      options={FRAME_SCORE_OPTIONS}
    />
  );
}
