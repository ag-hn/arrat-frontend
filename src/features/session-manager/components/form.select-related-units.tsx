"use client";

import { cn } from "@/lib/utils";
import { type ColumnFiltersState } from "@tanstack/react-table";
import { forwardRef } from "react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";
import { type TransformedUnitsGroupingList } from "../types/transformers";
import { columns, filters } from "./data-table.config-unit";
import { DataTable } from "./data-table.implementation";
import { DataTableSelectedRowDisplay } from "./data-table.selected-row-display";
import React from "react";
import { DataTableSelectedRowAlert } from "./data-table.selected-row-alert";
import type { AppUnitGroupingFormData } from "../zod/schema.form";

interface FormSelectMultiProps extends ControllerRenderProps<FieldValues> {
  className?: string;
  defaultColumnFilters?: ColumnFiltersState;
  defaultGlobalFilter?: unknown;
  data: TransformedUnitsGroupingList;
}

export const FormSelectRelatedUnits = forwardRef<HTMLDivElement, FormSelectMultiProps>(({
  className,
  defaultColumnFilters,
  defaultGlobalFilter,
  data,
  // name,
  // disabled,
  // onBlur,
  onChange,
  // ref,
  // value
}, ref) => {
  const individualUnits = React.useMemo(() => data.flatMap((g) => g.units), [data])
  return (
    <div ref={ref}>
      <DataTable
        onRowSelectionChanged={(selectedRows) => {
          return onChange?.(selectedRows.map((row) => ({
            session: row.grouping,
            unit: row.id,
          } satisfies AppUnitGroupingFormData)));
        }}
        className={cn(
          "table-fixed border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td:not(:first-child)]:border-t [&_th]:border-b [&_th]:border-border [&_tr:not(:last-child)_td]:border-b [&_tr]:border-none [&_tr_th:not(:last-child)]:border-r",
          "border-separate border-spacing-y-0",
          className,
        )}
        columns={columns}
        data={individualUnits}
        filters={filters}
        defaultColumnFilters={defaultColumnFilters}
        defaultGlobalFilter={defaultGlobalFilter}
      >
        <DataTableSelectedRowAlert />
        <DataTableSelectedRowDisplay />
      </DataTable>
    </div>
  );
});
FormSelectRelatedUnits.displayName = "FormSelectRelatedUnits"