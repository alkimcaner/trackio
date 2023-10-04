import Image from "next/image";
import { format, fromUnixTime } from "date-fns";
import { Button } from "@/components/ui/button";
import { HeartFilledIcon, ListBulletIcon } from "@radix-ui/react-icons";
import GameGallery from "@/components/GameGallery";

export default async function Game({ params }: { params: { gameId: string } }) {
  const gameData = (
    await fetch("http://localhost:3000/api/games", {
      method: "POST",
      body: `fields *,cover.*,involved_companies.*,involved_companies.company.*,screenshots.*;where slug = "${params.gameId}";`,
    }).then((res) => res.json())
  )[0];

  const date = fromUnixTime(gameData?.first_release_date ?? "");
  const formattedDate = format(date, "MMM dd, yyyy");
  const publisher = gameData.involved_companies?.find(
    (e: any) => e.publisher
  )?.company;
  const developer = gameData.involved_companies?.find(
    (e: any) => e.developer
  )?.company;

  return (
    <main className="relative">
      <div className="absolute top-0 -z-10 h-96 w-full overflow-hidden">
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${gameData?.cover?.image_id}.jpg`}
          alt="Cover image"
          fill
          className="object-cover blur-2xl brightness-75"
        />
      </div>
      <section className="mx-auto flex w-full max-w-7xl px-8 pb-16 pt-32">
        <div className="flex w-72 flex-col gap-4">
          <Image
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gameData?.cover?.image_id}.jpg`}
            alt="Cover image"
            width={360}
            height={640}
            className="aspect-[3/4] w-full rounded-lg object-cover shadow-lg"
          />
          <Button>
            <HeartFilledIcon className="mr-2 h-4 w-4" />
            Favorite
          </Button>
          <Button variant={"outline"}>
            <ListBulletIcon className="mr-2 h-4 w-4" />
            Add To Collection
          </Button>
        </div>
        <div className="w-full">
          <div className="flex h-64 flex-col justify-end gap-4 p-4">
            <h1 className="text-5xl font-bold text-white">{gameData?.name}</h1>
            <h2 className="text-2xl font-bold text-white">{formattedDate}</h2>
          </div>
          <div className="p-4">
            {developer && (
              <p className="mb-4">
                <span className="font-semibold">Developer: </span>
                {developer?.name}
              </p>
            )}

            {publisher && (
              <p className="mb-4">
                <span className="font-semibold">Publisher: </span>
                {publisher?.name}
              </p>
            )}

            <p>{gameData?.summary}</p>
          </div>
        </div>
      </section>
      <section className="p-8">
        <GameGallery images={gameData?.screenshots} />
      </section>
    </main>
  );
}
