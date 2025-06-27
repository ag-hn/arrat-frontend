import { assertNotAwsError } from "@/features/session-viewer/api/shared/assert-not-aws-error";
import { publicProcedure } from "@/server/api/trpc";
import { aws } from "@/server/aws/aws.facade";
import { transformUnitsGroupingList } from "../transformers/transformer.session";

export const procedure = publicProcedure
  .query(async () => {
    const units = await aws.getUnits();

    assertNotAwsError(units, "Unable to grab units from server. Try again.")

    return transformUnitsGroupingList(units.data)
  })