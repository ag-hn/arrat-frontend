import type { PropsWithChildren, ReactNode, Ref } from "react";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type TODO = any

export type ComponentClassName = {
  className?: string
}

export type ComponentRef<TRefElement = HTMLElement> = {
  ref?: Ref<TRefElement>
}

export type ComponentWithChildren<TProps = object> = PropsWithChildren<TProps>

export type ComponentWithClassNameAndChildren<TProps = object> = PropsWithChildren<TProps> & ComponentClassName
export type ComponentWithRefAndChildren<TRefElement = HTMLElement, TProps = object> = PropsWithChildren<TProps> & ComponentRef<TRefElement>

export type ComponentWithDefaultProps<TRefElement = HTMLElement, TProps = object> =
  ComponentWithChildren<TProps> &
  ComponentClassName &
  ComponentRef<TRefElement>

interface ServerComponentInternal<
  TRouteParams extends object = object
> {
  params: TRouteParams
}

interface ServerComponentInternal<
  TRouteParams extends object = object
> {
  params: TRouteParams
}

export type SearchParams = Record<string, string | string[] | undefined>

/**
 * Param property type to be used with React server components and Nextjs implementation. Exposes route params and query params.
 */
export type ServerComponentParams<
  TRouteParams extends object = object,
  TSearchParams extends SearchParams = SearchParams
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
