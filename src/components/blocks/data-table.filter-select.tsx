"use client";

import type { DataTableSelectFilterField } from "@/types/data-table";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useDataTable } from "@/components/blocks/data-table.provider";
import { FormSelectMulti } from "@/components/primitives/form.select-multi";

function getFilter(filterValue: unknown) {
  return Array.isArray(filterValue) ? filterValue : null;
}

export function DataTableFilterSelect<TData>({
  __key: _value,
  placeholder = "Select...",
  options,
  ...rest
}: DataTableSelectFilterField<TData>) {
  const key = _value as string;
  const { table, columnFilters } = useDataTable();
  const column = table.getColumn(key);
  const filterValue = columnFilters.find((i) => i.id === key)?.value;
  const filters = getFilter(filterValue);
  const [selected, setSelected] = useState<string[]>(filters ?? []);

  useEffect(() => {
    column?.setFilterValue(selected);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

//   useEffect(() => {
//     if (selected !== filters) {
//       setSelected(filters ?? []);
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [filters]);

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={key} className="sr-only">
        {key}
      </Label>
      <FormSelectMulti
        name={key}
        id={key}
        selectedOptions={selected}
        onSelectionChanged={(value) => setSelected(value)}

        placeholder={placeholder}
        options={options}
        {...rest}
      />
    </div>
  );
}