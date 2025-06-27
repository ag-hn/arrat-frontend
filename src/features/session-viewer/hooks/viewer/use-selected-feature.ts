import { INTERNAL__defaultTrpcClientSideParameters } from "@/lib/trpc";
import { api } from "@/trpc/react";
import { useSessionAndAuditParams } from "../audit/use-audit-path-params";

export function useSelectedFeature() {
  const params = useSessionAndAuditParams()
  const ret = api.session.feature.useQuery({
    session: params.session,
    feature: params.id?.param,
  }, INTERNAL__defaultTrpcClientSideParameters);

  return ret;
}
