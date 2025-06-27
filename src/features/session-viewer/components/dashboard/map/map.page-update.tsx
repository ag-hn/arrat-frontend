"use client"
import { useUnfilteredSessionGeojson } from "@/features/session-viewer/hooks/viewer/use-filtered-geojson";
import { useSelectedFeatureAndFilteredGeojson } from "@/features/session-viewer/hooks/viewer/use-selected-feature-and-filtered-geojson";
import { type FeatureCollection, type GeoJsonObject } from "geojson";
import { type FitBoundsOptions, geoJSON } from "leaflet";
import { useCallback, useEffect } from "react";
import { useMap } from "react-leaflet";

const INTERNAL__defaultFitBoundsOptions = { animate: true, padding: [25, 25] } satisfies FitBoundsOptions

/**
 * React Component to sync map position with current page content
 */
export function MapPageUpdates() {
  const map = useMap()

  const { isLoading, selected, geojson } = useSelectedFeatureAndFilteredGeojson()
  const { data: unfilteredGeojson } = useUnfilteredSessionGeojson()

  const fitBounds = useCallback((obj: GeoJsonObject | FeatureCollection | null) => {
    if (!obj || (INTERNAL__isFeatureCollection(obj) && obj.features.length === 0)) {
      return;
    }

    const geo = geoJSON(obj);
    map.fitBounds(geo.getBounds(), INTERNAL__defaultFitBoundsOptions);
  }, [map])

  useEffect(() => {
    if (!map || isLoading) {
      return;
    }

    if (selected?.feature) {
      fitBounds(selected.feature)
    } else if (geojson && geojson.features.length > 0) {
      fitBounds(geojson)
    } else if (unfilteredGeojson?.geojson) {
      fitBounds(unfilteredGeojson.geojson)
    }
  }, [fitBounds, geojson, isLoading, map, selected?.feature, unfilteredGeojson?.geojson]);

  return null;
}

function INTERNAL__isFeatureCollection(obj: GeoJsonObject | FeatureCollection): obj is FeatureCollection {
  return obj.type === 'FeatureCollection'
}
