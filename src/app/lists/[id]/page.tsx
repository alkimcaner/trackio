"use client";

import { DeleteListDialog } from "@/components/DeleteListDialog";
import GameCard from "@/components/GameCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getGamesById, getList } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import ListSkeleton from "@/components/ListSkeleton";

export default function List({ params }: { params: { id: string } }) {
  const { data: list, isLoading } = useQuery({
    queryKey: ["lists", params.id],
    queryFn: () => getList(params.id),
  });

  const { data: games } = useQuery({
    queryKey: ["games", list?.items],
    queryFn: () => getGamesById(list?.items),
    enabled: !!list,
  });

  const { data: session } = useSession();
  const isAuthorized = list?.userId === session?.user.id;

  if (isLoading) {
    return <ListSkeleton />;
  }

  if (!list) {
    return <h1 className="mt-32 text-center text-lg">List not found</h1>;
  }

  return (
    <section className="space-y-4">
      <div>
        <div className="flex items-center gap-4">
          {/* List name */}
          <h1 className="text-2xl font-bold">{list.name}</h1>
          {list.isPrivate && <Badge>Private</Badge>}
          {/* Edit or delete list */}
          {isAuthorized && (
            <>
              <Link href={`/lists/${list.id}/edit`} className="ml-auto">
                Edit
              </Link>
              <DeleteListDialog listId={list.id} />
            </>
          )}
        </div>
        {/* List owner */}
        <Link
          href={`/user/${list.userId}`}
          className="group flex w-fit items-center gap-2 text-xs"
        >
          <Image
            src={list.User?.image || ""}
            alt="user image"
            width={16}
            height={16}
            className="rounded-full ring-primary transition group-hover:ring-2"
          ></Image>
          <span>{list.User?.name}</span>
        </Link>
      </div>
      {/* List description */}
      <p className="text-muted-foreground">{list.description}</p>
      <Separator />
      <ResponsiveGrid>
        {games?.map((game: any) => (
          <GameCard key={game.id} game={game} />
        ))}
      </ResponsiveGrid>
    </section>
  );
}
