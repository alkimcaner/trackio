import Image from "next/image";
import { format, fromUnixTime } from "date-fns";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
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
      <section className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">{game?.name}</h1>
          <span className="text-muted-foreground">{formattedDate}</span>
        </div>
        <span className="ml-auto flex min-w-fit items-center gap-1 text-lg font-thin">
          <StarFilledIcon className="h-6 w-6 text-yellow-400" />
          <span className="text-xl font-bold">
            {Math.floor(game?.total_rating) / 10}
          </span>
          <span className="text-muted-foreground">/ 10</span>
        </span>
      </section>

      <section className="px-12">
        <ImageSlider images={game?.screenshots} />
      </section>

      <section className="grid grid-cols-4 gap-8">
        <div className="col-span-4 space-y-4 lg:col-span-3">
          <p>{game?.summary}</p>
          <Separator className="bg-muted-foreground" />
          {developer && (
            <div className="flex gap-4">
              <span className="font-semibold">Developer</span>
              <span className="text-primary">{developer?.name}</span>
            </div>
          )}
          <Separator className="bg-muted-foreground" />
          {publisher && (
            <div className="flex gap-4">
              <span className="font-semibold">Publisher</span>
              <span className="text-primary">{publisher?.name}</span>
            </div>
          )}
        </div>

        <div className="col-span-4 lg:col-span-1">
          <SaveToListDialog gameId={String(game?.id)} />
        </div>
      </section>
    </>
  );
}
