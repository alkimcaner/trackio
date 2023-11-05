"use client";

import GameCard from "./GameCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

const getUser = () => fetch("/api/user").then((res) => res.json());

const getGames = (favoriteGames: string[]) => {
  if (!favoriteGames.length) return [];
  return fetch("/api/games", {
    method: "POST",
    body: `fields *,cover.*; where id = (${favoriteGames.join(
      ","
    )}); limit 500;`,
  }).then((res) => res.json());
};

export default function FavoriteGames() {
  const { data: userData, isInitialLoading: isUserInitialLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const {
    data: gamesData,
    isLoading: isGamesLoading,
    isInitialLoading: isGamesInitialLoading,
  } = useQuery({
    queryKey: ["favoriteGames"],
    queryFn: () => getGames(userData.favoriteGames),
    enabled: !!userData,
  });

  if (!gamesData?.length && !isGamesLoading)
    return <div>There are no favorite games.</div>;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
      {(isGamesInitialLoading || isUserInitialLoading) && (
        <>
          <Skeleton className="aspect-[9/16] w-full" />
          <Skeleton className="aspect-[9/16] w-full" />
          <Skeleton className="aspect-[9/16] w-full" />
          <Skeleton className="aspect-[9/16] w-full" />
        </>
      )}
      {gamesData?.map((gameData: any) => (
        <GameCard key={gameData.id} gameData={gameData} />
      ))}
    </div>
  );
}
