import { type Row } from "@tanstack/react-table";
import { Button } from "@/components/primitives/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export function DataTableCellExpandRow<TData>({ row }: { row: Row<TData> }) {
    if (!row.getCanExpand()) {
        return null;
    }

    return (
        <Button
          className="size-7 shadow-none text-muted-foreground"
          onClick={row.getToggleExpandedHandler()}
          aria-expanded={row.getIsExpanded()}
          aria-label={row.getIsExpanded() 
            ? `Collapse details for row`
            : `Expand details for row`
          }
          size="icon"
          variant="ghost"
        >
          {row.getIsExpanded() ? (
            <ChevronUpIcon
              className="opacity-60"
              size={16}
              aria-hidden="true"
            />
          ) : (
            <ChevronDownIcon
              className="opacity-60"
              size={16}
              aria-hidden="true"
            />
          )}
        </Button>
    )
}