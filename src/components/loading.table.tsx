/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { cn } from "@/lib/utils";
import { type TODO, type ComponentWithClassNameAndChildren } from "@/types/utils";
import {
  flexRender,
  getCoreRowModel,
  type RowData,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { Placeholder } from "./primitives/placeholder";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function LoadingTable<TData extends RowData>({
  className,
  columns,
  rowCount = 5,
  overrides,
}: ComponentWithClassNameAndChildren<{
  columns: TableOptions<TData>["columns"];
  rowCount?: number;
  overrides?: {
    footer?: boolean;
    header?: boolean;
    pagination?: boolean;
  };
}>) {
  const [data] = React.useState<TODO[]>([]);
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    enableColumnFilters: false,
    enableColumnPinning: false,
    enableColumnResizing: false,
    enableExpanding: false,
    enableFilters: false,
    enableGlobalFilter: false,
    enableGrouping: false,
    enableHiding: false,
    enableMultiRemove: false,
    enableMultiRowSelection: false,
    enableMultiSort: false,
    enableRowPinning: false,
    enableRowSelection: false,
    enableSortingRemoval: false,
    enableSubRowSelection: false,
    enablePinning: false,
  });
  const showFooter =
    typeof overrides?.footer === "undefined" ? true : !!overrides.footer;
  const showHeader =
    typeof overrides?.header === "undefined" ? true : !!overrides.header;
  const showPagination =
    typeof overrides?.pagination === "undefined" ? true : !!overrides.pagination;
  const headerGroups = table.getHeaderGroups();
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

  // const columnCount = headerGroups.reduce<number>((total, current) => total + current.headers.length, 0);
  return (
    <div
      className={cn("grid gap-3", className)}
      style={{
        ...columnSizeVars,
      }}
    >
      <div
        className={cn(
          "w-full p-1 sm:self-start",
          "group-data-[expanded=false]/controls:hidden",
        )}
      ></div>

      <div className="grid gap-4 p-1">
        <Table>
          <TableHeader className="bg-muted/50">
            {showHeader &&
              headerGroups.map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
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
                        }
                      >
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
            {rowCount > 0 ? (
              [...Array.from(Array(rowCount))].map((_, i) => (
                <TableRow key={i} className="[&>td:first-child]:pl-6">
                  {columns.map((column, ii) => (
                    <TableCell
                      key={ii}
                      className={cn(
                        "bg-card py-4 last-of-type:max-w-none [&:nth-child(2)]:pl-4",
                        column.meta?.cellClassName,
                      )}
                    >
                      <Placeholder className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {showFooter && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Placeholder className="h-4 w-full" />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>

        {showPagination && (
          <span className="mt-1 flex w-full justify-between">
            <Placeholder className="h-8 w-full max-w-44 " />
            <Placeholder className="h-8 w-full max-w-32" />
          </span>
        )}
      </div>
    </div>
  );
}
