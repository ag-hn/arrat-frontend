import { publicProcedure } from "@/server/api/trpc";
import { aws } from "@/server/aws/aws.facade";
import { transformSessionEntryList } from "../transformers/transformer.session";
import { assertNotAwsError } from "@/features/session-viewer/api/shared/assert-not-aws-error";

export const procedure = publicProcedure
  .query(async () => {
    const [
      sessions,
      units
    ] = await Promise.all([
      aws.getSessionsWithDetails(),
      aws.getUnits(),
    ])

    assertNotAwsError(sessions, "Unable to grab sessions from server. Try again.")
    assertNotAwsError(units,  "Unable to grab session from server. Try again.")

    return transformSessionEntryList(sessions.data, units.data)
  })