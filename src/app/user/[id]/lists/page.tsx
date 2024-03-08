"use client";

import { UserWithLists } from "@/app/api/user/[id]/route";
import ListCard from "@/components/ListCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { buttonVariants } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function UserLists({ params }: { params: { id: string } }) {
  const { data: user } = useQuery<UserWithLists>({
    queryKey: ["user", params.id],
    queryFn: async () => {
      const res = await fetch(`/api/user/${params.id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },
  });

  return (
    <>
      <section className="py-4">
        <Link href="/lists/create" className={buttonVariants()}>
          Create new list
        </Link>
      </section>

      <section>
        <h1 className="mb-4 text-2xl font-bold">Game Lists</h1>
        <ResponsiveGrid>
          {user?.lists?.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </ResponsiveGrid>
      </section>
    </>
  );
}
