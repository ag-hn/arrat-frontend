import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/primitives/card";
import { cn } from "@/lib/utils";
import type { AppSignFeatureV2 } from "@/server/zod/schema.audit";
import { type ComponentClassName } from "@/types/utility";
import { SignImages } from "./sign.all-images";

/**
 * @param param0 
 * @returns React component to render Sign info
 */
export function SignInformation({
  properties,
  className,
}: ComponentClassName<AppSignFeatureV2>) {
  const { timestamp } = properties
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>Image of sign</CardTitle>
        <CardDescription>Frame capturing processed sign.</CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0 text-sm">
        <div className="grid grid-cols-1 gap-4"
        >
          <SignImages timestamp={timestamp} />
        </div>
      </CardContent>
    </Card>
  )
}
