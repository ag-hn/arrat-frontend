import {
  type AppAwsErrorResult,
  isAwsError,
} from "@/server/zod/schema.sessions";
import { TRPCError } from "@trpc/server";

export function assertNotAwsError<TGiven>(
  given: TGiven | AppAwsErrorResult,
  message: string,
): asserts given is TGiven {
  if (isAwsError(given)) {
    throw new TRPCError({
      message,
      code: "INTERNAL_SERVER_ERROR",
      cause: given,
    });
  }
}
