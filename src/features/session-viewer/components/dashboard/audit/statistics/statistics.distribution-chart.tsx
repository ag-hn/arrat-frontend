import { List, ListItem } from "@/components/ui/list";
import { Span } from "@/components/typeography/span";
import { Text } from "@/components/typeography/text";
import { ProgressCircle } from "@/components/visualizations/data-elements";
import { percentageFormatterFromDecimal } from "@/lib/formatters/number-value-formatter";
import { stringToTitleCaseFormatter } from "@/lib/formatters/string-value-formatter";
import { type Color } from "@/types/colors";
import { type AuditSeverity } from "@/types/map/feature";
import { getMetricDescriptionFromKey } from "@/lib/audit-utils";
import { InformationToken } from "@/components/primitives/information-token";

type SecondWord<T extends string> = T extends `${infer _} ${infer TSecond}` ? TSecond : never
type DistributionKey = Capitalize<SecondWord<AuditSeverity>>
const INTERNAL__INDEX_TO_DISTRIBUTION_KEY: Record<number, DistributionKey> = {
  0: "Low",
  1: "Medium",
  2: "High",
} as const satisfies Record<number, string>

const INTERNAL__INDEX_TO_DISTRIBUTION_COLOR: Record<number, Color> = {
  0: "red",
  1: "amber",
  2: "emerald",
} as const satisfies Record<number, string>

export function StatisticsDistributionChart({
  header,
  counts,
  ratios,
  overall,
  countUnits,
}: {
  header: string,
  ratios: number[],
  counts: number[],
  overall: number,
  countUnits: string,
}) {

  return (
    <div className="grid grid-cols-2 items-center gap-x-4 gap-y-2 w-full">
      {/** Statistics Circle */}
      <div className="grid content-center items-center justify-center">
        {!!ratios &&
          ratios.map((c, i) => {
            const radius = 40 + 5 * i;
            return (
              <ProgressCircle
                key={i}
                style={{ gridColumn: 1, gridRow: 1 }}
                color={INTERNAL__getDistributionColorByIndex(i)}
                value={c}
                radius={radius}
                strokeWidth={3}
              />
            );
          })}

        <div
          style={{ gridColumn: 1, gridRow: 1 }}
          className="flex flex-col items-center justify-center gap-0"
        >
          <Span tint={"strong"} affects={"small"}>
            {percentageFormatterFromDecimal(overall)}
          </Span>
          <Span tint={"subtle"} variant={"label"}>
            avg.
          </Span>
        </div>
      </div>

      {/** Count Lables */}
      <List variant={"simple"}>
        {!!counts &&
          counts.map((c, i) => {
            const key = INTERNAL__getDistributionKeyByIndex(i)

            return (
              <ListItem key={key} className="py-1">
                <Span tint={"muted"} variant={"label"}>{key}:</Span>
                <Span variant={"label"}>{c} {countUnits}</Span>
              </ListItem>
            )
          })}
      </List>

      {/** Header */}
      <InformationToken 
      className="justify-center"
      content={getMetricDescriptionFromKey(header)}
      >
        <Text tint={"muted"} variant={"label"}>
          {stringToTitleCaseFormatter(header)}
        </Text>
      </InformationToken>
    </div>
  )
}

/**
 * Assumption of distribution key details based on 
 * the index of the distribution counts.
 *
 * __*CURRENT ASSUMPTION IS THAT:*__
 * __*- 0 = LEVEL LOW READINGS*__
 * __*- 1 = LEVEL MEDIUM READINGS*__
 * __*- 2 = LEVEL HIGH READINGS*__
 */
function INTERNAL__getDistributionColorByIndex(index: number): Color {
  const potential = INTERNAL__INDEX_TO_DISTRIBUTION_COLOR[index]
  if (potential) {
    return potential
  }

  return "violet"
}

/**
 * Assumption of distribution key details based on 
 * the index of the distribution counts.
 *
 * __*CURRENT ASSUMPTION IS THAT:*__
 * __*- 0 = LEVEL LOW READINGS*__
 * __*- 1 = LEVEL MEDIUM READINGS*__
 * __*- 2 = LEVEL HIGH READINGS*__
 */
function INTERNAL__getDistributionKeyByIndex(index: number) {
  const potential = INTERNAL__INDEX_TO_DISTRIBUTION_KEY[index]
  if (potential) {
    return potential
  }

  return "N/A"
}

