import { assertNotAwsError } from "@/features/session-viewer/api/shared/assert-not-aws-error";
import { publicProcedure } from "@/server/api/trpc";
import { aws } from "@/server/aws/aws.facade";
import { endOfDay, startOfDay, subDays } from "date-fns";

const startOfToday = startOfDay(new Date());
const endOfToday = endOfDay(startOfToday);
const startOfOneDayAgo = subDays(startOfToday, 1);

export const procedure = publicProcedure.query(async () => {
  const res = await aws.getSessionPipelineExecutions({
    from: startOfOneDayAgo.toISOString(),
    to: endOfToday.toISOString(),
    statusFilter: "RUNNING",
  });

  assertNotAwsError(
    res,
    "Unable to get running sessions at this time. Try again at a later date.",
  );

  return res.data.executions;
});
