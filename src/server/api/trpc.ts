import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { type AppLanelineFrame } from "../zod/schema.audit";

export type AuditImageContextExtended = {
  frame: string,
  lat: number,
  lng: number,
  lrs: number,
  time: string,

  heading: number,
  speed: number,
  line_score_left: number,
  line_score_right: number,
  unit: string,
  url: string,
}
export type AuditContextExtended = Record<string, AuditImageContextExtended[]>

export type AuditImageContext = {
  frame: string,
  lat: number,
  lng: number,
  url: string,
} & AppLanelineFrame
export type AuditContext = Record<string, AuditImageContext[]>

export type AuditImageContextOption = AuditImageContext | AuditImageContextExtended
export type FeaturesToFramesRecord = Record<string, (AuditImageContextOption)[]>

export type CreateTRPCContext = {
  headers: Headers,
  // audit?: AuditContext,
}

export const createTRPCContext = async (opts: CreateTRPCContext) => {
  return {
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * Used to build new queries and mutations. It does not guarantee that a 
 * user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;
