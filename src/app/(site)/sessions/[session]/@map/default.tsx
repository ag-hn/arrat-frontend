import { AuditSelect } from "@/features/session-viewer/components/dashboard/audit/audit-select";
import { AuditToolbar } from "@/features/session-viewer/components/dashboard/audit/toolbar/audit-toolbar";
import { Map } from "@/features/session-viewer/components/dashboard/map";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic"

export function DefaultMapPartialPage() {
  return (
    <>
      <div
        className="container p-0 flex flex-col group relative md:overflow-hidden rounded-xl border shadow-sm transition-all duration-200 ease-in-out bg-card"
      >
        <AuditToolbar />
        <Map />

        <Separator className="mx-auto my-2 md:my-4 w-11/12 bg-transparent" />

        <AuditSelect />
      </div>
    </>
  )
}

export default DefaultMapPartialPage
