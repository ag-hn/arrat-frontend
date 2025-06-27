import { Placeholder } from "@/components/primitives/placeholder";
import { LoadingTable } from "@/components/loading.table";
import { columns } from "./data-table.config-session";

const overrides = { 
  footer: false,
  pagination: true,
 }

export function Loading() {
  return (
    <span>
      <Placeholder className="w-full h-20" />
      <LoadingTable rowCount={4} columns={columns} overrides={overrides}/>
    </span>
  )
}
