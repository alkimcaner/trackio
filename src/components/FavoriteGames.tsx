"use client";

import GameCard from "./GameCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

const getUser = () => fetch("/api/user").then((res) => res.json());

const getGames = (favoriteGames: string[]) => {
  if (!favoriteGames.length) return [];
  return fetch("/api/games", {
    method: "POST",
    body: `fields *,cover.*; where id = (${favoriteGames.join(",")});`,
  }).then((res) => res.json());
};

export default function FavoriteGames() {
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { data: gamesData, isLoading: isGamesLoading } = useQuery({
    queryKey: ["favoriteGames"].concat(userData?.favoriteGames),
    queryFn: () => getGames(userData.favoriteGames),
    enabled: !!userData,
  });

  if (!gamesData?.length && !isGamesLoading)
    return <div>There are no favorite games.</div>;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {isGamesLoading && (
        <>
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </>
      )}
      {gamesData?.map((gameData: any) => (
        <GameCard key={gameData.id} gameData={gameData} />
      ))}
    </div>
  );
}
