import { env } from "@/env";
import { logger } from "@/lib/notifications/logger";
import { type z } from "zod";

export interface ValidateConfig<T extends z.ZodTypeAny> {
  dto: unknown;
  schema: T;
  schemaName: string;
}

export function validateSchema<T extends z.ZodTypeAny>(
  config: ValidateConfig<T>,
): z.infer<T> {
  const res = config.schema.safeParse(config.dto);
  const { success } = res

  if (success) {
    return config.dto;
  } else {
    const message = `API Validation Error: ${config.schemaName}`;
    captureError(message, {
      dto: config.dto,
      error: res.error,
    });

    throw new Error(message);
  }
}

function captureError(message: string, extra = {}): void {
  if (env.NODE_ENV === "development") {
    logger.error(message, extra);
  } else {
    // TODO: report to AWS/something else
  }
}

