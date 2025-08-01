import { assertNotAwsError } from "@/features/session-viewer/api/shared/assert-not-aws-error";
import { SUMMARY_SCORE_FILTER_DEFAULT_VALUE, SUMMARY_SCORE_FILTER_MAX_VALUE, SUMMARY_SCORE_FILTER_MIN_VALUE } from "@/features/session-viewer/hooks/filters/use-summary-score-filter-query-params";
import { isAppSegmentFeature, isSignProperties, isSignPropertiesV1, isSignPropertiesV2 } from "@/lib/audit-utils";
import { publicProcedure } from "@/server/api/trpc";
import { aws } from "@/server/aws/aws.facade";
import { type AppSegmentFeature, type AppSessionGeojson, type AppSignAndSegmentLaneLineMetric, type AppSignFeatureProps } from "@/server/zod/schema.audit";
import * as z from "zod";

export function INTERNAL__summaryScoreIsDefault(value: number[] | undefined) {
  if (value === undefined) {
    return true;
  }

  if (value.length !== 2 || value[0] === undefined || value[1] === undefined) {
    return true;
  }

  if (value[0] === SUMMARY_SCORE_FILTER_DEFAULT_VALUE[0] && value[1] === SUMMARY_SCORE_FILTER_DEFAULT_VALUE[1]) {
    return true;
  }

  return false;
}

function isEmptyFilters(filter: NonNullable<Input>["filter"]) {
  if (
    (!filter?.unit || filter.unit.length === 0) &&
    (!filter?.type || filter.type.length === 0) &&
    INTERNAL__summaryScoreIsDefault(filter?.summaryFilter?.signOverall) &&
    INTERNAL__summaryScoreIsDefault(filter?.summaryFilter?.signLegibilityScore) &&
    INTERNAL__summaryScoreIsDefault(filter?.summaryFilter?.signLegibility) &&
    INTERNAL__summaryScoreIsDefault(filter?.summaryFilter?.signUnderstandability) &&
    INTERNAL__summaryScoreIsDefault(filter?.summaryFilter?.signConspicuity) &&
    INTERNAL__summaryScoreIsDefault(filter?.summaryFilter?.lanelineCombined) &&
    INTERNAL__summaryScoreIsDefault(filter?.summaryFilter?.lanelineConsistency) &&
    INTERNAL__summaryScoreIsDefault(filter?.summaryFilter?.lanelineCurvature) &&
    INTERNAL__summaryScoreIsDefault(filter?.summaryFilter?.lanelineDetection) &&
    INTERNAL__summaryScoreIsDefault(filter?.summaryFilter?.lanelineVisibility)
  ) {
    return true;
  }

  return false;
}

function isEmptyInput(input: Input) {
  if (!input) {
    return true;
  }

  if (!input.selected &&
    isEmptyFilters(input.filter)
  ) {
    return true;
  }

  return false;
}

function INTERNAL__matchesSegmentScore(check: number[] | undefined, given: AppSignAndSegmentLaneLineMetric | undefined) {
  if (!check || !given?.score) {
    return true;
  }

  const min = check[0] ?? SUMMARY_SCORE_FILTER_MIN_VALUE;
  const max = check[1] ?? SUMMARY_SCORE_FILTER_MAX_VALUE;
  const givenWeighted = given.score * 100
  return givenWeighted >= min && givenWeighted <= max
}

function INTERNAL__matchesSignScore(
  check: number[] | undefined,
  score: number | undefined | null,
) {
  if (!check || !score) {
    return true;
  }

  const min = check[0] ?? SUMMARY_SCORE_FILTER_MIN_VALUE;
  const max = check[1] ?? SUMMARY_SCORE_FILTER_MAX_VALUE;
  const weightedScore = score * 100;
  return weightedScore >= min && weightedScore <= max;
}


function INTERNAL__matchesType(input: Input, type: 'sign' | 'segment') {
  const filter = input?.filter?.type;
  if (!filter || filter.length === 0) {
    return true;
  }
  return filter.includes(type)
}

function INTERNAL__matchesUnit(input: Input, id: string) {
  const filter = input?.filter?.unit;
  if (!filter || filter.length === 0) {
    return true;
  }
  return !!filter.find((f) => id.includes(f))
}


