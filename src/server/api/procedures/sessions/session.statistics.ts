import { publicProcedure } from "@/server/api/trpc";
import { aws } from "@/server/aws/aws.facade";
import { isAwsError } from "@/server/zod/schema.sessions";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

/**
 * Schema defined input for the query.
 */
const inputSchema = z.string()

export const procedure = publicProcedure
  .input(inputSchema)
  .query(async ({ input: session }) => {
    const [geojson, sessionDetails] = await Promise.all([
      aws.getSessionGeojsonById(session),
      aws.getSessionById(session),
    ])

    if (isAwsError(geojson)) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'given session.json is in the incorrect format',
        cause: geojson
      })
    }

    if (isAwsError(sessionDetails)) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'given session_map.json is in the incorrect format',
        cause: sessionDetails
      })
    }

    if (!geojson || !sessionDetails) {
      return null
    }

    return {
      statistics: geojson.data.geojson.summary,
      map: sessionDetails.data
    };
  })


