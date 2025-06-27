"use client";

import { useDataTable } from "@/components/blocks/data-table.provider";
import { StateEmpty, StateEmptyDescription } from "@/components/blocks/state.empty";
import { useMemo } from "react";
import { type TransformedUnitEntry, type TransformedUnitEntryList } from "../types/transformers";
import { DataTableDisplayUnits } from "./data-table.display-units";

export function DataTableSelectedRowDisplay() {
    const { rowSelection, table } = useDataTable<TransformedUnitEntry, TransformedUnitEntryList>();
    // EXPECTED: expected so that memo is rerendered only when rows are changed 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    const rows = useMemo(() => table.getSelectedRowModel().rows, [rowSelection]);
    const selectionCount = rows.length;

    if (selectionCount === 0) {
        return (
            <StateEmpty
                title="No units selected"
                description={(
                    <StateEmptyDescription>
                        You currently have no results to display. Update your selection to view units associated with the created session.
                    </StateEmptyDescription>
                )}
            />
        )
    }

    return (
        <div className="flex flex-col space-x-2 text-muted-foreground">
            <p className="text-xs font-medium">The following rows will be included for the created session.</p>

            <DataTableDisplayUnits 
                relatedEntries={rows.map(row => row.original)} 
                header={''}
            />
        </div>
    );
}