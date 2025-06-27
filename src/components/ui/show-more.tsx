"use client";

import { type HTMLAttributes, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { cn } from "@/lib/utils";
import { useContentOverflow } from "@/hooks/use-content-overflow";
import { Text } from "@/components/typeography/text";
import { Button } from "@/components/primitives/button";
import { focusRing } from "@/lib/styles";

export interface ShowMoreProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  header?: ReactNode;
  /**
   * Class name of each container presenting children. Allows for flexibility
   * when presenting lists of information to ensure consistency between
   * main view port and content presented in the model.
   *
   * @example <ShowMore containerClassName="flex flex-col gap-8" />
   */
  containerClassName?: string;
  backgroundClassName?: string;
}

export function ShowMore({
  className,
  containerClassName,
  backgroundClassName,
  children,
  asChild,
  header,
  ...rest
}: ShowMoreProps) {
  const Comp = asChild ? Slot : "div";
  const { ref, dy } = useContentOverflow<HTMLDivElement>();

  return (
    <div className="relative h-full w-full bg-transparent">
      <Dialog>
        <Comp
          ref={ref}
          className={cn(
            "pointer-events-none relative flex w-full flex-col gap-3 overflow-hidden text-fluid-md md:max-h-[200px]",
            className,
            containerClassName,
          )}
          {...rest}
        >
          {children}
        </Comp>

        {dy && (
          <ShowMoreInternal
            containerClassName={containerClassName}
            backgroundClassName={backgroundClassName}
            header={header}
          >
            {children}
          </ShowMoreInternal>
        )}
      </Dialog>
    </div>
  );
}

function ShowMoreInternal({
  header,
  containerClassName,
  backgroundClassName,
  children,
}: Pick<
  ShowMoreProps,
  "header" | "containerClassName" | "backgroundClassName" | "children"
>) {
  return (
    <>
      <div
        className={cn(
          `absolute inset-x-0 bottom-0 hidden justify-center bg-gradient-to-t from-background to-transparent py-2 md:flex`,
          backgroundClassName,
        )}
      >
        <DialogTrigger
          asChild
          className={cn(
            focusRing,
            "flex items-center justify-center rounded-md border border-border bg-background px-2.5 py-2 shadow-input text-muted-foreground hover:bg-muted",
          )}
        >
          <Button>
            {"Show more"}
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="flex flex-col gap-6">
        <Text tint={"accent"} variant={"title"}>
          {header}
        </Text>

        <ScrollArea className={cn("h-[calc(50vh-8rem)] pr-6")}>
          <div className={cn("is-dialog-content group", containerClassName)}>
            {children}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>

        <DialogClose className="w-full rounded-md border p-1 text-muted-foreground hover:bg-muted">
          Slow less
        </DialogClose>
      </DialogContent>
    </>
  );
}
