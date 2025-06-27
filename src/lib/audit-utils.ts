import { env } from "@/env";
import { type AuditImageContext, type AuditImageContextExtended } from "@/server/api/trpc";
import { type AppFeatureSummary, type AppFeatureSummaryV1, type AppFeatureSummaryV2, type AppSegmentFeature, type AppSegmentFeatureProps, type AppSignFeature, type AppSignFeatureProps, type AppSignFeaturePropsV1, type AppSignFeaturePropsV2, type AppSignFeatureV1, type AppSignFeatureV2, featureSummarySchemaV1, featureSummarySchemaV2, segmentFeaturePropsSchema, signFeaturePropsSchemaV1, signFeaturePropsSchemaV2, signFeatureSchemaV1, signFeatureSchemaV2 } from "@/server/zod/schema.audit";
import { type AppSessionsBin } from "@/server/zod/session.bins";
import { type AuditFeature, type AuditName, type AuditSeverity } from "@/types/map/feature";
import { type Feature, type Geometry } from "geojson";
import { type DeltaType } from "./visualizations";

export const INTERNAL__FRAME_URL_PARAM_DELIMITER = '_'

function INTERNAL__scoreToSeverity<TSeverity>(score: number, bin: AppSessionsBin, opts: {
  onLevelLow: TSeverity,
  onLevelMedium: TSeverity,
  onLevelHigh: TSeverity,
}): TSeverity {
  const weightedScore = score <= 1.0 ? score : score / 100.0

  if (weightedScore <= bin.levelLowBinBounds.max) {
    return opts.onLevelLow
  }

  if (weightedScore <= bin.levelMediumBinBounds.max) {
    return opts.onLevelMedium
  }

  return opts.onLevelHigh

}

/**
 * Maps audit color information from signs and to severity information
  */
export function scoreToSeverity(score: number, bin: AppSessionsBin): AuditSeverity {
  return INTERNAL__scoreToSeverity(score, bin, {
    onLevelLow: 'level low',
    onLevelMedium: 'level medium',
    onLevelHigh: 'level high',
  })
}

export function colorToSeverity(color: string): AuditSeverity {
  if (color === "blue") {
    return "level high";
  }

  if (color === "yellow") {
    return "level high";
  }

  if (color === "orange") {
    return "level medium";
  }

  return "level low";
}


/**
 * Maps audit color information from signs and to severity information
  */
export function segmentFeatureToSeverity(feature: AppSegmentFeature, bin: AppSessionsBin): AuditSeverity {
  if (!feature.laneline_metrics) {
    return colorToSeverity(feature.properties.color)
  }

  const averageScore = feature.laneline_metrics.reduce<number>((total, current) => total + current.score, 0) / feature.laneline_metrics.length
  return scoreToSeverity(averageScore, bin)
}

export function scoreToDeltaTypeSeverity(score: number, bin: AppSessionsBin): DeltaType {
  return INTERNAL__scoreToSeverity(score, bin, {
    onLevelLow: 'decrease',
    onLevelMedium: 'unchanged',
    onLevelHigh: 'increase',
  })
}

export function getAuditId(audit: AuditFeature) {
  return audit.properties.name
}

export function extractUnit(name: AuditName) {
  const potentialUnit = name?.split('-')[0]
  return potentialUnit ? potentialUnit : undefined
}

export function extractUnitAndSegment(audit: string): {
  unit?: string;
  segment?: string;
} {
  const split = audit.split("-");
  const unit = split[0]?.replace("unit", "");
  const segment = split[1]?.replace("segment", "");

  return {
    unit: unit,
    segment: segment,
  };
}

export function tryGetFrameUrl(audit: string, frame: AuditImageContext | AuditImageContextExtended | string | undefined) {
  const unit = extractUnit(audit) ?? ""
  return tryGetFrameUrlGivenUnit(unit, frame)
}

