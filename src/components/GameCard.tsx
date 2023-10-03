import {
  HeartFilledIcon,
  HeartIcon,
  ListBulletIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function GameCard({ gameData }: any) {
  return (
    <div className="flex select-none flex-col overflow-hidden rounded-lg border bg-zinc-50">
      <Link href={`/games/${gameData.slug}`}>
        <div className="aspect-[3/4] w-full overflow-hidden">
          <Image
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gameData.cover?.image_id}.jpg`}
            alt="Cover image"
            width={360}
            height={640}
            className="h-full w-full object-cover transition duration-500 will-change-transform hover:scale-105"
            priority
          />
        </div>
      </Link>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex items-center gap-2">
          <span className="mr-auto flex items-center gap-2">
            <StarFilledIcon className="text-yellow-400" />
            {Math.floor(gameData.total_rating) / 10}
          </span>
          <Button variant="ghost" size="icon">
            <HeartIcon className="text-red-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <ListBulletIcon />
          </Button>
        </div>
        <Link href={`/games/123456`} className="mb-2 hover:underline">
          {gameData.name}
        </Link>
      </div>
    </div>
  );
}
