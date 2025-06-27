import { publicProcedure } from "@/server/api/trpc";
import { aws } from "@/server/aws/aws.facade";
import { z } from "zod";
import { assertNotAwsError } from "../shared/assert-not-aws-error";

export const procedure = publicProcedure
  .input(z.object({
    unit: z.string().nullish(),
    session: z.string().nullish(),
  }))
  .query(async ({ input: { unit, session } }) => {
    if (!unit || !session) {
      return null;
    }

    const res = await aws.getUnitFramesById(session, unit)
    assertNotAwsError(res,  "Unable to get frames associated to unit. Ensure your connection is strong and the environment is set up correctly");
    return res.data.frames
  })