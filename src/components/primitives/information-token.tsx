import { CircleHelp } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";
import { type PopoverProps } from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { buttonVariants } from "./button.variants";

interface InformationTokenProps extends Omit<PopoverProps, "children"> {
  children: React.ReactNode;
  className?: string;
  content: React.ReactNode;
  /**
   * If true, the CircleHelp icon appears before the children.
   * If false (default), the icon appears after the children.
   */
  iconBefore?: boolean;
}

function InformationToken({
  children,
  content,
  className,
  iconBefore = false,
  ...props
}: InformationTokenProps) {
  const iconButton = (
    <PopoverTrigger
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: "icon",
        }),
        "size-6",
      )}
    >
      <CircleHelp className="size-3" />
    </PopoverTrigger>
  );

  return (
    <Popover {...props}>
      <div className={cn("flex items-center gap-x-0.5", className)}>
        {iconBefore && iconButton}
        {children}
        {!iconBefore && iconButton}
      </div>
      <PopoverContent className="grid gap-3 text-sm">{content}</PopoverContent>
    </Popover>
  );
}

export { InformationToken, type InformationTokenProps };
