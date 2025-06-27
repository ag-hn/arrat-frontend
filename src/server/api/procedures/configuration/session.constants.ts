import { env } from "@/env";
import { publicProcedure } from "@/server/api/trpc";
import * as z from "zod";

/**
 * Schema defined input for the query.
 */
const inputSchema = z.undefined()

export const procedure = publicProcedure
  .input(inputSchema)
  .query(async () => {
    return {
      serverImagesUrl: env.SERVER_IMAGES_URl
    };
  })

