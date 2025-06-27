import { type AuditPageRouteParams } from "@/types/pages";
import { type Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import { decodeUrlSession, transformPathParamToAuditKey } from "./use-audit-path-params.helpers";
import { extractUnit } from "@/lib/audit-utils";

export function useAuditIdPathParam() {
  return usePathParams<AuditPageRouteParams>().id;
}

export function useAuditKey() {
  const params = useSessionAndAuditParams()
  return params.id;
}

export function useSessionAndAuditParams() {
  const key = usePathParams<AuditPageRouteParams>();
  const transformedSession = decodeUrlSession(key)
  const transformedAudit = transformPathParamToAuditKey(key)
  const unit = transformedAudit ? extractUnit(transformedAudit?.param) : undefined

  return {
    session: transformedSession,
    unit: unit,
    id: transformedAudit,
    raw: key,
  };
}

export function usePathParams<TParams extends Params = Params, TRet = TParams>(options?: {
  select?: (params: TParams) => TRet
}) {
  const params = useParams<TParams>();
  return options?.select ? options.select(params) : params;
}
