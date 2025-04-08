import Image from "next/image";
import { format, fromUnixTime } from "date-fns";
import { ExternalLinkIcon, StarFilledIcon } from "@radix-ui/react-icons";
import ImageSlider from "@/components/ImageSlider";
import SaveToListDialog from "@/components/SaveToListDialog";
import Link from "next/link";
import { getGames } from "@/lib/rsc-queries";
import { ListType } from "@/types/list";
import Reviews from "@/components/Reviews";

type WebsiteType = {
  name: string;
  url: string;
};

const Websites = [
  "_",
  "Official",
  "Wikia",
  "Wikipedia",
  "Facebook",
  "Twitter",
  "Twitch",
  "_",
  "Instagram",
  "Youtube",
  "Iphone",
  "Ipad",
  "Android",
  "Steam",
  "Reddit",
  "Itch",
  "EpicGames",
  "GOG",
  "Discord",
];

export default async function Game(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const query = await getGames(
    `fields *,cover.*,involved_companies.*,involved_companies.company.*,screenshots.*,websites.*; where id = ${params.id};`
  );

  if (!query?.length) return null;

  const game = query[0];

  const releaseDate = game.first_release_date
    ? format(new Date(game.first_release_date * 1000), "MMM dd, yyyy")
    : null;

  const publisher = game.involved_companies?.find(
    (e: any) => e.publisher
  )?.company;

  const developer = game.involved_companies?.find(
    (e: any) => e.developer
  )?.company;

  const websites: WebsiteType[] = game.websites?.map((e: any) => ({
    name: Websites[e.category],
    url: e.url,
  }));

  const screenshots = game.screenshots?.map(
    (screenshot: any) =>
      `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot?.image_id}.jpg`
  );

  return (
    <>
      <div className="absolute -z-20">
        <div className="absolute inset-0 bg-linear-to-b from-black/0 to-background" />
        <Image
          priority
          src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${game.cover?.image_id}.jpg`}
          alt="Background image"
          width={1920}
          height={1080}
          className="h-96 object-cover object-top"
        />
      </div>

      <main className="mx-auto mt-64 flex w-full max-w-5xl flex-col gap-8 p-8">
        <section className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{game.name}</h1>
          <div className="ml-auto flex min-w-fit items-center gap-1 text-lg font-bold">
            <StarFilledIcon className="h-4 w-4" />
            <span>{Math.floor(game.total_rating) / 10}</span>
            <span className="text-sm text-muted-foreground">/ 10</span>
          </div>
        </section>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-3 space-y-8 sm:col-span-1">
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game?.cover?.image_id}.jpg`}
              alt="Cover image"
              width={480}
              height={640}
              priority
              className="rounded-lg"
            />
            <div className="rounded-lg border p-2">
              <SaveToListDialog
                item={{ id: String(game.id), type: ListType.Game }}
              />
            </div>
          </div>

          <div className="col-span-3 flex flex-col gap-8 sm:col-span-2">
            <section>
              <ImageSlider images={screenshots} />
            </section>

            <div>
              <div className="font-bold">Summary</div>
              <p>{game.summary}</p>
            </div>

            {releaseDate && (
              <div>
                <div className="font-semibold">Release Date</div>
                <div className="text-muted-foreground">{releaseDate}</div>
              </div>
            )}

            {developer && (
              <div>
                <div className="font-semibold">Developer</div>
                <div className="text-muted-foreground">{developer.name}</div>
              </div>
            )}

            {publisher && (
              <div>
                <div className="font-semibold">Publisher</div>
                <div className="text-muted-foreground">{publisher.name}</div>
              </div>
            )}

            <div>
              <div className="font-semibold">Websites</div>
              <div className="flex flex-wrap gap-4">
                {websites?.map((site) => (
                  <Link
                    key={`link-${site.url}`}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm"
                  >
                    <ExternalLinkIcon />
                    {site.name}
                  </Link>
                ))}
              </div>
            </div>

            <section>
              <Reviews itemType="game" itemId={String(game.id)} />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
