import { api } from "@/trpc/react";
import { INTERNAL__defaultTrpcClientSideParameters } from "@/lib/trpc";

export function useLocalConfiguration() {
  return api.configuration.localConfiguration.useQuery(undefined, INTERNAL__defaultTrpcClientSideParameters)
}
