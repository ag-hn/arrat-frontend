import {
  isAppSegmentFeature,
  isAppSignFeatureV1,
  isAppSignFeatureV2,
} from "@/lib/audit-utils";
import { publicProcedure } from "@/server/api/trpc";
import { aws } from "@/server/aws/aws.facade";
import {
  type AppSignFeatureV2,
  type AppSegmentFeature,
  type AppSignFeatureV1,
} from "@/server/zod/schema.audit";
import { isAwsError } from "@/server/zod/schema.sessions";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

type SelectedFeatureOption =
  | {
      __tag: "__feature_sign_v2";
      feature: AppSignFeatureV2;
    }
  | {
      __tag: "__feature_sign_v1";
      feature: AppSignFeatureV1;
    }
  | {
      __tag: "__feature_segment";
      feature: AppSegmentFeature;
    }
  | {
      __tag: "__feature_unknown";
      feature: unknown;
    };

const inputSchema = z.object({
  session: z.string(),
  feature: z.string().optional(),
});

export const procedure = publicProcedure
  .input(inputSchema)
  .query(async ({ input }) => {
    if (!input.feature) {
      return null;
    }

    const res = await aws.getSessionGeojsonById(input.session);
    if (isAwsError(res)) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "given session.json is in the incorrect format",
        cause: res.error,
      });
    }

    const { geojson } = res.data;

    if (!geojson) {
      return null;
    }

    const potential = geojson.features.find(
      (f) => f.properties.id === input.feature,
    );
    if (!potential) {
      return null;
    }

    if (isAppSignFeatureV2(potential)) {
      return {
        __tag: "__feature_sign_v2",
        feature: potential,
      } as const satisfies SelectedFeatureOption;
    }

    if (isAppSignFeatureV1(potential)) {
      return {
        __tag: "__feature_sign_v1",
        feature: potential,
      } as const satisfies SelectedFeatureOption;
    }

    if (isAppSegmentFeature(potential)) {
      return {
        __tag: "__feature_segment",
        feature: potential,
      } as const satisfies SelectedFeatureOption;
    }

    return {
      __tag: "__feature_unknown",
      feature: potential,
    } as const satisfies SelectedFeatureOption;
  });
