"use client";

import LoadingCircle from "@/components/icons/loading.circle";
import { badgeVariants } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { toast } from "@/hooks/use-toaster";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type Row } from "@tanstack/react-table";
import { useState } from "react";
import { type TransformedSessionEntry } from "../types/transformers";

interface DataTableCellVisibilityProps {
  row: Row<TransformedSessionEntry>;
}

export function DataTableCellVisibility({ row }: DataTableCellVisibilityProps) {
  const [visibility, setVisibility] = useState(row.original.visibility);

  const utils = api.useUtils();
  const { mutate, isLoading } = api.manager.sessionUpdate.useMutation({
    onSuccess: async (data) => {
      await utils.manager.sessionList.invalidate()
      await utils.viewer.sessionList.invalidate()

      if (data.data.session.visibility) {
        setVisibility(data.data.session.visibility);
      }

      toast({
        variant: "success",
        title: "Visibility Successfully Updated",
        description: "Changes can be seen by other users.",
      });
    },
    onError: () => {
      toast({
        variant: "error",
        title: "Updating Visibility Failed",
        description: "Unable to save changes at this time, try again later. If the issue persists, contact your system administrator.",
      });
    },
  });

  const handleUpdate = async () => {
    mutate({
      sessionId: row.original.id,
      visibility: visibility === "visible" ? "hidden" : "visible",
    });
  };

  return (
    <Button
      variant="ghost"
      // size="icon"
      onClick={handleUpdate}
      disabled={isLoading}
      isLoading={isLoading}
      loadingIcon={<LoadingCircle className="size-3 shrink-0 animate-spin" aria-hidden="true" />}
      className={cn(
        badgeVariants({
          variant: visibility === "visible" ? "success" : "neutral",
        }),
        "rounded-full text-xs transition-opacity duration-300 hover:border-border hover:ring-border capitalize py-2 px-3",
        isLoading && "animate-pulse",
      )}
    >
      {visibility}
    </Button>
  );
}
