import Image from "next/image";
import { format, fromUnixTime } from "date-fns";

export default async function Game({ params }: { params: { gameId: string } }) {
  const gameData = (
    await fetch("http://localhost:3000/api/games", {
      method: "POST",
      body: `fields *,cover.*;where slug = "${params.gameId}";`,
    }).then((res) => res.json())
  )[0];

  const date = fromUnixTime(gameData?.first_release_date ?? "");
  const formattedDate = format(date, "MMM dd, yyyy");

  return (
    <main className="relative">
      <section className="absolute top-0 -z-10 h-96 w-full overflow-hidden">
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${gameData?.cover?.image_id}.jpg`}
          alt="Cover image"
          fill
          className="object-cover blur-2xl brightness-75"
        />
      </section>
      <section className="mx-auto w-full max-w-7xl px-8 pt-32">
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gameData?.cover?.image_id}.jpg`}
          alt="Cover image"
          width={360}
          height={640}
          className="float-left aspect-[3/4] w-64 rounded-2xl object-cover"
        />
        <div className="flex h-64 flex-col justify-end gap-4 p-4">
          <h1 className="text-5xl font-bold text-white">{gameData?.name}</h1>
          <h2 className="text-2xl font-bold text-white">{formattedDate}</h2>
        </div>
        <p className="p-4">{gameData?.summary}</p>
      </section>
    </main>
  );
}
