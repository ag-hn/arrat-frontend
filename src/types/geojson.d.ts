import type { LineString as GeojsonLineString, Point as GeojsonPoint } from 'geojson';

declare module 'geojson' {
  type TimeStamp = unknown;

  interface LineString extends GeojsonLineString {
    "laneline_metrics"?: { name: string, score: number }[],
    segment_index?: number,
  }

  interface Point extends GeojsonPoint {
    segment_index?: number,
  }

}
