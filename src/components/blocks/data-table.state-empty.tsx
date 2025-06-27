import { TableRow } from "../ui/table";

import { TableCell } from "../ui/table"
import { useDataTable } from "./data-table.provider";

export function DataTableStateEmpty() {
    const { columns } = useDataTable()

    return (
        <TableRow>
            <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
            >
                No results.
            </TableCell>
        </TableRow>
    )
}