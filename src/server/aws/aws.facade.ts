import { env } from "@/env";
import {
  type AppAwsSessionVisibilityPostBody,
  awsSessionsGetAllResultSchema,
  awsSessionsGetSessionByIdResultSchema,
  awsSessionVisibilityPostResponseSchema,
  awsUnitsGetAllResultSchema
} from "../zod/schema.sessions";
import {
  generateBasicEntityFetch,
  generateBasicFetch,
  generateEntityMutationPostProps,
  generateGetSessionPipelineExecutions,
  generateGetSessionUnitFramesById,
  generatePostStartSessionPipeline,
  generateTransformedGeojsonResponse
} from "./generate-fetch-query";
import { tryGetConfigurationResult } from "./shared";

export const aws = {
  configuration: tryGetConfigurationResult,

  getSessions: generateBasicFetch({
    schema: awsSessionsGetAllResultSchema,
    url: `${env.SERVER_SESSION_API_BASE_URL}/sessions`,
  }),

  getSessionsFiltered: generateBasicFetch({
    schema: awsSessionsGetAllResultSchema,
    url: `${env.SERVER_SESSION_API_BASE_URL}/sessions?filter=visibility`,
  }),

  getSessionsWithDetails: generateBasicFetch({
    schema: awsSessionsGetAllResultSchema,
    url: `${env.SERVER_SESSION_API_BASE_URL}/sessions?include=params`,
  }),

  getSessionById: generateBasicEntityFetch({
    schema: awsSessionsGetSessionByIdResultSchema,
    url: `${env.SERVER_SESSION_API_BASE_URL}/sessions`,
  }),

  getSessionGeojsonById: generateTransformedGeojsonResponse({
    url: `${env.SERVER_SESSION_API_BASE_URL}/sessions`,
  }),

  getUnits: generateBasicFetch({
    schema: awsUnitsGetAllResultSchema,
    url: `${env.SERVER_SESSION_API_BASE_URL}/units`,
  }),

  getUnitFramesById: generateGetSessionUnitFramesById({
    url: env.SERVER_SESSION_API_BASE_URL
  }),

  postSessionVisibilityById: generateEntityMutationPostProps<typeof awsSessionVisibilityPostResponseSchema, AppAwsSessionVisibilityPostBody>({
    schema: awsSessionVisibilityPostResponseSchema,
    url: `${env.SERVER_SESSION_API_BASE_URL}/sessions`,
    slug: 'visibility',
  }),

  getSessionPipelineExecutions: generateGetSessionPipelineExecutions({
    url: `${env.SERVER_SESSION_API_BASE_URL}/pipelines`
  }),

  postStartSessionPipeline: generatePostStartSessionPipeline({
    url: `${env.SERVER_SESSION_API_BASE_URL}/pipelines`
  }),
} as const;
