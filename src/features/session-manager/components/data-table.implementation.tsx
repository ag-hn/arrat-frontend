/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { DataTableFilterCommand } from "@/components/blocks/data-table.filter-command";
import { DataTablePagination } from "@/components/blocks/data-table.pagination";
import { DataTableProvider } from "@/components/blocks/data-table.provider";
import { DataTableFilterControls } from "@/features/session-manager/components/data-table.filter-controls";
// import { DataTableToolbar } from "@/components/blocks/data-table.toolbar";
import { DataTableStateEmpty } from "@/components/blocks/data-table.state-empty";
import { filterStringContains, inDateRange, matchFilterString } from "@/lib/data-table/filter-functions";
import { cn } from "@/lib/utils";
import { type DataTableFilterFields } from "@/types/data-table";
import { type ComponentWithClassNameAndChildren } from "@/types/utils";
import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  Table as TTable
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Row,
} from "@tanstack/react-table";
import { InfoIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import * as React from "react";
import { type TransformedSessionEntry, type TransformedUnitEntry } from "../types/transformers";
import { searchParamsParser } from "./data-table.search-params";
import { Fragment } from "react";

export interface DataTableProps<TData extends (TransformedUnitEntry | TransformedSessionEntry), TValue> extends ComponentWithClassNameAndChildren {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  defaultColumnFilters?: ColumnFiltersState;
  defaultGlobalFilter?: unknown;
  // TODO: add sortingColumnFilters
  filters?: DataTableFilterFields<TData>;
  onRowSelectionChanged?: (selectedRows: TData[]) => void;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  overrides?: {
    row?: (row: Row<TData>) => React.ReactNode;
    expandedRow?: (row: Row<TData>) => React.ReactNode;
  };
  extensions?: {
    row?: (table: TTable<TData>) => React.ReactNode,
  }
}

export function DataTable<TData extends (TransformedUnitEntry | TransformedSessionEntry), TValue>({
  columns,
  data,
  defaultColumnFilters = [],
  defaultGlobalFilter = undefined,
  filters = [],
  className,
  children,
  extensions,
  onRowSelectionChanged,
  getRowCanExpand,
  overrides,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(defaultColumnFilters.filter((filter) => !!filters.find((f) => f.__key === filter.id)));
  const [globalFilter, setGlobalFilter] = React.useState<unknown>(defaultGlobalFilter);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  //   const [columnVisibility, setColumnVisibility] = useLocalStorage<VisibilityState>("data-table-visibility", {});
  const [_, setSearch] = useQueryStates(searchParamsParser);

  const handleRowSelectionChange = React.useCallback((updaterOrValue: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
    const updatedRowSelection = typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue;
    setRowSelection(updatedRowSelection);

    if (onRowSelectionChanged) {
      const selectedRows = Object.keys(updatedRowSelection)
        .filter(key => updatedRowSelection[key])
        .map(key => data[parseInt(key)]!)
        .filter((id): id is TData => id !== undefined);

      onRowSelectionChanged(selectedRows);
    }
  }, [onRowSelectionChanged, rowSelection, data]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      dateRange: inDateRange,
      matchFilterString: matchFilterString,
      contains: filterStringContains,
    },
    state: {
      columnFilters,
      sorting,
      rowSelection,
      globalFilter,
      // columnVisibility, 
      pagination
    },
    // onColumnVisibilityChange: setColumnVisibility,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: getRowCanExpand ?? (() => false),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: handleRowSelectionChange,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    // REMINDER: it doesn't support array of strings (WARNING: might not work for other types)
    getFacetedUniqueValues: (table: TTable<TData>, columnId: string) => () => {
      const facets = getFacetedUniqueValues<TData>()(table, columnId)();
      const customFacets = new Map();
      for (const [key, value] of facets) {
        if (Array.isArray(key)) {
          for (const k of key) {
            const prevValue = customFacets.get(k) ?? 0;
            customFacets.set(k, prevValue + value);
          }
        } else {
          const prevValue = customFacets.get(key) ?? 0;
          customFacets.set(key, prevValue + value);
        }
      }

      return customFacets;
    },
  });

  React.useEffect(() => {
    const search = { global: globalFilter };

    void setSearch(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalFilter]);

  React.useEffect(() => {
    const columnFiltersWithNullable = filters.map((field) => {
      const filterValue = columnFilters.find(
        (filter) => filter.id === field.__key,
      );
      if (!filterValue) return { id: field.__key, value: null };
      return { id: field.__key, value: filterValue.value };
    });

    const search = columnFiltersWithNullable.reduce(
      (prev, curr) => {
        prev[curr.id as string] = curr.value;
        return prev;
      },
      {} as Record<string, unknown>,
    );

    void setSearch(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnFilters]);

  /**
     * https://tanstack.com/table/v8/docs/guide/column-sizing#advanced-column-resizing-performance
     * Instead of calling `column.getSize()` on every render for every header
     * and especially every data cell (very expensive),
     * we will calculate all column sizes at once at the root table level in a useMemo
     * and pass the column sizes down as CSS variables to the <table> element.
     */
  const columnSizeVars = React.useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: Record<string, string> = {};
    for (const header of headers) {
      // REMINDER: replace "." with "-" to avoid invalid CSS variable name (e.g. "timing.dns" -> "timing-dns")
      colSizes[`--header-${header.id.replace(".", "-")}-size`] =
        `${header.getSize()}px`;
      colSizes[`--col-${header.column.id.replace(".", "-")}-size`] =
        `${header.column.getSize()}px`;
    }
    return colSizes;
  }, [table]);

  return (
    <DataTableProvider
      table={table}
      columns={columns}
      filters={filters}
      rowSelection={rowSelection}
      globalFilter={globalFilter}
      columnFilters={columnFilters}
      sorting={sorting}
      pagination={pagination}
    >
      <div
        className={cn(
          "grid gap-3",
          className,
        )}
        style={{
          ...columnSizeVars,
        }}
      >
        <div
          className={cn(
            "w-full p-1 sm:self-start",
            "group-data-[expanded=false]/controls:hidden",
          )}
        >
          <DataTableFilterControls />
        </div>

        <div className="grid gap-4 p-1">
          <Table>
            <TableHeader className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "relative select-none truncate border-b border-border [&>.cursor-col-resize]:last:opacity-0",
                          header.column.columnDef.meta?.headerClassName,
                        )}
                        aria-sort={
                          header.column.getIsSorted() === "asc"
                            ? "ascending"
                            : header.column.getIsSorted() === "desc"
                              ? "descending"
                              : "none"
                        } >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>

              {extensions?.row?.(table)}

              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  overrides?.row?.(row) ?? (
                    <Fragment key={`${row.id}-row-fragment`}>
                      <TableRow
                        key={`${row.id}-row`}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            className={cn(
                              "whitespace-nowrap [&:has([aria-expanded])]:w-px [&:has([aria-expanded])]:py-0 [&:has([aria-expanded])]:pr-0",
                              cell.column.columnDef.meta?.cellClassName,
                            )}
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>

                      {row.getIsExpanded() && (
                        overrides?.expandedRow?.(row) ?? (
                          <TableRow
                            key={`${row.id}-expanded-row`}
                          >
                            <TableCell colSpan={row.getVisibleCells().length}>
                              <div className="text-primary/80 flex items-start py-2">
                                <span
                                  className="me-3 mt-0.5 flex w-7 shrink-0 justify-center"
                                  aria-hidden="true"
                                >
                                  <InfoIcon className="opacity-60" size={16} />
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </Fragment>
                  )
                ))
              ) : (
                <DataTableStateEmpty />
              )}
            </TableBody>
          </Table>
        </div>

        <DataTablePagination />

        {children}

      </div>
    </DataTableProvider>
  );
}

