/** MIT License

Copyright (c) 2024 Shu Ding

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 
*/

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRouter as useNextRouter } from 'next/navigation'
import { startTransition, useCallback, useMemo } from "react";
import { useSetFinishViewTransition } from "./transition-context";
import {
  type AppRouterInstance,
  type NavigateOptions
} from "next/dist/shared/lib/app-router-context.shared-runtime";

export type TransitionOptions = {
  onTransitionReady?: () => void;
};

type NavigateOptionsWithTransition = NavigateOptions & TransitionOptions;

export type TransitionRouter = AppRouterInstance & {
  push: (href: string, options?: NavigateOptionsWithTransition) => void;
  replace: (href: string, options?: NavigateOptionsWithTransition) => void;
};

export function useTransitionRouter() {
  const router = useNextRouter()
  const finishViewTransition = useSetFinishViewTransition()

  const triggerTransition = useCallback((cb: () => void, { onTransitionReady }: TransitionOptions = {}) => {
    if (!('startViewTransition' in document) || typeof document.startViewTransition !== 'function') {
      return cb()
    }

    const transition = document.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          startTransition(() => {
            cb();
            finishViewTransition(() => resolve)
          })
        })
    )

    if (onTransitionReady) {
      void transition.ready.then(onTransitionReady);
    }
  }, [])

  const push = useCallback((
    href: string,
    { onTransitionReady, ...options }: NavigateOptionsWithTransition = {}
  ) => {
    triggerTransition(() => router.push(href, options), {
      onTransitionReady
    })
  }, [triggerTransition, router])

  const replace = useCallback((
    href: string,
    { onTransitionReady, ...options }: NavigateOptionsWithTransition = {}
  ) => {
    triggerTransition(() => router.replace(href, options), {
      onTransitionReady
    });
  }, [triggerTransition, router]);

  return useMemo<TransitionRouter>(
    () => ({
      ...router,
      push,
      replace,
    }),
    [push, replace, router]);
}
