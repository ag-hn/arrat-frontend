"use client"

import colors from "tailwindcss/colors";

import { type LatLng, type PathOptions } from "leaflet";

import { Text } from "@/components/typeography/text";
import { useSessionBins } from "@/features/session-viewer/hooks/viewer/use-session-bins";
import { useFilteredSessionGeojson } from "@/features/session-viewer/hooks/viewer/use-filtered-geojson";
import { useSessionAndAuditRouter } from "@/features/session-viewer/hooks/use-session-and-audit-router";
import { isAppSegmentFeature, isAppSignFeatureV1, isAppSignFeatureV2, isSegmentProperties, isSignProperties, scoreToSeverity, segmentFeatureToSeverity } from "@/lib/audit-utils";
import { type AppSegmentFeatureProps, type AppSignFeature, type AppSignFeatureProps } from "@/server/zod/schema.audit";
import { type AuditSeverity } from "@/types/map/feature";
import { type Feature, type Geometry } from "geojson";
import L from 'leaflet';
import { GeoJSON } from "react-leaflet";
import { type AppSessionsBin } from "@/server/zod/session.bins";

export function GeoJsonLoaderSession() {
  const { error, isLoading, data } = useFilteredSessionGeojson()
  const bins = useSessionBins()
  const geojson = data?.geojson
  const router = useSessionAndAuditRouter();

  if (error) {
    return (
      <Text
        className="container flex items-center justify-center"
        tint={"strong"}
        variant={"h2"}
        weight={"bold"}
      >
        ERROR: {error.message}
      </Text>
    );
  }

  if (isLoading || !geojson) {
    return <></>;
  }

  return (
    <GeoJSON
      key={JSON.stringify(geojson)}
      data={geojson}
      style={(f) => _getFeatureStyle(f, bins)}
      pointToLayer={INTERNAL__renderSignPointsAsMarker}
      eventHandlers={{
        click: (e) => {
          const props = e.propagatedFrom.feature.properties;
          if (isSignProperties(props)) {
            router.setFeature(props.id)
          } else if (isSegmentProperties(props)) {
            router.setFeature(props.id)
          }
        },
      }}
    />
  );
}
const severityMap: Record<AuditSeverity, PathOptions> = {
  "level low": {
    weight: 4,
    color: colors.red["600"],
  },
  "level medium": {
    weight: 4,
    color: colors.amber["500"],
  },
  "level high": {
    weight: 4,
    color: colors.emerald["500"],
  },
};

function _getFeatureStyle(feature: Feature<Geometry, AppSegmentFeatureProps | AppSignFeatureProps> | undefined, bin: AppSessionsBin): PathOptions {
  if (!feature) {
    return {};
  }

  if (isAppSignFeatureV1(feature)) {
    return severityMap[scoreToSeverity(feature.properties.score, bin)]
  }

  if (isAppSignFeatureV2(feature)) {
    return severityMap[scoreToSeverity(feature.properties.overall_score, bin)]
  }

  if (isAppSegmentFeature(feature)) {
    return severityMap[segmentFeatureToSeverity(feature, bin)]
  }

  return {};
}

function INTERNAL__renderSignPointsAsMarker(_geoJsonPoint: AppSignFeature, latlng: LatLng) {
  const marker = L.circleMarker(latlng, {
    radius: 6,
    className: "z-[100]"
  })

  return marker;
}

