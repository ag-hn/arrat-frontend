import { publicProcedure } from "@/server/api/trpc";
import { aws } from "@/server/aws/aws.facade";
import { sessionFormDataSchema } from "../../zod/schema.form";
import { assertNotAwsError } from "@/features/session-viewer/api/shared/assert-not-aws-error";
import { isAwsError } from "@/server/zod/schema.sessions";

export const procedure = publicProcedure
  .input(sessionFormDataSchema)
  .mutation(async ({ input }) => {
    const res = await aws.postStartSessionPipeline({
      session: {
        id: input.session_data.id,
        name: input.session_data.name,
        description: input.session_description,
      },
      units: input.session_related_unit_ids,
    });

    assertNotAwsError(
      res,
      res && isAwsError(res) ? res.error : 'Unable to create your session at this time. Try again at a later time. If this error persists, contact your system administrator.',
    );

    return res;
  });
