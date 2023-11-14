"use client";

import { getUser } from "@/lib/queryFunctions";
import { useQuery } from "@tanstack/react-query";

export default function Lists({ params }: { params: { id: string } }) {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const list = user?.gameLists.filter((e: any) => e.id === params.id)[0];
  return (
    <main>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-8">
        <div>{list?.name}</div>
        {list?.isPublic && <div>Public</div>}
      </section>
    </main>
  );
}
