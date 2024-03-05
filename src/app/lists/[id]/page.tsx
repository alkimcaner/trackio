"use client";

import { DeleteListDialog } from "@/components/DeleteListDialog";
import GameCard from "@/components/GameCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ListWithUser } from "@/app/api/lists/[id]/route";
import { gameIdsToQuery } from "@/lib/helpers";

export default function List({ params }: { params: { id: string } }) {
  const { data: list, isLoading } = useQuery<ListWithUser>({
    queryKey: ["list", params.id],
    queryFn: async () => {
      const res = await fetch(`/api/lists/${params.id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },
  });

  const { data: items } = useQuery({
    queryKey: ["list", params.id, "items"],
    queryFn: async () => {
      if (!list?.items.length) return [];

      const res = await fetch("/api/games", {
        method: "POST",
        body: gameIdsToQuery(list?.items),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },
    enabled: !!list,
  });

  const { data: session } = useSession();
  const isAuthorized = list?.userId === session?.user.id;

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!list) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        List not found
      </div>
    );
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
          className="group mt-1 flex w-fit items-center gap-2 text-xs"
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
        {items?.map((item: any) => (
          <GameCard key={item.id} game={item} />
        ))}
      </ResponsiveGrid>
    </section>
  );
}
