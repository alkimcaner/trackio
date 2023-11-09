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
  fetch("/api/games/favorite", {
    method: "POST",
    body: id,
  }).then((res) => res.json());

export default function GameCardActionButtons({ game }: any) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!session,
  });

  const mutation = useMutation({
    mutationFn: favoriteGame,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["user"] });

      // Snapshot the previous value
      const previousUser = queryClient.getQueryData(["user"]);

      let newUser: any = previousUser;

      if (newUser.favoriteGameIds.includes(payload)) {
        newUser.favoriteGameIds = newUser.favoriteGameIds.filter(
          (e: any) => e !== payload
        );
      } else {
        newUser.favoriteGameIds.push(payload);
      }

      // Optimistically update
      queryClient.setQueryData(["user"], newUser);

      return { previousUser: previousUser };
    },
    onError: (err, payload, context) => {
      queryClient.setQueryData(["user"], context?.previousUser);
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
        size="icon"
        variant={
          user?.favoriteGameIds?.includes(String(game.id))
            ? "destructive"
            : "ghost"
        }
        onClick={() => mutation.mutate(String(game.id))}
        disabled={mutation.isLoading || isUserLoading}
      >
        {user?.favoriteGameIds?.includes(String(game.id)) ? (
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
