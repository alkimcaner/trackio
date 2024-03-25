import GameCard from "@/components/GameCard";
import MovieCard from "@/components/MovieCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import TVCard from "@/components/TVCard";
import { getGames, getPopularMovies, getPopularTV } from "@/lib/rsc-queries";

export default async function Home() {
  const popularMovies = await getPopularMovies(1);

  const popularTV = await getPopularTV(1);

  const bestGames = await getGames(
    "fields *,cover.*,involved_companies.*,involved_companies.company.*,screenshots.*,websites.*; where total_rating_count > 50; sort total_rating desc; limit 12;"
  );

  const ps4Games = await getGames(
    "fields *,cover.*,involved_companies.*,involved_companies.company.*,screenshots.*,websites.*; where total_rating_count > 50 & category = 0 & platforms = 48; sort total_rating desc; limit 12;"
  );

  const nsGames = await getGames(
    "fields *,cover.*,involved_companies.*,involved_companies.company.*,screenshots.*,websites.*; where total_rating_count > 50 & category = 0 & platforms = {130}; sort total_rating desc; limit 12;"
  );

  return (
    <section className="space-y-8">
      <div>
        <h1 className="mb-4 text-lg">Popular Movies</h1>
        <ResponsiveGrid>
          {popularMovies?.results.slice(0, 12).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ResponsiveGrid>
      </div>
      <div>
        <h1 className="mb-4 text-lg">Popular TV Shows</h1>
        <ResponsiveGrid>
          {popularTV?.results.slice(0, 12).map((tv) => (
            <TVCard key={tv.id} tv={tv} />
          ))}
        </ResponsiveGrid>
      </div>
      <div>
        <h1 className="mb-4 text-lg">Best Games</h1>
        <ResponsiveGrid>
          {bestGames?.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ResponsiveGrid>
      </div>
      <div>
        <h1 className="mb-4 text-lg">Best Playstation 4 Exclusives</h1>
        <ResponsiveGrid>
          {ps4Games?.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ResponsiveGrid>
      </div>
      <div>
        <h1 className="mb-4 text-lg">Best Nintendo Switch Exclusives</h1>
        <ResponsiveGrid>
          {nsGames?.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ResponsiveGrid>
      </div>
    </section>
  );
}
