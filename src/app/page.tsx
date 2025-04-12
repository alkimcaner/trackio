import GameCard from "@/components/GameCard";
import MovieCard from "@/components/MovieCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import TVCard from "@/components/TVCard";
import {
  getPopularGames,
  getPopularMovies,
  getPopularTV,
} from "@/lib/rsc-queries";

export const revalidate = 604800;

export default async function Home() {
  const popularMovies = await getPopularMovies(1);

  const popularTV = await getPopularTV(1);

  const popularGames = await getPopularGames(1);

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-4">
      <div>
        <h1 className="mb-4 text-xl">Popular Movies</h1>
        <ResponsiveGrid>
          {popularMovies?.results
            .slice(0, 12)
            .map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </ResponsiveGrid>
      </div>
      <div>
        <h1 className="mb-4 text-xl">Popular TV Shows</h1>
        <ResponsiveGrid>
          {popularTV?.results
            .slice(0, 12)
            .map((tv) => <TVCard key={tv.id} tv={tv} />)}
        </ResponsiveGrid>
      </div>
      <div>
        <h1 className="mb-4 text-xl">Popular Games</h1>
        <ResponsiveGrid>
          {popularGames
            ?.slice(0, 12)
            .map((game) => <GameCard key={game.id} game={game} />)}
        </ResponsiveGrid>
      </div>
    </main>
  );
}
