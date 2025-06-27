"use client"

import { DataTableCellCheckbox } from "@/components/blocks/data-table.cell-checkbox"
import { HoverCardTimestamp } from "@/components/blocks/data-table.cell-timestamp"
import { DataTableHeaderCheckbox } from "@/components/blocks/data-table.header-checkbox"
import { DataTableColumnHeader } from "@/components/blocks/data-table.header-column"
import { type DataTableFilterFields } from "@/types/data-table"
import { type AccessorFn, type ColumnMeta, type ColumnDef } from "@tanstack/react-table"
import { type TransformedUnitEntry } from "../types/transformers"
import { stringToTitleCaseFormatter, stringToTitleCaseAndSpacingFormatter } from "@/lib/formatters/string-value-formatter"

export const filters = [
  {
    __type: "timerange",
    __key: "createdAt",
    label: "Created At",
    commandDisabled: true,
    disabledDays: {
      after: new Date(),
    },
    numberOfMonths: 1,
  },
] satisfies DataTableFilterFields<TransformedUnitEntry>;  

export const columns: ColumnDef<TransformedUnitEntry>[] = [
  {
    accessorKey: "selected",
    accessorFn: (value) => value,
    header: ({ table }) => (
      <DataTableHeaderCheckbox table={table} />
    ),
    enableHiding: false,
    enableSorting: false,
    size: 75,
    minSize: 50,
    maxSize: 75,
    meta: {
      headerClassName: "w-[--header-selected-size] max-w-[--header-selected-size] min-w-[--header-selected-size]",
      cellClassName: "w-[--col-selected-size] max-w-[--col-selected-size] min-w-[--col-selected-size]",
    },
    cell: ({ row }) => {
      return (
        <DataTableCellCheckbox row={row} />
      )
    },
  },

  INTERNAL__generateColumnDefDefault("id", "Unit ID", (v) => stringToTitleCaseAndSpacingFormatter(v.id), {
    headerClassName: "w-[--header-id-size] max-w-[--header-id-size] min-w-[--header-id-size]",
    cellClassName: "w-[--col-id-size] max-w-[--col-id-size] min-w-[--col-id-size]",
  }),
  INTERNAL__generateColumnDefDefault("route", "Route", (v) => v.route, {
    headerClassName: "w-[--header-route-size] max-w-[--header-route-size] min-w-[--header-route-size]",
    cellClassName: "w-[--col-route-size] max-w-[--col-route-size] min-w-[--col-route-size]",
  }),
  INTERNAL__generateColumnDefDefault("milepostRange", "Milepost Markers", (v) => v.milepostRange.join(' - '), {
    headerClassName: "w-[--header-milepostRange-size] max-w-[--header-milepostRange-size] min-w-[--header-milepostRange-size]",
    cellClassName: "w-[--col-milepostRange-size] max-w-[--col-milepostRange-size] min-w-[--col-milepostRange-size]",
  }),
  INTERNAL__generateColumnDefDefault("direction", "Direction", (v) => stringToTitleCaseFormatter(v.direction), {
    headerClassName: "w-[--header-direction-size] max-w-[--header-direction-size] min-w-[--header-direction-size]",
    cellClassName: "w-[--col-direction-size] max-w-[--col-direction-size] min-w-[--col-direction-size]",
  }),
  INTERNAL__generateColumnDefDefault("depth", "Depth", (v) => v.depth ? 'true' : 'false', {
    headerClassName: "w-[--header-depth-size] max-w-[--header-depth-size] min-w-[--header-depth-size]",
    cellClassName: "w-[--col-depth-size] max-w-[--col-depth-size] min-w-[--col-depth-size]",
  }),

{
    accessorKey: "createdAt",
    filterFn: "dateRange",
    header: ({ column, table }) => {
      return (
        <DataTableColumnHeader column={column} title="Created At" table={table} />
      )
    },
    cell: ({ row }) => {
      return <HoverCardTimestamp date={row.original.createdAt} />
    },
    size: 250,
    minSize: 250,
    maxSize: 300,
    meta: {
      headerClassName: "w-[--header-createdAt-size] max-w-[--header-createdAt-size] min-w-[--header-createdAt-size]",
      cellClassName: "font-mono w-[--col-createdAt-size] max-w-[--col-createdAt-size] min-w-[--col-createdAt-size]",
    },
  },
]

function INTERNAL__generateColumnDefDefault<TData, TValue = unknown>(
  accessorKey: keyof TData,
  title: string,
  accessorFn: AccessorFn<TData, TValue>,
  meta: ColumnMeta<TData, TValue>
): ColumnDef<TData> {
  return {
    id: String(accessorKey),
    accessorKey,
    accessorFn,
    meta,
    size: 100,
    minSize: 75,
    maxSize: 300,
    enableSorting: true,
    header: ({ column, table }) => {
      return <DataTableColumnHeader column={column} title={title} table={table} />;
    },
  };
}