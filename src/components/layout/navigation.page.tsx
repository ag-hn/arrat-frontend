"use client"

import { type Page } from "@/types/app";
import { SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { NavigationLink } from "./navigation.link";
import { getIcon } from "@/config/routes.react";

export function NavigationPage({ title, enabled, url }: Page) {
  const path = usePathname()
  if (!enabled) {
    return;
  }

  const isActive = path.includes(url);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={title} className="justify-start">
        <NavigationLink href={url} preserveQueryParams>
          {getIcon(title, null)}
          <span>{title}</span>
        </NavigationLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
