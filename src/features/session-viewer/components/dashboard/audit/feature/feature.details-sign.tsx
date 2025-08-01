import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { Anchor } from "@/components/typeography/anchor";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { List, ListItem } from "@/components/ui/list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChartCategoryBar } from "@/components/visualizations/chart.category-bar";
import { useSessionAndAuditParams } from "@/features/session-viewer/hooks/audit/use-audit-path-params";
import { useSessionBins } from "@/features/session-viewer/hooks/viewer/use-session-bins";
import { INTERNAL__FRAME_URL_PARAM_DELIMITER } from "@/lib/audit-utils";
import {
  numberToMilesFormatter,
  percentageFormatterFromDecimal,
} from "@/lib/formatters/number-value-formatter";
import { stringToTitleCaseAndSpacingFormatter, stringToTitleCaseFormatter } from "@/lib/formatters/string-value-formatter";
import { cn } from "@/lib/utils";
import { type AppSignFeaturePropsV2 } from "@/server/zod/schema.audit";
import type { AppSessionsBin } from "@/server/zod/session.bins";
import { useState } from "react";

export function FeatureDetailsSign({
  id,
  unit,
  lrs,
  overall_score: score,
  conspicuity,
  legibility_time,
  glance_legibility,
  understandability,
  conspicuity_score,
  legibility_time_score,
  glance_legibility_score,
  understandability_score,
  className,
}: { className?: string } & AppSignFeaturePropsV2) {
  const params = useSessionAndAuditParams();
  const bins = useSessionBins();
  const [isOpen, setIsOpen] = useState(false);
  const scores = [
    {
      header: `Overall (${percentageFormatterFromDecimal(score)})`,
      percentage: score,
    },
    {
      header: `Understandabiltiy (${percentageFormatterFromDecimal(understandability_score ?? understandability)})`,
      percentage: understandability_score ?? understandability,
    },
    {
      header: `Legibility Time (${percentageFormatterFromDecimal(legibility_time_score ?? legibility_time)})`,
      percentage: legibility_time_score ?? legibility_time,
    },
    {
      header: `Glance Legibility (${percentageFormatterFromDecimal(glance_legibility_score ?? glance_legibility)})`,
      percentage: glance_legibility_score ?? glance_legibility,
    },
    {
      header: `Conspicuity (${percentageFormatterFromDecimal(conspicuity_score ?? conspicuity)})`,
      percentage: conspicuity_score ?? conspicuity,
    },
  ];

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-start">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {stringToTitleCaseAndSpacingFormatter(id)}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => navigator.clipboard.writeText(id)}
            >
              <Icons.actions.copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>
            Show information recorded during session.
          </CardDescription>
        </div>
        <div className="absolute right-6 top-8 flex items-center gap-1">
          <Anchor
            href={`/api/segments/${id}${INTERNAL__FRAME_URL_PARAM_DELIMITER}${params.session}`}
            download={`${id}-data.json`}
            target="_blank"
          >
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Icons.actions.download className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="sr-only">Download</span>
            </Button>
          </Anchor>
        </div>
      </CardHeader>

      <CardContent className="p-6 text-sm">
        <ScrollArea>
          <div className="grid gap-3">
            <div className="font-semibold">Audit Details</div>
            <List variant={"simple"}>
              <ListItem>
                <span className="text-muted-foreground">Sign #</span>
                <span>{stringToTitleCaseAndSpacingFormatter(id)}</span>
              </ListItem>
              <ListItem className="flex items-center justify-between ">
                <span className="text-muted-foreground">Unit #</span>
                <span>{stringToTitleCaseAndSpacingFormatter(unit)}</span>
              </ListItem>
              <ListItem className="flex items-center justify-between ">
                <span className="text-muted-foreground">LRS</span>
                <span>{numberToMilesFormatter(lrs)}</span>
              </ListItem>
            </List>

            <Separator className="my-2" />

            <div className="relative max-h-44 overflow-hidden sm:max-w-lg">
              <div className="font-semibold">Sign scores</div>
              <SignScoresList bins={bins} signScores={scores} />

              <div className="rounded-b-default absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-card to-transparent py-7">
                <button
                  className="text-content-strong flex items-center justify-center rounded-sm border border-border bg-background px-2.5 py-2 text-default font-medium shadow-input hover:bg-muted"
                  onClick={() => setIsOpen(true)}
                >
                  Show more
                </button>
              </div>
              <Dialog
                open={isOpen}
                onOpenChange={(open) => setIsOpen(open)}
                modal
                // className="z-[100]"
              >
                <DialogContent className="overflow-hidden p-0">
                  <div className="px-6 pb-4 pt-6">
                    <div className="flex items-center justify-between pt-4">
                      <p className="text-content-strong dark:text-dark-content-strong text-default font-medium">
                        Sign Statistics
                      </p>
                      {/* <p className="text-label text-content dark:text-dark-content font-medium uppercase">
                        Visitors
                      </p> */}
                    </div>
                  </div>
                  <div className="h-64 overflow-y-auto px-6">
                    <SignScoresList bins={bins} signScores={scores} />
                  </div>
                  <div className="bg-background-muted dark:border-dark-border dark:bg-dark-background mt-4 border-t border-border p-6">
                    <button
                      className="text-content-strong hover:bg-background-muted dark:border-dark-border dark:bg-dark-background dark:text-dark-content-strong dark:shadow-dark-input hover:dark:bg-dark-background-muted flex w-full items-center justify-center rounded-sm border border-border bg-background py-2 text-default font-medium shadow-input"
                      onClick={() => setIsOpen(false)}
                    >
                      Go back
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export function INTERNAL__PercentageDisplay({
  percentage,
  header,
  bins,
}: {
  percentage: number;
  header: string;
  bins: AppSessionsBin;
}) {
  const percentages = [
    bins.levelLowBinBounds.max / 1,
    (bins.levelHighBinBounds.min - bins.levelLowBinBounds.max) / 1,
    (1 - bins.levelHighBinBounds.min) / 1,
  ];

  return (
    <ListItem className="flex flex-1 flex-col items-stretch justify-between">
      <span className="mb-1 text-nowrap text-xs text-foreground">
        {stringToTitleCaseFormatter(header)}
      </span>
      <span className="grid flex-1">
        <ChartCategoryBar
          values={percentages}
          marker={{
            value: percentage,
            tooltip: `${percentageFormatterFromDecimal(percentage)}`,
            showAnimation: true,
          }}
          colors={["rose", "amber", "emerald"]}
        />
      </span>
    </ListItem>
  );
}

export function SignScoresList({
  signScores,
  bins,
}: {
  signScores: {
    header: string;
    percentage: number;
  }[];
  bins: AppSessionsBin;
}) {
  return (
    <List variant={"simple"} className="flex flex-col gap-2">
      {signScores.map(({ header, percentage }) => (
        <INTERNAL__PercentageDisplay
          key={header}
          percentage={percentage}
          header={header}
          bins={bins}
        />
      ))}
    </List>
  );
}
