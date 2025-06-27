"use client";

import { Button } from "@/components/primitives/button";
import { Tooltip } from "@/components/primitives/tooltip";
// import { Kbd } from "@/components/primitives/kbd";
import { useDataTable } from "@/components/blocks/data-table.provider";
import { useHotKey } from "@/hooks/use-hot-key";
import { SymbolIcon } from "@radix-ui/react-icons";

export function DataTableResetButton() {
  const { table } = useDataTable();
  useHotKey(table.resetColumnFilters, "Escape");

  return (
    <Tooltip
      asChild
      side="left"
      content={
        <p>
          Reset filters with{" "}
          <span className="ml-1 text-muted-foreground group-hover:text-accent-foreground">
            <span className="mr-1">⌘</span>
            <span>Esc</span>
          </span>
        </p>
      }
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => table.resetColumnFilters()}
        className={
          table.getFilteredRowModel().rows.length > 0
            ? "text-muted-foreground"
            : "hidden"
        }
      >
        <div className="flex flex-row -space-x-2">
          <SymbolIcon className="size-4" />
          Reset
        </div>
      </Button>
    </Tooltip>
  );
}
