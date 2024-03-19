import Image from "next/image";
import { format, parseISO } from "date-fns";
import { ExternalLinkIcon, StarFilledIcon } from "@radix-ui/react-icons";
import ImageSlider from "@/components/ImageSlider";
import SaveToListDialog from "@/components/SaveToListDialog";
import Link from "next/link";
import { getTV } from "@/lib/rsc-queries";
import { ListType } from "@/types/list";

export default async function TV({ params }: { params: { id: string } }) {
  const tv = await getTV(params.id);

  if (!tv) return null;

  const screenshots = tv.images?.backdrops.map(
    (image) => `https://image.tmdb.org/t/p/original${image.file_path}`
  );

  const date = parseISO(tv.first_air_date);
  const formattedDate = format(date, "MMM dd, yyyy");
  return (
    <>
      <Image
        priority
        src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
        alt="Background image"
        width={1920}
        height={1080}
        className="fixed left-0 top-0 -z-10 h-full w-full object-cover opacity-10 blur-2xl"
      />

      <section className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">{tv.name}</h1>
        <div className="ml-auto flex min-w-fit items-center gap-1 text-lg font-thin">
          <StarFilledIcon className="h-4 w-4" />
          <span className="font-bold">{tv.vote_average.toFixed(1)}</span>
          <span className="text-muted-foreground">/ 10</span>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-8">
        <div className="col-span-3 space-y-8 sm:col-span-1">
          <Image
            src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
            alt="Cover image"
            width={480}
            height={640}
            priority
            className="rounded-lg"
          />
          <SaveToListDialog item={{ id: String(tv.id), type: ListType.TV }} />
        </div>

        <div className="col-span-3 flex flex-col gap-4 sm:col-span-2">
          <div>
            <div className="font-bold">Summary</div>
            <p>{tv.overview}</p>
          </div>

          <div>
            <div className="font-semibold">Release Date</div>
            <div className="text-muted-foreground">{formattedDate}</div>
          </div>
        </div>
      </section>

      <section>{screenshots && <ImageSlider images={screenshots} />}</section>
    </>
  );
}
