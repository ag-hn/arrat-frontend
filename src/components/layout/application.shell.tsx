import { type ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { ApplicationSidebar } from "./application.sidebar";
import { cn } from "@/lib/utils";
import { ApplicationHeader } from "./application.header";
import { ApplicationFooter } from "./application.footer";

function INTERNAL__getNode(node: ReactNode, defaultNode: ReactNode) {
  if (node === null) {
    return null;
  }

  return node ?? defaultNode
}

export function ApplicationShell({
  children,
  className
}: {
  className?: string,
  children: {
    header?: ReactNode,
    content?: ReactNode,
    sidebar?: ReactNode,
    footer?: ReactNode,
  }
}) {
  const {
    sidebar,
    header,
    content,
    footer,
  } = children

  return (
    <SidebarProvider>
      {INTERNAL__getNode(sidebar, <ApplicationSidebar />)}

      <SidebarInset>
        {INTERNAL__getNode(header, <ApplicationHeader />)}

        <div className={cn("flex flex-1 flex-col gap-4", className)}>
          {content}
        </div>

        {INTERNAL__getNode(footer, <ApplicationFooter />)}
      </SidebarInset>
    </SidebarProvider>
  )
}