// function Row<TData>({
//   row,
//   table,
//   selected,
// }: {
//   row: Row<TData>;
//   table: TTable<TData>;
//   // REMINDER: row.getIsSelected(); - just for memoization
//   selected?: boolean;
// }) {
//   // REMINDER: rerender the row when live mode is toggled - used to opacity the row
//   // via the `getRowClassName` prop - but for some reasons it wil render the row on data fetch
//   return (
//     <TableRow
//       id={row.id}
//       tabIndex={0}
//       data-state={selected && "selected"}
//       onClick={() => row.toggleSelected()}
//       onKeyDown={(event) => {
//         if (event.key === "Enter") {
//           event.preventDefault();
//           row.toggleSelected();
//         }
//       }}
//       className={cn(
//         "[&>:not(:last-child)]:border-r",
//         "outline-1 -outline-offset-1 outline-primary transition-colors focus-visible:bg-muted/50 focus-visible:outline data-[state=selected]:outline",
//         table.options.meta?.getRowClassName?.(row),
//       )}
//     >
//       {row.getVisibleCells().map((cell) => (
//         <TableCell
//           key={cell.id}
//           className={cn(
//             "truncate border-b border-border",
//             cell.column.columnDef.meta?.cellClassName,
//           )}
//         >
//           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//         </TableCell>
//       ))}
//     </TableRow>
//   );
// }

// const MemoizedRow = React.memo(
//   Row,
//   (prev, next) =>
//     prev.row.id === next.row.id && prev.selected === next.selected,
// ) as typeof Row;