const INTERNAL__sessionPartialPath = 'sessions'

export function generateSessionPath(session: string) {
  return `/${INTERNAL__sessionPartialPath}/${session}`
}

export function generateAuditPath(session: string, audit: string) {
  return `${generateSessionPath(session)}/${audit}`
}

