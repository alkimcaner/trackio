"use client";

import {
  HeartFilledIcon,
  HeartIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getUser = () => fetch("/api/user").then((res) => res.json());

const favoriteGame = (id: string) =>
  fetch("/api/favoriteGame", {
    method: "POST",
    body: id,
  }).then((res) => res.json());

export default function GamePageActionButtons({ gameData }: any) {
  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const mutation = useMutation({
    mutationFn: favoriteGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["favoriteGames"] });
    },
  });
  return (
    <>
      <Button
        onClick={() => mutation.mutate(gameData.id)}
        variant={
          userData?.favoriteGames.includes(String(gameData.id))
            ? "destructive"
            : "outline"
        }
      >
        <HeartFilledIcon className="mr-2 h-4 w-4" />
        Favorite
      </Button>
      <Button variant={"default"}>
        <ListBulletIcon className="mr-2 h-4 w-4" />
        Add To List
      </Button>
    </>
  );
}
