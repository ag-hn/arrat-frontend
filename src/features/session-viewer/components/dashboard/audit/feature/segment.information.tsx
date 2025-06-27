import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/primitives/card";
import { List } from "@/components/ui/list";
import { cn } from "@/lib/utils";
import { type AppSegmentFeature } from "@/server/zod/schema.audit";
import { type ComponentClassName } from "@/types/utility";
import { MultiLineDataSet } from "./shared.multi-line-dataset";

export function SegmentInformation({
  laneline_metrics,
  className,
}: ComponentClassName<AppSegmentFeature>) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>
          Overall segment details
        </CardTitle>
        <CardDescription>Readout of segment information captured during session processing.</CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0 text-sm">
        <List variant={"simple"} className='flex flex-col md:flex-row md:flex-wrap md:justify-between md:gap-6'>
          {laneline_metrics && laneline_metrics.map((l) => {
            return (
              <MultiLineDataSet key={`${l.name}-lines`} header={l.name} data={l.score} />
            )
          })}
        </List>
      </CardContent>
    </Card >
  )

}

