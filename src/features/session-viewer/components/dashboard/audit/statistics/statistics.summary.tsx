"use client";
import LoadingCircle from "@/components/icons/loading.circle";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { Span } from "@/components/typeography/span";
import { Text } from "@/components/typeography/text";
import { BadgeDelta } from "@/components/ui/badge-delta";
import { List, ListItem } from "@/components/ui/list";
import { useSessionBins } from "@/features/session-viewer/hooks/viewer/use-session-bins";
import { useSessionStatistics } from "@/features/session-viewer/hooks/viewer/use-session-statistics";
import {
  isAppFeatureSummaryV1,
  isAppFeatureSummaryV2,
  scoreToDeltaTypeSeverity
} from "@/lib/audit-utils";
import { percentageFormatterFromDecimal } from "@/lib/formatters/number-value-formatter";
import { cn } from "@/lib/utils";
import {
  type AppFeatureSummaryV2,
  type AppFeatureSummaryV1,
} from "@/server/zod/schema.audit";
import { StatisticsDistributionChart } from "./statistics.distribution-chart";
import { StatisticsOverall } from "./statistics.overall";
import { StatisticsOverallV1 } from "./statistics.overall-v1";

export function StatisticsSummary() {
  const { data, error, isLoading } = useSessionStatistics();
  const bins = useSessionBins();

  if (isLoading || error) {
    return (
      <Card className={cn("w-full overflow-hidden")}>
        <CardHeader className="flex items-start md:flex-row">
          <CardTitle className="grid gap-0.5">ARRAT</CardTitle>
        </CardHeader>
        <CardContent className="grid min-h-64 w-full place-items-center">
          <LoadingCircle />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full overflow-hidden")}>
      <CardHeader className="flex items-start md:flex-row">
        <CardTitle className="grid gap-0.5">ARRAT</CardTitle>

        {data && (
          <div className="flex flex-row items-center gap-4 sm:ml-auto">
            <Text variant={"metric"} className="self-end">
              <Span variant={"title"}>Combined Score:</Span>{" "}
              {percentageFormatterFromDecimal(data.statistics.overall_score)}
            </Text>

            <BadgeDelta
              className="aspect-square"
              size={"sm"}
              variant={scoreToDeltaTypeSeverity(
                data.statistics.overall_score,
                bins,
              )}
            />
          </div>
        )}
      </CardHeader>

      <CardContent className="grid place-items-center p-6 pt-0 text-sm">
        {!data?.statistics ? (
          <Text variant={"h3"} tint={"strong"} className="w-full text-center">
            Unable to gather summary from session data.
          </Text>
        ) : isAppFeatureSummaryV2(data.statistics) ? (
          <INTERNAL__StatisticsSummaryV2 data={data.statistics} />
        ) : isAppFeatureSummaryV1(data.statistics) ? (
          <INTERNAL__StatisticsSummaryV1 data={data.statistics} />
        ) : null}
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2 border-t border-border p-0 px-6 pb-4 pt-6">
        {!data?.statistics ? (
          <Text variant={"h3"} tint={"strong"} className="w-full text-center">
            Unable to gather summary from session data.
          </Text>
        ) : isAppFeatureSummaryV2(data.statistics) ? (
          <StatisticsOverall data={data?.statistics} map={data?.map} />
        ) : isAppFeatureSummaryV1(data.statistics) ? (
          <StatisticsOverallV1 data={data?.statistics} map={data?.map} />
        ) : null}
      </CardFooter>
    </Card>
  );
}

function INTERNAL__StatisticsSummaryV1({
  data,
}: {
  data: AppFeatureSummaryV1;
}) {
  if (!data) {
    return (
      <Text variant={"h3"} tint={"strong"} className="w-full text-center">
        Unable to gather summary from session data.
      </Text>
    );
  }

  const numberOfSigns =
    data.sign_metrics["Number of standard speed limit signs"] +
    data.sign_metrics["Number of variable speed limit signs"];
  const numberOfSegments = data.audited_segments;

  return (
    <List
      variant={"simple"}
      className="flex w-full max-w-[74rem] flex-row flex-wrap justify-center gap-6 [&>li]:max-w-xs"
    >
      {data.laneline_metrics.map((m) => {
        return (
          <ListItem key={m.name}>
            <StatisticsDistributionChart
              header={m.name}
              counts={m.distribution.segment_count}
              ratios={m.distribution.segment_count.map(
                (c) => (c / numberOfSegments) * 100.0,
              )}
              overall={m.score}
              countUnits="segments"
            />
          </ListItem>
        );
      })}

      {
        <ListItem key={"Sign Information"}>
          <StatisticsDistributionChart
            header={"sign_overall"}
            counts={data.sign_metrics.sign_count}
            ratios={data.sign_metrics.sign_count.map(
              (c) => (c / numberOfSigns) * 100.0,
            )}
            overall={data.sign_metrics["Average score"]}
            countUnits="segments"
          />
        </ListItem>
      }
    </List>
  );
}

function INTERNAL__StatisticsSummaryV2({
  data,
}: {
  data: AppFeatureSummaryV2;
}) {
  if (!data) {
    return (
      <Text variant={"h3"} tint={"strong"} className="w-full text-center">
        Unable to gather summary from session data.
      </Text>
    );
  }

  const numberOfSigns = data.sign_metrics["Number of speed limit signs"];
  const numberOfSegments = data.audited_segments;

  return (
    <List
      variant={"simple"}
      className="flex w-full max-w-[74rem] flex-row flex-wrap justify-center gap-6 [&>li]:max-w-xs"
    >
      {data.laneline_metrics.map((m) => {
        return (
          <ListItem key={m.name}>
            <StatisticsDistributionChart
              header={m.name}
              counts={m.distribution.segment_count}
              ratios={m.distribution.segment_count.map(
                (c) => (c / numberOfSegments) * 100.0,
              )}
              overall={m.score}
              countUnits="segments"
            />
          </ListItem>
        );
      })}

      {
        <ListItem key={"Sign Information"}>
          <StatisticsDistributionChart
            header={"sign_overall"}
            counts={data.sign_metrics.sign_count}
            ratios={data.sign_metrics.sign_count.map(
              (c) => (c / numberOfSigns) * 100.0,
            )}
            overall={data.sign_metrics["Average score"]}
            countUnits="segments"
          />
        </ListItem>
      }
    </List>
  );
}
