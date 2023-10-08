import GamesSlider from "@/components/GamesSlider";

export default async function Home() {
  const bestGamesData = await fetch(`${process.env.NEXTAUTH_URL}/api/games`, {
    method: "POST",
    body: "fields *,cover.*; where total_rating_count > 100; sort total_rating desc; limit 10;",
  }).then((res) => res.json());

  const ps4GamesData = await fetch(`${process.env.NEXTAUTH_URL}/api/games`, {
    method: "POST",
    body: "fields *,cover.*; where total_rating_count > 100 & category = 0 & platforms = {48}; sort total_rating desc; limit 10;",
  }).then((res) => res.json());

  const nsGamesData = await fetch(`${process.env.NEXTAUTH_URL}/api/games`, {
    method: "POST",
    body: "fields *,cover.*; where total_rating_count > 100 & category = 0 & platforms = {130}; sort total_rating desc; limit 10;",
  }).then((res) => res.json());

  return (
    <main>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-8">
        <div>
          <h1 className="mb-4 text-lg">Best Games</h1>
          <GamesSlider gamesData={bestGamesData} />
        </div>
        <div>
          <h1 className="mb-4 text-lg">Best Playstation 4 Exclusives</h1>
          <GamesSlider gamesData={ps4GamesData} />
        </div>
        <div>
          <h1 className="mb-4 text-lg">Best Nintendo Switch Exclusives</h1>
          <GamesSlider gamesData={nsGamesData} />
        </div>
      </section>
    </main>
  );
}
