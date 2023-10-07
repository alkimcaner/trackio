import Image from "next/image";
import { format, fromUnixTime } from "date-fns";
import { StarFilledIcon } from "@radix-ui/react-icons";
import GameGallery from "@/components/GameGallery";
import GamePageActionButtons from "@/components/GamePageActionButtons";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Game({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);

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
    <main className="relative">
      <div className="absolute top-0 -z-10 h-96 w-full overflow-hidden">
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${gameData?.cover?.image_id}.jpg`}
          alt="Cover image"
          fill
          className="object-cover blur-2xl brightness-75"
        />
      </div>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:gap-0 lg:pt-32">
        <div className="mx-auto flex w-72 flex-col gap-4">
          <Image
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gameData?.cover?.image_id}.jpg`}
            alt="Cover image"
            width={360}
            height={640}
            className="aspect-[3/4] w-full rounded-lg object-cover shadow-lg"
          />
          {session && <GamePageActionButtons gameData={gameData} />}
        </div>
        <div className="w-full">
          <div className="flex flex-col justify-end gap-4 p-4 lg:h-64">
            <h1 className="text-5xl font-bold lg:text-zinc-50">
              {gameData?.name}
            </h1>
            <h2 className="text-2xl font-bold lg:text-zinc-50">
              {formattedDate}
            </h2>
            <span className="flex items-center gap-2 text-xl">
              <StarFilledIcon className="text-yellow-400" />
              {Math.floor(gameData.total_rating) / 10}
            </span>
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
