import { z } from "zod";

const INTERNAL__characterLimitOfOneTweet = 280;
const INTERNAL__characterLimitOfTwoTweets = INTERNAL__characterLimitOfOneTweet * 2;

export const idFormDataSchema = z.string().min(1).max(100)
export const sessionDataSchema = z.object({
  id: idFormDataSchema,
  name: idFormDataSchema,
})
export const unitGroupingFormDataSchema = z.object({
  /**
   * Unit id that is sent to the server.
   */
  unit: idFormDataSchema,
  /**
   * The containing 'grouping' and 'folder' where the unit is contained on the server.
   */
  session: idFormDataSchema,
})

/**
 * Defines the input allowed for new and edited agencies.
 * Used within the workflow dialog forms to generate
 * the proper client side dto of an statewide service
 * before sent to AWS Backend.
 */
export const sessionFormDataSchema = z.object({
  session_data: sessionDataSchema,
  session_description: z.string().min(1).max(INTERNAL__characterLimitOfTwoTweets),
  session_related_unit_ids: z.array(unitGroupingFormDataSchema, {
    message: 'At least one unit is required',
  })
  .min(1, 'Must select at least one unit'),
});

export type AppSessionFormData = z.infer<typeof sessionFormDataSchema> 
export type AppSessionDataFormData = z.infer<typeof sessionDataSchema>
export type AppUnitGroupingFormData = z.infer<typeof unitGroupingFormDataSchema> 