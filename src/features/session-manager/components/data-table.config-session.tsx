"use client"

import { DataTableCellExpandRow } from "@/components/blocks/data-table.cell-expand-row"
import { HoverCardTimestamp } from "@/components/blocks/data-table.cell-timestamp"
import { DataTableColumnHeader } from "@/components/blocks/data-table.header-column"
import { type DataTableFilterFields } from "@/types/data-table"
import { type ColumnDef } from "@tanstack/react-table"
import { type TransformedSessionEntry } from "../types/transformers"
import { DataTableCellVisibility } from "./data-table.cell-visibility"
import { DataTableCellId } from "./data-table.cell-id"

/**
 * Session filters are used here
 */
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
  {
    __type: "select",
    __key: "visibility",
    label: "Visibility",
    placeholder: "Filter visibility...",
    options: [
      { label: "Visible", value: "visible" },
      { label: "Hidden", value: "hidden" },
    ],
  },
] satisfies DataTableFilterFields<TransformedSessionEntry>;

export const columns: ColumnDef<TransformedSessionEntry>[] = [
  {
    id: "expander",
    enableHiding: false,
    enableSorting: false,
    size: 75,
    minSize: 50,
    maxSize: 75,
    meta: {
      headerClassName: "w-[--header-expander-size] max-w-[--header-expander-size] min-w-[--header-expander-size]",
      cellClassName: "w-[--col-expander-size] max-w-[--col-expander-size] min-w-[--col-expander-size]",
    },
    header: () => null,
    cell: ({ row }) => {
      return <span className="w-full h-full flex gap-1 items-center justify-start text-muted-foreground text-xs">
        <DataTableCellExpandRow row={row} />
        ({row.original.relatedEntries.length})
      </span>
    },
  },
  {
    accessorKey: "id",
    accessorFn: (v) => v.id,
    enableSorting: true,
    size: 125,
    minSize: 125,
    maxSize: 300,
    meta: {
      headerClassName: "w-[--header-id-size] max-w-[--header-id-size] min-w-[--header-id-size]",
      cellClassName: "w-[--col-id-size] max-w-[--col-id-size] min-w-[--col-id-size]",
    },
    cell: ({ row }) => {
      return <DataTableCellId row={row} />
    },
    header: ({ column, table }) => {
      return (
        <DataTableColumnHeader column={column} title="Session ID" table={table} />
      )
    }
  },
  {
    accessorKey: "description",
    accessorFn: (v) => v.description,
    enableSorting: false,
    size: 300,
    minSize: 200,
    maxSize: 400,
    meta: {
      headerClassName: "w-[--header-description-size] max-w-[--header-description-size] min-w-[--header-description-size]",
      cellClassName: "w-[--col-description-size] max-w-[--col-description-size] min-w-[--col-description-size]",
    },
    header: ({ column, table }) => {
      return (
        <DataTableColumnHeader column={column} title="Description" table={table} />
      )
    }
  },
  {
    accessorKey: "createdAt",
    enableSorting: true,
    size: 250,
    minSize: 250,
    maxSize: 300,
    filterFn: "dateRange",
    meta: {
      headerClassName: "w-[--header-createdAt-size] max-w-[--header-createdAt-size] min-w-[--header-createdAt-size]",
      cellClassName: "w-[--col-createdAt-size] max-w-[--col-createdAt-size] min-w-[--col-createdAt-size]",
    },
    cell: ({ row }) => {
      return <HoverCardTimestamp date={row.original.createdAt} />
    },
    header: ({ column, table }) => {
      return (
        <DataTableColumnHeader column={column} title="Created At" table={table} />
      )
    }
  },
  {
    accessorKey: "visibility",
    enableSorting: true,
    filterFn: "arrIncludesSome",
    sortingFn: (a, b) => {
      return a.original.visibility?.localeCompare(b.original?.visibility ?? '') ?? 0
    },
    size: 100,
    minSize: 100,
    maxSize: 100,
    meta: {
      headerClassName: "w-[--header-visibility-size] max-w-[--header-visibility-size] min-w-[--header-visibility-size]",
      cellClassName: "w-[--col-visibility-size] max-w-[--col-visibility-size] min-w-[--col-visibility-size]",
    },
    accessorFn: (v) => v.visibility,
    cell: ({ row }) => {
      return <DataTableCellVisibility row={row} />
    },
    header: ({ column, table }) => {
      return (
        <DataTableColumnHeader column={column} title="Visibility" table={table} />
      )
    }
  },
]
