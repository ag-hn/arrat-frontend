import { useState } from "react";
import { useCustomRouter } from "../../../hooks/use-custom-router";
import { useSessionAndAuditParams } from "./audit/use-audit-path-params";
import { generateAuditPath, generateSessionPath } from "./use-session-and-audit-router.helpers";

export function useSessionAndAuditRouter() {
  const router = useCustomRouter()
  const key = useSessionAndAuditParams()
  const [ret] = useState({
    base: router,
    setSession(session: string) {
      router.push(generateSessionPath(session), {
        clear: false,
      })
    },
    setFeature(feature: string) {
      router.push(generateAuditPath(key.session, feature), {
        clear: false,
      })
    },
  })

  return ret
}
