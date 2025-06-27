"use client";

import type { DataTableInputFilterField } from "@/types/data-table";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useDataTable } from "@/components/blocks/data-table.provider";
import { useDebounce } from "@uidotdev/usehooks";
import { FormInput } from "@/components/primitives/form.input";

export type DataTableFilterGlobalProps<TData> = Omit<DataTableInputFilterField<TData>, "__key"> 

export function DataTableFilterGlobal<TData>({
  placeholder = "Search",
  label = "Filter based on rows content...",
  type = "search",
  ...rest
}: DataTableFilterGlobalProps<TData>) {
  const { table, globalFilter } = useDataTable();
  const [input, setInput] = useState<string | null>(globalFilter as string);

  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    const newValue = debouncedInput?.trim() === "" ? null : debouncedInput;
    if (debouncedInput === null) return;
    table?.setGlobalFilter(newValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  useEffect(() => {
    if (debouncedInput?.trim() !== globalFilter) {
      setInput(globalFilter as string);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalFilter]);

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={`global-filter`} className="sr-only">
        {label}
      </Label>
      <FormInput
        placeholder={placeholder}
        type={type}
        name={`global-filter`}
        id={`global-filter`}
        value={input ?? ""}
        onChange={(e) => setInput(e.target.value)}
        {...rest}
      />
    </div>
  );
}
