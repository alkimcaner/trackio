import GameCard from "@/components/GameCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { getGames } from "@/lib/actions";

export default async function Home() {
  const bestGames = await getGames(
    "fields *,cover.*; where total_rating_count > 100; sort total_rating desc; limit 4;"
  );

  const ps4Games = await getGames(
    "fields *,cover.*; where total_rating_count > 100 & category = 0 & platforms = {48}; sort total_rating desc; limit 4;"
  );

  const nsGames = await getGames(
    "fields *,cover.*; where total_rating_count > 100 & category = 0 & platforms = {130}; sort total_rating desc; limit 4;"
  );

  return (
    <section className="space-y-8">
      <div>
        <h1 className="mb-4 text-lg">Best Games</h1>
        <ResponsiveGrid>
          {bestGames?.map((game: any) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ResponsiveGrid>
      </div>
      <div>
        <h1 className="mb-4 text-lg">Best Playstation 4 Exclusives</h1>
        <ResponsiveGrid>
          {ps4Games?.map((game: any) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ResponsiveGrid>
      </div>
      <div>
        <h1 className="mb-4 text-lg">Best Nintendo Switch Exclusives</h1>
        <ResponsiveGrid>
          {nsGames?.map((game: any) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ResponsiveGrid>
      </div>
    </section>
  );
}
