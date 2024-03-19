import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { EyeNoneIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ListWithUser } from "@/types/list";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function ListCard({ list }: { list: ListWithUser }) {
  const nameInitials = list.User.name
    ?.split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <div className="flex select-none flex-col overflow-hidden rounded-lg border bg-card transition hover:border-primary">
      <Link href={`/lists/${list.id}`} className="relative">
        <Image src="/card.svg" alt="Cover image" width={500} height={250} />

        {list.isPrivate && (
          <Badge className="absolute left-1 top-1 w-fit gap-1">
            <EyeNoneIcon /> Private
          </Badge>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-2">
        {/* List name */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/lists/${list.id}`}
                className="mb-auto overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
              >
                {list.name}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[8rem] break-words text-center">
                {list.name}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* List owner */}
        <Link
          href={`/user/${list.userId}`}
          className="group flex w-fit items-center gap-1 text-xs"
        >
          <Avatar className="h-4 w-4 ring-primary transition group-hover:ring-2">
            <AvatarImage src={list.User.image || ""} alt="Profile image" />
            <AvatarFallback className="text-xs">{nameInitials}</AvatarFallback>
          </Avatar>

          <span>{list.User?.name}</span>
        </Link>
      </div>
    </div>
  );
}
