"use client";

import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/primitives/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "../../icons/icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../command";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "../checkbox";
import { cn } from "@/lib/utils";

export interface MultiSelectPropsOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface MultiSelectProps {
  className?: string;
  title?: string;
  selectedOptions?: string[],
  onSelectionChanged?: (value: string[]) => void;
  onSelected?: (value: string) => void;
  options: MultiSelectPropsOption[];
}

export function MultiSelect({
  title,
  options,
  className,
  selectedOptions,
  onSelected,
  onSelectionChanged,
}: MultiSelectProps) {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(selectedOptions ?? []);

  React.useEffect(() => {
    if (!selectedOptions) {
      setSelectedValues([])
      return;
    }

    setSelectedValues(selectedOptions)
  }, [selectedOptions])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex flex-row border-dashed border-input py-2 text-foreground justify-center",
            selectedValues?.length > 0 ? "justify-normal" : "justify-center",
            className)}
        >
          <Icons.input.append className="mr-1 h-4 w-4" />
          <span>
            {title}
          </span>
          {selectedValues?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="slate"
                className="rounded-sm px-2 font-normal md:hidden dark:text-foreground"
              >
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 md:flex">
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="slate"
                    className="rounded-sm px-1 font-normal dark:text-foreground"
                  >
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) =>
                      selectedValues.find((v) => v === option.value),
                    )
                    .map((option) => (
                      <Badge
                        key={option.value}
                        variant="slate"
                        className="rounded-sm px-1 font-normal dark:text-foreground"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      const newSelection: string[] = isSelected
                        ? selectedValues.filter((v) => v !== option.value)
                        : [...selectedValues, option.value];

                      setSelectedValues(newSelection);
                      onSelectionChanged?.(newSelection);
                      onSelected?.(option.value);
                    }}
                  >
                    <Checkbox
                      className="pointer-events-none mr-2"
                      checked={isSelected}
                      tabIndex={-1}
                    />
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      const newSelection: string[] = [];
                      setSelectedValues(newSelection);
                      onSelectionChanged?.(newSelection);
                    }}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
