"use client"

import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";
import type { ReactNode } from "react";

type DynamicLayoutProps = {
  children: {
    sidebar: ReactNode,
    map: ReactNode,
    content: ReactNode,
    hover: ReactNode,
  },
}

export function DynamicLayout({
  children,
}: DynamicLayoutProps) {
  const { sidebar, map, content, hover } = children;
  const sidebarSegment = useSelectedLayoutSegment('sidebar')
  const contentSegment = useSelectedLayoutSegment('content')
  const sidebarShown = !!sidebarSegment && sidebarSegment !== '__DEFAULT__'
  const contentShown = !!contentSegment && contentSegment !== '__DEFAULT__'

  return (
    <>
      <div className={cn(
        "container grid grid-cols-1 p-0 transition-all duration-500",
        sidebarShown ? "lg:grid-cols-[350px,_minmax(400px,_1fr)] gap-6 xl:grid-cols-[400px_minmax(100px,_1fr)]" : "lg:grid-cols-[0px,_minmax(400px,_1fr)] gap-0"
      )}>
        <div
          className={cn(
            // "hidden lg:block",
            sidebarShown ? "duration-300 animate-in fade-in delay-500" : "opacity-0"
          )}>
          {sidebar}
        </div>

        <div
          className={"transition-all delay-150"}>
          {map}
        </div>
      </div>

      <div
        className={cn(
          "container p-0 transition-transform duration-500",
        )}
      >
        <div
          className={cn(
            "transition-opacity duration-300 delay-700",
            contentShown ? "animate-in fade-in" : "opacity-0"
          )}
        >
          {content}
        </div>
      </div>

      <div
        className={"fixed bottom-12 left-0 right-0 z-50 flex justify-center pointer-events-none"}
      >
        {hover}
      </div>
    </>
  )
}
