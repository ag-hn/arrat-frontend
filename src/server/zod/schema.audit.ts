import { z } from "zod"

/**
 * configuration.json
 */

export const configurationSchema = z.object({
  remote_configuration_url: z.string().optional(),
  remote_configuration_file_name: z.string(),
  local_fallback_image_path: z.string(),
})

export type AppConfigurartion = z.infer<typeof configurationSchema>

/**
 * frontend_configuration.json
 */

const frontendConfigurationSessionsArray = z.array(z.string())

const frontendConfigurationSessionDetailsSchema = z.object({
  files: z.object({
    base_directory: z.string(),
    session: z.string(),
    session_map: z.string(),
    session_inputs: z.string(),
    unit_frames: z.string(),
    unit_metadata: z.string(),
    unit_images_base_directory: z.string()
  })
})

/**
 * Configuration file retrieved from server.
 * Contains list of all sessions and names of all files
 * within s3.
 */
export const frontendConfigurationResultSchema = z.object({
  sessions: frontendConfigurationSessionsArray,
  details: z.record(z.string(), frontendConfigurationSessionDetailsSchema)
})

export type AppFrontendConfigurartionResult = z.infer<typeof frontendConfigurationResultSchema>
export type AppFrontendConfigurartionSessionsArray = z.infer<typeof frontendConfigurationSessionsArray>
export type AppFrontendConfigurartionSessionDetails = z.infer<typeof frontendConfigurationSessionDetailsSchema>

/**
 * __session__/inputs.json from s3
 */

const sessionInputsSegmentScoreBinsSchema = z.array(z.number())

export const sessionInputsResultSchema = z.object({
  data_dir: z.string(),
  runname: z.string(),
  unitname: z.string(),
  meta_filename: z.string(),
  img_dirname: z.string(),
  gps_filename: z.string(),
  frames_filename: z.string(),
  segments_filename: z.string(),
  map_filename: z.string(),
  lrs_file: z.string(),
  true_signs: z.string(),
  path_spacing: z.number(),
  path_spacing_max: z.number(),
  smoothing_coarse: z.number(),
  smoothing_fine: z.number(),
  radius_threshold: z.number(),
  segment_length: z.number(),
  clrnet_dirname: z.string(),
  crop_images: z.object({
    top: z.number(),
    left: z.number(),
    width: z.number(),
    height: z.number()
  }),
  resize_images: z.object({ width: z.number(), height: z.number() }),
  clrnet_images_dir: z.string(),
  clrnet_results_dir: z.string(),
  segmask_dirname: z.string(),
  size_freespace: z.object({ width: z.number(), height: z.number() }),
  freespace_margin: z.number(),
  freespace_threshold: z.number(),
  ego_slope_threshold: z.number(),
  marker_base_link: z.number(),
  marker_width: z.number(),
  marker_contrast_threshold: z.number(),
  cal_data: z.object({
    w: z.number(),
    h: z.number(),
    u1: z.number(),
    v1: z.number(),
    u2: z.number(),
    v2: z.number(),
    u3: z.number(),
    v3: z.number(),
    u4: z.number(),
    v4: z.number(),
    um: z.number(),
    vm: z.number(),
    left_offset: z.number(),
    right_offset: z.number(),
    lane_marker_span: z.number()
  }),
  segment_score_bins: sessionInputsSegmentScoreBinsSchema,
  moving_window: z.number(),
  score_threshold: z.number(),
  score_age_tol: z.number(),
  length_stdev_threshold: z.number(),
  length_age_tol: z.number(),
  NNmodel_dir: z.string(),
  input_dir: z.string(),
  ImageProc_dirname: z.string(),
  img_dir: z.string(),
  dep_dir: z.string(),
  signs_results_filename: z.string(),
  geojson_name: z.string(),
  fx: z.number(),
  fy: z.number(),
  cx: z.number(),
  cy: z.number(),
  valid_bbox_area: z.number(),
  valid_cluster: z.number(),
  ZED_GPS_DIST: z.number(),
  confidence: z.number(),
  VALID_DEPTH_RANGE_min: z.number(),
  VALID_DEPTH_RANGE_max: z.number(),
  img_size_u: z.number(),
  img_size_v: z.number()
})

export type AppSessionInputsResult = z.infer<typeof sessionInputsResultSchema>
export type AppSessionInputsSegmentScoreBins = z.infer<typeof sessionInputsSegmentScoreBinsSchema>

/**
 * __session__/session_map.json from s3
 */

const lanesMapSchema = z.object({
  direction: z.string(),
  id: z.number(),
  lrs_start: z.number(),
  lrs_end: z.number(),
})

export const sessionMapSchema = z.object({
  road: z.string(),
  road_lrs_range: z.array(z.number()),
  lrs_atom: z.string(),
  lanes: z.array(lanesMapSchema),
})

