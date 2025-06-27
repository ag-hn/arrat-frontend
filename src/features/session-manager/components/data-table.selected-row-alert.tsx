"use client";

import { useDataTable } from "@/components/blocks/data-table.provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import { useMemo } from "react";
import {
    type TransformedUnitEntry,
    type TransformedUnitEntryList,
} from "../types/transformers";
import { validateUnitMetadata } from "../lib/validation";

/**
 * React component to render and return alert if units within differeng groupings are selected.
 * @returns Alert or null
 */
export function DataTableSelectedRowAlert() {
  const { rowSelection, table } = useDataTable<
    TransformedUnitEntry,
    TransformedUnitEntryList
  >();
  const uniqueGroupings = useMemo(() => {
    const rows = table.getSelectedRowModel().rows;
    return validateUnitMetadata(rows.map((r) => r.original))
    // EXPECTED: expected so that memo is rerendered only when rows are changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

  if (uniqueGroupings.valid) {
    return null;
  }

  return (
    <Alert variant={"warning"}>
      <AlertTriangleIcon className="size-4" />

      <AlertTitle>Grouping Warning.</AlertTitle>
      <AlertDescription>
        You have selected units created with different constraints.
        {" "}This may lead to unexpected outputs and analytics data for the created session.
      </AlertDescription>
    </Alert>
  );
}
