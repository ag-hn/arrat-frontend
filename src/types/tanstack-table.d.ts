/* eslint-disable @typescript-eslint/no-unused-vars */
import "@tanstack/react-table"
import { type TODO } from "@/types/utils"

declare module "@tanstack/react-table" {
  // https://github.com/TanStack/table/issues/44#issuecomment-1377024296
  interface TableMeta<TData> {
    getRowClassName?: (row: Row<TData>) => string;
  }

  interface ColumnMeta<TData> {
    headerClassName?: string
    cellClassName?: string
  }

  interface FilterFns {
    dateRange?: FilterFn<TODO>;
    matchFilterString?: FilterFn<TODO>;
    contains?: FilterFn<TODO>;
  }

  // https://github.com/TanStack/table/discussions/4554
  interface ColumnFiltersOptions<TData extends RowData> {
    filterFns?: Record<string, FilterFn<TData>>;
  }
}