/**
 * frames.json
 */

export const lanelineFrameSchema = z.object({
  time: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  lrs: z.number(),
  dist: z.number(),
  heading: z.number(),
  path_increment: z.number(),
  time_increment: z.number(),
  line_valid_left: z.boolean(),
  line_valid_right: z.boolean(),
  line_offset_left: z.number(),
  line_offset_right: z.number(),
  line_score_left: z.number(),
  line_score_right: z.number(),
  line_length_left: z.number(),
  line_length_right: z.number(),
  curvature_coarse_left: z.number(),
  curvature_fine_left: z.number(),
  curvature_coarse_right: z.number(),
  curvature_fine_right: z.number(),
  visual_state_left: z.number(),
  visual_state_right: z.number(),
  geom_state_left: z.number(),
  geom_state_right: z.number(),
  curv_state_left: z.number(),
  curv_state_right: z.number(),
  overall_state_left: z.number(),
  overall_state_right: z.number(),
});

export const lanelineFrameResultSchema = z.object({
  laneline_frames: z.array(lanelineFrameSchema)
})

export type AppLanelineFrame = z.infer<typeof lanelineFrameSchema>
export type AppLanelineFrameResult = z.infer<typeof lanelineFrameResultSchema>

const lanelineFrameSignSchema = z.object({
  time: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  lrs: z.number(),
  heading: z.number(),
  speed: z.number(),
  path_increment: z.number(),
  time_increment: z.number()
})

export const lanelineFrameSignResultSchema = z.object({
  laneline_frames: z.array(lanelineFrameSignSchema)
})

export type AppLanelineFrameSign = z.infer<typeof lanelineFrameSignSchema>
export type AppLanelineFrameSignResult = z.infer<typeof lanelineFrameSignResultSchema>

/**
 * Session features (Segments / Sign) Results
 */

const laneLineMetricsSummarySchema = z.array(
          z.object({
            name: z.string(),
            score: z.number(),
            distribution: z.object({
              score_bins: z.array(z.number()),
              segment_count: z.array(z.number()),
              segment_dist: z.array(z.number())
            })
          })
        )

const signSummarySchemaV1 = z.object({
  "Number of standard speed limit signs": z.number(),
  "Number of variable speed limit signs": z.number(),
  "Average score": z.number(),
  score_bins: z.array(z.number()),
  sign_count: z.array(z.number())
})

const signSummarySchemaV2 = z.object({
          "Number of speed limit signs": z.number(),
          "Average score": z.number(),
          score_bins: z.array(z.number()),
          sign_count: z.array(z.number())
        })

/**
 * @deprecated - legacy property schema. Migrate to schema.audit/featureSummarySchema
 */
export const featureSummarySchemaV1 = z.object({
  total_lane_miles: z.number(),
  audited_lrs_range: z.number(),
  audited_percent: z.number(),
  audited_frames: z.number(),
  audited_segments: z.number(),
  audited_standard_signs: z.number().optional(),
  audited_variable_signs: z.number().optional(),
  overall_score: z.number(),
  overall_sign_score: z.number().optional(),
  laneline_metrics: laneLineMetricsSummarySchema,
  sign_metrics: signSummarySchemaV1,
})

export const featureSummarySchemaV2 = z.object({
  audited_frames: z.number(),
  audited_segments: z.number(),
  overall_score: z.number(),
  laneline_metrics: laneLineMetricsSummarySchema,
  sign_metrics: signSummarySchemaV2,
});

const segmentAndAuditTypeSchema = z.union([
  z.literal("segment"),
  z.literal("Standard_Speed_Limit"),
  z.literal("Variable_Speed_Limit")
])

export const segmentColorsSchema = z.union([
  z.literal("yellow"),
  z.literal("orange"),
  z.literal("red")
])

const segmentFeatureStartEndSchema = z.object({
  index: z.number(),
  lrs: z.number(),
  latitude: z.number(),
  longitude: z.number()
})

export const segmentFeaturePropsSchema = z.object({
  type: segmentAndAuditTypeSchema,
  id: z.string(),
  segment_index: z.number(),
  unit: z.string(),
  color: z.string(),
  lrs_span: z.number(),
  total_frames: z.number(),
  frame_distance: z.number(),
  start: segmentFeatureStartEndSchema,
  end: segmentFeatureStartEndSchema,
});

const signAndSegmentLanelineMetricSchema = z.object({ name: z.string(), score: z.number() })