export function tryGetFrameUrlGivenUnit(unit: string, frame: AuditImageContext | AuditImageContextExtended | string | undefined) {
  if (!frame || !unit) {
    return '/mock/placeholder.png'
  }

  const frameName = typeof frame === 'string' ? frame : frame.frame
  return `${env.SERVER_IMAGES_URl}/${unit}/images/${frameName}.png`
}

export function isSignProperties(props: AppSignFeatureProps | AppSegmentFeatureProps): props is AppSignFeatureProps {
  return isSignPropertiesV2(props) || isSignPropertiesV1(props)
}

export function isSignPropertiesV2(props: AppSignFeatureProps | AppSegmentFeatureProps): props is AppSignFeaturePropsV2 {
  const parsed = signFeaturePropsSchemaV2.safeParse(props)
  if (!parsed.data) {
    return false;
  }

  return true;
}

export function isSignPropertiesV1(props: AppSignFeatureProps | AppSegmentFeatureProps): props is AppSignFeaturePropsV1 {
  const parsed = signFeaturePropsSchemaV1.safeParse(props)
  if (!parsed.data) {
    return false;
  }

  return true;
}

export function isSegmentProperties(props: AppSignFeatureProps | AppSegmentFeatureProps): props is AppSegmentFeatureProps {
  const parsed = segmentFeaturePropsSchema.safeParse(props)
  if (!parsed.data) {
    return false;
  }

  return true;
}

export function isAppSignFeature(feature: Feature<Geometry, unknown>): feature is AppSignFeature {
  return isAppSignFeatureV1(feature) || isAppSignFeatureV2(feature);
}

export function isAppSignFeatureV2(feature: Feature<Geometry, unknown>): feature is AppSignFeatureV2 {
  const parsed = signFeatureSchemaV2.safeParse(feature)
  if (!parsed.data) {
    return false;
  }

  return true;
}

export function isAppSignFeatureV1(feature: Feature<Geometry, unknown>): feature is AppSignFeatureV1 {
  const parsed = signFeatureSchemaV1.safeParse(feature)
  if (!parsed.data) {
    return false;
  }

  return true;
}

export function isAppFeatureSummaryV1(feature: AppFeatureSummary): feature is AppFeatureSummaryV1 {
  const parsed = featureSummarySchemaV1.safeParse(feature)
  if (!parsed.data) {
    return false;
  }

  return true;
}

export function isAppFeatureSummaryV2(feature: AppFeatureSummary): feature is AppFeatureSummaryV2 {
  const parsed = featureSummarySchemaV2.safeParse(feature)
  if (!parsed.data) {
    return false;
  }

  return true;
}

export function isAppSegmentFeature(feature: Feature<Geometry, unknown>): feature is AppSegmentFeature {
  const props: unknown = feature.properties
  if (typeof props !== 'object' || !props) {
    return false;
  }

  if ("type" in props && typeof props.type === 'string' && props.type !== 'segment') {
    return false;
  }

  return true;
}

const INTERNAL__METRIC_DESCRIPTION_BY_KEY: Record<string, string> = {
  "laneline_visibility": "How new or faded the lines are.",
  "laneline_consistency": "How straight and evenly spaced the lines are.",
  "laneline_detection": "The confidence of whether the line is a lane line.",
  "laneline_curvature": "How curved the roadway and the line are.",
  "laneline_combined": "Combined scoring when running all other laneline scores at the same time.",
  "sign_overall": "Combined scoring when running all other sign scores at the same time.",
  "conspicuity": "The ratio of true positive detections to all detections.",
  "understandability": "The ease with which camera-based systems can accurately detect and classify a type of sign of interest.",
  "glance_legibility": "The ability to accurately detect a sign using exactly one frame.",
}

export function getMetricDescriptionFromKey(key: string) {
  const potential = INTERNAL__METRIC_DESCRIPTION_BY_KEY[key]
  if (potential) {
    return potential
  }

  return "N/A"
}