"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { ScrollArea } from "./scroll-area";

export type ComboboxOptions = {
  id: number;
  name: string;
};

type Mode = "single" | "multiple";

interface ComboboxProps {
  mode?: Mode;
  options: ComboboxOptions[];
  selected: number | number[]; // Updated to handle multiple selections
  className?: string;
  placeholder?: string;
  onChange?: (event: number | number[]) => void; // Updated to handle multiple selections
  onCreate?: (value: string) => void;
}

export function Combobox({
  options,
  selected,
  className,
  placeholder,
  mode = "single",
  onChange,
  onCreate,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState<string>("");
  // const [addCategoriesMutation] =
  //   CoreProductApi.useAddProductCategoriesMutation();
  //add subcategory
  // const handleCreateCategory = async () => {
  //   try {
  //     const newCategory = await addCategoriesMutation({
  //       data: {
  //         name: query,
  //       },
  //     }).unwrap();
  //     if (onCreate) {
  //       onCreate(newCategory);
  //     }
  //     setQuery("");
  //   } catch (error) {
  //     console.error("Failed to create category", error);
  //   }
  // };
  // console.log(selected, "Selected========");

  return (
    <div className={cn("block", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            key={"combobox-trigger"}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selected ? (
              <div className="relative mr-auto flex flex-grow flex-wrap items-center overflow-hidden">
                <span>
                  {mode === "multiple" && Array.isArray(selected)
                    ? selected
                        .map(
                          (selectedValue: number) =>
                            options.find((item) => item.id === selectedValue)
                              ?.name
                        )
                        .join(", ")
                    : mode === "single" &&
                      options.find((item) => item.id === selected)?.name}
                </span>
              </div>
            ) : (
              placeholder ?? "Select Item..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 max-w-sm p-0">
          <Command
            filter={(value: any, search: any) => {
              if (value.includes(search)) return 1;
              return 0;
            }}
            // shouldFilter={true}
          >
            <CommandInput
              placeholder={placeholder ?? "Cari Item..."}
              value={query}
              onValueChange={(value: string) => setQuery(value)}
            />
            <CommandEmpty className="flex cursor-pointer items-center justify-between gap-1 p-8 ">
              <p className="block max-w-48 truncate font-semibold text-primary">
                {query}
              </p>
              <Button
                className=""
                onClick={() => {
                  if (onCreate) {
                    onCreate(query);
                    setQuery("");
                  }
                }}
              >
                Create
              </Button>
            </CommandEmpty>
            <ScrollArea>
              <div className="max-h-80">
                <CommandGroup>
                  <CommandList>
                    {options?.map((option) => (
                      <CommandItem
                        key={option.id}
                        value={String(option.name)}
                        onSelect={() => {
                          if (onChange) {
                            if (
                              mode === "multiple" &&
                              Array.isArray(selected)
                            ) {
                              onChange(
                                selected.includes(option.id)
                                  ? selected.filter(
                                      (item) => item !== option.id
                                    )
                                  : [...selected, option.id]
                              );
                            } else {
                              onChange(option.id);
                            }
                          }
                          setOpen(false); // Close the dropdown on selection
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selected === option.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option.name}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </div>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
