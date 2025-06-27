export const focusRingOn = [
  "transition-all ring-2 border-subtle-foreground ring-primary/30 border-primary outline-none",
]

export const focusRing = [
  "transition-all border border-transparent outline-none",
  "focus-visible:border-1 focus-visible:outline-2 ring-0 focus-visible:ring-2 ring-primary/0 focus-visible:ring-primary/30 focus-visible:border-primary focus-visible:z-[99]",
]

export const focusHasVisibleRing = [
  "transition-all border border-transparent outline-none",
  "has-focus-visible:border-1 has-focus-visible:outline-2 ring-0 has-focus-visible:ring-2 ring-primary/0 has-focus-visible:ring-primary/30 has-focus-visible:border-primary has-focus-visible:z-[99]",
]

export const disabledInputOn = [
  "border-gray-300 bg-gray-100 text-gray-400",
  "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500",
  "cursor-default",
  "opacity-60",
]

export const disabledInput = [
  "disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400",
  "disabled:dark:border-gray-700 disabled:dark:bg-gray-800 disabled:dark:text-gray-500",
  "disabled:cursor-default",
  "disabled:opacity-60",
]

export const focusInput = [
  "transition-all outline-none",
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-primary/30",
  // border color
  "focus:border-primary",
]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-red-500 dark:border-red-700",
  // ring color
  "ring-red-200 dark:ring-red-700/30",
]

export const dataDisabled = [
  // disable
  "data-[disabled]:border-gray-300 data-[disabled]:bg-gray-100 data-[disabled]:text-gray-400",
  "data-[disabled]:dark:border-gray-700 data-[disabled]:dark:bg-gray-800 data-[disabled]:dark:text-gray-500",
  // "disabled:dark:border-gray-700 disabled:dark:bg-gray-800 disabled:dark:text-gray-500",
]
