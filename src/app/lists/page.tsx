"use client";

import { getUser } from "@/lib/queryFunctions";
import { useQuery } from "@tanstack/react-query";

export default function Lists() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  return (
    <main>
      <section className="p-8">
        <h1 className="text-2xl">Public Lists</h1>
      </section>
    </main>
  );
}
