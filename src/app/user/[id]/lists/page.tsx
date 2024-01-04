import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ListCard from "@/components/ListCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { buttonVariants } from "@/components/ui/button";
import { getUserLists } from "@/lib/queries";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UserLists({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  const lists = await getUserLists(params.id);
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-8">
      <section className="py-8 text-center">
        <h1 className="mb-4 text-lg">
          Compile, edit, and share. Lists are the ideal method to organize games
          and movies.
        </h1>
        <Link href="/lists/create" className={buttonVariants()}>
          Create new list
        </Link>
      </section>
      <section>
        <h1 className="mb-4 text-lg">Your Lists</h1>
        <ResponsiveGrid>
          {lists?.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </ResponsiveGrid>
      </section>
    </main>
  );
}
