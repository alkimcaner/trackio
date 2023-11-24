import FavoriteGames from "@/components/FavoriteGames";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Favorites() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <section className="mx-auto w-full max-w-7xl p-8">
        <div>
          <h1 className="mb-4 text-lg">Favorite Games</h1>
          <FavoriteGames />
        </div>
      </section>
    </main>
  );
}
