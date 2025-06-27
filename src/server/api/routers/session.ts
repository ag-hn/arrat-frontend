import { createTRPCRouter } from "@/server/api/trpc";

import { procedure as geojsonProcedure } from '@/server/api/procedures/sessions/session.geojson'
import { procedure as statisticsProcedure } from '@/server/api/procedures/sessions/session.statistics'
import { procedure as featureProcedure } from '@/server/api/procedures/sessions/session.feature'

export const router = createTRPCRouter({
  geojson: geojsonProcedure,
  statistics: statisticsProcedure,
  feature: featureProcedure,
});

