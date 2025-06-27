import { Icons } from "@/components/icons/icons";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { Anchor } from "@/components/typeography/anchor";
import { List, ListItem } from "@/components/ui/list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useSessionAndAuditParams } from "@/features/session-viewer/hooks/audit/use-audit-path-params";
import { useSessionBins } from "@/features/session-viewer/hooks/viewer/use-session-bins";
import {
  INTERNAL__FRAME_URL_PARAM_DELIMITER,
  scoreToSeverity,
} from "@/lib/audit-utils";
import {
  numberToMilesFormatter,
  percentageFormatterFromDecimal,
} from "@/lib/formatters/number-value-formatter";
import { stringToTitleCaseAndSpacingFormatter, stringToTitleCaseFormatter } from "@/lib/formatters/string-value-formatter";
import { cn } from "@/lib/utils";
import { type AppSignFeaturePropsV1 } from "@/server/zod/schema.audit";

export function FeatureDetailsSignV1({
  id,
  type,
  unit,
  lrs,
  score,
  className,
}: { className?: string } & AppSignFeaturePropsV1) {
  const params = useSessionAndAuditParams();

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
            </List>

            <Separator className="my-2" />

            <List variant={"simple"}>
              <ListItem className="flex items-center justify-between ">
                <span className="text-muted-foreground">Type</span>
                <span>{stringToTitleCaseFormatter(type)}</span>
              </ListItem>
              <ListItem className="flex items-center justify-between ">
                <span className="text-muted-foreground">LRS</span>
                <span>{numberToMilesFormatter(lrs)}</span>
              </ListItem>

              <INTERNAL__MultiLineDataSetWithSeverity
                header="Confidence"
                data={score}
              />
            </List>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function INTERNAL__MultiLineDataSetWithSeverity({
  data,
  header,
}: {
  data: number[] | number;
  header: string;
}) {
  return (
    <ListItem className="">
      <span className="text-muted-foreground">{header}</span>
      <span className="flex flex-col items-end gap-1">
        {Array.isArray(data) ? (
          data.map((c) => {
            return <INTERNAL__MultiLineDataSetItem key={c} data={c} />;
          })
        ) : (
          <INTERNAL__MultiLineDataSetItem data={data} />
        )}
      </span>
    </ListItem>
  );
}

function INTERNAL__MultiLineDataSetItem({ data }: { data: number }) {
  const bins = useSessionBins();
  const severity = scoreToSeverity(data, bins);

  return (
    <Badge
      variant={
        severity === "level low"
          ? "error"
          : severity === "level medium"
            ? "warning"
            : "success"
      }
    >
      {" "}
      {percentageFormatterFromDecimal(data)}
    </Badge>
  );
}
