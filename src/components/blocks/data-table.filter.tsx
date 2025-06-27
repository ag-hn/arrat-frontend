import { cn } from "@/lib/utils";
import { type DataTableFilterField } from "@/types/data-table";
import { DataTableFilterInput } from "./data-table.filter-input";
import { DataTableFilterSelect } from "./data-table.filter-select";
import { DataTableFilterTimerange } from "./data-table.filter-time-range";

export function DataTableFilter<TData>({ field, className }: { field: DataTableFilterField<TData>, className?: string }) {
    return (
        <div className={cn("grid gap-1", className)}>
            {getFilterComponent(field)}
        </div>
    );
}

function getFilterComponent<TData>(field: DataTableFilterField<TData>) {
    switch (field.__type) {
        // case "checkbox": {
        //   return <DataTableFilterCheckbox {...field} />;
        // }
        // case "slider": {
        //   return <DataTableFilterSlider {...field} />;
        // }
        case "input": {
            return <DataTableFilterInput {...field} />;
        }
        case "select": {
            return <DataTableFilterSelect {...field} />;
        }
        case "timerange": {
            return <DataTableFilterTimerange {...field} />;
        }
    }

}