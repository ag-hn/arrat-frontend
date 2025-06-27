
export type Page = {
  title: string,
  url: string,
  enabled: boolean,
}

export type PageCollection = Omit<Page, "url"> & {
  items: readonly Page[],
}

export type RouteOption = PageCollection | Page

export type Routing = {
  navigation: readonly RouteOption[]
  actions: readonly Page[]
}

