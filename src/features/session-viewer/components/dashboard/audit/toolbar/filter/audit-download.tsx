"use client"
import { Icons } from "@/components/icons/icons";
import { buttonVariants } from "@/components/primitives/button.variants";
import { Anchor } from "@/components/typeography/anchor";
import { useSessionAndAuditParams } from "@/features/session-viewer/hooks/audit/use-audit-path-params";
import { cn } from "@/lib/utils";

export function AuditDownload() {
  const params = useSessionAndAuditParams()
  return (
    <Anchor 
    aria-label="Download session data."
    href={`/api/sessions/${params.session}`} 
    download={"data.json"} 
    target="_blank"
    className={cn(
      buttonVariants({
        size: "icon",
        variant: "ghost"
      })
    )}
    >
        <Icons.actions.download className="m-2 size-fit stroke-1 text-foreground" />
    </Anchor>
  );
}
