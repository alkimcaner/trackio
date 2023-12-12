"use client";

import GameCard from "./GameCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { getGames, getUser } from "@/lib/queryFunctions";

export default function FavoriteGames() {
  const [parent, enableAnimations] = useAutoAnimate();
  const { data: user, isInitialLoading: isUserInitialLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const {
    data: games,
    isLoading: isGamesLoading,
    isInitialLoading: isGamesInitialLoading,
  } = useQuery({
    queryKey: ["favoriteGames"],
    queryFn: () => getGames(user?.favoriteGameIds),
    enabled: !!user,
  });
  if (!games?.length && !isGamesLoading)
    return <div>There are no favorite games.</div>;

  return (
    <div
      ref={parent}
      className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6"
    >
      {(isGamesInitialLoading || isUserInitialLoading) && (
        <>
          <Skeleton className="aspect-[9/16] w-full" />
          <Skeleton className="aspect-[9/16] w-full" />
          <Skeleton className="aspect-[9/16] w-full" />
          <Skeleton className="aspect-[9/16] w-full" />
        </>
      )}
      {games?.map((game: any) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}