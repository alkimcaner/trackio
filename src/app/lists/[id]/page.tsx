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
import { EyeNoneIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { formatDistance, parseISO } from "date-fns";
import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const formattedDate = useMemo(() => {
    const date = list?.createdAt ? parseISO(list.createdAt as any) : new Date();
    return formatDistance(date, new Date(), { addSuffix: true });
  }, [list?.createdAt]);

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
    <>
      <section className="space-y-2">
        <div className="flex items-center gap-4">
          {/* List name */}
          <h1 className="text-2xl font-bold lg:text-3xl">{list.name}</h1>
          {list.isPrivate && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <EyeNoneIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Private</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {/* Edit or delete list */}
          {isAuthorized && (
            <div className="ml-auto space-x-2">
              <Link
                href={`/lists/${list.id}/edit`}
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <Pencil2Icon />
              </Link>
              <DeleteListDialog listId={list.id} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Created at */}
          <div className="text-xs text-muted-foreground">{formattedDate}</div>

          {/* List owner */}
          <Link
            href={`/user/${list.userId}`}
            className="group flex w-fit items-center gap-1 py-1 text-xs"
          >
            <Image
              src={list.User?.image || ""}
              alt=""
              width={16}
              height={16}
              className="rounded-full ring-primary transition group-hover:ring-2"
            />
            <span>{list.User?.name}</span>
          </Link>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {list.tags.map((tag) => (
            <Badge variant={"outline"} key={`tag-${tag}`}>
              {tag}
            </Badge>
          ))}
        </div>

        {/* List description */}
        <p className="pt-4 text-muted-foreground">{list.description}</p>
      </section>
      <Separator />
      <section>
        <ResponsiveGrid>
          {items?.map((item: any) => (
            <GameCard key={item.id} game={item} />
          ))}
        </ResponsiveGrid>
      </section>
    </>
  );
}
