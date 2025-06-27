"use client";

import { cn } from "@/lib/utils";
import { PanelLeft, PanelLeftOpen } from "lucide-react";
import { Separator } from "../ui/separator";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";

export function ApplicationHeader({
  sessionItem,
}: {
  sessionItem?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-start gap-2 border border-border/60 bg-background/60 px-4 backdrop-blur md:rounded-bl-xl">
      <INTERNAL__Trigger />

      {sessionItem && <>{sessionItem}</>}
    </header>
  );
}

function INTERNAL__Trigger() {
  const { state, open, isMobile } = useSidebar();
  const showSidebarTrigger = isMobile || (state === "collapsed" && !open);

  return (
    <>
      <SidebarTrigger
        className={cn(
          "will-change-[transform,opacity] [animation-fill-mode:_forwards]",
          showSidebarTrigger
            ? "animate-show pointer-events-auto"
            : "animate-hide pointer-events-none w-0",
        )}
      >
        {isMobile ? (
          <PanelLeft className="size-4" />
        ) : (
          <PanelLeftOpen className="size-4" />
        )}
      </SidebarTrigger>

      {showSidebarTrigger && (
        <Separator orientation="vertical" className="me-2 ms-0.5 h-6" />
      )}
    </>
  );
}