function INTERNAL__filterSign(input: Input, sign: AppSignFeatureProps) {
  if (!input || isEmptyInput(input)) {
    return true;
  }

  if (input.selected &&
    input.selected.length > 0 &&
    sign.id === input.selected) {
    return true;
  }

  if (isEmptyFilters(input.filter)) {
    return true;
  }

  return (
    INTERNAL__matchesUnit(input, sign.id) &&
    INTERNAL__matchesType(input, 'sign') &&
    (
      (isSignPropertiesV2(sign) && 
      INTERNAL__matchesSignScore(input.filter?.summaryFilter?.signOverall, sign.overall_score) &&
      INTERNAL__matchesSignScore(input.filter?.summaryFilter?.signLegibilityScore, sign.legibility_time_score) &&
      INTERNAL__matchesSignScore(input.filter?.summaryFilter?.signConspicuity, sign.conspicuity_score) &&
      INTERNAL__matchesSignScore(input.filter?.summaryFilter?.signUnderstandability, sign.understandability_score) &&
      INTERNAL__matchesSignScore(input.filter?.summaryFilter?.signLegibility, sign.glance_legibility_score)
    ) ||
      (isSignPropertiesV1(sign) &&
      INTERNAL__matchesSignScore(input.filter?.summaryFilter?.signOverall, sign.score)
    )
    )     
   )
}

function INTERNAL__filterSegment(input: Input, segment: AppSegmentFeature) {
  if (!input || isEmptyInput(input)) {
    return true;
  }

  if (input.selected &&
    input.selected.length > 0 &&
    segment.properties.id === input.selected) {
    return true;
  }

  if (isEmptyFilters(input.filter)) {
    return true;
  }

  return (
    INTERNAL__matchesUnit(input, segment.properties.id) &&
    INTERNAL__matchesType(input, 'segment') &&
    INTERNAL__matchesSegmentScore(
      input.filter?.summaryFilter?.lanelineCombined,
      segment.laneline_metrics?.find((m) => m.name === 'laneline_combined')
    ) &&
    INTERNAL__matchesSegmentScore(
      input.filter?.summaryFilter?.lanelineCurvature,
      segment.laneline_metrics?.find((m) => m.name === 'laneline_curvature')
    ) &&
    INTERNAL__matchesSegmentScore(
      input.filter?.summaryFilter?.lanelineConsistency,
      segment.laneline_metrics?.find((m) => m.name === 'laneline_consistency')
    ) &&
    INTERNAL__matchesSegmentScore(
      input.filter?.summaryFilter?.lanelineDetection,
      segment.laneline_metrics?.find((m) => m.name === 'laneline_detection')
    ) &&
    INTERNAL__matchesSegmentScore(
      input.filter?.summaryFilter?.lanelineVisibility,
      segment.laneline_metrics?.find((m) => m.name === 'laneline_visibility')
    )
  )
}

/** 
 * Transforms and returns given geojson feature collection with a filtered  
 * feature collection based on given input.
 * 
 * Segments and signs will be filtered out if severity or unit do not match
 *
 * Segments and signs will remain in the collection if they are selected
 *
 * __*Given geojson WILL BE MUTATED*__
 */
function INTERNAL__transformSessionFeatureCollection(input: Input, geojson: AppSessionGeojson) {
  if (!input || isEmptyInput(input)) {
    return geojson
  }

  const newFeatureCollection = geojson.features.filter((f) => {
    const props = f.properties;
    if (isSignProperties(props)) {
      return INTERNAL__filterSign(input, props)
    }

    if (isAppSegmentFeature(f)) {
      return INTERNAL__filterSegment(input, f)
    }

    return true;
  })

  newFeatureCollection.sort((a, b) => {
    if (
      "segment_index" in a && a.segment_index !== undefined && a.segment_index !== null && 
      "segment_index" in b && b.segment_index !== undefined && b.segment_index !== null
    ) {
      return a.segment_index - b.segment_index;
    }

    return 0;
  });

  return {
    features: newFeatureCollection,
    type: "FeatureCollection",
    summary: geojson.summary,
  } satisfies AppSessionGeojson
}

const summaryFilterOption = z.array(z.number()).optional()

/**
 * Schema defined input for the query.
 */
const inputSchema = z.object({
  filter: z.object({
    unit: z.array(z.string()).optional(),
    type: z.array(z.string()).optional(),

    summaryFilter: z.object({
      lanelineVisibility: summaryFilterOption,
      lanelineCombined: summaryFilterOption,
      lanelineConsistency: summaryFilterOption,
      lanelineCurvature: summaryFilterOption,
      lanelineDetection: summaryFilterOption,
      signOverall: summaryFilterOption,
      signLegibilityScore: summaryFilterOption,
      signUnderstandability: summaryFilterOption,
      signLegibility: summaryFilterOption,
      signConspicuity: summaryFilterOption,
    }).optional(),
  }).optional(),
  /**
   * Matches id on segment & sign properties
   */
  selected: z.string().optional(),

  /**
   * Matches currently selected session
   */
  session: z.string(),
})

export const procedure = publicProcedure
  .input(inputSchema)
  .query(async ({ input }) => {
    const res = await aws.getSessionGeojsonById(input.session);
    assertNotAwsError(res, 'given session.json is in the incorrect format')

    if (!res) {
      return null
    }

    return {
      geojson: INTERNAL__transformSessionFeatureCollection(input, res.data.geojson),
    };
  })

type Input = z.infer<typeof inputSchema>
