import type { Column, Table } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button, type ButtonProps } from "@/components/primitives/button";

import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue> extends ButtonProps {
  column: Column<TData, TValue>;
  table: Table<TData>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  table,
  title,
  children,
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn("px-3 py-1 text-xs", className)}>{title}</div>;
  }

  const isAnyOtherColumnSorted = table.getState().sorting.some(sort => sort.id !== column.id);
  const isSorted = column.getIsSorted() === "asc" || column.getIsSorted() === "desc";
  const isActive = isSorted || !isAnyOtherColumnSorted;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => {
        column.toggleSorting(undefined);
      }}
      className={cn(
        "flex w-full items-center justify-between gap-2",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "truncate",
          isActive ? "text-accent-foreground" : "text-muted-foreground/60",
        )}
      >
        {title}
        {children}
      </span>

      <span className="flex flex-col">
        <ChevronUp
          className={cn(
            "-mb-0.5 h-3 w-3",
            column.getIsSorted() === "asc"
              ? "text-accent-foreground"
              : "text-muted-foreground/40",
          )}
        />
        <ChevronDown
          className={cn(
            "-mt-0.5 h-3 w-3",
            column.getIsSorted() === "desc"
              ? "text-accent-foreground"
              : "text-muted-foreground/40",
          )}
        />
      </span>
    </Button>
  );
}
