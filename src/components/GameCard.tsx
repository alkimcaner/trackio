import {
  HeartFilledIcon,
  HeartIcon,
  ListBulletIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

export default function GameCard() {
  return (
    <div className="flex select-none flex-col overflow-hidden rounded-2xl border bg-zinc-50">
      <Link href={`/games/123456`}>
        <div className="aspect-[3/4] w-full overflow-hidden">
          <Image
            src={
              "https://image.api.playstation.com/vulcan/ap/rnd/202211/0714/ojKZ7l0T2M5egR9YHIjVhI0R.png"
            }
            alt=""
            width={360}
            height={640}
            className="h-full w-full object-cover transition duration-500 will-change-transform hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <StarFilledIcon className="text-yellow-400" />
            9.2
          </span>
          <Button variant="ghost" size="icon">
            <HeartIcon className="text-red-500" />
          </Button>
        </div>
        <Link href={`/games/123456`} className="mb-2 hover:underline">
          The Witcher 3
        </Link>
        <Button variant="secondary" size="sm" className="gap-2">
          <ListBulletIcon />
          Add To List
        </Button>
      </div>
    </div>
  );
}
