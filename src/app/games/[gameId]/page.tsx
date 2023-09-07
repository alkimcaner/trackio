const fetcher = () => fetch("/api/games").then((res) => res.json());

export default function Game({ params }: { params: { gameId: string } }) {
  return <main>game: {params.gameId}</main>;
}
