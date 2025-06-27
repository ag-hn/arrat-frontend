import type { Feature, FeatureCollection, Geometry, LineString, Point } from "geojson";

type LaneLineMetrics = {
  name: "laneline_visibility" | "laneline_consistency" | "laneline_detection" | "laneline_curvature" | "laneline_combined",
  score: number,
  distribution: {
    score_bins: number[],
    segment_count: number[],
    segment_dist: number[]
  }
}

type FeatureSummary = {
  total_lane_miles: number,
  audited_lrs_range: number,
  audited_percent: number,
  audited_frames: number,
  audited_segments: number,
  overall_score: number,
  laneline_metrics: LaneLineMetrics[],
  sign_metrics: {
    "Number of standard speed limit signs": number,
    "Number of variable speed limit signs": number,
    "Average score": number,
    score_bins: number[],
    sign_count: number[],
  }
}

export type AuditSeverity = "level low" | "level medium" | "level high";
export type AuditId = `${number}`;

export type AuditColors = "yellow" | "orange" | "red";
export type AuditDecimal = `${number}.${number}`;
export type AuditNumber = `${number}`;
export type AuditName = string;

export type AuditFeatuerProps = {
  name: AuditName;
  color: AuditColors;
  lrs_span: AuditDecimal;
  total_frames: AuditNumber;
  frame_distance: AuditDecimal;
  line_visibility_distance: AuditDecimal;
  line_visibility_score: AuditDecimal;
  line_consistency_distance: AuditDecimal;
  line_consistency_score: AuditDecimal;
  line_combined_distance: AuditDecimal;
  line_combined_score: AuditDecimal;
  line_curvature_distance: AuditDecimal;
  line_curvature_score: AuditDecimal;
  combined_score: AuditDecimal;
};

type SignIsCluster = 'yes' | 'no'
export type SignColor = 'blue' | 'red'

export type SignFeatureProps = {
  type: string,
  info: string,
  quality: number,
  ID: number,
  sub_ID: number[],
  filename: string,
  sub_filename: string[],
  speed: number[],
  bbox: number[][][]
  depth: number[],
  confidence: number[],
  roi_u: number[],
  roi_v: number[],
  roi_x: number[],
  color: SignColor,
  is_clustered: SignIsCluster
}

export type AuditFeature = Pick<Feature<Geometry, AuditFeatuerProps>,
  "geometry" | "type" | "properties"
>;

export type AuditGeoJson = FeatureCollection<LineString, AuditFeatuerProps>;

export type SignFeature = Pick<Feature<Geometry, SignFeatureProps>,
  "geometry" | "type" | "properties"
>;

export type SignGeoJson = FeatureCollection<Point, SignFeatureProps> & {
  summary: FeatureSummary
};

