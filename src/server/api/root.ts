import { router as managerRouter } from "@/features/session-manager/api/router.manager";
import { router as viewerRouter } from "@/features/session-viewer/api/router.viewer";
import { router as configurationRouter } from "@/server/api/routers/configuration";
import { router as sessionRouter } from "@/server/api/routers/session";

import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  manager: managerRouter,
  viewer: viewerRouter,
  session: sessionRouter,
  configuration: configurationRouter,
});

export type AppRouter = typeof appRouter;
