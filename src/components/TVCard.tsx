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
import { TV } from "@/types/tv";

export default function TVCard({ tv }: { tv: TV }) {
  return (
    <div className="group flex select-none flex-col overflow-hidden rounded-lg border bg-card">
      <Link href={`/tv/${tv.id}`}>
        <div className="aspect-[3/4] overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`}
            alt="Cover image"
            width={480}
            height={640}
            className="object-cover transition duration-500 will-change-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex h-full flex-col gap-2 p-2">
        {/* Movie name */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/tv/${tv.id}`}
                className="mb-auto overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
              >
                {tv.name}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[8rem] text-center">{tv.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center gap-2">
          <p className="mr-auto flex items-center gap-1 py-2">
            <StarFilledIcon />
            {tv.vote_average.toFixed(1)}
          </p>
          <SaveToListDialog
            iconOnly
            item={{ id: String(tv.id), type: ListType.TV }}
          />
        </div>
      </div>
    </div>
  );
}
