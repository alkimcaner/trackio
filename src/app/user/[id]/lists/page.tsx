"use client";

import ListCard from "@/components/ListCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { UserWithLists } from "@/types/list";
import { useQuery } from "@tanstack/react-query";

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
    <section>
      <ResponsiveGrid>
        {user?.lists?.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </ResponsiveGrid>
    </section>
  );
}
