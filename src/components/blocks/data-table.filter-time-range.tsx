"use client";

import { useDataTable } from "@/components/blocks/data-table.provider";
import { isArrayOfDates } from "@/lib/is";
import type { DataTableTimerangeFilterField } from "@/types/data-table";
import { useMemo } from "react";
import type { DateRange } from "react-day-picker";
import { DateRangePicker } from "../primitives/form.date-picker";

export function DataTableFilterTimerange<TData>({
  __key: _value,
  ...rest
}: DataTableTimerangeFilterField<TData>) {
  const value = _value as string;
  const { table, columnFilters } = useDataTable();
  const column = table.getColumn(value);
  const filterValue = columnFilters.find((i) => i.id === value)?.value;

  const date: DateRange | undefined = useMemo(() => {
    return filterValue instanceof Date
      ? { from: filterValue, to: undefined }
      : Array.isArray(filterValue) && isArrayOfDates(filterValue) && filterValue.length > 0
        ? { from: filterValue?.[0], to: filterValue?.[1] }
        : undefined;
  }, [filterValue]);

  const onChange = (date: DateRange | undefined) => {
    if (date?.from && !date?.to) {
      column?.setFilterValue([date.from]);
    } else if (date?.to && date?.from) {
      column?.setFilterValue([date.from, date.to]);
    } else {
      column?.setFilterValue(undefined);
    }
  };

  return <DateRangePicker {...{ value: date, onChange, ...rest }} />;
}
