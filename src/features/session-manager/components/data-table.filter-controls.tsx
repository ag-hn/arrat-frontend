"use client"

import { DataTableFilter } from "@/components/blocks/data-table.filter"
import { DataTableFilterGlobal } from "@/components/blocks/data-table.filter-global"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/primitives/accordion"
import { FilterIcon } from "lucide-react"
import { useDataTableFilters } from "../hooks/use-data-table-filters"
import { cn } from "@/lib/utils"

interface FormSessionFilterTranslations {
    filter?: string,
    search?: string,
    visibility?: string,
}

export interface FormSessionFilterProps {
    showVisibility?: boolean,
    translations?: FormSessionFilterTranslations,
}

export function DataTableFilterControls({
    translations = {
        filter: "Filter",
        search: "Filter by session ID or description...",
        visibility: "Visibility",
    }
}: FormSessionFilterProps) {
    const filters = useDataTableFilters()

    return (
        <Accordion type="single" collapsible defaultValue="filter">
            <AccordionItem value="filter" >
                <AccordionTrigger
                    aria-label={"Hide or show filter controls"}
                >
                    <div className="flex flex-row items-center gap-2 text-muted-foreground">
                        <FilterIcon className="size-4" />
                        <span>{translations.filter}</span>
                    </div>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col sm:flex-row justify-between gap-4 bg-transparent border-none p-0 px-1 pt-2 pb-4">
                    <DataTableFilterGlobal 
                        __type="input"
                        label="ID or description"
                        placeholder="Search by ID or description..."
                    />

                    <div className={cn("grid grid-cols-1 gap-2 ", 
                        filters.visibility && filters.createdAt ? "sm:grid-cols-2 sm:min-w-96" : "sm:grid-cols-1 sm:min-w-64")
                        }>
                        {filters.visibility && <DataTableFilter className="h-full" field={filters.visibility} />}
                        {filters.createdAt && <DataTableFilter className="h-full" field={filters.createdAt} />}

                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
