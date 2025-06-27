import { cn } from "@/lib/utils";
import { makeClassName } from "@/lib/visualizations";
import { type VariantProps, cva } from "class-variance-authority";
import React from "react";

const listVariants = cva(
  "text-foreground w-full",
  {
    variants: {
      variant: {
        simple: "divide-none",
        divide: "divide-y divide-border",
      },
    },
    defaultVariants: {
      variant: "divide",
    },
  }
)

const makeListClassName = makeClassName("List");

type ListVariantProps = VariantProps<typeof listVariants>
const List = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement> & ListVariantProps>(
  (props, ref) => {
    const { children, className, variant, ...other } = props;
    return (
      <ul
        ref={ref}
        className={cn(
          makeListClassName("root"),
          listVariants({ className, variant }),
        )}
        {...other}
      >
        {children}
      </ul>
    );
  },
);

List.displayName = "List";

export { List };