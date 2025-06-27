import type { Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { type CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "../primitives/form.checkbox";

interface DataTableHeaderCheckboxProps<TData> extends CheckboxProps {
  table: Table<TData>;
}

export function DataTableHeaderCheckbox<TData>({
  table,
  className,
  disabled,
  ...props
}: DataTableHeaderCheckboxProps<TData>) {
  const selectionIsEnabled = table.options.enableRowSelection ?? table.options.enableMultiRowSelection ?? table.options.enableSubRowSelection;
  return (
    <div className="flex justify-center">
      <Checkbox
        disabled={!!disabled || !selectionIsEnabled}
        className={cn(
          "bg-card",
          className
      )}
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        {...props}
      />
    </div>
  );
}
