"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import { debounce } from "@/lib/utils";
import useSWR from "swr";
import Link from "next/link";

export default function SearchBox() {
  const domRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { data: searchResults, mutate } = useSWR("search", () =>
    fetch("/api/games", {
      method: "POST",
      body: `search "${searchInput}";fields *;limit 10;`,
    }).then((res) => res.json())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!domRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce(mutate, 500);
    debouncedSearch();
  }, [searchInput]);

  return (
    <div
      ref={domRef}
      className="relative mr-auto flex w-full max-w-xs items-center gap-2"
    >
      <Input
        value={searchInput}
        onClick={() => setOpen(true)}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search games"
      />
      <Link
        onClick={() => setOpen(false)}
        href={`/games?q=${searchInput}`}
        className={buttonVariants({ variant: "outline" })}
      >
        <MagnifyingGlassIcon />
      </Link>

      {open && (
        <div className="absolute left-0 right-0 top-12 flex flex-col gap-1 rounded-lg bg-white/75 p-2 shadow-lg backdrop-blur-lg dark:bg-zinc-950/75">
          {!searchResults?.length && <span>There are no results</span>}

          {searchResults?.map((e: any) => (
            <Link
              key={e.id}
              onClick={() => setOpen(false)}
              href={`/games/${e.slug}`}
              className="w-full rounded-lg p-2 hover:bg-zinc-950/10 dark:hover:bg-zinc-50/10"
            >
              {e.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
