"use client";

import GameCard from "@/components/GameCard";
import { Badge } from "@/components/ui/badge";
import { getGameList, getGames } from "@/lib/queryFunctions";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default function List({ params }: { params: { id: string } }) {
  const [parent, enableAnimations] = useAutoAnimate();

  const { data: list, isError } = useQuery({
    queryKey: ["list", params.id],
    queryFn: () => getGameList({ id: params.id }),
  });

  const { data: games } = useQuery({
    queryKey: ["list", "games", params.id],
    queryFn: () => getGames(list?.gameIds),
    enabled: !!list,
  });

  if (isError) {
    redirect("/lists");
  }

  return (
    <main>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl">{list?.name}</h1>
          {list?.isPublic && <Badge variant={"secondary"}>Public</Badge>}
        </div>
        <div
          ref={parent}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6"
        >
          {games?.map((game: any) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </main>
  );
}
