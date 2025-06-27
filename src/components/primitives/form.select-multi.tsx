"use client";

import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DisplayStrings } from "@/features/session-manager/components/display.strings";
import { focusRing } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Button, type ButtonProps } from "@/components/primitives/button";

export interface FormSelectMultiPropsOption {
  label: string;
  value: string;
  icon?: React.ElementType
}

export interface FormSelectMultiProps extends ButtonProps {
  placeholder?: string;
  defaultOptions?: string[],
  selectedOptions?: string[],
  onSelectionChanged?: (value: string[]) => void;
  onSelected?: (value: string) => void;
  options: FormSelectMultiPropsOption[];
}

export function FormSelectMulti({
  options,
  className,
  placeholder,
  selectedOptions,
  defaultOptions = [],
  onSelected,
  onSelectionChanged,

  variant = "outline",
  size = "sm",
  ...rest
}: FormSelectMultiProps) {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(selectedOptions ?? defaultOptions);
    const isEmpty = selectedValues.length === 0;
    const displayValue = React.useMemo(() => isEmpty ? placeholder : selectedValues.filter((v) => !!options.find((o) => o.value === v)), [isEmpty, placeholder, selectedValues, options]);

  return (
    <Popover>
      <div className="flex flex-row">
        <PopoverTrigger asChild>
          <Button
            aria-label="Open or close selection popup."
            variant={variant}
            size={size}
            className={cn(
              focusRing,
              "flex-1 w-full flex flex-row border-input py-2 text-foreground justify-center",
              "bg-card shadow-sm",
              "rounded-e-none border border-border shadow-sm ",
              !isEmpty ? "justify-normal" : "justify-center",
              className)}
            {...rest}
          >
            <DisplayStrings
              className={(isEmpty ? "text-muted-foreground" : "")}
              value={displayValue}
            ></DisplayStrings>

            <ChevronsUpDown className="size-3 text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <Button
          aria-label="Reset selection."
          type="reset"
          onClick={() => {
            const newSelection: string[] = defaultOptions;
            setSelectedValues(newSelection);
            onSelectionChanged?.(newSelection);
          }}
          variant={"outline"}
          size="sm"
          className={cn(
            focusRing,
            "rounded-none shadow-sm rounded-s-none rounded-e-lg border border-border border-l-transparent",
            "group text-muted-foreground focus-visible:!text-destructive focus-visible:!border-destructive ring-destructive/20",
          )}
        >
          <X className="size-3" />
        </Button>
      </div>

      <PopoverContent
        align="start"
        className="p-1"
        onWheel={(e) => {
          // Popover issue: https://github.com/radix-ui/primitives/issues/1159
          e.stopPropagation();
        }}
      >
        <ScrollArea className="pr-2 gap-0 flex max-h-40 flex-col">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <Button
                variant={"ghost"}
                size={"sm"}
                className="grid grid-cols-[auto,_auto,_1fr] p-2 rounded-sm justify-start items-center hover:bg-muted w-full"
                key={option.value}
                onClick={() => {
                  const newSelection: string[] = isSelected
                    ? selectedValues.filter((v) => v !== option.value)
                    : [...selectedValues, option.value];

                  setSelectedValues(newSelection);
                  onSelectionChanged?.(newSelection);
                  onSelected?.(option.value);
                }}
              >
                <Check className={cn(
                  "mr-2 size-3 text-primary",
                  isSelected ? "" : "text-transparent"
                )} />

                {option.icon && (
                  <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                )}

                <span className={cn(
                  "text-xs text-start truncate break-all"
                )}
                >{option.label}</span>
              </Button>
            );
          })}
        </ScrollArea>

        {selectedValues.length > 0 && (
          <>

            <div className="pt-2 grid">
              <Button
                variant={"secondary"}
                onClick={() => {
                  const newSelection: string[] = defaultOptions;
                  setSelectedValues(newSelection);
                  onSelectionChanged?.(newSelection);
                }}
                className="justify-center text-center"
              >
                Clear filters
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover >
  );
}

