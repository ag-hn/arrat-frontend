import { type TODO } from "@/types/utility";
import { z, type ZodTypeAny } from "zod";
import { lanelineFrameSchema, sessionGeojsonSchema } from "./schema.audit";

function wrapDefaultAwsReturnSchema<TZod extends ZodTypeAny>(given: TZod) {
  return z.union([
    z.object({
      data: given,
    }),
    awsErrorResultSchema,
  ]);
}

/**
 * Shared
 */

const awsErrorResultSchema = z.object({
  error: z.string(),
});

export type AppAwsErrorResult = z.infer<typeof awsErrorResultSchema>;

const awsUnitDefinitionSchema = z.object({
    /**
     * The containing 'grouping' or 'folder' matching where the unit lives on the server.
     */
    session: z.string(),
    /**
     * The unit id
     */
    unit: z.string(),
  })

export type AppUnitDefinition = z.infer<typeof awsUnitDefinitionSchema>;

export const awsSessionVisibilitySchema = z.union([
  z.literal("visible"),
  z.literal("hidden"),
]);

const awsScoreBinsSchema = z.tuple([z.number(), z.number()]);

/**
 * Units
 */

const awsUnitsMetadataSchema = z.object({
  segment_score_bins: awsScoreBinsSchema,
})

const awsUnitsSchema = z.object({
  unit: z.string(),
  grouping: z.string(),
  created_at: z.string(),
  route: z.string().nullish(),
  start_mile_marker: z.number().nullish(),
  end_mile_marker: z.number().nullish(),
  direction: z.string().nullish(),
  depth: z.boolean().nullish(),
  unit_datetime: z.string().nullish(),

  metadata: awsUnitsMetadataSchema.nullish(),
});

/**
 * Units are grouped into when they were uploaded and recorded. This is a restriction
 * by the infrastructure since only units recorded at the same time can be used
 * to generate new sessions/start the pipeline together.
 */
const awsUnitsGroupingSchema = z.object({
  grouping: z.string(),
  created_at: z.string(),
  units: z.array(awsUnitsSchema)
});

export const awsUnitsGetAllResultSchema = wrapDefaultAwsReturnSchema(
  z.array(awsUnitsGroupingSchema),
);

export type AppAwsUnitsGrouping = z.infer<
  typeof awsUnitsGroupingSchema
>;
export type AppAwsUnitsGetAllResult = z.infer<
  typeof awsUnitsGetAllResultSchema
>;

const awsUnitFramesSchema = z.object({
  created_at: z.string(),
  unit: z.string(),
  frames: z.array(lanelineFrameSchema),
});

export const awsUnitsGetFramesByIdResultSchema =
  wrapDefaultAwsReturnSchema(awsUnitFramesSchema);

export type AppAwsUnit = z.infer<typeof awsUnitsSchema>;
export type AppAwsUnitsGetFramesByIdResult = z.infer<
  typeof awsUnitsGetFramesByIdResultSchema
>;

/**
 * Sessions
 */

const awsSessionsFilesSchema = z.object({
  base_directory: z.string(),
  session: z.string(),
  session_inputs: z.string(),
  unit_frames: z.string(),
  unit_images_base_directory: z.string(),
  unit_metadata: z.string(),
});

const awsSessionMetadataSchema = z.object({
  visibility: awsSessionVisibilitySchema,
  raw_name: z.string().nullish(),
  description: z.string().nullish(),
});

const awsSessionsSchema = z.object({
  session: z.string(),
  created_at: z.string(),

  metadata: awsSessionMetadataSchema.nullish(),

  score_threshold: z.number().nullish(),
  score_bins: awsScoreBinsSchema.nullish(),
  files: awsSessionsFilesSchema.nullish(),

  units: z.array(awsUnitDefinitionSchema),
});

export const awsSessionsGetAllResultSchema = wrapDefaultAwsReturnSchema(
  z.array(awsSessionsSchema),
);
export const awsSessionsGetSessionByIdResultSchema =
  wrapDefaultAwsReturnSchema(awsSessionsSchema);

