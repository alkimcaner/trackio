import GameCard from "./GameCard";

export default function GameGrid({ games }: any) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
      {games?.map((game: any) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
