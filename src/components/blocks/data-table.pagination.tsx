"use client";

import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

import { useDataTable } from "@/components/blocks/data-table.provider";
import { Button } from "@/components/primitives/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/primitives/form.select";
import { type TODO } from "@/types/utils";
import { SymbolIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";

const pageSizes = [5, 10, 20, 50];

export function DataTablePagination() {
    const { table, pagination, sorting } = useDataTable();
    const pageCount = useMemo(() => table.getPageCount(), [table]);
    const isSorting = useMemo(() => sorting.length > 0, [sorting]);

    return (
        <div className="flex items-center justify-between space-x-4 md:space-x-6 lg:space-x-8">
            <div className="flex gap-y-1 gap-x-2 text-muted-foreground flex-col items-start md:items-center md:flex-row">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                    value={`${pagination.pageSize}`}
                    onValueChange={(value: TODO) => {
                        table.setPageSize(Number(value));
                    }}
                >
                    <SelectTrigger
                    aria-label="Open pagination page count popup."
                     className="h-8 w-[70px]"
                     >
                        <SelectValue placeholder={pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {pageSizes.map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex justify-center text-sm font-medium">
                    Showing{" "}
                    {pagination.pageIndex + 1} of{" "}
                    {pageCount} page(s).
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    aria-label="Reset table sorting"
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => table.resetSorting()}
                    className={isSorting ? "text-muted-foreground" : "hidden"}
                >
                    <div className="flex flex-row -space-x-2">
                        <SymbolIcon className="size-4" />
                    </div>
                </Button>
                <Button
                    aria-label="Go to start of table"
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        table.setPageIndex(0);
                    }}
                    disabled={!table.getCanPreviousPage()}
                >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                    aria-label="Go to previous table page"
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        table.previousPage();
                    }}
                    disabled={!table.getCanPreviousPage()}
                >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    aria-label="Go to next table page"
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        table.nextPage();
                    }}
                    disabled={!table.getCanNextPage()}
                >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                    aria-label="Go to end of table"
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        table.setPageIndex(table.getPageCount() - 1);
                    }}
                    disabled={!table.getCanNextPage()}
                >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}