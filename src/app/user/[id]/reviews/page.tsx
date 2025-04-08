"use client";
import { use } from "react";

import ResponsiveGrid from "@/components/ResponsiveGrid";
import Review from "@/components/Review";
import { UserWithLists } from "@/types/list";
import { ReviewWithUser } from "@/types/review";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function UserReviews(props: {
  params: Promise<{ id: string }>;
}) {
  const params = use(props.params);
  const { data: user } = useQuery<
    UserWithLists & { reviews: ReviewWithUser[] }
  >({
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
    <section className="grid gap-8 lg:grid-cols-2">
      {user?.reviews?.map((review) => (
        <div key={review.id} className="w-fit">
          <Review review={review} />
        </div>
      ))}
    </section>
  );
}
