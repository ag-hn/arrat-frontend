import { publicProcedure } from "@/server/api/trpc";
import { aws } from "@/server/aws/aws.facade";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

/**
 * Schema defined input for the query.
 */
const inputSchema = z.undefined()

export const procedure = publicProcedure
  .input(inputSchema)
  .query(async () => {
    const config = await aws.configuration()

    if (!config || config instanceof Error || typeof config === 'string') {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'remote frontend_configuration.json is in the incorrect format',
        cause: config
      })
    }

    return {
      configuration: config
    };
  })

