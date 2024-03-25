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
import { Movie } from "@/types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="group flex select-none flex-col overflow-hidden rounded-lg border bg-card">
      <Link href={`/movies/${movie.id}`}>
        <div className="aspect-[3/4] overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
                href={`/movies/${movie.id}`}
                className="mb-auto overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
              >
                {movie.title}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[8rem] text-center">{movie.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center gap-2">
          <p className="mr-auto flex items-center gap-1 py-2">
            <StarFilledIcon />
            {movie.vote_average.toFixed(1)}
          </p>
          <SaveToListDialog
            icon
            item={{ id: String(movie.id), type: ListType.Movie }}
          />
        </div>
      </div>
    </div>
  );
}
