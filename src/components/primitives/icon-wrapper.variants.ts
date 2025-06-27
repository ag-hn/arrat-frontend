import { cva } from "class-variance-authority";

export const iconWrapperVariants = cva([
  "relative flex items-center justify-center"
], {
  variants: {
    variant: {
      default: "bg-background border border-foreground/5 text-foreground",
      primary: "bg-primary/[1%] border border-primary/30 text-primary",
      destructive: "bg-destructive/[1%] border border-destructive/30 text-destructive",
      info: "bg-info/[1%] border border-info/30 text-info",
      warning: "bg-warning/[1%] border border-warning/30 text-warning",
      success: "bg-success/[1%] border border-success/30 text-success",
      error: "bg-error/[1%] border border-error/30 text-error",
      blue: "bg-blue-500/5 border border-blue-500/30 text-blue-500",
      // blue: "bg-blue-50 border border-blue-200 text-blue-500 dark:bg-blue-950/30 dark:border-blue-800/50 dark:text-blue-500",
      teal: "bg-teal-500/5 border border-teal-500/30 text-teal-500",
      // teal: "bg-teal-50 border border-teal-200 text-teal-600 dark:bg-teal-950/30 dark:border-teal-800/50 dark:text-teal-500",
      violet: "bg-violet-500/5 border border-violet-500/30 text-violet-500",
      rose: "bg-rose-500/5 border border-rose-500/30 text-rose-500",
      // rose: "bg-rose-50 border border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800/50 dark:text-rose-500",
    },
    size: {
      default:
        "rounded-lg p-3 [&>svg]:size-6",
      sm:
        "rounded-md p-2 text-sm [&>svg]:size-4",
      md:
        "rounded-lg p-2.5 text-base [&>svg]:size-5",
    },
    lift: {
      default: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    lift: "default",
  },
})


