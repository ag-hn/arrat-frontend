import { assertNotAwsError } from "@/features/session-viewer/api/shared/assert-not-aws-error";
import { publicProcedure } from "@/server/api/trpc";
import { aws } from "@/server/aws/aws.facade";
import { z } from "zod";

export const procedure = publicProcedure
  .input(z.object({
    sessionId: z.string(),
    visibility: z.enum(["visible", "hidden"]),
  }))
  .mutation(async ({ input }) => {
    const res = await aws.postSessionVisibilityById(
      input.sessionId,
      {
        visibility: input.visibility
      }
    )

    assertNotAwsError(res, "Unable to update visibility at this time. Try again at a later date.")

    return res;
  })