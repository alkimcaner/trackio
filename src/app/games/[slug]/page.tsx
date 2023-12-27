import Image from "next/image";
import { format, fromUnixTime } from "date-fns";
import { StarFilledIcon } from "@radix-ui/react-icons";
import ImageSlider from "@/components/ImageSlider";
import SaveToListDialog from "@/components/SaveToListDialog";

export const revalidate = 60;

export default async function Game({ params }: { params: { slug: string } }) {
  const game = (
    await fetch(`${process.env.NEXTAUTH_URL}/api/games`, {
      method: "POST",
      body: `fields *,cover.*,involved_companies.*,involved_companies.company.*,screenshots.*; where slug = "${params.slug}";`,
    }).then((res) => res.json())
  )[0];

  const date = fromUnixTime(game?.first_release_date ?? "");
  const formattedDate = format(date, "MMM dd, yyyy");

  const publisher = game?.involved_companies?.find(
    (e: any) => e.publisher
  )?.company;
  const developer = game?.involved_companies?.find(
    (e: any) => e.developer
  )?.company;

  return (
    <main>
      <Image
        priority
        src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${game?.cover?.image_id}.jpg`}
        alt="Background image"
        width={1920}
        height={1080}
        className="fixed top-0 -z-10 h-full w-full object-cover opacity-25 blur-xl"
      />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 lg:flex-row lg:pt-16">
        <div className="mx-auto flex w-72 flex-col gap-4">
          <Image
            priority
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game?.cover?.image_id}.jpg`}
            alt="Cover image"
            width={360}
            height={640}
            className="aspect-[3/4] w-full rounded-lg object-cover shadow-lg"
          />
          <SaveToListDialog gameId={String(game?.id)} />
        </div>
        <div className="w-full space-y-2 lg:pt-16">
          <h1 className="text-4xl font-bold lg:text-5xl">{game?.name}</h1>
          <h2 className="text-lg">{formattedDate}</h2>
          <p className="flex items-center gap-2 text-lg">
            <StarFilledIcon className="text-yellow-400" />
            {Math.floor(game?.total_rating) / 10}
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

          <p>{game?.summary}</p>
        </div>
      </section>
      <section className="p-4">
        <ImageSlider images={game?.screenshots} />
      </section>
    </main>
  );
}
