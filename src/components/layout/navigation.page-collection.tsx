import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from "../ui/sidebar";
import { type PageCollection } from "@/types/app";
import { NavigationPage } from "./navigation.page";
import { getIcon } from "@/config/routes.react";

export function NavigationPageCollection({ items, enabled, title }: PageCollection) {
  if (!enabled) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="group/label">
        <div>
          {getIcon(title, null)}
          <span>{title}{" "}</span>
        </div>
      </SidebarGroupLabel>
      <SidebarGroupContent className="grid group-data-[collapsible=icon]:justify-center">
        <SidebarMenu>
          {items.map((item) => (
            <NavigationPage
              key={item.url}
              {...item}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
