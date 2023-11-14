"use client";

import CreateListDialog from "@/components/CreateListDialog";
import { getUser } from "@/lib/queryFunctions";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Lists() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  return (
    <main>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-8">
        <CreateListDialog />
        <ul>
          {user?.gameLists?.map((list: any) => (
            <li key={list?.id}>
              <Link href={`/lists/${list?.id}`}>{list?.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
