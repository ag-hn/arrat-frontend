import { createTRPCRouter } from "@/server/api/trpc";
import { procedure as sessionListProcedure } from "./procedures/viewer.session-list";
import { procedure as unitFramesProcedure } from "./procedures/viewer.unit-frames";
import { procedure as sessionGeojsonProcedure } from "./procedures/viewer.session-geojson-get";
import { procedure as sessionDetailsProcedure } from "./procedures/viewer.session-get";

export const router = createTRPCRouter({
  sessionList: sessionListProcedure,
  sessionDetails: sessionDetailsProcedure,
  sessionGeojson: sessionGeojsonProcedure,
  unitFrames: unitFramesProcedure,
});
