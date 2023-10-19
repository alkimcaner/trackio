import Image from "next/image";
import { format, fromUnixTime } from "date-fns";
import { StarFilledIcon } from "@radix-ui/react-icons";
import GameGallery from "@/components/GameGallery";
import GamePageActionButtons from "@/components/GamePageActionButtons";

export default async function Game({ params }: { params: { slug: string } }) {
  const gameData = (
    await fetch(`${process.env.NEXTAUTH_URL}/api/games`, {
      method: "POST",
      body: `fields *,cover.*,involved_companies.*,involved_companies.company.*,screenshots.*; where slug = "${params.slug}";`,
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
    <main>
      <Image
        priority
        src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${gameData?.cover?.image_id}.jpg`}
        alt="Background image"
        width={1920}
        height={1080}
        className="fixed top-0 -z-10 h-full w-full object-cover opacity-25 blur-xl"
      />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 lg:flex-row lg:pt-16">
        <div className="mx-auto flex w-72 flex-col gap-4">
          <Image
            priority
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gameData?.cover?.image_id}.jpg`}
            alt="Cover image"
            width={360}
            height={640}
            className="aspect-[3/4] w-full rounded-lg object-cover shadow-lg"
          />
          <GamePageActionButtons gameData={gameData} />
        </div>
        <div className="w-full space-y-2 lg:pt-16">
          <h1 className="text-4xl font-bold lg:text-5xl">{gameData?.name}</h1>
          <h2 className="text-lg">{formattedDate}</h2>
          <p className="flex items-center gap-2 text-lg">
            <StarFilledIcon className="text-yellow-400" />
            {Math.floor(gameData.total_rating) / 10}
          </p>

          {developer && (
            <p>
              <span className="font-semibold">Developer: </span>
              {developer?.name}
            </p>
          )}

          {publisher && (
            <p>
              <span className="font-semibold">Publisher: </span>
              {publisher?.name}
            </p>
          )}

          <p>{gameData?.summary}</p>
        </div>
      </section>
      <section className="p-4">
        <GameGallery images={gameData?.screenshots} />
      </section>
    </main>
  );
}
