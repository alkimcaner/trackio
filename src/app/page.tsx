import BestGamesSlider from "@/components/BestGamesSlider";

export default async function Home() {
  const bestGamesData = await fetch(`${process.env.NEXTAUTH_URL}/api/games`, {
    method: "POST",
    body: "fields *,cover.*;where total_rating_count > 500;sort total_rating desc;limit 10;",
  }).then((res) => res.json());

  return (
    <main>
      <section className="mx-auto w-full max-w-7xl p-8">
        <BestGamesSlider bestGamesData={bestGamesData} />
      </section>
    </main>
  );
}
