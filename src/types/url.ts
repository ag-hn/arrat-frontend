import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime"

type QueryParamInternal = Parameters<URLSearchParams["set"]>
type QueryParam = {
  name: QueryParamInternal['0']
  value: QueryParamInternal['1']
}

export type QueryParamsList = QueryParam[]

export type SetQueryParamProps = {
  params?: QueryParamsList,
  clear?: boolean | string[],
  options?: NavigateOptions,
}

export type SetCustomRouterProps = {
  clear?: boolean | string[],
  options?: NavigateOptions,
}
