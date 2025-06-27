import { List, ListItem } from "@/components/ui/list";
import { Separator } from "@/components/ui/separator";
import { digitOnlyFormatter } from "@/lib/formatters/number-value-formatter";
import { type AppFeatureSummaryV2 } from "@/server/zod/schema.audit";
import type { AppAwsSessionDetails } from "@/server/zod/schema.sessions";

export function StatisticsOverall({
  data,
  map
}: { data: AppFeatureSummaryV2 | null | undefined, map: AppAwsSessionDetails | null | undefined }) {
  if (!data || !map) {
    return null;
  }

  const {
    audited_segments,
    audited_frames,
  } = data

  return (
    <List variant={"simple"} className='flex flex-col md:flex-row md:flex-wrap md:justify-between md:gap-6'>
      <INTERNAL__MultiLineDataSet header='Segments Count' data={digitOnlyFormatter(audited_segments)} />
      <Separator className='w-full md:hidden' />
      <INTERNAL__MultiLineDataSet header='Frames Count' data={digitOnlyFormatter(audited_frames)} />
      <Separator className='w-full md:hidden' />
    </List>

  )
}

function INTERNAL__MultiLineDataSet({
  data,
  header
}: {
  data: number[] | string[] | string | number,
  header: string
}) {

  return (
    <ListItem className="flex flex-1 items-start justify-between md:flex-col text-xs">
      <span className="text-muted-foreground md:mb-1">{header}</span>
      <span className="flex flex-col gap-1 items-end md:items-start">
        {Array.isArray(data)
          ? data.map((c) => {
            return (
              <span key={c}>{c}</span>
            )
          }) : data
        }
      </span>
    </ListItem>
  )
}

