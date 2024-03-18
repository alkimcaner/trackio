"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";
import { gameIdsToQuery } from "@/lib/helpers";
import { EyeNoneIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useMemo } from "react";
import { ListWithUser } from "@/types/list";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function ListCard({ list }: { list: ListWithUser }) {
  const { data: games } = useQuery({
    queryKey: ["list", list.id, "games"],
    queryFn: async () => {
      if (!list?.gameIds.length) return [];

      const res = await fetch("/api/games", {
        method: "POST",
        body: gameIdsToQuery(list?.gameIds),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },
  });

  const nameInitials = useMemo(
    () =>
      list.User.name
        ?.split(" ")
        .map((name) => name[0])
        .join(""),
    [list.User.name]
  );

  return (
    <div className="flex select-none flex-col overflow-hidden rounded-lg border bg-card">
      <Link
        href={`/lists/${list.id}`}
        className="relative grid aspect-[3/4] grid-cols-2 overflow-hidden bg-muted"
      >
        {games?.map((game: any) => (
          <Image
            key={`list-cover-${game?.cover?.image_id}`}
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game?.cover?.image_id}.jpg`}
            alt="Cover image"
            width={480}
            height={640}
            priority
          />
        ))}
        {list.isPrivate && (
          <Badge className="absolute left-1 top-1 w-fit gap-1">
            <EyeNoneIcon /> Private
          </Badge>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-2">
        {/* List name */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/lists/${list.id}`}
                className="mb-auto overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
              >
                {list.name}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[8rem] break-words text-center">
                {list.name}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* List owner */}
        <Link
          href={`/user/${list.userId}`}
          className="group flex w-fit items-center gap-1 text-xs"
        >
          <Avatar className="h-4 w-4 ring-primary transition group-hover:ring-2">
            <AvatarImage src={list.User.image || ""} alt="Profile image" />
            <AvatarFallback className="text-xs">{nameInitials}</AvatarFallback>
          </Avatar>

          <span>{list.User?.name}</span>
        </Link>
      </div>
    </div>
  );
}
