import { type UseTRPCQueryOptions } from "@trpc/react-query/shared"

/**
 * short term client side tRPC refetch interval
 *
 * __*Represented in milliseconds*__
 */
export const INTERNAL__statusRefetchInterval = 1000 * 30

/**
 * default client side tRPC refetch interval.
 *
 * __*Represented in milliseconds*__
 */
export const INTERNAL__defaultRefetchInterval = 10 * 1000 * 60

export const INTERNAL__defaultTrpcClientSideParameters = {
  retry: 1,
  keepPreviousData: true,
  refetchInterval: INTERNAL__defaultRefetchInterval,
  refetchOnMount: true,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  trpc: {
    abortOnUnmount: false,
  }
} satisfies UseTRPCQueryOptions<unknown, unknown, unknown, unknown, unknown>

export const INTERNAL__trpcStatusCheckParameters = {
  retry: 1,
  keepPreviousData: true,
  refetchInterval: INTERNAL__statusRefetchInterval,
  refetchOnMount: true,
  refetchOnReconnect: false,
  refetchOnWindowFocus: true,
} satisfies UseTRPCQueryOptions<unknown, unknown, unknown, unknown, unknown>
