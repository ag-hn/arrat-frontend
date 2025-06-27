import { z } from "zod"

const sessionBinsSchema = z.object({
  bins: z.array(z.number()),
  levelLowBinBounds: z.object({
    min: z.number(),
    max: z.number(),
  }),
  levelMediumBinBounds: z.object({
    min: z.number(),
    max: z.number(),
  }),
  levelHighBinBounds: z.object({
    min: z.number(),
    max: z.number(),
  }),
})
export type AppSessionsBin = z.infer<typeof sessionBinsSchema>

export const DEFAULT_BINS_VALUE = [0, 0.2, 0.8, 1]
export const DEFAULT_SESSIONS_BIN: AppSessionsBin = {
  bins: DEFAULT_BINS_VALUE,
  levelLowBinBounds: {
    min: DEFAULT_BINS_VALUE[0]!,
    max: DEFAULT_BINS_VALUE[1]!,
  },
  levelMediumBinBounds: {
    min: DEFAULT_BINS_VALUE[1]!,
    max: DEFAULT_BINS_VALUE[2]!,
  },
  levelHighBinBounds: {
    min: DEFAULT_BINS_VALUE[2]!,
    max: DEFAULT_BINS_VALUE[3]!,
  },
}