const segmentFeatureSchema = z.object({
  type: z.literal("Feature"),
  segment_index: z.number(),
  properties: segmentFeaturePropsSchema,
  geometry: z.object({
    type: z.literal("LineString"),
    width: z.number(),
    coordinates: z.array(z.array(z.number())),
    timestamps: z.array(z.unknown()).optional()
  }),
  laneline_metrics: z.array(
    signAndSegmentLanelineMetricSchema
  ).optional()
})
export const signColorsSchema = z.union([z.literal("blue"), z.literal("red")])

/**
 * @deprecated - legacy property schema. Migrate to schema.audit/signFeaturePropsSchema
 */
export const signFeaturePropsSchemaV1 = z.object({
  type: segmentAndAuditTypeSchema,
  timestamp: z.string(),
  id: z.string(),
  unit: z.string(),
  color: signColorsSchema,
  lrs: z.number(),
  roi_x: z.number(),
  depth: z.number(),
  score: z.number()
})

export const signFeaturePropsSchemaV2 = z.object({
  timestamp: z.string(),
  id: z.string(),
  unit: z.string(),
  color: z.string(),
  lrs: z.number(),
  roi_x: z.number(),
  depth: z.number(),
  overall_score: z.number(),
  legibility_time_score: z.number().nullish(),
  conspicuity_score: z.number().nullish(),
  glance_legibility_score: z.number().nullish(),
  understandability_score: z.number().nullish(),
  legibility_time: z.number(),
  conspicuity: z.number(),
  glance_legibility: z.number(),
  understandability: z.number(),
  side: z.string(),
  info: z.string(),
});

/**
 * @deprecated - legacy property schema. Migrate to schema.audit/signFeatureSchema
 */
export const signFeatureSchemaV1 = z.object({
  type: z.literal("Feature"),
  segment_index: z.number(),
  properties: signFeaturePropsSchemaV1,
  geometry: z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.number())
  }),
  sign_metrics: z.array(
    signAndSegmentLanelineMetricSchema
  ).optional()
})

export const signFeatureSchemaV2 = z.object({
  type: z.literal("Feature"),
  properties: signFeaturePropsSchemaV2,
  geometry: z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.number())
  }),
})

export const sessionGeojsonSchema = z.object({
  type: z.literal("FeatureCollection"),
  summary: z.union([featureSummarySchemaV1, featureSummarySchemaV2]),
  features: z.array(
    z.union([
      segmentFeatureSchema,
      z.union([signFeatureSchemaV1, signFeatureSchemaV2]),
    ]),
  ),
});

export type AppSessionGeojson = z.infer<typeof sessionGeojsonSchema>

/**
 * @deprecated - legacy property schema. Migrate to schema.audit/AppSignFeatureProps
 */
export type AppSignFeaturePropsV1 = z.infer<typeof signFeaturePropsSchemaV1>
export type AppSignFeaturePropsV2 = z.infer<typeof signFeaturePropsSchemaV2>
export type AppSignFeatureProps = AppSignFeaturePropsV1 | AppSignFeaturePropsV2

/**
 * @deprecated - legacy property schema. Migrate to schema.audit/AppSignFeature
 */
export type AppSignFeatureV1 = z.infer<typeof signFeatureSchemaV1>
export type AppSignFeatureV2 = z.infer<typeof signFeatureSchemaV2>
export type AppSignFeature = AppSignFeatureV1 | AppSignFeatureV2

export type AppSegmentFeatureStartEnd = z.infer<typeof segmentFeatureStartEndSchema>
export type AppSegmentFeatureProps = z.infer<typeof segmentFeaturePropsSchema>
export type AppSegmentFeature = z.infer<typeof segmentFeatureSchema>

/**
 * @deprecated - legacy property schema. Migrate to schema.audit/AppFeatureSummary
 */
export type AppFeatureSummaryV1 = z.infer<typeof featureSummarySchemaV1>
export type AppFeatureSummaryV2 = z.infer<typeof featureSummarySchemaV2>
export type AppFeatureSummary = AppFeatureSummaryV1 | AppFeatureSummaryV2

export type AppSignAndSegmentLaneLineMetric = z.infer<typeof signAndSegmentLanelineMetricSchema>
export type AppLaneLineMetricsSummary = z.infer<typeof laneLineMetricsSummarySchema>

/**
 * @deprecated - legacy property schema. Migrate to schema.audit/AppSignSummary
 */
export type AppSignSummaryV1 = z.infer<typeof signSummarySchemaV1>
export type AppSignSummaryV2 = z.infer<typeof signSummarySchemaV2>
export type AppSignSummary = AppSignSummaryV1 | AppSignSummaryV2

export type AppSegmentColors = z.infer<typeof segmentColorsSchema>
export type AppSignColors = z.infer<typeof signColorsSchema>
export type AppColorsOption = AppSegmentColors | AppSignColors

export type AppFeatureOption = AppSignFeature | AppSegmentFeature

export type AppSessionMap = z.infer<typeof sessionMapSchema>
