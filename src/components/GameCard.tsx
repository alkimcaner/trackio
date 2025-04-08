import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import SaveToListDialog from "./SaveToListDialog";
import { ListType } from "@/types/list";
import { Game } from "@/types/game";

export default function GameCard({ game }: { game: Game }) {
  return (
    <div className="group flex select-none flex-col overflow-hidden rounded-lg border bg-card">
      <Link href={`/game/${game?.id}`}>
        <div className="aspect-[3/4] overflow-hidden">
          <Image
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game?.cover?.image_id}.jpg`}
            alt="Cover image"
            width={480}
            height={640}
            className="object-cover transition duration-500 will-change-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex h-full flex-col gap-2 p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/game/${game?.id}`}
                className="mb-auto overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
              >
                {game?.name}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[8rem] text-center">{game?.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center gap-2">
          <p className="mr-auto flex items-center gap-1 py-2">
            <StarFilledIcon />
            {Math.floor(game?.total_rating) / 10}
          </p>
          <SaveToListDialog
            iconOnly
            item={{ id: String(game?.id), type: ListType.Game }}
          />
        </div>
      </div>
    </div>
  );
}
