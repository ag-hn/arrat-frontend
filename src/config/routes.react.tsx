import { type ReactNode } from "react";
import { type ValidUrlTitle } from "./site";
import { Component, Layers, LayoutDashboard, TriangleAlert, Settings2Icon } from "lucide-react";

export const icons: Record<string, ReactNode> = {
  "AV Readiness Tool": <Layers className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />,
  "Home": <Component className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />,
  "Sessions": <LayoutDashboard className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />,
  "Session Manager": <Settings2Icon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />,
} as const satisfies Partial<Record<ValidUrlTitle, ReactNode>>

export function getIcon(route: string, defaultOverride?: ReactNode | null) {
  const potential = icons[route];
  if (!potential) {
    return typeof defaultOverride === "undefined" ? <TriangleAlert className="size-5 text-yellow-700" /> : defaultOverride
  }

  return potential;
}

