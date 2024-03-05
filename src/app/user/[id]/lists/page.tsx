"use client";

import { ListWithUser } from "@/app/api/lists/[id]/route";
import ListCard from "@/components/ListCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { buttonVariants } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function UserLists({ params }: { params: { id: string } }) {
  const { data: lists } = useQuery<ListWithUser[]>({
    queryKey: ["userLists", params.id],
    queryFn: async () => {
      const res = await fetch(`/api/user/${params.id}/lists`);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },
  });

  return (
    <>
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
    </>
  );
}
