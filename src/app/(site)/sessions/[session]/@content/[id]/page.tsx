import { FeatureContent } from "@/features/session-viewer/components/dashboard/audit/feature/feature.content";
import { type AuditPageRouteProps } from "@/types/pages";

export const dynamic = "force-dynamic"

export default function AuditContentPartialPage({ params }: AuditPageRouteProps) {
  if (!params.id) {
    return null;
  }

  return (
    <FeatureContent />
  )
}
