import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/primitives/card";
import { List } from "@/components/ui/list";
import { cn } from "@/lib/utils";
import { type AppSignFeatureV1 } from "@/server/zod/schema.audit";
import { type ComponentClassName } from "@/types/utility";
import { MultiLineDataSet } from "./shared.multi-line-dataset";
import { SignImages } from "./sign.all-images";

/**
 * @deprecated - Migrate to sign.information.tsx
 * @param param0 
 * @returns React component to render Sign info V1
 */
export function SignInformationV1({
  properties,
  sign_metrics,
  className,
}: ComponentClassName<AppSignFeatureV1>) {
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

        <List variant={"simple"} className='flex flex-col md:flex-row md:flex-wrap md:justify-between md:gap-6'>
          {sign_metrics && sign_metrics.map((l) => {
            return (
              <MultiLineDataSet key={`${l.name}-lines`} header={l.name} data={l.score} />
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}
