import { List, ListItem } from "@/components/ui/list";
import { digitOnlyFormatter, numberToMilesFormatter, percentageFormatter } from "@/lib/formatters/number-value-formatter";
import { type AppFeatureSummaryV1 } from "@/server/zod/schema.audit";
import type { AppAwsSessionDetails } from "@/server/zod/schema.sessions";

export function StatisticsOverallV1({
  data,
  map
}: { data: AppFeatureSummaryV1, map: AppAwsSessionDetails | null | undefined }) {
  if (!data || !map) {
    return null;
  }

  const {
    total_lane_miles,
    audited_lrs_range,
    audited_segments,
    audited_frames,
    audited_percent,
  } = data

  return (
    <List variant={"simple"} className='flex flex-col md:flex-row md:flex-wrap md:justify-between md:gap-6'>
      <INTERNAL__MultiLineDataSet header='Total Miles' data={numberToMilesFormatter(total_lane_miles)} />
      <INTERNAL__MultiLineDataSet header='Span (LRS)' data={numberToMilesFormatter(audited_lrs_range)} />
      <INTERNAL__MultiLineDataSet header='Segments Count' data={digitOnlyFormatter(audited_segments)} />
      <INTERNAL__MultiLineDataSet header='Frames Count' data={digitOnlyFormatter(audited_frames)} />
      <INTERNAL__MultiLineDataSet header='Percent Audited' data={percentageFormatter(audited_percent)} />
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

