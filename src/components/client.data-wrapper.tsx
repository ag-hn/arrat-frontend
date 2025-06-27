"use client"

import { errorToStringFormatter } from "@/lib/formatters/error-formatters"
import { cn } from "@/lib/utils"
import { type ComponentWithClassNameAndChildren, type TODO } from "@/types/utils"
import { type ReactNode } from "react"
import { Placeholder } from "./primitives/placeholder"
import { type UseTRPCQueryResult } from "@trpc/react-query/shared"

interface ClientDataWrapperProps<TData extends TODO> {
  trpc: UseTRPCQueryResult<TData, TODO>,
  content: ReactNode | ((data: NonNullable<TData>) => ReactNode),
  overrides?: {
    loading?: ReactNode,
    error?: ReactNode | ((error: TODO) => ReactNode),
    fallback?: ReactNode,
  }
}

/**
 * React component to wrap content based react components.
 * Requires swr to fetch content from a server or for long running tasks.
 * Allows for rendering data states on the client (e.g., loading, error, no data, etc.).
 * 
 * Overrides expose props to update state content. Set to `null` to render no content.
 */
export function ClientDataWrapper<TData extends TODO>({
  content: content,
  className,
  trpc,
  overrides,
}: ComponentWithClassNameAndChildren<ClientDataWrapperProps<TData>>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { isLoading, error, data } = trpc
  const loading = overrides?.loading;
  const errorContent = overrides?.error;
  const fallback = overrides?.fallback;

  if (!isLoading && !error && !data) {
    return (
      typeof loading !== "undefined" ? (
        loading
      ) : (
        <div className={cn("p-4 grid place-content-center", className)}>
          <Placeholder className="w-full h-full" />
        </div>
      )
    )
  }

  if (!!error) {
    return (
      typeof errorContent === 'function'
        ? (
          errorContent(error)
        ) : typeof errorContent !== 'undefined'
          ? (
            errorContent
          ) : (
            <div className={cn("p-4 grid place-content-center", className)}>
              {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              errorToStringFormatter(error)
              }
            </div>
          )
    )
  }

  if (isLoading) {
    return (
      typeof loading !== "undefined" ? (
        loading
      ) : (
        <div className={cn("p-4 grid place-content-center", className)}>
          <Placeholder className="w-full h-full" />
        </div>
      )
    )
  }

  if (!data) {
    return (
      typeof fallback !== "undefined" ? (
        fallback
      ) : (
        <div className={cn("p-4 grid place-content-center", className)}>
          <Placeholder className="w-full h-full" />
        </div>
      )
    )
  }

  return (
    typeof content === "function"
      ? (
        content(data)
      ) : (
        content
      )
  )
}
