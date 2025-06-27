import { HoverCardTimestamp } from "@/components/blocks/data-table.cell-timestamp";
import { IconWrapper } from "@/components/primitives/icon-wrapper";
import { BoxIcon } from "lucide-react";
import { type ReactNode } from "react";
import { type TransformedUnitEntry } from "../types/transformers";
import { Separator } from "@/components/ui/separator";
import { stringToTitleCaseAndSpacingFormatter, stringToTitleCaseFormatter } from "@/lib/formatters/string-value-formatter";

export function DataTableDisplayUnits({
  relatedEntries,
  header = (
    <p className="flex items-center justify-between text-sm font-medium text-foreground">
      <span>Related Units</span>
      <span>Details</span>
    </p>
  ),
}: {
  relatedEntries: TransformedUnitEntry[];
  header?: ReactNode;
}) {
  return (
      <div className="@container/unit-display flex flex-1 flex-col gap-2">
        {header}

        <ul className="mt-1 max-h-48 divide-y divide-border overflow-y-auto text-sm text-foreground">
          {relatedEntries.map((unit, index) => (
            <li
              key={index}
              className="flex items-center justify-between flex-col @md/unit-display:flex-row py-2.5 gap-y-1.5 @md/unit-display:gap-y-1"
            >
              <span className="flex items-center flex-col @md/unit-display:flex-row gap-3 @md/unit-display:gap-2">
                <IconWrapper variant="blue" className="size-4">
                  <span>
                    <BoxIcon className="size-3" />
                  </span>
                </IconWrapper>

                <span className="flex flex-row @md/unit-display:flex-col gap-y-2 @md/unit-display:gap-y-1">
                  {stringToTitleCaseAndSpacingFormatter(unit.id)}

                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <i>{unit.route}</i>

                    {stringToTitleCaseFormatter(unit.direction)}

                    <Separator
                      orientation="vertical"
                      aria-hidden="true"
                      className="h-3"
                    />

                    Milepost {unit.milepostRange.join(' - ')}
                  </span>
                </span>
              </span>

              <span className="flex items-center gap-2">
                {unit.depth}
                <Separator
                  orientation="vertical"
                  aria-hidden="true"
                  className="h-4"
                />
                <HoverCardTimestamp date={unit.createdAt} />
              </span>
            </li>
          ))}
        </ul>
      </div>
  );
}
