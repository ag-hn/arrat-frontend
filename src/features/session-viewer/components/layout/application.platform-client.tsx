"use client"
import { useSessionAndAuditParams } from "@/features/session-viewer/hooks/audit/use-audit-path-params"
import { useSessionAndAuditRouter } from "@/features/session-viewer/hooks/use-session-and-audit-router"
import { useSessionList } from "@/features/session-viewer/hooks/viewer/use-session-list"
import { useMemo } from "react"
import { ApplicationPlatform, type ApplicationPlatformProps } from "./application.platform"

/**
 * Loading trigger used within application.platform.tsx to render loading spinner
  * and content when configuration is still being setup.
  *
  * @deprecated Temparary solution until prop injection is added to application.platform.tsx.
  */
export const INTERNAL__APPLICATION_PLATFORM_LOADING_AVATAR_TRIGGER = 'Loading...'

export function ApplicationPlatformClient({ ...props }: ApplicationPlatformProps) {
  const router = useSessionAndAuditRouter()
  const key = useSessionAndAuditParams()
  const { data } = useSessionList()
  const platforms = useMemo(() => {
    if (!data) {
      return;
    }

    return {
      selected: key.session ?? data?.[0],
      list: data.map((d) => d.session)
    }
  }, [key.session, data])

  if (!platforms) {
    return (
      <ApplicationPlatform
        key={INTERNAL__APPLICATION_PLATFORM_LOADING_AVATAR_TRIGGER}
        platforms={[INTERNAL__APPLICATION_PLATFORM_LOADING_AVATAR_TRIGGER]}
        defaultPlatform={INTERNAL__APPLICATION_PLATFORM_LOADING_AVATAR_TRIGGER}
        {...props}
      >
      </ApplicationPlatform>
    )
  }

  return (
    <ApplicationPlatform
      key="loaded"
      platforms={platforms.list}
      selected={platforms.selected}
      onSelect={(session: string) => router.setSession(session)}
      {...props}
    >
    </ApplicationPlatform>
  )
}
