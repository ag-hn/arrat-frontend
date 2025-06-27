"use client"

import { useTransitionRouter } from "@/components/next-view-transitions";
import { type SetCustomRouterProps } from "@/types/url";
import { useCallback } from "react";


const INTERNAL__createQueryString = (
  (searchParams: string, { clear }: Pick<SetCustomRouterProps, "clear">) => {
    const newSearchParams =
      typeof clear === "boolean" && clear
        ? new URLSearchParams()
        : new URLSearchParams(searchParams);

    if (Array.isArray(clear)) {
      for (const c of clear) {
        newSearchParams.delete(c);
      }
    }

    return newSearchParams.toString();
  }
);


export function useCustomRouter() {
  const router = useTransitionRouter();

  const push = useCallback(
    (href: string, props?: SetCustomRouterProps) => {
      const { options, ...rest } = props ?? { options: { scroll: false } } satisfies SetCustomRouterProps
      if (!router) {
        return;
      }

      const searchParams = window.document.location.search
      router.push(href + "?" + INTERNAL__createQueryString(searchParams, rest), options);
    }, [router]);

  return {
    push: push,
    router: router,
  };
}

