import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { type Page } from "@/types/app"
import { NavigationLink } from "./navigation.link"
import { getIcon } from "@/config/routes.react"

export function NavigationActions({
  items,
  ...props
}: {
  items: readonly Page[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            if (!item.enabled) {
              return null;
            }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild size="sm">
                  <NavigationLink href={item.url}>
                    {getIcon(item.title)}
                    <span>{item.title}</span>
                  </NavigationLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

