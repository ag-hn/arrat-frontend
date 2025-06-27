import { publicProcedure } from "@/server/api/trpc";
import { aws } from "@/server/aws/aws.facade";
import { isAwsError } from "@/server/zod/schema.sessions";
import type { AppSessionsBin } from "@/server/zod/session.bins";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

/**
 * Session id
 */
const inputSchema = z.string()

export const procedure = publicProcedure
  .input(inputSchema)
  .query(async ({ input: session }) => {
    const res = await aws.getSessionById(session);
    if (isAwsError(res)) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'given session.json is in the incorrect format',
        cause: res
      })
    }

    const bins = res.data.score_bins;
    if (!bins) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'unable to find a valid bin from summary',
        cause: bins
      })
    }

 const binsFull = [0, bins[0], bins[1], 1]
 return {
  bins: binsFull,
  levelLowBinBounds: {
    min: binsFull[0]!,
    max: binsFull[1]!,
  },
  levelMediumBinBounds: {
    min: binsFull[1]!,
    max: binsFull[2]!,
  },
  levelHighBinBounds: {
    min: binsFull[2]!,
    max: binsFull[3]!,
  },
} satisfies AppSessionsBin
  })

