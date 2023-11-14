"use client";

import {
  HeartFilledIcon,
  HeartIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUser } from "@/lib/queryFunctions";

const favoriteGame = (id: string) =>
  fetch("/api/games/favorite", {
    method: "POST",
    body: id,
  }).then((res) => res.json());

export default function GamePageActionButtons({ game }: any) {
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
        variant={
          user?.favoriteGameIds?.includes(String(game.id))
            ? "destructive"
            : "outline"
        }
        onClick={() => mutation.mutate(String(game.id))}
        disabled={mutation.isLoading || isUserLoading}
      >
        {user?.favoriteGameIds?.includes(String(game.id)) ? (
          <HeartFilledIcon className="mr-2 h-4 w-4" />
        ) : (
          <HeartIcon className="mr-2 h-4 w-4" />
        )}
        Favorite
      </Button>
      <Button variant={"outline"}>
        <ListBulletIcon className="mr-2 h-4 w-4" />
        Add To List
      </Button>
    </>
  );
}
