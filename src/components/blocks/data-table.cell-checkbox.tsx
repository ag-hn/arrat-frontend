import type { Row } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { type CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "../primitives/form.checkbox";

interface DataTableCellCheckboxProps<TData> extends CheckboxProps {
    row: Row<TData>;
}

export function DataTableCellCheckbox<TData>({
    row,
    className,
    ...props
}: DataTableCellCheckboxProps<TData>) {
    return (
        <div className="flex justify-center">
            <Checkbox
                className={cn(
                    "bg-card",
                className
            )}
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select all"
                {...props}
            />
        </div>
    );
}
