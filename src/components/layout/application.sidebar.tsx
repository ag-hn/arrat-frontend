"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { routing } from "@/config/site"
import { isPageCollection } from "@/lib/is"
import { cn } from "@/lib/utils"
import { type RouteOption } from "@/types/app"
import { PanelLeftIcon } from "lucide-react"
import { buttonVariants } from "../primitives/button.variants"
import { ApplicationHome } from "./application.home"
import { ApplicationThemeToggle } from "./application.theme-toggle"
import { NavigationActions } from "./navigation.actions"
import { NavigationPage } from "./navigation.page"
import { NavigationPageCollection } from "./navigation.page-collection"

export function ApplicationSidebar({ userItem, ...props }: React.ComponentProps<typeof Sidebar> & { userItem?: React.ReactNode }) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader className="flex w-full flex-row items-center justify-between group-data-[collapsible=icon]:flex-col">
        <div className="flex items-center gap-2">
          <ApplicationHome />
        </div>

        <SidebarMenuButton
          tooltip="Toggle Sidebar"
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            }),
            "min-w-9",
          )}
          asChild
        >
          <SidebarTrigger>
            <PanelLeftIcon className="size-4" />
          </SidebarTrigger>
        </SidebarMenuButton>
      </SidebarHeader>



      {/* <SidebarHeader className="group-data-[collapsible=icon]:items-center">
        <ApplicationHome />
      </SidebarHeader> */}

      <SidebarContent className="gap-0">
        <SidebarMenu className="gap-0">
          {routing.navigation.map((item: RouteOption) => (
            isPageCollection(item)
              ? (
                <NavigationPageCollection
                  key={item.title}
                  {...item}
                />
              ) : (
                <NavigationPage
                  key={item.title}
                  {...item}
                />
              )
          ))}
        </SidebarMenu>

        <NavigationActions items={routing.actions} className="mt-auto" />
      </SidebarContent>

      <SidebarRail />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarSeparator />
          <SidebarMenuItem className={
            !!userItem
              ? "grid grid-cols-[1fr,_auto] items-center gap-1"
              : "grid items-center gap-1 p-1"
          }>
            {userItem}
            <ApplicationThemeToggle
              className={
                cn(
                  "size-10 group-data-[collapsible=icon]:rounded-xl aspect-square",
                  !!userItem
                    ? ""
                    : "w-full"
                )
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

