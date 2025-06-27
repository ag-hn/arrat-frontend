import { useDataTable } from "@/components/blocks/data-table.provider";
import { useMemo } from "react";
import { type UnitAndSessionTableFilterFields } from "../types/data-table.filters";
import { type DataTableFilterFields } from "@/types/data-table";
import { type TransformedSessionEntry, type TransformedUnitEntry } from "../types/transformers";

export function useDataTableFilters() {
    const { filters } = useDataTable()
    
    
    return useMemo(() => {
        return INTERNAL__mapFiltersToDataTableFilterFields(filters)
    }, [filters])
}

function INTERNAL__mapFiltersToDataTableFilterFields<TData extends (TransformedUnitEntry & TransformedSessionEntry)>(filters: DataTableFilterFields<TData>): UnitAndSessionTableFilterFields<TData> {
    return filters.reduce<UnitAndSessionTableFilterFields<TData>>((acc, filter) => {
        acc[filter.__key] = filter
        return acc
    }, { })
}