export type AppAwsScoreBinsSchema = z.infer<typeof awsScoreBinsSchema>;
export type AppAwsSessionVisibility = z.infer<
  typeof awsSessionVisibilitySchema
>;
export type AppAwsSessionMetadata = z.infer<typeof awsSessionMetadataSchema>;
export type AppAwsSessionsFilesSchema = z.infer<typeof awsSessionsFilesSchema>;
export type AppAwsSessionDetails = z.infer<typeof awsSessionsSchema>;
export type AppAwsSessionsGetAllResult = z.infer<
  typeof awsSessionsGetAllResultSchema
>;
export type AppAwsSessionsGetSessionByIdResult = z.infer<
  typeof awsSessionsGetSessionByIdResultSchema
>;

const awsSessionGeojsonSchema = z.object({
  created_at: z.string(),
  session: z.string(),
  geojson: sessionGeojsonSchema,
});

export const awsSessionGetGeojsonByIdResultSchema = wrapDefaultAwsReturnSchema(
  awsSessionGeojsonSchema,
);
export type AppAwsSessionGetGeojsonByIdResult = z.infer<
  typeof awsSessionGetGeojsonByIdResultSchema
>;

export const awsSessionVisibilityPostBodySchema = z.object({
  visibility: awsSessionVisibilitySchema,
});

export const awsSessionVisibilityPostResponseSchema =
  wrapDefaultAwsReturnSchema(
    z.object({
      message: z.string(),
      session: z.object({
        id: z.string().nullish(),
        visibility: awsSessionVisibilitySchema.nullish(),
      }),
    }),
  );

export type AppAwsSessionVisibilityPostBody = z.infer<
  typeof awsSessionVisibilityPostBodySchema
>;
export type AppAwsSessionVisibilityPostResponse = z.infer<
  typeof awsSessionVisibilityPostResponseSchema
>;

export const awsGetSessionPipelineExecutionsQueryParamsSchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  maxResults: z.number().optional(),
  statusFilter: z.union([
    z.literal("RUNNING"),
    z.literal("SUCCEEDED"),
    z.literal("FAILED"),
    z.literal("TIMED_OUT"),
    z.literal("ABORTED"),
    z.literal("PENDING_REDRIVE"),
  ]).optional(),
});

export const awsExecutionStatusSchema = z.object({
  name: z.string(),
  status: z.string(),
  /**
   * Stop date of the execution if available, otherwise the start date of execution
   */
  date: z.string(),
});

export const awsGetSessionPipelineExecutionsResponseSchema =
  wrapDefaultAwsReturnSchema(
    z.object({
      executions: z.array(awsExecutionStatusSchema),
    }),
  );

export type AppAwsGetSessionPipelineExecutionsQueryParams = z.infer<
  typeof awsGetSessionPipelineExecutionsQueryParamsSchema
>;
export type AppAwsExecutionStatus = z.infer<typeof awsExecutionStatusSchema>;
export type AppAwsGetSessionPipelineExecutionsResponse = z.infer<
  typeof awsGetSessionPipelineExecutionsResponseSchema
>;

export const awsPostStartSessionPipelineBodySchema = z.object({
  session: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
  }),
  units: z.array(awsUnitDefinitionSchema),
});

export const awsExecutionResponseSchema = 
    z.object({
      message: z.string(),
      startDate: z.union([z.string(), z.number()]).nullish(),
      status: z.string(),
    })

export const awsPostStartSessionPipelineResponseSchema =
  wrapDefaultAwsReturnSchema(awsExecutionResponseSchema);

export type AppAwsPostStartSessionPipelineBody = z.infer<
  typeof awsPostStartSessionPipelineBodySchema
>;
export type AppAwsPostStartSessionPipelineResponse = z.infer<
  typeof awsPostStartSessionPipelineResponseSchema
>;

export function isAwsError(
  given: TODO,
): given is AppAwsErrorResult | Error | undefined {
  return (
    !given || given instanceof Error || "error" in given || !("data" in given)
  );
}
