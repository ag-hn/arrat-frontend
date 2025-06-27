"use client"

import { cn } from "@/lib/utils";
import { type AuditPageRouteParams } from "@/types/pages";
import { useParams } from "next/navigation";
import { type ReactElement } from "react";

type DynamicLayoutProps = {
    children: {
        shownOnSelected: ReactElement,
        mainContent: ReactElement,
    }
}

export function DynamicLayout({
    children
}: DynamicLayoutProps) {
    const { shownOnSelected, mainContent } = children;
    const params = useParams<AuditPageRouteParams>();
    const selected = params.id;

    return (
        <div className={cn(
            "container grid grid-cols-1 gap-10 p-0 transition-all duration-500",
            selected ? "lg:grid-cols-[350px,_minmax(400px,_1fr)]" : "lg:grid-cols-[0px,_minmax(400px,_1fr)]"
        )}>
            <div
                className={cn(
                    selected ? "duration-1000 animate-in fade-in delay-200" : "opacity-0"
                )}>
                {shownOnSelected}
            </div>

            <div
                className={"transition-all delay-150"}>
                {mainContent}
            </div>
        </div>
    )
}