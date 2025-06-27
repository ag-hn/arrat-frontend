import { cn } from "@/lib/utils";
import { type AppSignFeatureV2 } from "@/server/zod/schema.audit";
import { FeatureDetailsSign } from "./feature.details-sign";
import { SignInformation } from "./sign.information";

export function FeatureSidebarSign({
  className,
  ...rest
}: { className?: string } & (AppSignFeatureV2)) {

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <FeatureDetailsSign {...rest.properties} />
      <SignInformation {...rest} />
    </div>
  )
}
