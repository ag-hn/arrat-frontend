"use client";

import type { DataTableInputFilterField } from "@/types/data-table";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useDataTable } from "@/components/blocks/data-table.provider";
import { useDebounce } from "@uidotdev/usehooks";
import { FormInput } from "@/components/primitives/form.input";

function getFilter(filterValue: unknown) {
  return typeof filterValue === "string" ? filterValue : null;
}

export function DataTableFilterInput<TData>({
  __key: _value,


  placeholder = "Search",
  type = "search",
  ...rest
}: DataTableInputFilterField<TData>) {
  const value = _value as string;
  const { table, columnFilters } = useDataTable();
  const column = table.getColumn(value);
  const filterValue = columnFilters.find((i) => i.id === value)?.value;
  const filters = getFilter(filterValue);
  const [input, setInput] = useState<string | null>(filters);

  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    const newValue = debouncedInput?.trim() === "" ? null : debouncedInput;
    if (debouncedInput === null) return;
    column?.setFilterValue(newValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  useEffect(() => {
    if (debouncedInput?.trim() !== filters) {
      setInput(filters);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={value} className="sr-only">
        {value}
      </Label>
      <FormInput
        placeholder={placeholder}
        type={type}
        name={value}
        id={value}
        value={input ?? ""}
        onChange={(e) => setInput(e.target.value)}
        {...rest}
      />
    </div>
  );
}