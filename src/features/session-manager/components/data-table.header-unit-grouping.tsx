import type { Column, Table } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/blocks/data-table.header-column";
import { buttonVariants } from "@/components/primitives/button.variants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { PopoverProps } from "@radix-ui/react-popover";
import { CircleHelp } from "lucide-react";

interface DataTableCellIdProps<TData extends { grouping: string }, TValue>
  extends PopoverProps {
  column: Column<TData, TValue>;
  table: Table<TData>;
  className?: string;
}

/**
/**
 * React Component for the "Grouping" column header in the data table.
 *
 * @deprecated - The "grouping" field is deprecated. Groups are now inferred from the properties
 * of each unit's `inputs.json` file, rather than being explicitly set.
 *
 * @returns React component for the "Grouping" column header with a popover explaining the deprecation.
 */
export function DataTableHeaderUnitGrouping<TData extends { grouping: string }, TValue>({
  column,
  table,
  className,
  children,
  ...props
}: DataTableCellIdProps<TData, TValue>) {
  return (
    <span className="grid ">
      <Popover {...props}>
        <div
          className={cn(
            "items-center font-medium",
            "grid grid-cols-[minmax(auto,_1fr),_auto] gap-1",
            className,
          )}
        >
          <DataTableColumnHeader column={column} title={"Grouping"} table={table} />

          <PopoverTrigger
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "size-6 text-inherit",
            )}
          >
            <CircleHelp className="size-3" />
          </PopoverTrigger>
        </div>
        <PopoverContent className="gap-3 ">
          <p>Notice</p>
          <p className="text-xs">
            Groupings are related units that were captured and uploaded during the same drive. 
            Units must generate new sessions with other units from the 
            {"  "}<i>same grouping</i>.
          </p>
          {children}
        </PopoverContent>
      </Popover>
    </span>
  );
}
