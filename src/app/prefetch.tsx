"use client"
import { useConstants } from "@/features/session-viewer/hooks/frames/use-constants"
import { useLocalConfiguration } from "@/features/session-viewer/hooks/frames/use-local-configuration"

export function Prefetch() {
  useLocalConfiguration()
  useConstants()
  return null
}

