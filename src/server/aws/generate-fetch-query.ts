import { isAppSignFeatureV2 } from "@/lib/audit-utils";
import { type z } from "zod";
import { type AppConfigurartion } from "../zod/schema.audit";
import { type AppAwsGetSessionPipelineExecutionsQueryParams, type AppAwsGetSessionPipelineExecutionsResponse, type AppAwsPostStartSessionPipelineBody, type AppAwsPostStartSessionPipelineResponse, type AppAwsSessionGetGeojsonByIdResult, type AppAwsSessionVisibilityPostBody, type AppAwsUnitsGetAllResult, type AppAwsUnitsGetFramesByIdResult, awsGetSessionPipelineExecutionsResponseSchema, awsPostStartSessionPipelineResponseSchema, awsSessionGetGeojsonByIdResultSchema, awsUnitsGetAllResultSchema, awsUnitsGetFramesByIdResultSchema } from "../zod/schema.sessions";
import { validatedFetch } from "../zod/validated-fetch";
import { tryGetConfigurationResult } from "./shared";

import path from "path";
import { assertNotAwsError } from "@/features/session-viewer/api/shared/assert-not-aws-error";

type INTERNAL__GenerateBasicFetchProps<T extends z.ZodTypeAny> = Omit<Parameters<typeof validatedFetch<T>>["0"], "init">
type INTERNAL__GenerateFetchProps<T extends z.ZodTypeAny> = Omit<Parameters<typeof validatedFetch<T>>["0"], "init" | "url">
type GenerateBaseFetchProps<T extends z.ZodTypeAny> = INTERNAL__GenerateFetchProps<T> & { url: (config: AppConfigurartion) => string, }

export function generateBaseFetchQuery<T extends z.ZodTypeAny>({
  schema,
  url,
}: GenerateBaseFetchProps<T>): () => Promise<z.infer<T>> {

  return async function baseFetch(): Promise<z.infer<T>> {
    const config = await tryGetConfigurationResult()
    const endpoint = url(config)

    return validatedFetch({ url: endpoint, schema: schema });
  }
}

type GenerateBasicFetchProps<T extends z.ZodTypeAny> = INTERNAL__GenerateBasicFetchProps<T>
export function generateBasicFetch<T extends z.ZodTypeAny>({
  schema,
  url
}: GenerateBasicFetchProps<T>): () => Promise<z.infer<T>> {

  return async function baseFetch(): Promise<z.infer<T>> {
    return validatedFetch({ url: url, schema: schema });
  }
}

type GenerateBasicSessionFetchProps<T extends z.ZodTypeAny> = INTERNAL__GenerateFetchProps<T> & { url: string, }
export function generateBasicSessionFetch<T extends z.ZodTypeAny>({
  schema,
  url
}: GenerateBasicSessionFetchProps<T>): (session: string) => Promise<z.infer<T>> {

  return async function baseFetch(session: string): Promise<z.infer<T>> {
    const endpoint = `${url}/${session}`
    return validatedFetch({ url: endpoint, schema: schema });
  }
}

type GenerateBasicEntityFetchProps<T extends z.ZodTypeAny> = INTERNAL__GenerateFetchProps<T> & { url: string, slug?: string }
export function generateBasicEntityFetch<T extends z.ZodTypeAny>({
  schema,
  url,
  slug,
}: GenerateBasicEntityFetchProps<T>): (entity: string) => Promise<z.infer<T>> {

  return async function baseFetch(entity: string): Promise<z.infer<T>> {
    const endpoint = slug ? `${url}/${entity}/${slug}` : `${url}/${entity}`
    return validatedFetch({ url: endpoint, schema: schema });
  }
}

type GenerateSessionVisibilityMutationPostProps<T extends z.ZodTypeAny> = INTERNAL__GenerateFetchProps<T> & { url: string }
export function generateSessionVisibilityMutationPostProps<T extends z.ZodTypeAny>({
  schema,
  url
}: GenerateSessionVisibilityMutationPostProps<T>): (body: AppAwsSessionVisibilityPostBody) => Promise<z.infer<T>> {

  return async function baseFetch(body: AppAwsSessionVisibilityPostBody): Promise<z.infer<T>> {
    return validatedFetch({
      url: url,
      schema: schema,
      init: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    });
  }
}

type GenerateEntityMutationPostProps<TReturn extends z.ZodTypeAny> = INTERNAL__GenerateFetchProps<TReturn> & { url: string, slug?: string }
export function generateEntityMutationPostProps<TReturn extends z.ZodTypeAny, TBody>({
  schema,
  url,
  slug,
}: GenerateEntityMutationPostProps<TReturn>): (entity: string, body: TBody) => Promise<z.infer<TReturn>> {
  return async function baseFetch(entity: string, body: TBody): Promise<z.infer<TReturn>> {
    const endpoint = slug ? `${url}/${entity}/${slug}` : `${url}/${entity}`
    return validatedFetch({
      url: endpoint,
      schema: schema,
      init: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    });
  }
}

