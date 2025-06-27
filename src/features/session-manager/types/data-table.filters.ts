import { type DataTableFilterField } from "@/types/data-table";
import { type TransformedSessionEntry, type TransformedUnitEntry } from "./transformers";

export type UnitAndSessionTableFilterFields<TData extends (TransformedUnitEntry & TransformedSessionEntry)> = Partial<Record<keyof TData, DataTableFilterField<TData>>>;

// export type INTERNAL__ExtendedDataTableFilterField<TData> =
//   | DataTableFilterField<TData>
//   | DataTableFilterUnitProps<TData>;

//   export type INTERNAL__DataTableFilterFields<TData> = INTERNAL__ExtendedDataTableFilterField<TData>[];