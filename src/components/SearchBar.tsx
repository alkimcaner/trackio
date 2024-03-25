"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { debounce } from "@/lib/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Movie } from "@/types/movie";
import { TV } from "@/types/tv";
import { Game } from "@/types/game";

export default function SearchBar() {
  const router = useRouter();
  const domRef = useRef<HTMLFormElement>(null);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("game");
  const [games, setGames] = useState<Game[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tv, setTV] = useState<TV[]>([]);

  const handleSearch = useCallback(
    async (searchType: string, searchInput: string) => {
      if (!searchInput) {
        setGames([]);
        setMovies([]);
        setTV([]);
        return;
      }

      if (searchType === "game") {
        const res = await fetch("/api/games", {
          method: "POST",
          body: `fields *,cover.*,involved_companies.*,involved_companies.company.*,screenshots.*,websites.*; where name ~ *"${searchInput}"* & total_rating_count > 1; sort total_rating_count desc;`,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setGames(data);
        setMovies([]);
        setTV([]);
      } else if (searchType === "movie") {
        const res = await fetch(`/api/search/movie?query=${searchInput}`);

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();

        setMovies(
          data.results.sort((a: any, b: any) => b.popularity - a.popularity)
        );
        setGames([]);
        setTV([]);
      } else if (searchType === "tv") {
        const res = await fetch(`/api/search/tv?query=${searchInput}`);

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();

        setTV(
          data.results.sort((a: any, b: any) => b.popularity - a.popularity)
        );
        setGames([]);
        setMovies([]);
      } else {
        setGames([]);
        setMovies([]);
        setTV([]);
      }
    },
    []
  );

  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 500),
    [handleSearch]
  );

  useEffect(() => {
    debouncedSearch(searchType, searchInput);
  }, [searchInput, searchType]);

  const handleSubmitSearch = (e: any) => {
    e.preventDefault();
    setIsResultsVisible(false);
    router.push(`/search?q=${searchInput}&type=${searchType}`);
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

  return (
    <div className="relative mx-auto max-w-sm">
      <form
        onSubmit={handleSubmitSearch}
        ref={domRef}
        className="flex border-collapse overflow-hidden rounded-lg border"
      >
        <Select
          value={searchType}
          onValueChange={(value) => setSearchType(value)}
        >
          <SelectTrigger className="w-[90px] border-0 outline-none focus:ring-0 focus:ring-offset-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="game">Game</SelectItem>
            <SelectItem value="movie">Movie</SelectItem>
            <SelectItem value="tv">TV</SelectItem>
          </SelectContent>
        </Select>
        <input
          value={searchInput}
          onFocus={() => setIsResultsVisible(true)}
          onChange={(e) => {
            setIsResultsVisible(true);
            setSearchInput(e.target.value);
          }}
          placeholder="Search"
          className="bg-transparent px-2 py-1 text-sm outline-none"
        />
        <Button className="rounded-none">
          <MagnifyingGlassIcon />
        </Button>
      </form>

      {isResultsVisible && (
        <div className="absolute left-0 right-0 top-12 overflow-hidden rounded-lg border bg-popover text-sm shadow-lg">
          <div className="flex max-h-96 flex-col gap-1 overflow-y-scroll p-1">
            {!games.length && !movies.length && !tv.length && (
              <span className="p-1">There are no results</span>
            )}
            {games?.map((game) => (
              <Link
                key={game.id}
                onClick={() => setIsResultsVisible(false)}
                href={`/games/${game.slug}`}
                className="w-full rounded-sm p-2 hover:bg-primary/10"
              >
                {game.name}
              </Link>
            ))}
            {movies?.map((movie) => (
              <Link
                key={movie.id}
                onClick={() => setIsResultsVisible(false)}
                href={`/movies/${movie.id}`}
                className="w-full rounded-sm p-2 hover:bg-primary/10"
              >
                {movie.title}
              </Link>
            ))}
            {tv?.map((show) => (
              <Link
                key={show.id}
                onClick={() => setIsResultsVisible(false)}
                href={`/tv/${show.id}`}
                className="w-full rounded-sm p-2 hover:bg-primary/10"
              >
                {show.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
