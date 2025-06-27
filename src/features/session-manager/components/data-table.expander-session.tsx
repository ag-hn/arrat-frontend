import { TableCell, TableRow } from "@/components/ui/table";
import { type Row } from "@tanstack/react-table";
import { InfoIcon } from "lucide-react";
import { type TransformedSessionEntry } from "../types/transformers";
import { DataTableDisplayUnits } from "./data-table.display-units";

export function DataTableExpanderSession({
    row,
}: {
    row: Row<TransformedSessionEntry>
}) {
    return (
        <TableRow
            key={`${row.id}-expanded-content`}
            className="bg-background/60 py-3 pl-4 sm:pl-6"
        >
            <TableCell colSpan={row.getVisibleCells().length}>
                <div className="flex items-start py-2 flex-row">
                    <span
                        className="me-3 flex w-7 shrink-0 justify-center"
                        aria-hidden="true"
                    >
                        <InfoIcon className="opacity-60 size-4" />
                    </span>

                    <DataTableDisplayUnits relatedEntries={row.original.relatedEntries} />
                </div>
            </TableCell>
        </TableRow>
    )
}
