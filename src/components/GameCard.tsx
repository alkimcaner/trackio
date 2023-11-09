import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import GameCardActionButtons from "./GameCardActionButtons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function GameCard({ gameData }: any) {
  return (
    <div className="group flex select-none flex-col overflow-hidden rounded-lg border bg-card">
      <Link href={`/games/${gameData.slug}`}>
        <div className="aspect-[3/4] overflow-hidden">
          <Image
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gameData.cover?.image_id}.jpg`}
            alt="Cover image"
            width={480}
            height={640}
            className="object-cover transition duration-500 will-change-transform group-hover:scale-105"
            priority
          />
        </div>
      </Link>
      <div className="flex h-full flex-col gap-2 p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/games/${gameData.slug}`}
                className="mb-auto overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
              >
                {gameData.name}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[8rem] text-center">{gameData.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center gap-2">
          <p className="mr-auto flex items-center gap-2 py-2">
            <StarFilledIcon className="text-yellow-400" />
            {Math.floor(gameData.total_rating) / 10}
          </p>
          <GameCardActionButtons gameData={gameData} />
        </div>
      </div>
    </div>
  );
}
