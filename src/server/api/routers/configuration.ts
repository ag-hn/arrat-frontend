import { createTRPCRouter } from "@/server/api/trpc";

import { procedure as constantsProcedure } from '@/server/api/procedures/configuration/session.constants'
// import { procedure as configurationProcedure } from '@/server/api/procedures/configuration/session.config'
import { procedure as localConfigurationProcedure } from '@/server/api/procedures/configuration/session.local-config'
// import { procedure as framesProcedure } from '@/server/api/procedures/configuration/session.frames'
import { procedure as binsProcedure } from '@/server/api/procedures/configuration/session.bin'

export const router = createTRPCRouter({
  localConfiguration: localConfigurationProcedure,
  // configuration: configurationProcedure,
  // frames: framesProcedure,
  constants: constantsProcedure,
  bins: binsProcedure,
});


