import Image from "next/image";
import { format } from "date-fns";
import { ExternalLinkIcon, StarFilledIcon } from "@radix-ui/react-icons";
import ImageSlider from "@/components/ImageSlider";
import SaveToListDialog from "@/components/SaveToListDialog";
import Link from "next/link";
import { getTV } from "@/lib/rsc-queries";
import { ListType } from "@/types/list";
import Reviews from "@/components/Reviews";

export default async function TV(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const tv = await getTV(params.id);

  if (!tv) return null;

  const screenshots = tv.images?.backdrops.map(
    (image) => `https://image.tmdb.org/t/p/original${image.file_path}`
  );

  const firstAirDate = tv.first_air_date
    ? format(new Date(tv.first_air_date), "MMM dd, yyyy")
    : null;

  const lastAirDate = tv.last_air_date
    ? format(new Date(tv.last_air_date), "MMM dd, yyyy")
    : null;

  return (
    <>
      <div className="absolute -z-20">
        <div className="absolute inset-0 bg-linear-to-b from-black/0 to-background" />
        <Image
          priority
          src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
          alt="Background image"
          width={1920}
          height={1080}
          className="h-96 object-cover object-top"
        />
      </div>

      <main className="mx-auto mt-64 flex w-full max-w-5xl flex-col gap-8 p-8">
        <section className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{tv.name}</h1>
          <div className="ml-auto flex min-w-fit items-center gap-1 text-lg font-bold">
            <StarFilledIcon className="h-4 w-4" />
            <span>{tv.vote_average.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">/ 10</span>
          </div>
        </section>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-3 space-y-8 sm:col-span-1">
            <Image
              src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
              alt="Cover image"
              width={480}
              height={640}
              priority
              className="rounded-lg"
            />
            <div className="rounded-lg border p-2">
              <SaveToListDialog
                item={{ id: String(tv.id), type: ListType.TV }}
              />
            </div>
          </div>

          <div className="col-span-3 flex flex-col gap-8 sm:col-span-2">
            <section>
              {screenshots && <ImageSlider images={screenshots} />}
            </section>

            {tv.overview && (
              <div>
                <div className="font-bold">Summary</div>
                <p>{tv.overview}</p>
              </div>
            )}
            {firstAirDate && (
              <div>
                <div className="font-semibold">First Air Date</div>
                <div className="text-muted-foreground">{firstAirDate}</div>
              </div>
            )}

            {lastAirDate && (
              <div>
                <div className="font-semibold">Last Air Date</div>
                <div className="text-muted-foreground">{lastAirDate}</div>
              </div>
            )}

            <section>
              <Reviews itemType="tv" itemId={params.id} />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
