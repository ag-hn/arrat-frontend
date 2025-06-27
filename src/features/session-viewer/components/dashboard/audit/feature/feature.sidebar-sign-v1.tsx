import { cn } from "@/lib/utils";
import { type AppSignFeatureV1 } from "@/server/zod/schema.audit";
import { FeatureDetailsSignV1 } from "./feature.details-sign-v1";
import { SignInformationV1 } from "./sign.information-v1";

export function FeatureSidebarSignV1({
  className,
  ...rest
}: { className?: string } & AppSignFeatureV1) {

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <FeatureDetailsSignV1 {...rest.properties} />
      <SignInformationV1 {...rest} />
    </div>
  )
}
