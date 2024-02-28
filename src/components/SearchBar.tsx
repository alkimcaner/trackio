"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Input } from "./ui/input";
import { debounce } from "@/lib/debounce";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getGames } from "@/lib/actions";

export default function SearchBar() {
  const router = useRouter();
  const domRef = useRef<HTMLFormElement>(null);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { data: searchResults, refetch } = useQuery({
    queryKey: ["search"],
    queryFn: () => {
      if (!searchInput) return [];
      return getGames(
        `fields *; where name ~ *"${searchInput}"* & total_rating_count > 1; sort total_rating_count desc;`
      );
    },
  });
  const debouncedRefetch = useMemo(() => debounce(refetch, 500), [refetch]);

  const handleSubmitSearch = (e: any) => {
    e.preventDefault();
    setIsResultsVisible(false);
    router.push(`/games?q=${searchInput}`);
  };

  // Click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!domRef.current?.contains(event.target as Node))
        setIsResultsVisible(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    debouncedRefetch();
  }, [searchInput]);

  return (
    <form
      onSubmit={handleSubmitSearch}
      ref={domRef}
      className="relative ml-auto flex w-full max-w-[12rem] items-center gap-2"
    >
      <Input
        value={searchInput}
        onFocus={() => setIsResultsVisible(true)}
        onChange={(e) => {
          setIsResultsVisible(true);
          setSearchInput(e.target.value);
        }}
        placeholder="Search"
        className="bg-transparent"
      />
      {isResultsVisible && (
        <div className="absolute left-0 right-0 top-12 overflow-hidden rounded-lg border bg-popover text-sm shadow-lg">
          <div className="flex max-h-96 flex-col gap-1 overflow-y-scroll p-1">
            {!searchResults?.length && (
              <span className="p-1">There are no results</span>
            )}
            {searchResults?.map((e: any) => (
              <Link
                key={e.id}
                onClick={() => setIsResultsVisible(false)}
                href={`/games/${e.slug}`}
                className="w-full rounded-sm p-2 hover:bg-primary/10"
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
