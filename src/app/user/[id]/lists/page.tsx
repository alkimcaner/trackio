"use client";

import ListCard from "@/components/ListCard";
import LoadingPage from "@/components/LoadingPage";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { buttonVariants } from "@/components/ui/button";
import { getUserLists } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function UserLists({ params }: { params: { id: string } }) {
  const { data: lists, isLoading } = useQuery({
    queryKey: ["userLists", params.id],
    queryFn: () => getUserLists(params.id),
  });

  if (isLoading) return <LoadingPage />;

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
      {lists && (
        <section>
          <h1 className="mb-4 text-2xl font-bold">
            {lists[0].User?.name?.split(" ")[0]}&apos;s Lists
          </h1>
          <ResponsiveGrid>
            {lists?.map((list) => (
              <ListCard key={list.id} list={list} />
            ))}
          </ResponsiveGrid>
        </section>
      )}
    </main>
  );
}
