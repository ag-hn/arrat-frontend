import { publicProcedure } from "@/server/api/trpc";
import { aws } from "@/server/aws/aws.facade";
import { z } from "zod";
import { assertNotAwsError } from "../shared/assert-not-aws-error";

export const procedure = publicProcedure
  .input(z.string())
  .query(async ({ input: session }) => {
    const res = await aws.getSessionById(session)
    assertNotAwsError(res, "Unable to get session details. Ensure your connection is strong and the environment is set up correctly")
    return res.data;
  })
