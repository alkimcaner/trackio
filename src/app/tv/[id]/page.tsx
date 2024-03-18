import Image from "next/image";
import { format, fromUnixTime } from "date-fns";
import { ExternalLinkIcon, StarFilledIcon } from "@radix-ui/react-icons";
import ImageSlider from "@/components/ImageSlider";
import SaveToListDialog from "@/components/SaveToListDialog";
import Link from "next/link";
import { getMovie } from "@/lib/rsc-queries";
import { ListType } from "@/types/movies";

export default async function Show({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id);

  if (!movie) return null;

  // const formattedDate = format(movie.release_date, "MMM dd, yyyy");
  return (
    <>
      {/* <Image
        priority
        src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${movie?.cover?.image_id}.jpg`}
        alt="Background image"
        width={1920}
        height={1080}
        className="fixed left-0 top-0 -z-10 h-full w-full object-cover opacity-25 blur-2xl"
      /> */}
      <section className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <div className="ml-auto flex min-w-fit items-center gap-1 text-lg font-thin">
          <StarFilledIcon className="h-4 w-4" />
          <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
          <span className="text-muted-foreground">/ 10</span>
        </div>
      </section>

      <section>{/* <ImageSlider images={movie?.screenshots} /> */}</section>

      <section className="grid grid-cols-3 gap-8">
        <div className="col-span-3 flex flex-col gap-4 lg:col-span-2">
          <h2 className="font-bold">Summary</h2>
          <p>{movie.overview}</p>
        </div>

        <div className="col-span-3 flex flex-col gap-4 lg:col-span-1">
          <SaveToListDialog
            item={{ id: String(movie?.id), type: ListType.TV }}
          />
          {/* 
          <div>
            <div className="font-semibold">Release Date</div>
            <div className="text-muted-foreground">{formattedDate}</div>
          </div>
          
          <div className="font-semibold">Websites</div>
           <div className="flex flex-wrap gap-4">
            {websites.map((site) => (
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
          </div> */}
        </div>
      </section>
    </>
  );
}
