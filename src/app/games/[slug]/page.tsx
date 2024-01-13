import Image from "next/image";
import { format, fromUnixTime } from "date-fns";
import { StarFilledIcon } from "@radix-ui/react-icons";
import ImageSlider from "@/components/ImageSlider";
import SaveToListDialog from "@/components/SaveToListDialog";
import { getGames } from "@/lib/actions";

export default async function Game({ params }: { params: { slug: string } }) {
  const game = (
    await getGames(
      `fields *,cover.*,involved_companies.*,involved_companies.company.*,screenshots.*; where slug = "${params.slug}";`
    )
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
    <>
      <Image
        priority
        src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${game?.cover?.image_id}.jpg`}
        alt="Background image"
        width={1920}
        height={1080}
        className="fixed left-0 top-0 -z-10 h-full w-full object-cover opacity-25 blur-2xl"
      />
      <section className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold lg:text-2xl">{game?.name}</h1>
        <SaveToListDialog gameId={String(game?.id)} />
      </section>

      <div className="grid grid-cols-3 gap-4">
        <section className="col-span-3 lg:col-span-2">
          <ImageSlider images={game?.screenshots} />
        </section>

        <section className="col-span-3 space-y-2 text-sm lg:col-span-1">
          <Image
            priority
            src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${game?.cover?.image_id}.jpg`}
            alt="Cover image"
            width={569}
            height={320}
            className="aspect-video w-full rounded-lg object-cover shadow-lg"
          />
          <p>{game?.summary}</p>

          <p className="flex items-center gap-1">
            <span className="font-semibold">Reviews: </span>
            <StarFilledIcon className="text-yellow-400" />
            {Math.floor(game?.total_rating) / 10} / 10
          </p>

          <p>
            <span className="font-semibold">Relase Date: </span>
            {formattedDate}
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
        </section>
      </div>
    </>
  );
}
