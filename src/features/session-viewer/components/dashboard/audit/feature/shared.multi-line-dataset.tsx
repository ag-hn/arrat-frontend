import { Badge } from "@/components/primitives/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/primitives/card";
import { List, ListItem } from "@/components/ui/list";
import { Skeleton } from "@/components/ui/skeleton";
import { useSessionBins } from "@/features/session-viewer/hooks/viewer/use-session-bins";
import { scoreToSeverity } from "@/lib/audit-utils";
import { percentageFormatterFromDecimal } from "@/lib/formatters/number-value-formatter";
import { stringToTitleCaseFormatter } from "@/lib/formatters/string-value-formatter";
import { cn, } from "@/lib/utils";
import { type ComponentClassName } from "@/types/utility";

export function MultiLineDataSet({
  data,
  header
}: {
  data: number[] | number,
  header: string
}) {

  return (
    <ListItem className="flex flex-1 items-start justify-between md:flex-col">
      <span className="text-muted-foreground text-xs mb-1 text-nowrap">{stringToTitleCaseFormatter(header)}</span>
      <span className="flex flex-col gap-1 items-end md:items-start">
        {Array.isArray(data)
          ? data.map((c) => {
            return (
              <INTERNAL__MultiLineDataSetItem
                key={c}
                data={c}
              />
            )
          }) : (
            <INTERNAL__MultiLineDataSetItem data={data} />
          )}
      </span>
    </ListItem>
  )
}

function INTERNAL__MultiLineDataSetItem({
  data,
}: {
  data: number
}) {
  const bins = useSessionBins()
  const severity = scoreToSeverity(data, bins)

  return (
    <Badge
    variant={
        severity === "level low"
          ? "error"
          : severity === "level medium"
            ? "warning"
            : "success"

    }
    > {percentageFormatterFromDecimal(data)}</Badge>
  )
}

export function SegmentInformationLoadingState({ className }: ComponentClassName) {
  return (
    <Card className={cn("overflow-hidden min-h-[32rem]", className)}>
      <CardHeader>
        <CardTitle>
          Overall segment details
        </CardTitle>
        <CardDescription>Readout of segment information captured during session processing.</CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0 text-sm">
        <List variant={"simple"} className='flex flex-col md:flex-row md:flex-wrap md:justify-between md:gap-6'>
          <INTERNAL__MultiLineDataSetLoading />
          <INTERNAL__MultiLineDataSetLoading />
          <INTERNAL__MultiLineDataSetLoading />
          <INTERNAL__MultiLineDataSetLoading />
          <INTERNAL__MultiLineDataSetLoading />
        </List>
      </CardContent>
    </Card >
  )
}

function INTERNAL__MultiLineDataSetLoading() {
  return (
    <ListItem className="flex flex-1 items-start justify-between md:flex-col min-w-44">
      <span className="text-muted-foreground md:mb-2"><Skeleton className="w-32 h-4" /></span>
      <span className="flex flex-col gap-1 items-end md:items-start">
        <Skeleton className="w-24 h-4" />
      </span>
    </ListItem>

  )
}