export function generateGetSessionUnitFramesById({
  url,
}: Omit<INTERNAL__GenerateFetchProps<typeof awsUnitsGetFramesByIdResultSchema>, "schema"> & {
  url: string,
}
): (session: string, unit: string) => Promise<AppAwsUnitsGetFramesByIdResult> {
  return async function getAllUnits(session: string, unit: string): Promise<AppAwsUnitsGetFramesByIdResult> {
    const endpoint = path.join(url, 'sessions', session, 'units', unit, 'frames')
    return validatedFetch({
      url: endpoint,
      schema: awsUnitsGetFramesByIdResultSchema,
      init: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    });
  };
}

export function generateGetSessionUnitById({
  url,
}: Omit<INTERNAL__GenerateFetchProps<typeof awsUnitsGetAllResultSchema>, "schema"> & {
  url: string,
}
): (session: string, unit: string) => Promise<AppAwsUnitsGetAllResult> {
  return async function getAllUnits(session: string, unit: string): Promise<AppAwsUnitsGetAllResult> {
    const endpoint = path.join(url, 'sessions', session, 'units', unit)
    return validatedFetch({
      url: endpoint,
      schema: awsUnitsGetAllResultSchema,
      init: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    });
  };
}

export function generateGetSessionPipelineExecutions({
  url,
}: Omit<INTERNAL__GenerateFetchProps<typeof awsGetSessionPipelineExecutionsResponseSchema>, "schema"> & {
  url: string,
}
): (given: AppAwsGetSessionPipelineExecutionsQueryParams) => Promise<AppAwsGetSessionPipelineExecutionsResponse> {
  return async function getSessionPipelineExecutions(
    given: AppAwsGetSessionPipelineExecutionsQueryParams,
  ): Promise<AppAwsGetSessionPipelineExecutionsResponse> {
    const params = new URLSearchParams({
    })

    if (given.from) params.append('from', given.from)
    if (given.to) params.append('to', given.to)
    if (given.statusFilter) params.append('statusFilter', given.statusFilter)
    if (given.maxResults) params.append('maxResults', `${given.maxResults}`)

    const endpoint = params ? `${url}?${params.toString()}` : url
    return validatedFetch({
      url: endpoint,
      schema: awsGetSessionPipelineExecutionsResponseSchema,
      init: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    });
  };
}

export function generatePostStartSessionPipeline({
  url,
}: Omit<INTERNAL__GenerateFetchProps<typeof awsPostStartSessionPipelineResponseSchema>, "schema"> & {
  url: string,
}
): (given: AppAwsPostStartSessionPipelineBody) => Promise<AppAwsPostStartSessionPipelineResponse> {
  return async function getSessionPipelineExecutions(
    given: AppAwsPostStartSessionPipelineBody,
  ): Promise<AppAwsPostStartSessionPipelineResponse> {
    return validatedFetch({
      url: url,
      schema: awsPostStartSessionPipelineResponseSchema,
      init: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(given),
      },
    });
  };
}

/**
 * This method was created to address a change in requirements where the format for sign IDs was modified, removing crucial information that the system relied on.
 * It queries the geojson data and updates the ID of new signs by appending the unit and 'sign' prefix to the numeric ID.
 * This ensures that the system can continue to function correctly with the updated ID format.
 */
export function generateTransformedGeojsonResponse({
  url: url,
}: Omit<INTERNAL__GenerateFetchProps<typeof awsSessionGetGeojsonByIdResultSchema>, "schema"> & {
  url: string,
}
): (entity: string) => Promise<AppAwsSessionGetGeojsonByIdResult> {
  return async function getTransformedGeojson(
    entity: string,
  ): Promise<AppAwsSessionGetGeojsonByIdResult> {
    const endpoint = `${url}/${entity}/geojson`
    const res = await validatedFetch({ url: endpoint, schema: awsSessionGetGeojsonByIdResultSchema });
    assertNotAwsError(res, "GEOJSON ERROR: Could not get valid geojson from server.")

  const transformedCollection = res.data.geojson.features.map((f) => {
    if (!isAppSignFeatureV2(f)) {
      return f;
    }

    const needsIdTransformation = /^\d+$/.test(f.properties.id);
    if (!needsIdTransformation) {
      return f
    }

    f.properties.id = `${f.properties.unit}-sign${f.properties.id}`;
    return f
  })
    
    res.data.geojson.features = transformedCollection
    
    return res;
  };
}
