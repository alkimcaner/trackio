"use client";

import GameCard from "./GameCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

const getUser = () => fetch("/api/user").then((res) => res.json());

const getGames = (favoriteGames: string[]) =>
  fetch("/api/games", {
    method: "POST",
    body: `fields *,cover.*; where id = (${favoriteGames.join(",")});`,
  }).then((res) => res.json());

export default function FavoriteGames() {
  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { data: gamesData, isLoading: isGamesLoading } = useQuery({
    queryKey: ["favoriteGames"].concat(userData?.favoriteGames),
    queryFn: () => getGames(userData.favoriteGames),
    enabled: !!userData,
  });

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
      {(isUserLoading || isGamesLoading) && (
        <>
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-72 w-full" />
        </>
      )}
      {gamesData?.map((gameData: any) => (
        <GameCard key={gameData.id} gameData={gameData} />
      ))}
    </div>
  );
}
