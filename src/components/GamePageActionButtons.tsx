"use client";

import {
  HeartFilledIcon,
  HeartIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const getUser = () => fetch("/api/user").then((res) => res.json());

const favoriteGame = (id: string) =>
  fetch("/api/favoriteGame", {
    method: "POST",
    body: id,
  }).then((res) => res.json());

export default function GamePageActionButtons({ gameData }: any) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!session,
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

  if (!session) return <></>;

  return (
    <>
      <Button
        variant={
          userData?.favoriteGames?.includes(String(gameData.id))
            ? "destructive"
            : "outline"
        }
        onClick={() => mutation.mutate(String(gameData.id))}
        disabled={mutation.isLoading || isUserLoading}
      >
        {userData?.favoriteGames?.includes(String(gameData.id)) ? (
          <HeartFilledIcon className="mr-2 h-4 w-4" />
        ) : (
          <HeartIcon className="mr-2 h-4 w-4" />
        )}
        Favorite
      </Button>
      <Button variant={"default"}>
        <ListBulletIcon className="mr-2 h-4 w-4" />
        Add To List
      </Button>
    </>
  );
}
