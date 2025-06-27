import React from "react";
import { cn } from "@/lib/utils";
import { makeClassName } from "@/lib/visualizations";

const makeListItemClassName = makeClassName("ListItem");

const ListItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <>
        <li
          ref={ref}
          className={cn(
            makeListItemClassName("root"),
            // common
            "w-full flex justify-between items-center text-foreground py-2",
            className,
          )}
          {...other}
        >
          {children}
        </li>
      </>
    );
  },
);

ListItem.displayName = "ListItem";

export { ListItem };