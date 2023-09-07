import PopularGamesSlider from "@/components/PopularGamesSlider";

export default async function Home() {
  return (
    <main>
      <section className="mx-auto w-full max-w-7xl p-8">
        <PopularGamesSlider />
      </section>
    </main>
  );
}
