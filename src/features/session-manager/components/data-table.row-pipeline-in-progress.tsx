"use client";

import {
  StateEmpty,
  StateEmptyDescription,
  StateEmptyTitle,
} from "@/components/blocks/state.empty";
import LoadingCircle from "@/components/icons/loading.circle";
import { TableCell, TableRow } from "@/components/ui/table";
import { INTERNAL__trpcStatusCheckParameters } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type ComponentWithClassNameAndChildren } from "@/types/utils";
import { type Table } from "@tanstack/react-table";
import { usePipelineStatusMessage } from "../hooks/use-pipeline-status-message";
import { type TransformedSessionEntry } from "../types/transformers";

/**
 * React Component that displays the id of a row and links to the session page.
 * @returns React Component that displays the id of a row and links to the session page.
 */
export function DataTableRowPipelineInProgress({
  table,
  className,
  children,
}: ComponentWithClassNameAndChildren<{
  table: Table<TransformedSessionEntry>;
}>) {
  const { data, isLoading, error } = useIsCurrentlyRunningPipeline();
  const message = usePipelineStatusMessage();
  if (isLoading || !!error || !data || data.length === 0) {
    return;
  }

  const columnCount = table.getAllColumns().length;

  return (
    <TableRow
      className={cn("border-black bg-muted/15", className)}
      key={"pipeline-status-row"}
    >
      <TableCell colSpan={columnCount}>
        <StateEmpty
          className="animate-pulse duration-5000"
          icon={<LoadingCircle />}
          title={
            <StateEmptyTitle>
              The system is generating {data.length} session/sign audit(s). When finished, the created session will appear in the list below.
            </StateEmptyTitle>
          }
          description={
            <StateEmptyDescription>{children ?? message}</StateEmptyDescription>
          }
        ></StateEmpty>
      </TableCell>
    </TableRow>
  );
}

function useIsCurrentlyRunningPipeline() {
  return api.manager.getRunningPipelines.useQuery(
    undefined,
    INTERNAL__trpcStatusCheckParameters,
  );
}
