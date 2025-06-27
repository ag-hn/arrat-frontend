import { type ReactNode, type PropsWithChildren } from "react";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type TODO = any

export type ComponentClassName<T = object> = PropsWithChildren<T> & {
  className?: string
}

interface ServerComponentInternal<
  TRouteParams extends object = object
> {
  params: TRouteParams
}

/**
 * Param property type to be used with React server components and Nextjs implementation. Exposes route params and query params.
 */
export type ServerComponentParams<
  TRouteParams extends object = object,
  TSearchParams extends Record<string, string | string[] | undefined> = Record<string, string | string[] | undefined>
> = ServerComponentInternal<TRouteParams> & {
  searchParams?: TSearchParams;
}

/**
 * Param property type to be used with Nextjs layout components. Exposes route/query params and layout children.
 */
export type ServerLayoutProps<
  TRouteParams extends object = object,
> = ServerComponentInternal<TRouteParams> & {
  children: ReactNode
}

/**
 * Update the given type and all potential sub types matching a given TFrom value to another type.
 * 
 * @example
 * type Before = number
 * 
 * type After = CastTo<Before, number, string>;
 * // After = string
 * 
 * @example 
 * type Before = {
 *  willChange: number,
 *  willNotChange: boolean,
 *  nestedType: {
 *      nestedWillChange: number,
 *      nestedWillNotChange: [],
 *  },
 * };
 * 
 * type After = CastTo<Before, number, string>;
 * // After = {
 * //   willChange: string,
 * //   willNotChange: boolean,
 * //   nestedType: {
 * //       nestedWillChange: string,
 * //       nestedWillNotChange: [],
 * //   },
 * // }
 */
export type CastTo<T, TFrom = unknown, TTo = unknown> = T extends TFrom
  ? TTo
  : T extends Record<string | number | symbol, unknown> ? {
    [K in keyof T]: CastTo<T[K], TFrom, TTo>;
  } : T;

export type OmitFirst<T extends any[]> = T extends [any, ...infer R] ? R : never
