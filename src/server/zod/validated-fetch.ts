/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { z } from "zod";
import { validateSchema } from "@/server/zod/validator";
import type { ValidateConfig } from "@/server/zod/validator";
import { logger } from "@/lib/notifications/logger";


type __FetchArguments = Parameters<typeof fetch>

type ValidatedFetchPropsInternal = {
  url: __FetchArguments["0"],
  init?: __FetchArguments["1"]
}

export type ValidatedFetchProps<T extends z.ZodTypeAny> = Pick<ValidateConfig<T>, "schema"> & ValidatedFetchPropsInternal

export async function validatedFetch<T extends z.ZodTypeAny>({ url, schema, init = { method: 'GET' } }: ValidatedFetchProps<T>): Promise<z.infer<T>> {
  try {
    const res = await fetch(url, init);
    const json: unknown = await res.json()
    const validated = validateSchema({ dto: json, schema: schema, schemaName: typeof url === 'string' ? url : "schema request to url" });
    return validated;
  } catch (e) {
    logger.error(e)
  }

  return undefined;
}

