import type { TODO } from "@/types/utils";
import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const etwm = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-label',
        'text-default',
        'text-title',
        'text-metric',
        'text-fluid-xs',
        'text-fluid-sm',
        'text-fluid-base',
        'text-fluid-lg',
        'text-fluid-xl',
        'text-fluid-2xl',
        'text-fluid-3xl',
        'text-fluid-4xl',
        'text-fluid-5xl',
        'text-fluid-6xl',
        'text-fluid-7xl',
        'text-fluid-8xl',
        'text-fluid-9xl',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
  return etwm(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deepEqual(obj1: TODO, obj2: TODO) {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null)
    return false;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const keys1 = Object.keys(obj1);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}
