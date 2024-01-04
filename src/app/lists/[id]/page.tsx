import GameCard from "@/components/GameCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getGames, getList } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";

export default async function List({ params }: { params: { id: string } }) {
  // get list
  const list = await getList(params.id);
  // get games
  const games = await getGames(list?.items);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-8">
      <section className="space-y-4">
        <div className="flex items-center gap-4">
          {/* List name */}
          <h1 className="text-2xl font-bold">{list?.name}</h1>
          {list?.isPrivate && <Badge>Private</Badge>}
          {/* List owner */}
          <Link
            href={`/user/${list?.userId}`}
            className="group ml-auto flex w-fit items-center gap-2 text-sm"
          >
            <Image
              src={list?.User?.image || ""}
              alt="user image"
              width={16}
              height={16}
              className="rounded-full ring-primary transition group-hover:ring-2"
            ></Image>
            <span>{list?.User?.name}</span>
          </Link>
        </div>
        {/* List description */}
        <p>{list?.description}</p>
        <Separator />
        <ResponsiveGrid>
          {games?.map((game: any) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ResponsiveGrid>
      </section>
    </main>
  );
}
