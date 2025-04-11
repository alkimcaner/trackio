import Image from "next/image";
import { format } from "date-fns";
import { ExternalLinkIcon, StarFilledIcon } from "@radix-ui/react-icons";
import ImageSlider from "@/components/ImageSlider";
import SaveToListDialog from "@/components/SaveToListDialog";
import Link from "next/link";
import { getMovie } from "@/lib/rsc-queries";
import { ListType } from "@/types/list";
import Reviews from "@/components/Reviews";

export default async function Movie(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const movie = await getMovie(params.id);

  if (!movie) return null;

  const screenshots = movie.images?.backdrops.map(
    (image) => `https://image.tmdb.org/t/p/original${image.file_path}`
  );

  const formattedDate = movie.release_date
    ? format(new Date(movie.release_date), "MMM dd, yyyy")
    : null;

  return (
    <>
      <div className="absolute -z-20">
        <div className="absolute inset-0 bg-linear-to-b from-black/0 to-background" />
        <Image
          priority
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="Background image"
          width={1920}
          height={1080}
          className="h-96 object-cover object-top"
        />
      </div>

      <main className="mx-auto mt-64 flex w-full max-w-7xl flex-col gap-8 p-8">
        <section className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <div className="ml-auto flex min-w-fit items-center gap-1 text-lg font-bold">
            <StarFilledIcon className="h-4 w-4" />
            <span>{movie.vote_average.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">/ 10</span>
          </div>
        </section>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-3 space-y-8 sm:col-span-1">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt="Cover image"
              width={480}
              height={640}
              priority
              className="rounded-lg shadow"
            />
            <div className="rounded-lg border p-2">
              <SaveToListDialog
                item={{ id: String(movie.id), type: ListType.Movie }}
              />
            </div>
          </div>

          <div className="col-span-3 flex flex-col gap-8 sm:col-span-2">
            <section>
              {screenshots && <ImageSlider images={screenshots} />}
            </section>

            {movie.overview && (
              <div>
                <div className="font-bold">Summary</div>
                <p>{movie.overview}</p>
              </div>
            )}

            {formattedDate && (
              <div>
                <div className="font-semibold">Release Date</div>
                <div className="text-muted-foreground">{formattedDate}</div>
              </div>
            )}

            <section>
              <Reviews itemType="movie" itemId={params.id} />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
