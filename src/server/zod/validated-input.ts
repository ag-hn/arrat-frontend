/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { ValidateConfig } from "@/server/zod/validator";
import { validateSchema } from "@/server/zod/validator";
import session from 'public/input/configuration.json';
import type { z } from "zod";
import { type AppConfigurartion, configurationSchema } from "./schema.audit";

export type ValidatedFetchProps<T extends z.ZodTypeAny> = Pick<ValidateConfig<T>, "schema">

export async function validatedConfiguration(): Promise<AppConfigurartion | undefined | Error | string> {
  try {
    const validated = validateSchema({ dto: session, schema: configurationSchema, schemaName: "LOCAL_CONFIGURATION_INPUT_FILE" });
    return validated;
  } catch (e) {
    if (e instanceof Error || typeof e === 'string') {
      return e
    }
  }

  return undefined;
}

