import { publicProcedure } from "@/server/api/trpc";
import { aws } from "@/server/aws/aws.facade";
import { assertNotAwsError } from "../shared/assert-not-aws-error";

export const procedure = publicProcedure
  .query(async () => {
    const res = await aws.getSessionsFiltered()
    assertNotAwsError(res, "Unable to get sessions from server. Ensure your connection is strong and the environment is set up correctly");
    return res.data
  })
