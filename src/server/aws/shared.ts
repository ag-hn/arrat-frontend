import { env } from "@/env"
import { type AppConfigurartion } from "../zod/schema.audit"
import type { AppAwsSessionsFilesSchema } from "../zod/schema.sessions"
import { validatedConfiguration } from "../zod/validated-input"

type INTERNAL__ValidatedConfigurationResult = Awaited<ReturnType<typeof validatedConfiguration>>
let INTERNAL__statisticsResultCachedPromise: Promise<INTERNAL__ValidatedConfigurationResult> | undefined

function INTERNAL__cachedStatisticsResult(): Promise<INTERNAL__ValidatedConfigurationResult> {
  if (!INTERNAL__statisticsResultCachedPromise) {
    INTERNAL__statisticsResultCachedPromise = validatedConfiguration()
  }

  return INTERNAL__statisticsResultCachedPromise
}

export const INTERNAL__getFrontendConfigurationUrl = (configuration: AppConfigurartion) => `${env.SERVER_IMAGES_URl}/${configuration.remote_configuration_file_name}`

export const INTERNAL__getSessionInputsUrl = (configuration: AppAwsSessionsFilesSchema, session: string) => `${env.SERVER_IMAGES_URl}/${session}/${configuration.session_inputs}`
export const INTERNAL__getSessionGeojsonUrl = (configuration: AppAwsSessionsFilesSchema, session: string) => `${env.SERVER_IMAGES_URl}/${session}/${configuration.session}`

export const INTERNAL__getUnitFramesUrl = (configuration: AppAwsSessionsFilesSchema, session: string, unit: string) => `${env.SERVER_IMAGES_URl}/${session}/${unit}/${configuration.unit_frames}`
export const INTERNAL__getUnitImageUrl = (configuration: AppAwsSessionsFilesSchema, session: string, unit: string, frame: string) => `${env.SERVER_IMAGES_URl}/${session}/${unit}/${configuration.unit_images_base_directory}/${frame}.png`

export const INTERNAL__getUnitImageUrlGivenBase = (base: string, configuration: AppAwsSessionsFilesSchema, session: string, unit: string, frame: string) => `${base}/${session}/${unit}/${configuration.unit_images_base_directory}/${frame}.png`

export async function tryGetConfigurationResult() {
  const config = await INTERNAL__cachedStatisticsResult()
  if (!config || config instanceof Error || typeof config === 'string') {
    throw new Error(`tryGetConfigurationResult - local configuration file is not formatted correctly. Ensure that both \'remote_configuration_file_name\' and \'local_fallback_image_path\' are present and valid strings. ERROR: (${config instanceof Error ? config.message : config})`)
  }

  return config
}
