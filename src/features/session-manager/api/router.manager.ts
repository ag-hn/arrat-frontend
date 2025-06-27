import { createTRPCRouter } from "@/server/api/trpc";

import { procedure as sessionListProcedure } from "./procedures/manager.session-list";
import { procedure as unitListProcedure } from "./procedures/manager.unit-list";
import { procedure as sessionUpdateProcedure } from "./procedures/manager.session-update-visibility";
import { procedure as sessionCreateProcedure } from "./procedures/manager.session-create";
import { procedure as getRunningPipelinesProcedure } from "./procedures/manager.get-running-pipelines";

export const router = createTRPCRouter({
  sessionList: sessionListProcedure,
  unitList: unitListProcedure,

  sessionUpdate: sessionUpdateProcedure,
  sessionCreate: sessionCreateProcedure,
  getRunningPipelines: getRunningPipelinesProcedure,
});
