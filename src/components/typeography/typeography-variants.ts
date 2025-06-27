import { cva } from "class-variance-authority";

export type TypeographyVariants = typeof typeographyVariants;

export const typeographyVariants = cva("transition-colors text-balance", {
  variants: {
    variant: {
      "screen-reader": "sr-only",

      h1: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      p: "text-base leading-7 [&:not(:first-child)]:mt-4",
      span: "text-base leading-7 [&:not(:first-child)]:mt-4",

      default: "text-fluid-sm",
      content: "text-default",
      title: "text-title",
      label: "text-label",
      metric: "text-metric",
    },
    affects: {
      default: "",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      smallLight: "text-sm font-normal leading-none",
      small: "text-sm font-medium leading-none",
      xsmall: "text-xs font-normal leading-none",
      muted: "text-sm text-muted-foreground",
      subtle: "text-xs text-subtle-foreground",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      inlinecode: "rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    },
    tint: {
      default: "text-inherit",
      foreground: "text-foreground",
      subtle: "text-subtle-foreground",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
      strong: "text-strong-foreground",

      primary: "text-primary",
      secondary: "text-secondary",
      inverted: "text-inverted-foreground",
      destructive: "text-destructive",

      "selected:link": "text-foreground hover:text-foreground/80",
      "unselected:link": "text-foreground/60 hover:text-foreground/80",
    },
    override: {
      default: "",
      removeMarginsAndLeading: "[&:not(:first-child)]:mt-0 leading-none [&>li]:mt-2",
    },
    weight: {
      default: "",
      medium: "font-medium",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    affects: "default",
    tint: "default",
    weight: "default",
  },
});
