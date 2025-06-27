import { focusRing } from "@/lib/styles";
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    // focus
    focusRing,
    // base
    "relative inline-flex items-center justify-between whitespace-nowrap rounded-md border text-center font-medium transition-all duration-100 ease-in-out",
    // disabled
    "disabled:pointer-events-none disabled:shadow-none disabled:opacity-50",
    // button icon animations
    "group",
  ],
  {
    variants: {
      variant: {
        default: [
          // border
          "border-transparent",
          // text color
          "text-primary-foreground",
          // background color
          "bg-primary",
          // hover color
          "hover:bg-primary/80",
          // disabled
          "disabled:bg-primary/30 disabled:text-white",
        ],
        primary: [
          // border
          "border-transparent",
          // text color
          "text-primary-foreground",
          // background color
          "bg-primary",
          // hover color
          "hover:bg-primary/80",
          // disabled
          "disabled:bg-primary/30 disabled:text-white",
        ],
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        // outline:
        //   "border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: [
          // border
          "border-input",
          // text color
          "text-secondary-foreground",
          // background color
          "bg-secondary",
          // hover color
          "hover:bg-secondary/80",
          // disabled
          "disabled:bg-secondary/30 disabled:text-white",
        ],
        light: [
          // base
          "shadow-none",
          // border
          "border-transparent",
          // text color
          "text-gray-900 dark:text-gray-50",
          // background color
          "bg-gray-200 dark:bg-gray-900",
          // hover color
          "hover:bg-gray-300/70 dark:hover:bg-gray-800/80",
          // disabled
          "disabled:bg-gray-100 disabled:text-gray-400",
          "disabled:dark:bg-gray-800 disabled:dark:text-gray-600",
        ],
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 shadow-none",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: [
          // text color
          "text-white",
          // border
          "border-transparent",
          // background color
          "bg-destructive",
          // hover color
          "hover:bg-destructive/90",
          // disabled
          "disabled:bg-destructive/30 disabled:text-white",
        ],
        red: [
          // text color
          "text-white",
          // border
          "border-transparent",
          // background color
          "bg-red-600 dark:bg-red-700",
          // hover color
          "hover:bg-red-700 dark:hover:bg-red-600",
          // disabled
          "disabled:bg-red-300 disabled:text-white",
          "disabled:dark:bg-red-950 disabled:dark:text-red-400",
        ],
        blue: [
          // border
          "border-transparent",
          // text color
          "text-white dark:text-white",
          // background color
          "bg-blue-500 dark:bg-blue-500",
          // hover color
          "hover:bg-blue-600 dark:hover:bg-blue-600",
          // disabled
          "disabled:bg-blue-300 disabled:text-white",
          "disabled:dark:bg-blue-800 disabled:dark:text-blue-400",
        ],
      },
      animation: {
        none: "",
        ringHover:
          "transition-all duration-300 hover:ring-2 hover:ring-primary/90 hover:ring-offset-2",
      },
      size: {
        default: "px-4 py-2 text-sm has-[>svg]:px-4",
        sm: "px-3 py-1 text-xs has-[>svg]:px-2.5",
        md: "px-4 py-2 text-sm has-[>svg]:px-4",
        lg: "px-8 py-3 text-base has-[>svg]:px-4",
        icon: "h-9 w-9 justify-center",
        // icon: "px-1.5 py-1.5 has-[>svg]:size-8",
      }
    },
    defaultVariants: {
      size: "default",
      variant: "primary",
      animation: 'none',
    },
  })


