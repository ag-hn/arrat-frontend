import "server-only";

import {
    createTRPCProxyClient,
    httpBatchLink
} from "@trpc/client";

import { type AppRouter } from "@/server/api/root";
import { getUrl, transformer } from "./shared";

/**
 * TRPC client implementation to run on edge/nextjs middleware
 */
export const api = createTRPCProxyClient<AppRouter>({
    transformer,
    links: [
        httpBatchLink({
            url: getUrl(),
            fetch(url, options) {
                return fetch(url, {
                    ...options,
                });
            },
        }),
    ],
}); 