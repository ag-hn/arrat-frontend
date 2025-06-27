import { INTERNAL__defaultTrpcClientSideParameters } from "@/lib/trpc";
import { api } from "@/trpc/react";
import { useSessionAndAuditParams } from "../audit/use-audit-path-params";

export function useSessionStatistics() {
  const params = useSessionAndAuditParams()
  return api.session.statistics.useQuery(params.session, INTERNAL__defaultTrpcClientSideParameters)
}
