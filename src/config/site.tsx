import { type RouteOption, type Routing } from "../types/app"
import { type Icon } from "next/dist/lib/metadata/types/metadata-types"

export const siteConfig = {
  title: "AV Readiness Road Audit Tool",
  description: "Autonomous Vehical Readiness Dashboard and Analysis",
  maintainer: "HNTB",
  links: {
    homepage: "https://www.hntb.com/",
    github: "https://github.com/arrat-tools/frontend",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }] satisfies Icon[]
} as const

export type SiteConfig = typeof siteConfig

const INTERNAL__routing = {
  navigation: [
    {
      title: "Research Tool",
      enabled: true,
      items: [
        {
          title: "Sessions",
          url: "/sessions",
          enabled: true,
        },
        {
          title: "Session Manager",
          url: "/session-manager",
          enabled: true,
        },
      ]
    }
  ] as const satisfies RouteOption[],
  extended: [
    {
      title: "AV Readiness Tool",
      enabled: true,
      items: [
        {
          title: "Home",
          url: "/",
          enabled: false,
        },
        {
          title: "Sessions",
          url: "/sessions",
          enabled: true,
        },
        {
          title: "Session Manager",
          url: "/session-manager",
          enabled: true,
        },
      ],
    },
  ] as const satisfies RouteOption[],
  actions: [
  ]
} as const

export const routing: Routing = INTERNAL__routing

export type ValidUrlRedirect = (typeof INTERNAL__routing)['navigation'][number]['items'][number]['url']
export type ValidUrlTitle = (typeof INTERNAL__routing)['navigation'][number]['items'][number]['title'] | (typeof INTERNAL__routing)['extended'][number]['items'][number]['title'] | (typeof INTERNAL__routing)['extended'][number]['title']

