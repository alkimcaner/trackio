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

export default function GameCardActionButtons({ gameData }: any) {
  const queryClient = useQueryClient();

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const mutation = useMutation({
    mutationFn: favoriteGame,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["user"] });

      // Snapshot the previous value
      const previousUserData = queryClient.getQueryData(["user"]);

      let newUserData: any = previousUserData;

      if (newUserData.favoriteGames.includes(payload)) {
        newUserData.favoriteGames = newUserData.favoriteGames.filter(
          (e: any) => e !== payload
        );
      } else {
        newUserData.favoriteGames.push(payload);
      }

      // Optimistically update
      queryClient.setQueryData(["user"], newUserData);

      return { previousUserData };
    },
    onError: (err, payload, context) => {
      queryClient.setQueryData(["user"], context?.previousUserData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["favoriteGames"] });
    },
  });

  return (
    <>
      <Button
        size="icon"
        variant={
          userData?.favoriteGames?.includes(String(gameData.id))
            ? "destructive"
            : "ghost"
        }
        onClick={() => mutation.mutate(String(gameData.id))}
        disabled={mutation.isLoading || isUserLoading}
      >
        {userData?.favoriteGames?.includes(String(gameData.id)) ? (
          <HeartFilledIcon />
        ) : (
          <HeartIcon />
        )}
      </Button>
      <Button variant="ghost" size="icon">
        <ListBulletIcon />
      </Button>
    </>
  );
}
