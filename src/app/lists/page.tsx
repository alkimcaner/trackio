"use client";

import CreateListDialog from "@/components/CreateListDialog";
import { useQuery } from "@tanstack/react-query";

const getUser = () => fetch("/api/user").then((res) => res.json());

export default function Lists() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <main>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-8">
        <CreateListDialog />
        {user?.gameLists?.map((list: any) => (
          <div key={list?.id}>{list?.name}</div>
        ))}
      </section>
    </main>
  );
}
