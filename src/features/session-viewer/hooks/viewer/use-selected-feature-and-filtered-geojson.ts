import { useFilteredSessionGeojson } from "./use-filtered-geojson";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { type AuditPageRouteParams } from "@/types/pages";
import { type AppFeatureOption } from "@/server/zod/schema.audit";

type SelectedFeature = {
  feature: AppFeatureOption;
  prev?: AppFeatureOption;
  next?: AppFeatureOption;
  index: number;
};

export function useSelectedFeatureAndFilteredGeojson() {
  const ret = useFilteredSessionGeojson()
  const filteredGeojson = ret.data?.geojson

  const params = useParams<AuditPageRouteParams>()

  const selected = useMemo(() => {
    if (!filteredGeojson || !params) {
      return;
    }
    const currentlySelected = params.id;
    const selected = filteredGeojson.features.find(
      (f) => f.properties.id === currentlySelected,
    );

    if (selected) {
      const index = filteredGeojson.features.indexOf(selected);
      const next = filteredGeojson.features[index + 1]
      const prev = filteredGeojson.features[index - 1]
      return ({
        feature: selected,
        next: next,
        prev: prev,
        index: index,
      } satisfies SelectedFeature);
    } else {
      return (undefined);
    }
  }, [filteredGeojson, params]);

  return {
    isLoading: ret.isLoading,
    error: ret.error,
    selected: selected,
    geojson: filteredGeojson,
  }
}
