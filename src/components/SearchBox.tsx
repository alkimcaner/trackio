"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import { debounce } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

const searchGames = (searchInput: string) =>
  fetch("/api/games", {
    method: "POST",
    body: `search "${searchInput}"; fields *;limit 10;`,
  }).then((res) => res.json());

export default function SearchBox() {
  const router = useRouter();
  const domRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { data: searchResults, refetch } = useQuery({
    queryKey: ["search"],
    queryFn: () => searchGames(searchInput),
  });

  const handleSearch = (e: any) => {
    e.preventDefault();
    setOpen(false);
    router.push(`/games?q=${searchInput}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!domRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce(refetch, 500);
    debouncedSearch();
  }, [searchInput]);

  return (
    <form
      onSubmit={handleSearch}
      ref={domRef}
      className="relative mx-auto flex w-full max-w-xs items-center gap-2"
    >
      <Input
        value={searchInput}
        onClick={() => setOpen(true)}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search games"
      />
      <Button type="submit">
        <MagnifyingGlassIcon />
      </Button>

      {open && (
        <div className="absolute left-0 right-0 top-12 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 text-sm shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex max-h-96 flex-col gap-1 overflow-y-scroll p-1">
            {!searchResults?.length && (
              <span className="p-1">There are no results</span>
            )}
            {searchResults?.map((e: any) => (
              <Link
                key={e.id}
                onClick={() => setOpen(false)}
                href={`/games/${e.slug}`}
                className="w-full rounded-sm p-2 hover:bg-zinc-950/10 dark:hover:bg-zinc-50/10"
              >
                {e.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
