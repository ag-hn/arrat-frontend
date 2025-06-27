import { INTERNAL__defaultTrpcClientSideParameters } from "@/lib/trpc";
import { api } from "@/trpc/react";
import { useSessionAndAuditParams } from "../audit/use-audit-path-params";

export function useSessionList() {
  return api.viewer.sessionList.useQuery(undefined, INTERNAL__defaultTrpcClientSideParameters)
}

export function useCurrentSessionDetails() {
  const params = useSessionAndAuditParams()
  return api.viewer.sessionDetails.useQuery(params.session, INTERNAL__defaultTrpcClientSideParameters)
}

