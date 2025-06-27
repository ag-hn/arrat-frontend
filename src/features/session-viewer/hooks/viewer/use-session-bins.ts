import { INTERNAL__defaultTrpcClientSideParameters } from "@/lib/trpc";
import { DEFAULT_SESSIONS_BIN } from "@/server/zod/session.bins";
import { api } from "@/trpc/react";
import { useSessionAndAuditParams } from "../audit/use-audit-path-params";

export function useSessionBins() {
  const params = useSessionAndAuditParams()
  const { data } = api.configuration.bins.useQuery(params.session, INTERNAL__defaultTrpcClientSideParameters)
  return data ?? DEFAULT_SESSIONS_BIN
}

