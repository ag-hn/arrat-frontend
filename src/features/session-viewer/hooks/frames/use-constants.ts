import { api } from "@/trpc/react";
import { INTERNAL__defaultTrpcClientSideParameters } from "@/lib/trpc";

export function useConstants() {
  return api.configuration.constants.useQuery(undefined, INTERNAL__defaultTrpcClientSideParameters)
}

