"use client";

import { cn } from "@/lib/utils";
import { type ColumnFiltersState, type Row } from "@tanstack/react-table";
import { type TransformedSessionEntry } from "../types/transformers";
import { columns, filters } from "./data-table.config-session";
import { DataTableExpanderSession } from "./data-table.expander-session";
import { DataTable } from "./data-table.implementation";
import { DataTableRowPipelineInProgress } from "./data-table.row-pipeline-in-progress";

interface FormSelectMultiProps {
  className?: string;
  onSelectionChanged?: (value: string[]) => void;
  defaultColumnFilters?: ColumnFiltersState;
  defaultGlobalFilter?: unknown;
  data: TransformedSessionEntry[];
}

export function TableSessions({
  className,
  onSelectionChanged,
  defaultColumnFilters,
  defaultGlobalFilter,
  data,
}: FormSelectMultiProps) {
  return (
    <DataTable
      onRowSelectionChanged={(selectedRows) => {
        return onSelectionChanged?.(selectedRows.map((row) => row.id));
      }}
      className={cn(
        "table-fixed border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td:not(:first-child)]:border-t [&_th]:border-b [&_th]:border-border [&_tr:not(:last-child)_td]:border-b [&_tr]:border-none [&_tr_th:not(:last-child)]:border-r",
        "border-separate border-spacing-y-0",
        className,
      )}
      data={data}
      columns={columns}
      filters={filters}
      getRowCanExpand={(row) => row.original.relatedEntries.length > 0}
      defaultColumnFilters={defaultColumnFilters}
      defaultGlobalFilter={defaultGlobalFilter}
      overrides={{
        expandedRow: (row: Row<TransformedSessionEntry>) => {
          return (
            <DataTableExpanderSession
              key={`${row.id}-expanded-content`}
              row={row}
            />
          );
        },
      }}
      extensions={{
        row(table) {
          return (
            <DataTableRowPipelineInProgress 
              table={table}
            />
          )
        },
      }}
    ></DataTable>
  );
}