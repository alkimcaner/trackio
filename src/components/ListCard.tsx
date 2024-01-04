import { ListWithUser, getGames } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

export default async function ListCard({ list }: { list: ListWithUser }) {
  const items = await getGames(list.items.slice(0, 4));
  return (
    <div>
      <Link
        href={`/lists/${list.id}`}
        className="grid aspect-[3/4] grid-cols-2 overflow-hidden rounded-lg bg-muted ring-primary transition hover:ring-2"
      >
        {items.map((item: any) => (
          <Image
            key={`list-cover-${item?.cover?.image_id}`}
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item?.cover?.image_id}.jpg`}
            alt="Cover image"
            width={480}
            height={640}
            priority
          />
        ))}
      </Link>
      <div className="mt-2 space-y-2">
        {/* List name */}
        <Link href={`/lists/${list.id}`} className="font-bold hover:underline">
          {list.name} {list.isPrivate && <Badge>Private</Badge>}
        </Link>
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
    </div>
  );
}
