import type { Row } from "@tanstack/react-table";

import { Link } from "@/components/next-view-transitions";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import { LinkIcon } from "lucide-react";

interface DataTableCellIdProps<TData extends { id: string }> extends Omit<ComponentPropsWithoutRef<typeof Link>, "href"> {
    row: Row<TData>;
}

/**
 * React Component that displays the id of a row and links to the session page.
 * @returns React Component that displays the id of a row and links to the session page.
 */
export function DataTableCellId<TData extends { id: string }>({
    row,
    className,
    children,
    ...props
}: DataTableCellIdProps<TData>) {
    return (
        <span className="grid">
            <Link
                href={`/sessions/${row.original.id}`}
        className={cn(
          "font-medium text-muted-foreground hover:text-foreground underline-offset-4 hover:underline items-center",
          "w-fit grid grid-cols-[minmax(auto,_1fr),_auto] gap-2",
          className
        )}
        {...props}
      >
        <p className="truncate">
            {children ?? row.original.id}
        </p>
        <LinkIcon className="size-3 opacity-70" aria-hidden="true" />
            </Link>
        </span>
    );
}

