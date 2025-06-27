import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    SERVER_IMAGES_URl: z.string().url(),
    SERVER_IMAGES_REMOTE_PATTERN_PROTOCOL: z.preprocess(
      (p) =>
        typeof p === "string" && (p === "https" || p === "http")
          ? p
          : undefined,
      z.union([z.literal("https"), z.literal("http"), z.undefined()]),
    ),
    SERVER_IMAGES_REMOTE_PATTERN_HOST_NAME: z.string(),
    SERVER_IMAGES_REMOTE_PATTERN_PATHNAME: z.string(),

    SERVER_SESSION_API_BASE_URL: z.string().url(),
  },

  client: {
    NEXT_PUBLIC_TILE_SET_URL: z.string().url(),
    NEXT_PUBLIC_TILE_SET_ATTRIBUTION: z.string(),
    NEXT_PUBLIC_SATELLITE_TILE_SET_URL: z.string().url(),
    NEXT_PUBLIC_SATELLITE_TILE_SET_ATTRIBUTION: z.string(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_TILE_SET_URL: process.env.NEXT_PUBLIC_TILE_SET_URL,
    NEXT_PUBLIC_TILE_SET_ATTRIBUTION:
      process.env.NEXT_PUBLIC_TILE_SET_ATTRIBUTION,
    NEXT_PUBLIC_SATELLITE_TILE_SET_URL:
      process.env.NEXT_PUBLIC_SATELLITE_TILE_SET_URL,
    NEXT_PUBLIC_SATELLITE_TILE_SET_ATTRIBUTION:
      process.env.NEXT_PUBLIC_SATELLITE_TILE_SET_ATTRIBUTION,

    SERVER_IMAGES_URl: process.env.SERVER_IMAGES_URL,
    SERVER_IMAGES_REMOTE_PATTERN_PROTOCOL:
      process.env.SERVER_IMAGES_REMOTE_PATTERN_PROTOCOL,
    SERVER_IMAGES_REMOTE_PATTERN_HOST_NAME:
      process.env.SERVER_IMAGES_REMOTE_PATTERN_HOST_NAME,
    SERVER_IMAGES_REMOTE_PATTERN_PATHNAME:
      process.env.SERVER_IMAGES_REMOTE_PATTERN_PATHNAME,

    SERVER_SESSION_API_BASE_URL:
      process.env.SERVER_SESSION_API_BASE_URL,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
