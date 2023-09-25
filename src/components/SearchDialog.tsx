"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function SearchDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen((open) => !open)}
        variant="outline"
        className="ml-4 mr-auto w-full max-w-fit sm:max-w-[12rem]"
      >
        <span className="hidden sm:inline">Search</span>
        <MagnifyingGlassIcon className="ml-auto h-4 w-4" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a game or movie..." />
        <CommandList>
          <CommandGroup heading="Games">
            <CommandItem>Game 1</CommandItem>
            <CommandItem>Game 2</CommandItem>
            <CommandItem>Game 3</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Movies">
            <CommandItem>Movie 1</CommandItem>
            <CommandItem>Movie 2</CommandItem>
            <CommandItem>Movie 3</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
