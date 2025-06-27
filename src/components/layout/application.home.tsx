import {
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { ApplicationLogo } from "./application.logo"
import { NavigationLink } from "./navigation.link"

const title = 'Home'

export function ApplicationHome() {
  return (
    <SidebarMenuButton size={"lg"} asChild tooltip={title} className="justify-start">
      <NavigationLink href={'/'} preserveQueryParams>
        <ApplicationLogo />
      </NavigationLink>
    </SidebarMenuButton>
  )
}

