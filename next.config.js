/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const { env } = await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
            {
                hostname: env.SERVER_IMAGES_REMOTE_PATTERN_HOST_NAME,
                pathname: env.SERVER_IMAGES_REMOTE_PATTERN_PATHNAME,
                protocol: env.SERVER_IMAGES_REMOTE_PATTERN_PROTOCOL,
            }
        ]
    }
};


export default config;
