"use client";

import { DeleteListDialog } from "@/components/DeleteListDialog";
import GameCard from "@/components/GameCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { gameIdsToQuery } from "@/lib/helpers";
import { EyeNoneIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { formatDistance, parseISO } from "date-fns";
import { useMemo, use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Movie } from "@/types/movie";
import { ListWithUser } from "@/types/list";
import MovieCard from "@/components/MovieCard";
import { TV } from "@/types/tv";
import TVCard from "@/components/TVCard";
import { Game } from "@/types/game";

export default function List(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { data: list, isLoading } = useQuery<ListWithUser>({
    queryKey: ["list", params.id],
    queryFn: async () => {
      const res = await fetch(`/api/list/${params.id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },
  });

  const formattedDate = useMemo(() => {
    const date = list?.createdAt ? parseISO(list.createdAt as any) : new Date();
    return formatDistance(date, new Date(), { addSuffix: true });
  }, [list?.createdAt]);

  const nameInitials = useMemo(
    () =>
      list?.User.name
        ?.split(" ")
        .map((name) => name[0])
        .join(""),
    [list?.User.name]
  );

  const { data: games } = useQuery<Game[]>({
    queryKey: ["list", params.id, "games"],
    queryFn: async () => {
      if (!list?.gameIds.length) return [];

      const res = await fetch("/api/game", {
        method: "POST",
        body: gameIdsToQuery(list?.gameIds),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },
    enabled: !!list,
  });

  const { data: movies } = useQuery<Movie[]>({
    queryKey: ["list", params.id, "movies"],
    queryFn: async () => {
      if (!list?.movieIds.length) return [];

      const movies = await Promise.all(
        list.movieIds.map(async (movieId) => {
          const res = await fetch(`/api/movie/${movieId}`);

          if (!res.ok) {
            throw new Error("Failed to fetch");
          }

          return res.json();
        })
      );

      return movies;
    },
    enabled: !!list,
  });

  const { data: tvShows } = useQuery<TV[]>({
    queryKey: ["list", params.id, "tv"],
    queryFn: async () => {
      if (!list?.tvIds.length) return [];

      const movies = await Promise.all(
        list.tvIds.map(async (tvId) => {
          const res = await fetch(`/api/tv/${tvId}`);

          if (!res.ok) {
            throw new Error("Failed to fetch");
          }

          return res.json();
        })
      );

      return movies;
    },
    enabled: !!list,
  });

  const { data: session } = useSession();
  const isAuthorized = list?.userId === session?.user.id;

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!list) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        List not found
      </div>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-8">
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          {/* List name */}
          <h1 className="text-2xl font-bold">{list.name}</h1>
          {list.isPrivate && (
            <Badge className="gap-1">
              <EyeNoneIcon /> Private
            </Badge>
          )}

          {/* Edit or delete list */}
          {isAuthorized && (
            <div className="ml-auto space-x-2">
              <Link
                href={`/list/${list.id}/edit`}
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <Pencil2Icon />
              </Link>
              <DeleteListDialog listId={list.id} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Created at */}
          <div className="text-xs text-muted-foreground">{formattedDate}</div>

          {/* List owner */}
          <Link
            href={`/user/${list.userId}`}
            className="group flex w-fit items-center gap-1 py-1 text-xs"
          >
            <Avatar className="h-4 w-4 ring-primary transition group-hover:ring-2">
              <AvatarImage src={list.User.image || ""} alt="Profile image" />
              <AvatarFallback className="text-xs">
                {nameInitials}
              </AvatarFallback>
            </Avatar>
            <span>{list.User?.name}</span>
          </Link>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 py-1">
          {list.tags.map((tag) => (
            <Badge variant={"outline"} key={`tag-${tag}`}>
              {tag}
            </Badge>
          ))}
        </div>

        {/* List description */}
        <p className="mt-4 text-muted-foreground">{list.description}</p>
      </section>
      <Separator />
      <section>
        <ResponsiveGrid>
          {games?.map((game) => <GameCard key={game.id} game={game} />)}

          {movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}

          {tvShows?.map((tv) => <TVCard key={tv.id} tv={tv} />)}
        </ResponsiveGrid>
      </section>
    </main>
  );
}
